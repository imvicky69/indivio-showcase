'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

function PaymentSimulatorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(5);
  const [paymentStatus, setPaymentStatus] = useState<
    'processing' | 'success' | 'failed'
  >('processing');

  // Extract order details from URL query params
  const orderId = searchParams.get('orderId') || 'UNKNOWN';
  const amount = searchParams.get('amount') || '0';

  useEffect(() => {
    // Simulate payment processing for 3 seconds
    const processingTimer = setTimeout(() => {
      // 90% chance of success in this simulation
      const isSuccess = Math.random() < 0.9;
      setPaymentStatus(isSuccess ? 'success' : 'failed');
    }, 3000);

    return () => clearTimeout(processingTimer);
  }, []);

  // Start countdown after payment status is determined
  useEffect(() => {
    if (paymentStatus === 'processing') return;

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          // Redirect to appropriate page
          if (paymentStatus === 'success') {
            router.push(`/payment-status?orderId=${orderId}&status=SUCCESS`);
          } else {
            router.push(`/payment-status?orderId=${orderId}&status=FAILED`);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [paymentStatus, router, orderId]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Payment Simulator
          </h1>
          <p className="mb-6 text-sm text-gray-500">
            This is a simulation of a payment gateway interface
          </p>

          {paymentStatus === 'processing' && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
              <p className="text-lg">Processing your payment...</p>
              <p className="text-sm text-gray-500">Order ID: {orderId}</p>
              <p className="text-sm text-gray-500">
                Amount: ₹{parseInt(amount).toLocaleString('en-IN')}
              </p>
            </div>
          )}

          {paymentStatus === 'success' && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
              <p className="text-lg font-medium text-green-600">
                Payment Successful!
              </p>
              <p className="text-sm text-gray-500">
                Redirecting in {countdown} seconds...
              </p>
            </div>
          )}

          {paymentStatus === 'failed' && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <AlertCircle className="h-16 w-16 text-red-500" />
              <p className="text-lg font-medium text-red-600">Payment Failed</p>
              <p className="text-sm text-gray-500">
                Redirecting in {countdown} seconds...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Export the main page component with Suspense boundary
export default function PaymentSimulatorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
          <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
            <Loader2 className="mx-auto h-16 w-16 animate-spin text-primary" />
            <p className="mt-4 text-lg">Loading...</p>
          </div>
        </div>
      }
    >
      <PaymentSimulatorContent />
    </Suspense>
  );
}
