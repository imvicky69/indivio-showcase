// src/app/page.tsx
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { TechStackSection } from '@/components/TechStackSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { GlobalCtaSection } from '@/components/GlobalCtaSection';
import { TechAdvantageSection } from '@/components/TechAdvantageSection';
import type { Metadata } from 'next';

// Page-specific SEO metadata
export const metadata: Metadata = {
  title: 'Affordable School Management System & Website Solution',
  description:
    "Transform your educational institution with Indivio's cost-effective all-in-one school management system and professional website solution. Perfect for schools, colleges, and institutes of all sizes.",
  keywords: [
    'affordable school management system',
    'school website builder',
    'education management software',
    'online school administration',
    'low-cost school software',
    'digital campus solution',
    'integrated school platform',
  ],
  openGraph: {
    title: "Indivio - Transform Your School's Digital Presence",
    description:
      'Get a professional school website and complete management system at an affordable price. Designed for Indian educational institutions.',
    images: [
      {
        url: '/indivio.png',
        width: 1200,
        height: 630,
        alt: 'Indivio School Management Platform',
      },
    ],
  },
};
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TechAdvantageSection />
      <HowItWorksSection />
      <TechStackSection />
      <GlobalCtaSection
        layout="split" // Use the new, more engaging layout
        accentText="Dive Deeper"
        heading="Explore Everything Included in Our Platform"
        subheading="See the full list of features that will transform your school's digital presence, from admissions to alumni engagement."
        buttons={[
          { text: 'View All Features', href: '/features', variant: 'primary' },
          { text: 'See Pricing', href: '/pricing', variant: 'secondary' },
        ]}
      />
    </>
  );
}
