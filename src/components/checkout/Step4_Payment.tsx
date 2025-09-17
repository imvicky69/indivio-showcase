'use client';

import { useState } from 'react';
import { useSdkReady } from '@/context/SdkReadyContext'; // <-- Import the hook
import { Plan } from '@/lib/plans';
import { WizardFormData } from '../CheckoutWizard';
import { Loader2, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

// This declares the 'Cashfree' object on the window for TypeScript
declare global {
  interface Window {
    Cashfree: {
      drop: (options: {
        orderToken: string;
        components: string[];
        onSuccess: (data: unknown) => void;
        onFailure: (error: unknown) => void;
      }) => void;
      checkout: (options: { paymentSessionId: string }) => void;
      new (environment: 'PROD' | 'SANDBOX'): {
        checkout: (options: { paymentSessionId: string }) => void;
      };
    };
  }
}

interface Step4Props {
  plan: Plan;
  formData: WizardFormData;
}

export function Step4_Payment({ plan, formData }: Step4Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { isSdkReady } = useSdkReady(); // <-- Use the context

  const finalAmount = plan.price; // Add your discount logic here

  const handlePayment = async () => {
    setIsLoading(true);
    toast.loading('Initializing secure payment...');

    if (typeof window.Cashfree !== 'function') {
      toast.dismiss();
      toast.error('Payment SDK not loaded. Please refresh and try again.');
      setIsLoading(false);
      return;
    }

    try {
      // 1. Call our backend to create the order
      const response = await fetch('/api/create-cashfree-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: finalAmount, plan, formData }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.message);

      const { paymentSessionId } = data;

      // 2. Initialize and launch the Cashfree checkout modal
      const cashfree = new window.Cashfree(
        process.env.NEXT_PUBLIC_CASHFREE_ENVIRONMENT === 'PROD'
          ? 'PROD'
          : 'SANDBOX'
      );
      toast.dismiss();

      cashfree.checkout({ paymentSessionId });
    } catch (error) {
      toast.dismiss();
      const errMsg =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred.';
      toast.error(errMsg);
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border bg-white shadow-lg">
      <div className="p-8">
        <h2 className="font-display text-2xl font-bold text-primary">
          Complete Your Payment
        </h2>
        <div className="mt-8 space-y-4 rounded-lg bg-muted/50 p-6">
          <div className="flex items-center justify-between text-2xl font-bold text-primary">
            <span>Total Amount:</span>
            <span>₹{finalAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>
        <div className="mt-8">
          <button
            onClick={handlePayment}
            // --- THE FIX ---
            // Disable the button if the SDK isn't ready OR if we are already loading
            disabled={!isSdkReady || isLoading}
            className="flex w-full items-center justify-center gap-3 rounded-full bg-primary py-4 text-lg font-semibold text-primary-foreground"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" /> Initializing...
              </>
            ) : !isSdkReady ? (
              'Loading Payment Options...'
            ) : (
              <>
                <ShieldCheck /> Pay with Cashfree
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
