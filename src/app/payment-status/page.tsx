'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { Check, AlertTriangle, X, Loader2 } from 'lucide-react';

// Create a client component that uses useSearchParams
function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<
    'success' | 'failure' | 'pending' | 'loading'
  >('loading');
  const transactionId = searchParams.get('transactionId');

  useEffect(() => {
    // For mock payments (development/testing)
    const mockPayment = searchParams.get('mockPayment') === 'true';
    const urlStatus = searchParams.get('status');

    if (mockPayment) {
      if (urlStatus === 'SUCCESS') {
        setStatus('success');
      } else if (urlStatus === 'FAILURE') {
        setStatus('failure');
      } else {
        setStatus('pending');
      }
      return;
    }

    // For real payments, check with backend
    // This part would query your backend to verify the payment
    async function checkPaymentStatus() {
      try {
        const response = await fetch(
          `/api/check-payment?transactionId=${transactionId}`
        );
        const data = await response.json();

        if (data.status === 'SUCCESS') {
          setStatus('success');
        } else if (data.status === 'FAILURE') {
          setStatus('failure');
        } else {
          setStatus('pending');
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        // For demo purposes, set as success if verification failed
        // In production, you would handle this differently
        setStatus(mockPayment ? 'success' : 'pending');
      }
    }

    // Always check the payment status with our backend
    const timer = setTimeout(() => {
      checkPaymentStatus();
    }, 1500);

    return () => clearTimeout(timer);
  }, [searchParams, transactionId]);

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-secondary py-20 text-secondary-foreground">
      <div className="container mx-auto max-w-2xl px-6">
        <div className="rounded-2xl border bg-card p-10 shadow-lg">
          {status === 'loading' && (
            <div className="text-center">
              <Loader2 className="mx-auto h-16 w-16 animate-spin text-primary" />
              <h1 className="mt-6 font-display text-3xl font-bold">
                Processing Payment...
              </h1>
              <p className="mt-4 text-muted-foreground">
                Please wait while we verify your payment.
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <Check className="h-12 w-12 text-green-600" />
              </div>
              <h1 className="mt-6 font-display text-3xl font-bold">
                Payment Successful!
              </h1>
              <p className="mt-4 text-muted-foreground">
                Your payment was processed successfully. We&apos;ve sent a
                confirmation email with details.
              </p>
              <div className="mt-8 rounded-lg bg-muted/30 p-4">
                <p className="text-muted-foreground">
                  Transaction ID: {transactionId}
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/dashboard"
                  className="rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
          )}

          {status === 'failure' && (
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                <X className="h-12 w-12 text-red-600" />
              </div>
              <h1 className="mt-6 font-display text-3xl font-bold">
                Payment Failed
              </h1>
              <p className="mt-4 text-muted-foreground">
                Your payment couldn&apos;t be processed. Please try again or
                contact our support.
              </p>
              <div className="mt-8">
                <Link
                  href="/pricing"
                  className="rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground"
                >
                  Try Again
                </Link>
              </div>
            </div>
          )}

          {status === 'pending' && (
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
                <AlertTriangle className="h-12 w-12 text-yellow-600" />
              </div>
              <h1 className="mt-6 font-display text-3xl font-bold">
                Payment Pending
              </h1>
              <p className="mt-4 text-muted-foreground">
                Your payment is being processed. This might take a few minutes.
              </p>
              <div className="mt-8">
                <Link
                  href="/dashboard"
                  className="rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground"
                >
                  Check Status Later
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Export the main page component with Suspense boundary
export default function PaymentStatusPage() {
  return (
    <Suspense
      fallback={
        <section className="flex min-h-screen flex-col items-center justify-center bg-secondary py-20 text-secondary-foreground">
          <div className="container mx-auto max-w-2xl px-6">
            <div className="rounded-2xl border bg-card p-10 text-center shadow-lg">
              <Loader2 className="mx-auto h-16 w-16 animate-spin text-primary" />
              <h1 className="mt-6 font-display text-3xl font-bold">
                Loading...
              </h1>
            </div>
          </div>
        </section>
      }
    >
      <PaymentStatusContent />
    </Suspense>
  );
}
