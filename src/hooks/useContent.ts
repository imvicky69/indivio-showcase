import { useMemo } from 'react';
import contentData from '../data/content.json';
import type {
	ContentDatabase,
	FAQCategory,
	Testimonial,
	StepItem,
} from '../types/content';
import { useHybridContent } from './useFirestoreContent';

/**
 * Enhanced hook for accessing centralized content data
 * Now supports Firestore synchronization with fallback to local content
 * Maintains backward compatibility with existing usage patterns
 */
export const useContent = (options: { useFirestore?: boolean } = {}) => {
	const { useFirestore = false } = options;

	// Use hybrid content if Firestore is enabled
	const firestoreContent = useHybridContent();
	
	// Local content fallback
	const localContent = useMemo(() => contentData as ContentDatabase, []);

	// Select content source
	const content = useFirestore && firestoreContent.content 
		? firestoreContent.content 
		: localContent;

	// Helper functions for common content access patterns
	const getNavigationItems = (type: 'primary' | 'footer' | 'legal') => {
		if (useFirestore) {
			return firestoreContent.getNavigationItems(type);
		}
		return content.navigation[type];
	};

	const getFeatureByIndex = (index: number) => {
		if (useFirestore) {
			return firestoreContent.getFeatureByIndex(index);
		}
		return content.features.items[index] || null;
	};

	const getFAQByCategory = (category: string) => {
		if (useFirestore) {
			return firestoreContent.getFAQByCategory(category);
		}
		return content.faq.categories.find(
			(cat: FAQCategory) => cat.category === category
		);
	};

	const getTestimonialById = (id: number) => {
		if (useFirestore) {
			return firestoreContent.getTestimonialById(id);
		}
		return content.testimonials.find(
			(testimonial: Testimonial) => testimonial.id === id
		);
	};

	const getHowItWorksStep = (step: number) => {
		if (useFirestore) {
			return firestoreContent.getHowItWorksStep(step);
		}
		return content.howItWorks.steps.find((s: StepItem) => s.step === step);
	};

	const getWhyIndivioSection = (section: keyof typeof content.whyIndivio) => {
		if (useFirestore) {
			return firestoreContent.getWhyIndivioSection(section);
		}
		return content.whyIndivio[section];
	};

	const getCTAContent = (type: 'default' | 'demo' = 'default') => {
		if (useFirestore) {
			return firestoreContent.getCTAContent(type);
		}
		return content.cta[type];
	};

	const getFormContent = (formType: 'contact' | 'checkout') => {
		if (useFirestore) {
			return firestoreContent.getFormContent(formType);
		}
		return content.forms[formType];
	};

	const getUIText = (category: 'buttons' | 'messages' | 'accessibility') => {
		return content.ui[category];
	};

	const getSiteMetadata = () => {
		return content.site;
	};

	const getContactInfo = () => {
		return content.site.contact;
	};

	const getSocialLinks = () => {
		return content.site.social;
	};

	return {
		// Raw content access
		content,

		// Status information (only when using Firestore)
		...(useFirestore && {
			loading: firestoreContent.loading,
			error: firestoreContent.error,
			syncStatus: firestoreContent.syncStatus,
			localContent: firestoreContent.localContent,
			firestoreContent: firestoreContent.firestoreContent,
		}),

		// Section-specific accessors
		site: content.site,
		navigation: content.navigation,
		hero: content.hero,
		features: content.features,
		howItWorks: content.howItWorks,
		pricing: content.pricing,
		whyIndivio: content.whyIndivio,
		testimonials: content.testimonials,
		founder: content.founder,
		faq: content.faq,
		forms: content.forms,
		cta: content.cta,
		techAdvantage: content.techAdvantage,
		ui: content.ui,
		meta: content.meta,

		// Helper functions
		getNavigationItems,
		getFeatureByIndex,
		getFAQByCategory,
		getTestimonialById,
		getHowItWorksStep,
		getWhyIndivioSection,
		getCTAContent,
		getFormContent,
		getUIText,
		getSiteMetadata,
		getContactInfo,
		getSocialLinks,

		// Metadata
		version: content.metadata.version,
		lastUpdated: content.metadata.lastUpdated,
		isMigrationReady: content.metadata.migrationReady,
	};
};

export default useContent;
