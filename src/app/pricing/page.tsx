import type { Metadata } from 'next';
import { getPricingPlans, getOffers } from '@/lib/plans';
import { PricingSection } from '@/components/PricingSection';
import { OffersSection } from '@/components/OffersSection';
import { CtaSection } from '@/components/CtaSection';

export const metadata: Metadata = {
  title: 'Affordable School Management Pricing Plans',
  description:
    'Find the perfect budget-friendly plan for your educational institution with our transparent pricing. All plans include hosting, security, support, and no hidden fees.',
  keywords: [
    'school management software pricing',
    'affordable school ERP cost',
    'education software plans',
    'school website pricing plans',
    'budget-friendly school platform',
    'school management system packages',
    'education SaaS pricing',
  ],
  openGraph: {
    title: 'Affordable School Management & Website Solution Pricing',
    description:
      'Compare our budget-friendly school management system plans designed for educational institutions of all sizes. Transparent pricing with no hidden costs.',
    images: [
      {
        url: '/pricing-plans.png',
        width: 1200,
        height: 630,
        alt: 'Indivio Pricing Plans',
      },
    ],
  },
};

export default async function PricingPage() {
  // Fetch data on the server
  const plans = await getPricingPlans();
  const offers = await getOffers();

  return (
    <>
      <PricingSection plans={plans} />
      <OffersSection offers={offers} />
      <CtaSection />
    </>
  );
}
