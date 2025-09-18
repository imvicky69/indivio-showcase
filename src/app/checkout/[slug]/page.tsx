import { CheckoutWizard } from '@/components/checkout/CheckoutWizard';
import { getPlanById } from '@/lib/plans';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const plan = await getPlanById(slug);

  return {
    title: plan ? `Checkout - ${plan.name} | Indivio` : 'Plan Not Found',
    description:
      plan?.description || 'School management system for modern institutions',
  };
}

export default async function CheckoutPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const plan = await getPlanById(slug);

  // If plan not found, show 404 page
  if (!plan) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <CheckoutWizard plan={plan} />
    </div>
  );
}
