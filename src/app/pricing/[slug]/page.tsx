import { getPlanById } from '@/lib/plans';
import { notFound } from 'next/navigation';
import { CheckoutWizard } from '@/components/CheckoutWizard';

/**
 * Generates the page title dynamically.
 * THE FIX: We destructure `slug` directly from `params`.
 */
export async function generateMetadata({ params: { slug } }: { params: { slug: string } }) {
  const plan = await getPlanById(slug);
  return { title: `Booking: ${plan?.name || 'Complete Your Order'} | Indivio` };
}

/**
 * The main page component for the checkout process.
 */
export default async function CheckoutPage({ params: { slug } }: { params: { slug: string } }) {
  // THE FIX: We use the destructured `slug` variable directly.
  const plan = await getPlanById(slug);

  // If no plan is found for the given slug, show a 404 page.
  if (!plan) {
    notFound();
  }

  return (
    <div className="bg-muted/30 min-h-screen">
      <CheckoutWizard plan={plan} />
    </div>
  );
}