import { db } from './firebase';
import {
	collection,
	doc,
	getDocs,
	getDoc,
	setDoc,
	onSnapshot,
	query,
	orderBy,
	Timestamp,
	DocumentData,
	QuerySnapshot,
	DocumentSnapshot,
} from 'firebase/firestore';
import type { ContentDatabase } from '../types/content';
import { syncMonitor, syncLogger } from './sync-monitor';

interface SyncConfig {
	collection: string;
	enableRealtime: boolean;
	cacheTimeout: number; // in milliseconds
	retryAttempts: number;
	retryDelay: number; // in milliseconds
}

interface CacheEntry<T = any> {
	data: T;
	timestamp: number;
	expires: number;
}

interface PageConfig {
	key: string;
	revalidate?: number; // ISR revalidation time in seconds
	cacheStrategy: 'static' | 'isr' | 'realtime';
	priority: 'high' | 'medium' | 'low';
}

interface SyncMetadata {
	lastSync: number;
	version: string;
	conflicts?: string[];
	source: 'local' | 'firestore' | 'merged';
}

class FirestoreContentBridge {
	private config: SyncConfig;
	private cache = new Map<string, CacheEntry>();
	private listeners = new Map<string, () => void>();
	private syncMetadata: SyncMetadata | null = null;
	private pageConfigs = new Map<string, PageConfig>();

	constructor(config?: Partial<SyncConfig>) {
		this.config = {
			collection: 'frontend',
			enableRealtime: false,
			cacheTimeout: 5 * 60 * 1000, // 5 minutes
			retryAttempts: 3,
			retryDelay: 1000,
			...config,
		};

		this.initializePageConfigs();
	}

	private initializePageConfigs() {
		// Define page-specific configurations
		const defaultPageConfigs: PageConfig[] = [
			{
				key: 'hero',
				revalidate: 3600, // 1 hour
				cacheStrategy: 'isr',
				priority: 'high',
			},
			{
				key: 'features',
				revalidate: 7200, // 2 hours
				cacheStrategy: 'isr',
				priority: 'high',
			},
			{
				key: 'pricing',
				revalidate: 1800, // 30 minutes
				cacheStrategy: 'isr',
				priority: 'high',
			},
			{
				key: 'faq',
				revalidate: 3600, // 1 hour
				cacheStrategy: 'isr',
				priority: 'medium',
			},
			{
				key: 'testimonials',
				revalidate: 7200, // 2 hours
				cacheStrategy: 'isr',
				priority: 'medium',
			},
			{
				key: 'navigation',
				revalidate: 86400, // 24 hours
				cacheStrategy: 'static',
				priority: 'high',
			},
			{
				key: 'site',
				revalidate: 86400, // 24 hours
				cacheStrategy: 'static',
				priority: 'high',
			},
			{
				key: 'metadata',
				revalidate: 86400, // 24 hours
				cacheStrategy: 'static',
				priority: 'low',
			},
		];

		defaultPageConfigs.forEach((config) => {
			this.pageConfigs.set(config.key, config);
		});
	}

	/**
	 * Get content by key with caching and error handling
	 */
	async getContent<T = any>(key: string): Promise<T | null> {
		const startTime = Date.now();
		
		try {
			// Check cache first
			const cached = this.getCachedContent<T>(key);
			if (cached) {
				syncMonitor.recordEvent({
					type: 'cache-hit',
					contentKey: key,
					success: true,
					duration: Date.now() - startTime,
				});
				return cached;
			}

			syncMonitor.recordEvent({
				type: 'cache-miss',
				contentKey: key,
				success: true,
				duration: Date.now() - startTime,
			});

			// Fetch from Firestore
			const content = await this.fetchFromFirestore<T>(key);
			if (content) {
				this.setCachedContent(key, content);
			}

			syncMonitor.recordEvent({
				type: 'fetch',
				contentKey: key,
				success: true,
				duration: Date.now() - startTime,
			});

			return content;
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Unknown error';
			syncLogger.error(`Failed to get content for key "${key}"`, { error: errorMessage });
			
			syncMonitor.recordEvent({
				type: 'error',
				contentKey: key,
				success: false,
				duration: Date.now() - startTime,
				error: errorMessage,
			});

			return this.getCachedContent<T>(key) || null;
		}
	}

	/**
	 * Get all content from Firestore
	 */
	async getAllContent(): Promise<ContentDatabase | null> {
		try {
			const cached = this.getCachedContent<ContentDatabase>('_all');
			if (cached) {
				return cached;
			}

			const querySnapshot = await getDocs(
				query(collection(db, this.config.collection))
			);

			const content: Record<string, any> = {};
			querySnapshot.forEach((doc) => {
				const data = doc.data();
				// Handle the structure from your push script
				content[doc.id] = data.data || data;
			});

			const contentDb = content as ContentDatabase;
			this.setCachedContent('_all', contentDb);
			return contentDb;
		} catch (error) {
			console.error('Failed to get all content:', error);
			return this.getCachedContent<ContentDatabase>('_all') || null;
		}
	}

