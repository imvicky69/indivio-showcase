import { useState, useEffect, useCallback, useRef } from 'react';
import { contentBridge } from '../lib/firestore-bridge';
import type { ContentDatabase, FAQCategory, Testimonial, StepItem } from '../types/content';

interface UseContentOptions {
	enableRealtime?: boolean;
	fallbackToLocal?: boolean;
	cacheStrategy?: 'memory' | 'storage' | 'none';
}

interface UseContentResult<T> {
	data: T | null;
	loading: boolean;
	error: string | null;
	refetch: () => Promise<void>;
	lastUpdated: number | null;
}

/**
 * Enhanced hook for accessing content from Firestore with real-time updates
 */
export const useFirestoreContent = <T = any>(
	key: string,
	options: UseContentOptions = {}
): UseContentResult<T> => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [lastUpdated, setLastUpdated] = useState<number | null>(null);
	const unsubscribeRef = useRef<(() => void) | null>(null);

	const {
		enableRealtime = false,
		fallbackToLocal = true,
		cacheStrategy = 'memory',
	} = options;

	const fetchContent = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);

			const content = await contentBridge.getContent<T>(key);
			if (content) {
				setData(content);
				setLastUpdated(Date.now());
			} else if (fallbackToLocal) {
				// Fallback to local content
				const localContent = await import('../data/content.json');
				const localData = (localContent.default as any)[key];
				if (localData) {
					setData(localData);
					setLastUpdated(Date.now());
				}
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to fetch content');
			
			if (fallbackToLocal) {
				try {
					const localContent = await import('../data/content.json');
					const localData = (localContent.default as any)[key];
					if (localData) {
						setData(localData);
						setLastUpdated(Date.now());
					}
				} catch {
					// Local fallback also failed
				}
			}
		} finally {
			setLoading(false);
		}
	}, [key, fallbackToLocal]);

	const refetch = useCallback(async () => {
		contentBridge.clearCache(key);
		await fetchContent();
	}, [fetchContent, key]);

	useEffect(() => {
		if (enableRealtime) {
			// Set up real-time subscription
			const unsubscribe = contentBridge.subscribeToContent<T>(key, (newData) => {
				if (newData) {
					setData(newData);
					setLastUpdated(Date.now());
					setError(null);
				}
				setLoading(false);
			});
			unsubscribeRef.current = unsubscribe;
		} else {
			// One-time fetch
			fetchContent();
		}

		return () => {
			if (unsubscribeRef.current) {
				unsubscribeRef.current();
				unsubscribeRef.current = null;
			}
		};
	}, [key, enableRealtime, fetchContent]);

	return {
		data,
		loading,
		error,
		refetch,
		lastUpdated,
	};
};

/**
 * Hook for getting all content at once
 */
export const useAllContent = (options: UseContentOptions = {}): UseContentResult<ContentDatabase> => {
	return useFirestoreContent<ContentDatabase>('_all', options);
};

/**
 * Hook for hybrid content access (Firestore + local fallback)
 */
export const useHybridContent = () => {
	const [localContent, setLocalContent] = useState<ContentDatabase | null>(null);
	const [firestoreContent, setFirestoreContent] = useState<ContentDatabase | null>(null);
	const [mergedContent, setMergedContent] = useState<ContentDatabase | null>(null);
	const [syncStatus, setSyncStatus] = useState<'synced' | 'drift' | 'error'>('synced');

	// Load local content
	useEffect(() => {
		import('../data/content.json').then((content) => {
			setLocalContent(content.default as ContentDatabase);
		});
	}, []);

	// Load Firestore content
	const { data: firestoreData, loading, error } = useAllContent({
		fallbackToLocal: false,
	});

	useEffect(() => {
		if (firestoreData) {
			setFirestoreContent(firestoreData);
		}
	}, [firestoreData]);

	// Merge content and detect drift
	useEffect(() => {
		if (localContent && firestoreContent) {
			const merged = mergeContent(localContent, firestoreContent);
			setMergedContent(merged);

			// Detect content drift
			const hasConflicts = detectContentDrift(localContent, firestoreContent);
			setSyncStatus(hasConflicts ? 'drift' : 'synced');
		} else if (localContent && !firestoreContent && !loading) {
			setMergedContent(localContent);
			setSyncStatus('error');
		}
	}, [localContent, firestoreContent, loading]);

	// Helper functions for common content access patterns
	const getNavigationItems = useCallback((type: 'primary' | 'footer' | 'legal') => {
		return mergedContent?.navigation?.[type] || [];
	}, [mergedContent]);

	const getFeatureByIndex = useCallback((index: number) => {
		return mergedContent?.features?.items?.[index] || null;
	}, [mergedContent]);

	const getFAQByCategory = useCallback((category: string) => {
		return mergedContent?.faq?.categories?.find(
			(cat: FAQCategory) => cat.category === category
		) || null;
	}, [mergedContent]);

	const getTestimonialById = useCallback((id: number) => {
		return mergedContent?.testimonials?.find(
			(testimonial: Testimonial) => testimonial.id === id
		) || null;
	}, [mergedContent]);

	const getHowItWorksStep = useCallback((step: number) => {
		return mergedContent?.howItWorks?.steps?.find((s: StepItem) => s.step === step) || null;
	}, [mergedContent]);

	const getWhyIndivioSection = useCallback((section: keyof ContentDatabase['whyIndivio']) => {
		return mergedContent?.whyIndivio?.[section] || null;
	}, [mergedContent]);

	const getCTAContent = useCallback((type: 'default' | 'demo' = 'default') => {
		return mergedContent?.cta?.[type] || null;
	}, [mergedContent]);

	const getFormContent = useCallback((formType: 'contact' | 'checkout') => {
		return mergedContent?.forms?.[formType] || null;
	}, [mergedContent]);

	return {
		content: mergedContent,
		localContent,
		firestoreContent,
		syncStatus,
		loading,
		error,
		// Helper functions
		getNavigationItems,
		getFeatureByIndex,
		getFAQByCategory,
		getTestimonialById,
		getHowItWorksStep,
		getWhyIndivioSection,
		getCTAContent,
		getFormContent,
	};
};

