'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useEffect, useState, Suspense } from 'react';

function BookingSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');

  const [status, setStatus] = useState('LOADING'); // LOADING, SUCCESS, FAILED
  const [orderAmount, setOrderAmount] = useState(0);

  useEffect(() => {
    if (orderId) {
      fetch(`/api/get-order-status?order_id=${orderId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.status.order_status === 'PAID') {
            setStatus('SUCCESS');
            setOrderAmount(data.status.order_amount);
            // Here you would also trigger your final user creation and booking save logic
          } else {
            setStatus('FAILED');
          }
        })
        .catch(() => setStatus('FAILED'));
    } else {
      setStatus('FAILED');
    }
  }, [orderId]);

  if (status === 'LOADING') {
    return (
      <div className="container mx-auto py-24 text-center">
        <Loader2 className="mx-auto h-24 w-24 animate-spin text-primary" />
        <h1 className="mt-8 text-4xl font-bold">Verifying your payment...</h1>
      </div>
    );
  }

  if (status === 'FAILED') {
    return (
      <div className="container mx-auto py-24 text-center">
        <XCircle className="mx-auto h-24 w-24 text-red-500" />
        <h1 className="mt-8 text-4xl font-bold">Payment Failed</h1>
        <p className="mt-4 text-lg">
          There was an issue with your payment. Please try again or contact
          support.
        </p>
        <Link
          href="/pricing"
          className="mt-10 inline-block rounded-full bg-primary px-8 py-3 text-primary-foreground"
        >
          Try Again
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-24 text-center">
      <CheckCircle className="mx-auto h-24 w-24 text-green-500" />
      <h1 className="mt-8 text-4xl font-bold">Booking Confirmed!</h1>
      <p className="mt-4 text-lg">
        Thank you for your payment of ₹{orderAmount}. Your booking is complete.
      </p>
      {/* Add Next Steps info here */}
      <Link
        href="/"
        className="mt-10 inline-block rounded-full bg-primary px-8 py-3 text-primary-foreground"
      >
        Back to Home
      </Link>
    </div>
  );
}

// Export the main page component with Suspense boundary
export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto py-24 text-center">
          <Loader2 className="mx-auto h-24 w-24 animate-spin text-primary" />
          <h1 className="mt-8 text-4xl font-bold">Loading...</h1>
        </div>
      }
    >
      <BookingSuccessContent />
    </Suspense>
  );
}
