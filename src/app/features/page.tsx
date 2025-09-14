// src/app/features/page.tsx
import type { Metadata } from 'next';
import { FeaturesHero } from '@/components/FeaturesHero'; // <-- Import the new component

export const metadata: Metadata = {
  title: 'Modern School Website Features & Management Platform | Indivio',
  description: "Discover Indivio's features. From dynamic toppers grids to easy content management, attract more admissions with a fast, secure, and affordable online presence.",
};

// Define placeholder components for the remaining sections
const IncludedFeatures = () => <div className="py-20 bg-white flex items-center justify-center">Included Features Section</div>;
const PlatformBenefits = () => <div className="py-20 bg-gray-100 flex items-center justify-center">Platform Benefits Section</div>;
const FutureReady = () => <div className="py-20 bg-white flex items-center justify-center">Future-Ready Section</div>;
const FinalCta = () => <div className="py-20 bg-gray-100 flex items-center justify-center">Final CTA Section</div>;


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