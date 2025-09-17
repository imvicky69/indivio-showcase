'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense, useCallback } from 'react';
import Link from 'next/link';
import { Check, AlertTriangle, X, Loader2 } from 'lucide-react';

const MAX_RETRIES = 5;
const RETRY_INTERVAL = 2000; // 2 seconds

// Create a client component that uses useSearchParams
function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<
    'success' | 'failure' | 'pending' | 'loading'
  >('loading');
  const [retryCount, setRetryCount] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const orderId = searchParams.get('orderId'); // <-- FIX: Read 'orderId'

  const checkPaymentStatus = useCallback(async () => {
    if (!orderId) {
      console.error('Error: orderId not found in URL');
      setStatus('failure');
      return;
    }

    setIsChecking(true);
    try {
      // <-- FIX: Use the correct external API endpoint
      const response = await fetch(
        `https://us-central1-indivio-in.cloudfunctions.net/api/payment/status/${orderId}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Payment verification failed');
      }

      if (data.status === 'SUCCESS') {
        setStatus('success');
      } else if (data.status === 'FAILURE') {
        setStatus('failure');
      } else {
        // If still pending, we might retry
        setStatus('pending');
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      setStatus('failure');
    } finally {
      setIsChecking(false);
    }
  }, [orderId]);

  useEffect(() => {
    // Initial check
    checkPaymentStatus();
  }, [checkPaymentStatus]);

  useEffect(() => {
    // Retry logic
    if (status === 'pending' && retryCount < MAX_RETRIES) {
      const timer = setTimeout(() => {
        setRetryCount((prev) => prev + 1);
        checkPaymentStatus();
      }, RETRY_INTERVAL);
      return () => clearTimeout(timer);
    }
  }, [status, retryCount, checkPaymentStatus]);

  const handleManualCheck = () => {
    setRetryCount(0); // Reset retries
    checkPaymentStatus();
  };

  const renderPendingContent = () => (
    <div className="text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
        <AlertTriangle className="h-12 w-12 text-yellow-600" />
      </div>
      <h1 className="mt-6 font-display text-3xl font-bold">Payment Pending</h1>
      <p className="mt-4 text-muted-foreground">
        Your payment is being processed. This might take a few minutes.
      </p>
      <div className="mt-8">
        {isChecking ? (
          <button
            disabled
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-primary/80 px-8 py-3 font-semibold text-primary-foreground"
          >
            <Loader2 className="animate-spin" /> Checking...
          </button>
        ) : (
          <button
            onClick={handleManualCheck}
            className="w-full rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground"
          >
            Check Status Again
          </button>
        )}
      </div>
    </div>
  );

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-secondary py-20 text-secondary-foreground">
      <div className="container mx-auto max-w-2xl px-6">
        <div className="rounded-2xl border bg-card p-10 shadow-lg">
          {status === 'loading' && (
            <div className="text-center">
              <Loader2 className="mx-auto h-16 w-16 animate-spin text-primary" />
              <h1 className="mt-6 font-display text-3xl font-bold">
                Verifying Payment...
              </h1>
              <p className="mt-4 text-muted-foreground">
                Please wait while we confirm your transaction.
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
                <p className="text-muted-foreground">Order ID: {orderId}</p>
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

          {status === 'pending' && renderPendingContent()}

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
