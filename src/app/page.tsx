// src/app/page.tsx
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { TechStackSection } from '@/components/home/TechStackSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { EducationalResourcesSection } from '@/components/home/EducationalResourcesSection';
import { SchoolShowcaseSection } from '@/components/home/SchoolShowcaseSection';

import { CtaSection } from '@/components//ui/CtaSection';
import { TechAdvantageSection } from '@/components/home/TechAdvantageSection';
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
      <SchoolShowcaseSection />
      <EducationalResourcesSection />
      <TechStackSection />
      <CtaSection
        heading="Ready to Elevate Your School's Digital Experience?"
        subheading="Join hundreds of institutions transforming their management and online presence with Indivio."
        buttons={[
          { text: 'Get Started', href: '/signup', primary: true },
          { text: 'Book a Free Demo', href: '/demo', primary: false },
        ]}
      />
    </>
  );
}
