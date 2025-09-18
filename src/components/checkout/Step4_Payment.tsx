'use client';

import { useState, useEffect, useCallback } from 'react';
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
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [iframeOpen, setIframeOpen] = useState(false);
  const router = useRouter();

  // For now, no discount
  const finalAmount = plan.price;

  // Load PhonePe checkout script once when component mounts
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ((window as any).PhonePeCheckout) {
      setScriptLoaded(true);
      return;
    }
    const existing = document.querySelector(
      'script[src="https://mercury.phonepe.com/web/bundle/checkout.js"]'
    ) as HTMLScriptElement | null;
    if (existing) {
      if ((window as any).PhonePeCheckout) setScriptLoaded(true);
      existing.addEventListener('load', () => setScriptLoaded(true));
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://mercury.phonepe.com/web/bundle/checkout.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => {
      console.error('Failed to load PhonePe checkout script');
      setPaymentError(
        'Failed to load payment gateway. Please refresh the page.'
      );
    };
    document.head.appendChild(script);
  }, []);

  const closeIframe = useCallback(() => {
    try {
      (window as any)?.PhonePeCheckout?.closePage?.();
    } catch (e) {
      // ignore
    }
    setIframeOpen(false);
    setIsLoading(false);
  }, []);

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
      // console.log('Using backend URL:', backendUrl);

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
      // console.log('Payment data received:', data);

      // Use PhonePeCheckout.transact in IFRAME mode
      if (!(window as any).PhonePeCheckout) {
        throw new Error('Payment gateway script not ready.');
      }

      const tokenUrl = data.checkoutUrl; // Assuming backend returns a URL that serves the token

      const callback = (response: 'USER_CANCEL' | 'CONCLUDED') => {
        // Close loading toast if still visible
        toast.dismiss();
        if (response === 'USER_CANCEL') {
          toast('Payment cancelled');
          closeIframe();
          return;
        }
        if (response === 'CONCLUDED') {
          toast.success('Payment completed');
          closeIframe();
          // Navigate to success page (adjust path if needed)
          router.push('/booking/success');
        }
      };

      try {
        (window as any).PhonePeCheckout.transact({
          tokenUrl,
          callback,
          type: 'IFRAME',
        });
        setIframeOpen(true);
        toast.dismiss();
        toast.success('Secure payment window opened');
      } catch (iframeErr) {
        console.error('Failed to open PhonePe IFRAME:', iframeErr);
        throw new Error('Failed to open payment window.');
      }
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
            disabled={isLoading || !scriptLoaded}
            className="flex w-full items-center justify-center gap-3 rounded-full bg-primary py-4 text-lg font-semibold text-primary-foreground disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <ShieldCheck />}
            {!scriptLoaded
              ? 'Loading payment gateway...'
              : isLoading
                ? 'Preparing payment...'
                : 'Pay Securely'}
          </button>

          {iframeOpen && (
            <div className="mt-8">
              {/* Responsive IFRAME container */}
              <div
                className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-xl border shadow-lg"
                style={{ minHeight: '640px' }}
              >
                {/* The PhonePe script injects its own iframe into DOM (likely appended to body); if it injects in place in future, keep container */}
                <button
                  onClick={closeIframe}
                  className="absolute right-3 top-3 z-10 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur hover:bg-black/80"
                >
                  Close
                </button>
                <div className="flex h-full w-full items-center justify-center p-6 text-sm text-muted-foreground">
                  Processing secure payment...
                </div>
              </div>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Complete the payment in the secure window above. Do not refresh
                the page.
              </p>
            </div>
          )}

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
