import { contentBridge } from '../lib/firestore-bridge';
import { configManager } from '../lib/content-config';

interface SyncEvent {
	type: 'fetch' | 'push' | 'error' | 'cache-hit' | 'cache-miss' | 'revalidation';
	contentKey: string;
	timestamp: number;
	duration?: number;
	success: boolean;
	error?: string;
	metadata?: Record<string, any>;
}

interface PerformanceMetrics {
	totalRequests: number;
	successfulRequests: number;
	failedRequests: number;
	averageResponseTime: number;
	cacheHitRate: number;
	lastSync: number;
	uptime: number;
}

interface ContentMetrics {
	key: string;
	accessCount: number;
	lastAccessed: number;
	averageResponseTime: number;
	errorCount: number;
	cacheHits: number;
	cacheMisses: number;
}

class SyncMonitor {
	private events: SyncEvent[] = [];
	private metrics: Map<string, ContentMetrics> = new Map();
	private startTime: number = Date.now();
	private subscribers: Map<string, ((event: SyncEvent) => void)[]> = new Map();

	constructor() {
		this.initializeMonitoring();
	}

	private initializeMonitoring() {
		// Initialize metrics for all configured content keys
		Object.keys(configManager.getFullConfig().content).forEach((key) => {
			this.metrics.set(key, {
				key,
				accessCount: 0,
				lastAccessed: 0,
				averageResponseTime: 0,
				errorCount: 0,
				cacheHits: 0,
				cacheMisses: 0,
			});
		});
	}

	/**
	 * Record a sync event
	 */
	recordEvent(event: Omit<SyncEvent, 'timestamp'>): void {
		const fullEvent: SyncEvent = {
			...event,
			timestamp: Date.now(),
		};

		this.events.push(fullEvent);
		this.updateMetrics(fullEvent);
		this.notifySubscribers(fullEvent);

		// Keep only last 1000 events to prevent memory issues
		if (this.events.length > 1000) {
			this.events = this.events.slice(-1000);
		}
	}

	/**
	 * Update content metrics based on event
	 */
	private updateMetrics(event: SyncEvent): void {
		let contentMetrics = this.metrics.get(event.contentKey);
		
		if (!contentMetrics) {
			contentMetrics = {
				key: event.contentKey,
				accessCount: 0,
				lastAccessed: 0,
				averageResponseTime: 0,
				errorCount: 0,
				cacheHits: 0,
				cacheMisses: 0,
			};
			this.metrics.set(event.contentKey, contentMetrics);
		}

		contentMetrics.accessCount++;
		contentMetrics.lastAccessed = event.timestamp;

		if (event.duration) {
			// Update average response time
			const totalTime = contentMetrics.averageResponseTime * (contentMetrics.accessCount - 1);
			contentMetrics.averageResponseTime = (totalTime + event.duration) / contentMetrics.accessCount;
		}

		if (!event.success) {
			contentMetrics.errorCount++;
		}

		if (event.type === 'cache-hit') {
			contentMetrics.cacheHits++;
		} else if (event.type === 'cache-miss') {
			contentMetrics.cacheMisses++;
		}
	}

	/**
	 * Get overall performance metrics
	 */
	getPerformanceMetrics(): PerformanceMetrics {
		const totalRequests = this.events.length;
		const successfulRequests = this.events.filter(e => e.success).length;
		const failedRequests = totalRequests - successfulRequests;

		const responseTimes = this.events
			.filter(e => e.duration)
			.map(e => e.duration!);
		const averageResponseTime = responseTimes.length > 0
			? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
			: 0;

		const cacheHits = this.events.filter(e => e.type === 'cache-hit').length;
		const cacheMisses = this.events.filter(e => e.type === 'cache-miss').length;
		const cacheHitRate = (cacheHits + cacheMisses) > 0 
			? cacheHits / (cacheHits + cacheMisses) 
			: 0;

		const lastSyncEvent = this.events
			.filter(e => e.type === 'push' || e.type === 'fetch')
			.sort((a, b) => b.timestamp - a.timestamp)[0];

		return {
			totalRequests,
			successfulRequests,
			failedRequests,
			averageResponseTime,
			cacheHitRate,
			lastSync: lastSyncEvent?.timestamp || 0,
			uptime: Date.now() - this.startTime,
		};
	}

