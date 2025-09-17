// This is a temporary file for debugging purposes.

// We are not importing anything from the database to isolate the issue.
import { CheckoutWizard } from '@/components/CheckoutWizard';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  // We just log the slug and return a simple title.
  const slug = params.slug;
  console.log('generateMetadata received slug:', slug);
  return { title: `Booking Page` };
}

export default async function CheckoutPage({
  params,
}: {
  params: { slug: string };
}) {
  // We log the slug to see if it's being received.
  const slug = params.slug;
  console.log('CheckoutPage received slug:', slug);

  // We create a FAKE plan object instead of calling the database.
  const fakePlan = {
    id: slug,
    name: 'Selected Plan',
    price: 9999,
    pricePeriod: '/first year',
    description: 'A temporary plan for debugging.',
    isMostPopular: false,
    features: ['Feature 1', 'Feature 2'],
    order: 1,
  };

  // If the page loads with the fake data, the problem is with getPlanById.
  // If it still crashes, the problem is with the Next.js setup.
  return (
    <div className="min-h-screen bg-muted/30">
      <CheckoutWizard plan={fakePlan} />
    </div>
  );
}