	/**
	 * Subscribe to real-time updates for a specific content key
	 */
	subscribeToContent<T = any>(
		key: string,
		callback: (data: T | null) => void
	): () => void {
		if (!this.config.enableRealtime) {
			console.warn('Real-time updates are disabled');
			return () => {};
		}

		const docRef = doc(db, this.config.collection, key);
		const unsubscribe = onSnapshot(
			docRef,
			(snapshot) => {
				if (snapshot.exists()) {
					const data = snapshot.data();
					const content = data.data || data;
					this.setCachedContent(key, content);
					callback(content as T);
				} else {
					callback(null);
				}
			},
			(error) => {
				console.error(`Real-time subscription error for "${key}":`, error);
				callback(null);
			}
		);

		this.listeners.set(key, unsubscribe);
		return unsubscribe;
	}

	/**
	 * Push content to Firestore
	 */
	async pushContent(key: string, data: any): Promise<boolean> {
		const startTime = Date.now();
		
		try {
			const docRef = doc(db, this.config.collection, key);
			const payload = {
				data,
				_meta: {
					updatedAt: Timestamp.now(),
					source: 'bridge',
					version: this.syncMetadata?.version || '1.0',
				},
			};

			await setDoc(docRef, payload, { merge: true });
			this.setCachedContent(key, data);
			
			syncMonitor.recordEvent({
				type: 'push',
				contentKey: key,
				success: true,
				duration: Date.now() - startTime,
			});

			syncLogger.info(`Successfully pushed content for key "${key}"`, { duration: Date.now() - startTime });
			return true;
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Unknown error';
			syncLogger.error(`Failed to push content for key "${key}"`, { error: errorMessage });
			
			syncMonitor.recordEvent({
				type: 'error',
				contentKey: key,
				success: false,
				duration: Date.now() - startTime,
				error: errorMessage,
			});

			return false;
		}
	}

	/**
	 * Push all content to Firestore
	 */
	async pushAllContent(content: ContentDatabase): Promise<boolean> {
		try {
			const promises = Object.entries(content).map(([key, value]) =>
				this.pushContent(key, value)
			);

			const results = await Promise.allSettled(promises);
			const failures = results.filter((result) => result.status === 'rejected');

			if (failures.length > 0) {
				console.error(`Failed to push ${failures.length} content items`);
				return false;
			}

			return true;
		} catch (error) {
			console.error('Failed to push all content:', error);
			return false;
		}
	}

	/**
	 * Get page configuration for ISR and caching
	 */
	getPageConfig(key: string): PageConfig | null {
		return this.pageConfigs.get(key) || null;
	}

	/**
	 * Update page configuration
	 */
	setPageConfig(key: string, config: Partial<PageConfig>) {
		const existing = this.pageConfigs.get(key) || {
			key,
			cacheStrategy: 'isr',
			priority: 'medium',
		};
		this.pageConfigs.set(key, { ...existing, ...config });
	}

	/**
	 * Get revalidation time for a content key
	 */
	getRevalidationTime(key: string): number {
		const config = this.getPageConfig(key);
		return config?.revalidate || 3600; // Default 1 hour
	}

	/**
	 * Check if content should be revalidated
	 */
	shouldRevalidate(key: string): boolean {
		const cached = this.cache.get(key);
		if (!cached) return true;

		const config = this.getPageConfig(key);
		if (!config) return true;

		const now = Date.now();
		const age = now - cached.timestamp;
		const maxAge = (config.revalidate || 3600) * 1000;

		return age > maxAge;
	}

	/**
	 * Clear cache for a specific key or all cache
	 */
	clearCache(key?: string): void {
		if (key) {
			this.cache.delete(key);
		} else {
			this.cache.clear();
		}
	}

	/**
	 * Get cache statistics
	 */
	getCacheStats() {
		return {
			size: this.cache.size,
			keys: Array.from(this.cache.keys()),
			totalMemory: JSON.stringify(Array.from(this.cache.values())).length,
		};
	}

	/**
	 * Cleanup all listeners
	 */
	cleanup(): void {
		this.listeners.forEach((unsubscribe) => unsubscribe());
		this.listeners.clear();
		this.cache.clear();
	}

	// Private methods

	private getCachedContent<T>(key: string): T | null {
		const entry = this.cache.get(key);
		if (!entry) return null;

		const now = Date.now();
		if (now > entry.expires) {
			this.cache.delete(key);
			return null;
		}

		return entry.data as T;
	}

	private setCachedContent(key: string, data: any): void {
		const now = Date.now();
		const config = this.getPageConfig(key);
		const cacheTimeout = config?.revalidate
			? config.revalidate * 1000
			: this.config.cacheTimeout;

		this.cache.set(key, {
			data,
			timestamp: now,
			expires: now + cacheTimeout,
		});
	}

	private async fetchFromFirestore<T>(key: string): Promise<T | null> {
		let lastError: Error | null = null;

		for (let attempt = 1; attempt <= this.config.retryAttempts; attempt++) {
			try {
				const docRef = doc(db, this.config.collection, key);
				const docSnap = await getDoc(docRef);

				if (docSnap.exists()) {
					const data = docSnap.data();
					return (data.data || data) as T;
				}
				return null;
			} catch (error) {
				lastError = error as Error;
				if (attempt < this.config.retryAttempts) {
					await new Promise((resolve) =>
						setTimeout(resolve, this.config.retryDelay * attempt)
					);
				}
			}
		}

		throw lastError;
	}
}

// Export singleton instance
export const contentBridge = new FirestoreContentBridge();

// Export class for custom instances
export { FirestoreContentBridge };
export type { SyncConfig, PageConfig, SyncMetadata };