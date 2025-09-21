'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useContentManager } from '../hooks/useFirestoreContent';

interface DashboardData {
	performance: {
		totalRequests: number;
		successfulRequests: number;
		failedRequests: number;
		averageResponseTime: number;
		cacheHitRate: number;
		lastSync: number;
		uptime: number;
	};
	recentEvents: Array<{
		type: string;
		contentKey: string;
		timestamp: number;
		duration?: number;
		success: boolean;
		error?: string;
	}>;
	contentMetrics: Array<{
		key: string;
		accessCount: number;
		lastAccessed: number;
		averageResponseTime: number;
		errorCount: number;
		cacheHits: number;
		cacheMisses: number;
	}>;
	cacheStats: {
		size: number;
		keys: string[];
		totalMemory: number;
	};
}

export default function SyncDashboard() {
	const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [autoRefresh, setAutoRefresh] = useState(true);
	const [selectedContentKey, setSelectedContentKey] = useState<string | null>(null);

	const { clearCache, getCacheStats } = useContentManager();

	const fetchDashboardData = useCallback(async () => {
		try {
			const response = await fetch('/api/sync?action=dashboard');
			if (!response.ok) {
				throw new Error('Failed to fetch dashboard data');
			}
			const data = await response.json();
			setDashboardData(data);
			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Unknown error');
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchDashboardData();
	}, [fetchDashboardData]);

	useEffect(() => {
		if (!autoRefresh) return;

		const interval = setInterval(fetchDashboardData, 5000);
		return () => clearInterval(interval);
	}, [autoRefresh, fetchDashboardData]);

	const handleClearCache = async () => {
		try {
			clearCache();
			await fetchDashboardData();
		} catch (err) {
			setError('Failed to clear cache');
		}
	};

	const handleClearHistory = async () => {
		try {
			await fetch('/api/sync?action=clear-history', { method: 'POST' });
			await fetchDashboardData();
		} catch (err) {
			setError('Failed to clear history');
		}
	};

	const formatDuration = (ms: number) => {
		if (ms < 1000) return `${ms}ms`;
		return `${(ms / 1000).toFixed(2)}s`;
	};

	const formatTimestamp = (timestamp: number) => {
		return new Date(timestamp).toLocaleString();
	};

	const formatUptime = (ms: number) => {
		const seconds = Math.floor(ms / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
	};

	const getEventTypeColor = (type: string) => {
		switch (type) {
			case 'cache-hit': return 'text-green-600';
			case 'cache-miss': return 'text-yellow-600';
			case 'fetch': return 'text-blue-600';
			case 'push': return 'text-purple-600';
			case 'error': return 'text-red-600';
			default: return 'text-gray-600';
		}
	};

	if (loading) {
		return (
			<div className="p-8">
				<div className="animate-pulse">
					<div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
						{[1, 2, 3].map(i => (
							<div key={i} className="h-24 bg-gray-200 rounded"></div>
						))}
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-8">
				<div className="bg-red-50 border border-red-200 rounded-lg p-4">
					<h3 className="text-lg font-semibold text-red-800 mb-2">Dashboard Error</h3>
					<p className="text-red-600">{error}</p>
					<button
						onClick={fetchDashboardData}
						className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
					>
						Retry
					</button>
				</div>
			</div>
		);
	}

	if (!dashboardData) return null;

	return (
		<div className="p-8 max-w-7xl mx-auto">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-gray-900">Content Sync Dashboard</h1>
				<div className="flex gap-4">
					<label className="flex items-center">
						<input
							type="checkbox"
							checked={autoRefresh}
							onChange={(e) => setAutoRefresh(e.target.checked)}
							className="mr-2"
						/>
						Auto Refresh
					</label>
					<button
						onClick={fetchDashboardData}
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
					>
						Refresh
					</button>
				</div>
			</div>

			{/* Performance Overview */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
				<div className="bg-white rounded-lg shadow p-6">
					<h3 className="text-lg font-semibold text-gray-700 mb-2">Total Requests</h3>
					<p className="text-3xl font-bold text-blue-600">{dashboardData.performance.totalRequests}</p>
				</div>
				<div className="bg-white rounded-lg shadow p-6">
					<h3 className="text-lg font-semibold text-gray-700 mb-2">Success Rate</h3>
					<p className="text-3xl font-bold text-green-600">
						{dashboardData.performance.totalRequests > 0
							? Math.round((dashboardData.performance.successfulRequests / dashboardData.performance.totalRequests) * 100)
							: 0}%
					</p>
				</div>
				<div className="bg-white rounded-lg shadow p-6">
					<h3 className="text-lg font-semibold text-gray-700 mb-2">Cache Hit Rate</h3>
					<p className="text-3xl font-bold text-purple-600">
						{Math.round(dashboardData.performance.cacheHitRate * 100)}%
					</p>
				</div>
				<div className="bg-white rounded-lg shadow p-6">
					<h3 className="text-lg font-semibold text-gray-700 mb-2">Avg Response</h3>
					<p className="text-3xl font-bold text-yellow-600">
						{formatDuration(dashboardData.performance.averageResponseTime)}
					</p>
				</div>
			</div>

			{/* System Info */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
				<div className="bg-white rounded-lg shadow p-6">
					<h3 className="text-xl font-semibold text-gray-800 mb-4">System Status</h3>
					<div className="space-y-2">
						<div className="flex justify-between">
							<span className="text-gray-600">Uptime:</span>
							<span className="font-medium">{formatUptime(dashboardData.performance.uptime)}</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-600">Last Sync:</span>
							<span className="font-medium">
								{dashboardData.performance.lastSync 
									? formatTimestamp(dashboardData.performance.lastSync)
									: 'Never'
								}
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-600">Cache Size:</span>
							<span className="font-medium">{dashboardData.cacheStats.size} items</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-600">Failed Requests:</span>
							<span className="font-medium text-red-600">{dashboardData.performance.failedRequests}</span>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-lg shadow p-6">
					<h3 className="text-xl font-semibold text-gray-800 mb-4">Actions</h3>
					<div className="space-y-2">
						<button
							onClick={handleClearCache}
							className="w-full px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
						>
							Clear Cache
						</button>
						<button
							onClick={handleClearHistory}
							className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
						>
							Clear History
						</button>
						<a
							href="/api/sync?action=export&format=csv"
							download="sync-events.csv"
							className="block w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-center"
						>
							Export CSV
						</a>
					</div>
				</div>
			</div>

			{/* Recent Events */}
			<div className="bg-white rounded-lg shadow mb-8">
				<div className="p-6 border-b border-gray-200">
					<h3 className="text-xl font-semibold text-gray-800">Recent Events</h3>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Timestamp
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Type
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Content Key
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Duration
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Status
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{dashboardData.recentEvents.map((event, index) => (
								<tr key={index} className="hover:bg-gray-50">
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{formatTimestamp(event.timestamp)}
									</td>
									<td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getEventTypeColor(event.type)}`}>
										{event.type}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{event.contentKey}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{event.duration ? formatDuration(event.duration) : '-'}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
											event.success 
												? 'bg-green-100 text-green-800' 
												: 'bg-red-100 text-red-800'
										}`}>
											{event.success ? 'Success' : 'Failed'}
										</span>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Content Metrics */}
			<div className="bg-white rounded-lg shadow">
				<div className="p-6 border-b border-gray-200">
					<h3 className="text-xl font-semibold text-gray-800">Content Performance</h3>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Content Key
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Access Count
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Avg Response
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Cache Hits
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Errors
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Last Accessed
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{dashboardData.contentMetrics
								.sort((a, b) => b.accessCount - a.accessCount)
								.map((metric) => (
								<tr key={metric.key} className="hover:bg-gray-50">
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										{metric.key}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{metric.accessCount}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{metric.averageResponseTime > 0 ? formatDuration(metric.averageResponseTime) : '-'}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{metric.cacheHits} / {metric.cacheHits + metric.cacheMisses}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
										{metric.errorCount}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{metric.lastAccessed ? formatTimestamp(metric.lastAccessed) : 'Never'}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}