	/**
	 * Get metrics for a specific content key
	 */
	getContentMetrics(key: string): ContentMetrics | null {
		return this.metrics.get(key) || null;
	}

	/**
	 * Get metrics for all content keys
	 */
	getAllContentMetrics(): ContentMetrics[] {
		return Array.from(this.metrics.values());
	}

	/**
	 * Get recent events
	 */
	getRecentEvents(limit: number = 50): SyncEvent[] {
		return this.events.slice(-limit).reverse();
	}

	/**
	 * Get events by type
	 */
	getEventsByType(type: SyncEvent['type']): SyncEvent[] {
		return this.events.filter(e => e.type === type);
	}

	/**
	 * Get events for a specific content key
	 */
	getEventsForContent(key: string): SyncEvent[] {
		return this.events.filter(e => e.contentKey === key);
	}

	/**
	 * Subscribe to specific event types
	 */
	subscribe(eventType: SyncEvent['type'], callback: (event: SyncEvent) => void): () => void {
		if (!this.subscribers.has(eventType)) {
			this.subscribers.set(eventType, []);
		}
		
		this.subscribers.get(eventType)!.push(callback);

		// Return unsubscribe function
		return () => {
			const callbacks = this.subscribers.get(eventType);
			if (callbacks) {
				const index = callbacks.indexOf(callback);
				if (index > -1) {
					callbacks.splice(index, 1);
				}
			}
		};
	}

	/**
	 * Notify subscribers of new events
	 */
	private notifySubscribers(event: SyncEvent): void {
		const callbacks = this.subscribers.get(event.type);
		if (callbacks) {
			callbacks.forEach(callback => {
				try {
					callback(event);
				} catch (error) {
					console.error('Error in sync monitor callback:', error);
				}
			});
		}
	}

	/**
	 * Generate performance report
	 */
	generateReport(): {
		summary: PerformanceMetrics;
		contentBreakdown: ContentMetrics[];
		topErrors: { error: string; count: number }[];
		slowestContent: { key: string; responseTime: number }[];
	} {
		const summary = this.getPerformanceMetrics();
		const contentBreakdown = this.getAllContentMetrics();

		// Get top errors
		const errorEvents = this.events.filter(e => !e.success && e.error);
		const errorCounts = new Map<string, number>();
		errorEvents.forEach(e => {
			const count = errorCounts.get(e.error!) || 0;
			errorCounts.set(e.error!, count + 1);
		});
		const topErrors = Array.from(errorCounts.entries())
			.map(([error, count]) => ({ error, count }))
			.sort((a, b) => b.count - a.count)
			.slice(0, 5);

		// Get slowest content
		const slowestContent = contentBreakdown
			.filter(m => m.averageResponseTime > 0)
			.map(m => ({ key: m.key, responseTime: m.averageResponseTime }))
			.sort((a, b) => b.responseTime - a.responseTime)
			.slice(0, 5);

		return {
			summary,
			contentBreakdown,
			topErrors,
			slowestContent,
		};
	}

	/**
	 * Clear old events and reset metrics
	 */
	clearHistory(): void {
		this.events = [];
		this.metrics.clear();
		this.initializeMonitoring();
	}

	/**
	 * Export events for analysis
	 */
	exportEvents(format: 'json' | 'csv' = 'json'): string {
		if (format === 'csv') {
			const headers = ['timestamp', 'type', 'contentKey', 'duration', 'success', 'error'];
			const rows = this.events.map(e => [
				new Date(e.timestamp).toISOString(),
				e.type,
				e.contentKey,
				e.duration || '',
				e.success,
				e.error || '',
			]);
			
			return [headers, ...rows].map(row => row.join(',')).join('\n');
		}

		return JSON.stringify(this.events, null, 2);
	}
}

/**
 * Enhanced Logger with structured logging
 */
class StructuredLogger {
	private logLevel: 'debug' | 'info' | 'warn' | 'error';
	private loggers: ((entry: LogEntry) => void)[] = [];

	constructor(level: 'debug' | 'info' | 'warn' | 'error' = 'info') {
		this.logLevel = level;
		this.addConsoleLogger();
	}

