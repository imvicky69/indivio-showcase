// src/app/features/page.tsx
import type { Metadata } from 'next';
import { PlatformBenefits } from '@/components/PlatformBenefits';
import { FutureReady } from '@/components/FutureReady';
import { FinalCta } from '@/components/FinalCta';
import { FeaturesHero } from '@/components/FeaturesHero'; // <-- Import the new component
import { IncludedFeatures } from '@/components/IncludedFeatures'; // <-- Import the real component
export const metadata: Metadata = {
  title: 'Modern School Website Features & Management Platform | Indivio',
  description: "Discover Indivio's features. From dynamic toppers grids to easy content management, attract more admissions with a fast, secure, and affordable online presence.",
};

// Define placeholder component for the remaining section
// (Removed local FinalCta declaration to resolve import conflict)


export default function FeaturesPage() {
  return (
    <>
      <FeaturesHero /> {/* <-- Use the real component here */}
      <IncludedFeatures />
      <PlatformBenefits />
      <FutureReady />
      <FinalCta />
    </>
  );
} 