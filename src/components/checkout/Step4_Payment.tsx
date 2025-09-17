'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plan } from '@/lib/plans';
import { WizardFormData } from '../CheckoutWizard';
import { Loader2, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

interface Step4Props {
  plan: Plan;
  formData: WizardFormData;
}

export function Step4_Payment({ plan, formData }: Step4Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const router = useRouter();

  // For now, no discount
  const finalAmount = plan.price;

  const handlePayment = async () => {
    setIsLoading(true);
    toast.loading('Initializing secure payment...');

    try {
      // Save booking info locally (so we can restore after redirect)
      sessionStorage.setItem(
        'indivioBookingData',
        JSON.stringify({ plan, formData })
      );

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
      console.log('Using backend URL:', backendUrl);

      const response = await fetch(`${backendUrl}/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalAmount,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Payment initialization failed (${response.status}): ${errorText}`
        );
      }

      const data: { success: boolean; checkoutUrl?: string; details?: string } =
        await response.json();
      if (!data.success || !data.checkoutUrl) {
        throw new Error(data.details || 'Failed to start payment.');
      }

      toast.dismiss();
      console.log('Payment data received:', data);

      // 🔑 Redirect user directly to PhonePe hosted checkout page
      window.open(data.checkoutUrl, '_blank');
    } catch (error) {
      toast.dismiss();
      console.error('Payment error:', error);
      let errorMsg = 'Payment initialization failed';
      if (error instanceof Error) {
        errorMsg = error.message;
      }
      toast.error(errorMsg);
      setPaymentError(
        errorMsg || 'Could not connect to payment gateway. Please try again.'
      );
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
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-3 rounded-full bg-primary py-4 text-lg font-semibold text-primary-foreground disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <ShieldCheck />}
            {isLoading ? 'Redirecting to payment...' : 'Pay Securely'}
          </button>

          {paymentError && (
            <p className="mt-4 text-center text-sm text-red-500">
              {paymentError}
            </p>
          )}

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Secured by PhonePe Payment Gateway
          </p>
        </div>
      </div>
    </div>
  );
}