	private addConsoleLogger(): void {
		this.loggers.push((entry) => {
			const timestamp = new Date(entry.timestamp).toISOString();
			const prefix = `[${timestamp}] [${entry.level.toUpperCase()}]`;
			
			switch (entry.level) {
				case 'debug':
					console.debug(prefix, entry.message, entry.metadata || '');
					break;
				case 'info':
					console.info(prefix, entry.message, entry.metadata || '');
					break;
				case 'warn':
					console.warn(prefix, entry.message, entry.metadata || '');
					break;
				case 'error':
					console.error(prefix, entry.message, entry.metadata || '');
					break;
			}
		});
	}

	addLogger(logger: (entry: LogEntry) => void): void {
		this.loggers.push(logger);
	}

	private shouldLog(level: string): boolean {
		const levels = { debug: 0, info: 1, warn: 2, error: 3 };
		return (levels as any)[level] >= (levels as any)[this.logLevel];
	}

	private log(level: 'debug' | 'info' | 'warn' | 'error', message: string, metadata?: any): void {
		if (!this.shouldLog(level)) return;

		const entry: LogEntry = {
			timestamp: Date.now(),
			level,
			message,
			metadata,
		};

		this.loggers.forEach(logger => {
			try {
				logger(entry);
			} catch (error) {
				console.error('Logger error:', error);
			}
		});
	}

	debug(message: string, metadata?: any): void {
		this.log('debug', message, metadata);
	}

	info(message: string, metadata?: any): void {
		this.log('info', message, metadata);
	}

	warn(message: string, metadata?: any): void {
		this.log('warn', message, metadata);
	}

	error(message: string, metadata?: any): void {
		this.log('error', message, metadata);
	}
}

interface LogEntry {
	timestamp: number;
	level: 'debug' | 'info' | 'warn' | 'error';
	message: string;
	metadata?: any;
}

/**
 * Real-time sync monitoring dashboard data provider
 */
export class SyncDashboard {
	private monitor: SyncMonitor;
	private logger: StructuredLogger;
	private updateInterval: NodeJS.Timeout | null = null;

	constructor() {
		this.monitor = new SyncMonitor();
		this.logger = new StructuredLogger(configManager.getGlobalConfig().logLevel as any);
		this.setupMonitoring();
	}

	private setupMonitoring(): void {
		// Monitor cache events
		this.monitor.subscribe('cache-hit', (event) => {
			this.logger.debug(`Cache hit for ${event.contentKey}`, { duration: event.duration });
		});

		this.monitor.subscribe('cache-miss', (event) => {
			this.logger.debug(`Cache miss for ${event.contentKey}`, { duration: event.duration });
		});

		this.monitor.subscribe('error', (event) => {
			this.logger.error(`Sync error for ${event.contentKey}: ${event.error}`, { event });
		});
	}

	/**
	 * Start real-time monitoring
	 */
	startMonitoring(intervalMs: number = 5000): void {
		if (this.updateInterval) {
			clearInterval(this.updateInterval);
		}

		this.updateInterval = setInterval(() => {
			const metrics = this.monitor.getPerformanceMetrics();
			this.logger.info('Performance update', metrics);
		}, intervalMs);

		this.logger.info('Sync monitoring started');
	}

	/**
	 * Stop monitoring
	 */
	stopMonitoring(): void {
		if (this.updateInterval) {
			clearInterval(this.updateInterval);
			this.updateInterval = null;
		}
		this.logger.info('Sync monitoring stopped');
	}

	/**
	 * Get dashboard data
	 */
	getDashboardData() {
		return {
			performance: this.monitor.getPerformanceMetrics(),
			recentEvents: this.monitor.getRecentEvents(10),
			contentMetrics: this.monitor.getAllContentMetrics(),
			cacheStats: contentBridge.getCacheStats(),
			report: this.monitor.generateReport(),
		};
	}

	/**
	 * Record a sync operation
	 */
	recordSync(contentKey: string, type: SyncEvent['type'], success: boolean, duration?: number, error?: string): void {
		this.monitor.recordEvent({
			type,
			contentKey,
			success,
			duration,
			error,
		});
	}

	getMonitor(): SyncMonitor {
		return this.monitor;
	}

	getLogger(): StructuredLogger {
		return this.logger;
	}
}

// Export singleton instances
export const syncMonitor = new SyncMonitor();
export const syncLogger = new StructuredLogger();
export const syncDashboard = new SyncDashboard();

// Export types
export type { SyncEvent, PerformanceMetrics, ContentMetrics, LogEntry };