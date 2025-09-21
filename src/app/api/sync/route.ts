import { NextRequest, NextResponse } from 'next/server';
import { syncDashboard } from '../../../lib/sync-monitor';

export async function GET(request: NextRequest) {
	try {
		const url = new URL(request.url);
		const action = url.searchParams.get('action') || 'dashboard';

		switch (action) {
			case 'dashboard':
				const dashboardData = syncDashboard.getDashboardData();
				return NextResponse.json(dashboardData);

			case 'metrics':
				const monitor = syncDashboard.getMonitor();
				const metrics = monitor.getPerformanceMetrics();
				return NextResponse.json(metrics);

			case 'events':
				const limit = parseInt(url.searchParams.get('limit') || '50');
				const eventType = url.searchParams.get('type') as any;
				const monitorInstance = syncDashboard.getMonitor();
				
				const events = eventType 
					? monitorInstance.getEventsByType(eventType)
					: monitorInstance.getRecentEvents(limit);
				
				return NextResponse.json({ events });

			case 'content':
				const contentKey = url.searchParams.get('key');
				const monitorForContent = syncDashboard.getMonitor();
				
				if (contentKey) {
					const contentMetrics = monitorForContent.getContentMetrics(contentKey);
					const contentEvents = monitorForContent.getEventsForContent(contentKey);
					return NextResponse.json({ metrics: contentMetrics, events: contentEvents });
				} else {
					const allContentMetrics = monitorForContent.getAllContentMetrics();
					return NextResponse.json({ metrics: allContentMetrics });
				}

			case 'report':
				const reportData = syncDashboard.getMonitor().generateReport();
				return NextResponse.json(reportData);

			case 'export':
				const format = url.searchParams.get('format') as 'json' | 'csv' || 'json';
				const exportData = syncDashboard.getMonitor().exportEvents(format);
				
				const headers: Record<string, string> = {
					'Content-Type': format === 'csv' ? 'text/csv' : 'application/json',
				};
				
				if (format === 'csv') {
					headers['Content-Disposition'] = 'attachment; filename=sync-events.csv';
				}
				
				return new NextResponse(exportData, { headers });

			default:
				return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
		}
	} catch (error) {
		console.error('Sync dashboard API error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const url = new URL(request.url);
		const action = url.searchParams.get('action');

		switch (action) {
			case 'clear-history':
				syncDashboard.getMonitor().clearHistory();
				return NextResponse.json({ success: true, message: 'History cleared' });

			case 'start-monitoring':
				const interval = parseInt(url.searchParams.get('interval') || '5000');
				syncDashboard.startMonitoring(interval);
				return NextResponse.json({ success: true, message: 'Monitoring started' });

			case 'stop-monitoring':
				syncDashboard.stopMonitoring();
				return NextResponse.json({ success: true, message: 'Monitoring stopped' });

			default:
				return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
		}
	} catch (error) {
		console.error('Sync dashboard API error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		);
	}
}