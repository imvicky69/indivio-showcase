'use client';

import { useState } from 'react';
import { Plan } from '@/lib/plans';
import { WizardFormData } from '../CheckoutWizard';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Step4Props {
  plan: Plan;
  formData: WizardFormData;
}

export function Step4_Payment({ plan, formData }: Step4Props) {
  const [isLoading, setIsLoading] = useState(false);

  const finalAmount = plan.price; // Add your discount logic here

  const handlePayment = async () => {
    setIsLoading(true);
    toast.loading('Initializing payment...');

    try {
      // Create a more complete payment payload
      const paymentData = {
        amount: finalAmount,
        userId: formData.accountDetails?.email || 'guest',
        planId: plan.id,
        planName: plan.name,
      };

      console.log('Payment initiation payload:', paymentData);

      // 1. Call our backend to initiate the payment
      const response = await fetch(
        'https://us-central1-indivio-in.cloudfunctions.net/api/payment/initiate',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(paymentData),
        }
      );

      // Log the raw response for debugging
      console.log('Payment API response status:', response.status);

      // Handle non-JSON responses
      const responseText = await response.text();
      console.log('Payment API response body:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response as JSON:', e);
        throw new Error('Invalid response format from payment server');
      }

      if (!response.ok) {
        throw new Error(data.message || `Server error: ${response.status}`);
      }

      if (!data.checkoutUrl) {
        throw new Error('Payment initiated but no checkout URL was provided');
      }

      console.log(
        'Payment successfully initiated, redirecting to:',
        data.checkoutUrl
      );

      // 2. Redirect the user to the checkout page
      window.location.href = data.checkoutUrl;
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
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-3 rounded-full bg-primary py-4 text-lg font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" /> Initializing...
              </>
            ) : (
              'Pay Now'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
