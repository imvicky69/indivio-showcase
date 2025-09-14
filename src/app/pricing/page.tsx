// src/app/pricing/page.tsx
import type { Metadata } from 'next';
import { PricingHero } from '@/components/PricingHero';
import { PricingPlans as ImportedPricingPlans } from '@/components/PricingPlans';
import { ValueSection } from '@/components/ValueSection';
import { FaqSection } from '@/components/FaqSection';
import { FinalCta } from '@/components/FinalCta';

// Step 1: Set the SEO metadata for the pricing page
export const metadata: Metadata = {
  title: 'Pricing & Plans | Affordable School Website Packages | Indivio',
  description:
    "Simple, transparent pricing for every school. Explore our plans to find the perfect fit for your institution's website and management needs. No hidden fees.",
};
// pricingCtaProps removed (not used) — keep the FinalCta component instead
// Step 3: Assemble the page with the section placeholders
export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <ImportedPricingPlans />
      <ValueSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}
