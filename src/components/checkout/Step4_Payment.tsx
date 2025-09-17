'use client'; // <-- THIS IS THE CRUCIAL FIX

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plan } from '@/lib/plans';
import { WizardFormData } from '../CheckoutWizard';
import { Loader2, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

declare global {
  interface Window {
    PhonePeCheckout: any;
  }
}

interface Step4Props {
  plan: Plan;
  formData: WizardFormData;
}

export function Step4_Payment({ plan, formData }: Step4Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  let finalAmount = plan.price; // Add your discount logic here

  const handlePayment = async () => {
    setIsLoading(true);
    toast.loading('Initializing secure payment...');

    if (typeof window.PhonePeCheckout !== 'object' || !window.PhonePeCheckout.transact) {
      toast.dismiss();
      toast.error('Payment SDK not loaded. Please refresh and try again.');
      setIsLoading(false);
      return;
    }

    try {
      // Save data to sessionStorage before payment
      sessionStorage.setItem('indivioBookingData', JSON.stringify({ plan, formData }));

      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
      
      const response = await fetch(`${backendUrl}/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalAmount,
          userId: formData.accountDetails?.email,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.details || 'Failed to start payment.');
      }
      
      toast.dismiss();

      window.PhonePeCheckout.transact({
        tokenUrl: data.checkoutUrl,
        type: "IFRAME",
        callback: function(response: any) {
          setIsLoading(false); // Stop loading when iFrame closes
          if (response === 'CONCLUDED') {
            // Redirect to the success page for server-side verification
            router.push(`/booking/success?orderId=${data.orderId}`);
          } else { // Handles USER_CANCEL
            toast.error("Payment was cancelled.");
          }
        }
      });

    } catch (error: any) {
      toast.dismiss();
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border">
      <div className="p-8">
        <h2 className="text-2xl font-bold font-display text-primary">Complete Your Payment</h2>
        <div className="mt-8 space-y-4 bg-muted/50 p-6 rounded-lg">
          <div className="flex justify-between items-center text-2xl font-bold text-primary">
            <span>Total Amount:</span>
            <span>₹{finalAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>
        <div className="mt-8">
          <button onClick={handlePayment} disabled={isLoading} className="w-full flex items-center justify-center gap-3 bg-primary text-primary-foreground font-semibold py-4 rounded-full text-lg disabled:opacity-70">
            {isLoading ? <Loader2 className="animate-spin" /> : <ShieldCheck />}
            {isLoading ? 'Redirecting to PhonePe...' : 'Pay with PhonePe'}
          </button>
        </div>
      </div>
    </div>
  );
}