// src/app/features/page.tsx
import type { Metadata } from 'next';
import { PlatformBenefits } from '@/components//features/PlatformBenefits';
import { FutureReady } from '@/components/features/FutureReady';
import { CtaSection } from '@/components/ui/CtaSection';
import { FeaturesHero } from '@/components/features/FeaturesHero'; // <-- Import the new component
import { IncludedFeatures } from '@/components/features/IncludedFeatures'; // <-- Import the real component
export const metadata: Metadata = {
  title: 'Indivio :Modern School Website Features & Management Platform ',
  description: "Discover Indivio's features. From dynamic toppers grids to easy content management, attract more admissions with a fast, secure, and affordable online presence.",
};

const featuresCtaProps = {
  heading: 'Experience the Indivio Advantage Today!',
  subheading: 'Join us in transforming education with our innovative solutions.',
  buttons: [
    { text: 'Get Started', href: '/signup', primary: true },
    { text: 'Book a Free Demo', href: '/demo', primary: false },
  ],
};

export default function FeaturesPage() {
  return (
    <>
      <FeaturesHero /> {/* <-- Use the real component here */}
      <IncludedFeatures />
      <PlatformBenefits />
      <FutureReady />
      <CtaSection {...featuresCtaProps} />
    </>
  );
} 