/**
 * Hook for content management (CRUD operations)
 */
export const useContentManager = () => {
	const [isSyncing, setIsSyncing] = useState(false);
	const [syncError, setSyncError] = useState<string | null>(null);

	const pushContent = useCallback(async (key: string, data: any): Promise<boolean> => {
		try {
			setIsSyncing(true);
			setSyncError(null);
			return await contentBridge.pushContent(key, data);
		} catch (error) {
			setSyncError(error instanceof Error ? error.message : 'Sync failed');
			return false;
		} finally {
			setIsSyncing(false);
		}
	}, []);

	const pushAllContent = useCallback(async (content: ContentDatabase): Promise<boolean> => {
		try {
			setIsSyncing(true);
			setSyncError(null);
			return await contentBridge.pushAllContent(content);
		} catch (error) {
			setSyncError(error instanceof Error ? error.message : 'Sync failed');
			return false;
		} finally {
			setIsSyncing(false);
		}
	}, []);

	const getPageConfig = useCallback((key: string) => {
		return contentBridge.getPageConfig(key);
	}, []);

	const updatePageConfig = useCallback((key: string, config: any) => {
		contentBridge.setPageConfig(key, config);
	}, []);

	const clearCache = useCallback((key?: string) => {
		contentBridge.clearCache(key);
	}, []);

	const getCacheStats = useCallback(() => {
		return contentBridge.getCacheStats();
	}, []);

	return {
		pushContent,
		pushAllContent,
		getPageConfig,
		updatePageConfig,
		clearCache,
		getCacheStats,
		isSyncing,
		syncError,
	};
};

/**
 * Hook for ISR and revalidation
 */
export const useContentRevalidation = () => {
	const checkRevalidation = useCallback((key: string) => {
		return contentBridge.shouldRevalidate(key);
	}, []);

	const getRevalidationTime = useCallback((key: string) => {
		return contentBridge.getRevalidationTime(key);
	}, []);

	const forceRevalidation = useCallback(async (key: string) => {
		contentBridge.clearCache(key);
		return await contentBridge.getContent(key);
	}, []);

	return {
		checkRevalidation,
		getRevalidationTime,
		forceRevalidation,
	};
};

// Helper functions

function mergeContent(local: ContentDatabase, firestore: ContentDatabase): ContentDatabase {
	// Simple merge strategy - Firestore takes precedence, local as fallback
	const merged: any = { ...local };

	Object.keys(firestore).forEach((key) => {
		const firestoreValue = (firestore as any)[key];
		if (firestoreValue !== undefined && firestoreValue !== null) {
			merged[key] = firestoreValue;
		}
	});

	return merged as ContentDatabase;
}

function detectContentDrift(local: ContentDatabase, firestore: ContentDatabase): boolean {
	const localKeys = Object.keys(local);
	const firestoreKeys = Object.keys(firestore);

	// Check for structural differences
	const allKeys = new Set([...localKeys, ...firestoreKeys]);
	
	for (const key of allKeys) {
		const localValue = JSON.stringify((local as any)[key]);
		const firestoreValue = JSON.stringify((firestore as any)[key]);
		
		if (localValue !== firestoreValue) {
			return true;
		}
	}

	return false;
}

// Legacy compatibility hook
export const useContent = () => {
	const { content, loading, error, ...helpers } = useHybridContent();
	
	return {
		...helpers,
		content,
		loading,
		error,
	};
};