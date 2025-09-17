import type { Metadata } from 'next';
import { getPricingPlans, getOffers } from '@/lib/plans';
import { PricingSection } from '@/components/PricingSection';
import { OffersSection } from '@/components/OffersSection';
import { CtaSection } from '@/components/CtaSection';

export const metadata: Metadata = {
  title: 'Pricing Plans | Indivio',
  description: 'Find the perfect plan for your school with our clear and simple pricing. All plans include hosting, security, and support.',
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