'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Plan } from '@/lib/plans';
import { WizardFormData } from '@/components/checkout/CheckoutWizard';
import { Loader2, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

interface Step4Props {
  plan: Plan;
  formData: WizardFormData;
}

type PhonePeCheckoutType = {
  transact: (opts: {
    tokenUrl: string;
    callback: (response: 'USER_CANCEL' | 'CONCLUDED') => void;
    type: 'IFRAME' | 'REDIRECT';
  }) => void;
  closePage?: () => void;
};

type WindowWithPhonePe = Window & { PhonePeCheckout?: PhonePeCheckoutType };

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
    const w = window as WindowWithPhonePe;
    if (w.PhonePeCheckout) {
      setScriptLoaded(true);
      return;
    }
    const existing = document.querySelector(
      'script[src="https://mercury.phonepe.com/web/bundle/checkout.js"]'
    ) as HTMLScriptElement | null;
    if (existing) {
      if ((window as WindowWithPhonePe).PhonePeCheckout) setScriptLoaded(true);
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
      const phonePe = (window as WindowWithPhonePe).PhonePeCheckout;
      phonePe?.closePage?.();
    } catch {
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

      const data: {
        success: boolean;
        checkoutUrl?: string;
        orderId?: string;
        order_id?: string;
        referenceId?: string;
        details?: string;
      } = await response.json();
      if (!data.success || !data.checkoutUrl) {
        throw new Error(data.details || 'Failed to start payment.');
      }

      // Try to extract an order ID from the response body or the checkout URL
      let orderId: string | null =
        data.orderId || data.order_id || data.referenceId || null;
      if (!orderId && data.checkoutUrl) {
        try {
          const parsed = new URL(data.checkoutUrl);
          const keys = [
            'orderId',
            'order_id',
            'merchantOrderId',
            'referenceId',
            'orderid',
          ];
          for (const k of keys) {
            const v = parsed.searchParams.get(k);
            if (v) {
              orderId = v;
              break;
            }
          }
        } catch (e) {
          // ignore URL parse errors
        }
      }

      // Persist orderId alongside booking data so the success page can verify
      if (orderId) {
        try {
          sessionStorage.setItem('indivioOrderId', orderId);
        } catch (e) {
          // ignore storage errors
        }
      }

      toast.dismiss();
      // console.log('Payment data received:', data);

      // Use PhonePeCheckout.transact in IFRAME mode
      const phonePe = (window as WindowWithPhonePe).PhonePeCheckout;
      if (!phonePe) {
        throw new Error('Payment gateway script not ready.');
      }

      const tokenUrl = data.checkoutUrl as string; // Assuming backend returns a URL that serves the token

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
          // Navigate to success page with orderId so the server can verify
          const savedOrderId =
            typeof window !== 'undefined'
              ? sessionStorage.getItem('indivioOrderId')
              : null;
          const navigateOrderId = orderId || savedOrderId;
          if (navigateOrderId) {
            router.push(
              `/success?orderId=${encodeURIComponent(navigateOrderId)}`
            );
          } else {
            // Fallback: go to a generic success landing if no order id is available
            router.push('/success');
          }
        }
      };

      try {
        // Set iframe open state before transact call to prepare the container
        setIframeOpen(true);

        // Allow DOM to update with our container before PhonePe injects its iframe
        setTimeout(() => {
          phonePe.transact({
            tokenUrl,
            callback,
            type: 'IFRAME',
          });
          toast.dismiss();
          toast.success('Secure payment window opened');
        }, 100);
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
            <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-white">
              {/* Full screen container for PhonePe iframe */}
              <div className="flex h-12 items-center justify-end bg-primary px-4">
                <button
                  onClick={closeIframe}
                  className="rounded-full bg-white/20 px-4 py-1 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/30"
                >
                  Close Payment
                </button>
              </div>

              {/* PhonePe script injects its iframe here, we provide full viewport space */}
              <div
                id="phonepe-payment-container"
                className="flex flex-1 items-center justify-center"
              >
                <div className="text-center text-sm text-muted-foreground">
                  <div className="mb-2 animate-spin text-primary">
                    <Loader2 size={24} />
                  </div>
                  Loading secure payment gateway...
                </div>
              </div>

              <p className="fixed bottom-2 left-0 right-0 text-center text-xs text-muted-foreground">
                Complete the payment in the secure window. Do not refresh the
                page.
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
