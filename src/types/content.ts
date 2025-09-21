export interface SiteMetadata {
	name: string;
	fullName: string;
	tagline: string;
	description: string;
	contact: ContactInfo;
	social: SocialLinks;
}

export interface ContactInfo {
	phone: string;
	email: string;
	whatsapp: string;
	address: {
		street: string;
		city: string;
		state: string;
		pincode: string;
		full: string;
	};
}

export interface SocialLinks {
	twitter: string;
	linkedin: string;
	instagram: string;
	facebook: string;
	github: string;
}

export interface NavigationItem {
	href: string;
	label: string;
}

export interface Navigation {
	primary: NavigationItem[];
	footer: NavigationItem[];
	legal: NavigationItem[];
	cta: {
		primary: string;
		primaryHref: string;
		secondary: string;
		secondaryHref: string;
	};
}

export interface HeroSection {
	title: string;
	description: string;
	primaryButton: {
		label: string;
		href: string;
	};
	secondaryButton: {
		label: string;
		href: string;
	};
}

export interface FeatureItem {
	icon: string;
	title: string;
	description: string;
}

export interface FeaturesSection {
	sectionTitle: string;
	items: FeatureItem[];
}

export interface StepItem {
	step: number;
	icon: string;
	title: string;
	description: string;
}

export interface HowItWorksSection {
	sectionTitle: string;
	steps: StepItem[];
}

export interface PricingSection {
	title: string;
	subtitle: string;
	renewalNotice: string;
}

export interface TargetSegment {
	name: string;
	icon: string;
}

export interface ValueProp {
	icon: string;
	title: string;
	description: string;
}

export interface LaunchStep {
	step: number;
	icon: string;
	title: string;
	description: string;
}

export interface WhyIndivioContent {
	hero: {
		title: string;
		description: string;
	};
	targetAudience: {
		title: string;
		segments: TargetSegment[];
	};
	valueProposition: ValueProp[];
	advantages: ValueProp[];
	launchProcess: LaunchStep[];
	difference: ValueProp[];
}

export interface Testimonial {
	id: number;
	quote: string;
	author: string;
	institution: string;
}

export interface FounderContent {
	name: string;
	title: string;
	message: string;
	vision: {
		title: string;
		description: string;
	};
	goals: {
		title: string;
		description: string;
	};
}

export interface FAQQuestion {
	id: string;
	question: string;
	answer: string;
}

export interface FAQCategory {
	category: string;
	questions: FAQQuestion[];
}

export interface FAQContent {
	searchPlaceholder: string;
	noResultsTitle: string;
	noResultsDescription: string;
	categories: FAQCategory[];
}

export interface FormField {
	label: string;
	placeholder: string;
}

export interface ContactForm {
	title: string;
	subtitle: string;
	fields: {
		name: FormField;
		email: FormField;
		phone: FormField;
		message: FormField;
	};
	submitButton: string;
	successMessage: string;
	errorMessage: string;
}

export interface CheckoutStep {
	id: number;
	title: string;
	description: string;
}

export interface DiscountCode {
	label: string;
	placeholder: string;
	applyButton: string;
	removeButton: string;
	successMessage: string;
	errorMessage: string;
}

export interface CheckoutForm {
	steps: CheckoutStep[];
	discountCode: DiscountCode;
}

export interface FormsContent {
	contact: ContactForm;
	checkout: CheckoutForm;
}

export interface CTAContent {
	title: string;
	subtitle: string;
	primaryButton: string;
	secondaryButton: string;
}

export interface TechComparisonPoint {
	title: string;
	points: string[];
}

export interface TechAdvantageContent {
	title: string;
	subtitle: string;
	traditional: TechComparisonPoint;
	indivio: TechComparisonPoint;
}

export interface UIButtons {
	viewMore: string;
	viewLess: string;
	loadMore: string;
	close: string;
	back: string;
	next: string;
	submit: string;
	cancel: string;
	save: string;
	loading: string;
	bookNow: string;
	getStarted: string;
	learnMore: string;
	seeDemo: string;
}

export interface UIMessages {
	loading: string;
	error: string;
	success: string;
	noData: string;
	comingSoon: string;
}

export interface AccessibilityLabels {
	toggleMenu: string;
	openImage: string;
	closeModal: string;
	previousSlide: string;
	nextSlide: string;
}

export interface UIContent {
	buttons: UIButtons;
	messages: UIMessages;
	accessibility: AccessibilityLabels;
}

export interface MetaContent {
	defaultTitle: string;
	defaultDescription: string;
	keywords: string[];
}

export interface ContentDatabase {
	metadata: {
		version: string;
		lastUpdated: string;
		description: string;
		migrationReady: boolean;
	};
	site: SiteMetadata;
	navigation: Navigation;
	hero: HeroSection;
	features: FeaturesSection;
	howItWorks: HowItWorksSection;
	pricing: PricingSection;
	whyIndivio: WhyIndivioContent;
	testimonials: Testimonial[];
	founder: FounderContent;
	faq: FAQContent;
	forms: FormsContent;
	cta: {
		default: CTAContent;
		demo: CTAContent;
	};
	techAdvantage: TechAdvantageContent;
	ui: UIContent;
	meta: MetaContent;
}
