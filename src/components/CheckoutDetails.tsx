// src/components/CheckoutDetails.tsx
'use client';

import { useState } from 'react';
import { Check, ShieldCheck, Square, CheckSquare } from 'lucide-react';
import { AnimatedElement } from './ui/AnimatedElement';

// Define a type for the plan prop
type Plan = {
  name: string;
  tagline: string;
  price: number;
  features: string[];
};

// Define our available add-ons
const addOns = [
  {
    key: 'seo_pack',
    name: 'Advanced SEO Pack',
    price: 4999,
    description: 'Dedicated Next.js project for unparalleled speed and SEO.',
  },
  {
    key: 'support_pack',
    name: 'Priority Support Pack',
    price: 2999,
    description: 'Get priority access to our support team for any issues.',
  },
];

export function CheckoutDetails({ selectedPlan }: { selectedPlan: Plan }) {
  // State to track which add-ons are selected
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Add a loading state

  // Handler to toggle an add-on
  const handleAddOnToggle = (addOnKey: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnKey)
        ? prev.filter((key) => key !== addOnKey)
        : [...prev, addOnKey]
    );
  };

  // --- Price Calculations ---
  const addOnsSubtotal = addOns
    .filter((addOn) => selectedAddOns.includes(addOn.key))
    .reduce((total, addOn) => total + addOn.price, 0);

  const subtotal = selectedPlan.price + addOnsSubtotal;
  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;

  // --- Payment Handler (Corrected) ---
  const handlePayment = async () => {
    setIsLoading(true); // Disable the button to prevent multiple clicks

    const orderDetails = {
      plan: selectedPlan,
      addOns: addOns.filter((addOn) => selectedAddOns.includes(addOn.key)),
      totalAmount: grandTotal, // The final calculated amount with GST
    };

    try {
      // Call our OWN secure API route, not PhonePe directly
      const response = await fetch('/api/phonepe-pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API error (${response.status}):`, errorText);
        throw new Error(
          `Payment API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      if (data.redirectUrl) {
        // If we get a redirect URL, send the user to the PhonePe payment page
        console.log('Redirecting to payment page:', data.redirectUrl);
        window.location.href = data.redirectUrl;
      } else {
        console.error('Failed to get redirect URL:', data.error);
        alert(
          `Could not initiate payment: ${data.error || 'Unknown error'}\n${data.details || ''}`
        );
      }
    } catch (error) {
      console.error('Error during payment initiation:', error);
      alert(
        `Payment initiation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    } finally {
      setIsLoading(false); // Re-enable the button
    }
  };

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-5">
      {/* Left Column: Plan Details & Add-ons */}
      <AnimatedElement
        delay={0.1}
        className="space-y-8 rounded-2xl border bg-card p-8 lg:col-span-3"
      >
        <div>
          <h2 className="font-display text-3xl font-bold text-primary">
            {selectedPlan.name} Plan
          </h2>
          <p className="mt-2 text-muted-foreground">{selectedPlan.tagline}</p>
          <hr className="my-6 border-border" />
          <ul className="space-y-4">
            {selectedPlan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                <span className="text-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-2xl font-bold text-foreground">
            Optional Add-ons
          </h3>
          <p className="mt-2 text-muted-foreground">
            Enhance your plan with these powerful additions.
          </p>
          <div className="mt-4 space-y-4">
            {addOns.map((addOn) => (
              <div
                key={addOn.key}
                onClick={() => handleAddOnToggle(addOn.key)}
                className="flex cursor-pointer items-start gap-4 rounded-lg border border-border p-4 transition hover:border-primary"
              >
                {selectedAddOns.includes(addOn.key) ? (
                  <CheckSquare className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                ) : (
                  <Square className="mt-1 h-6 w-6 flex-shrink-0 text-muted-foreground" />
                )}
                <div>
                  <h4 className="font-semibold text-foreground">
                    {addOn.name} (+₹{addOn.price.toLocaleString('en-IN')})
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {addOn.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedElement>

      {/* Right Column: Order Summary */}
      <AnimatedElement
        delay={0.2}
        className="h-fit rounded-2xl border bg-card p-8 lg:col-span-2"
      >
        <h3 className="font-display text-2xl font-bold text-foreground">
          Order Summary
        </h3>
        <div className="mt-6 space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Plan Subtotal:</span>
            <span className="font-semibold text-foreground">
              ₹{selectedPlan.price.toLocaleString('en-IN')}
            </span>
          </div>
          {selectedAddOns.length > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Add-ons:</span>
              <span className="font-semibold text-foreground">
                ₹{addOnsSubtotal.toLocaleString('en-IN')}
              </span>
            </div>
          )}
          <hr className="border-border" />
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal:</span>
            <span className="font-semibold text-foreground">
              ₹{subtotal.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">GST (18%):</span>
            <span className="font-semibold text-foreground">
              ₹
              {gst.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <hr className="border-border" />
          <div className="flex justify-between text-xl">
            <span className="font-bold text-foreground">Grand Total:</span>
            <span className="font-bold text-primary">
              ₹
              {grandTotal.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>

        {/* We use a simple button here instead of the Link-based Button component */}
        <button
          onClick={handlePayment}
          disabled={isLoading} // Disable button when loading
          className="mt-8 w-full transform rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Proceed to Payment'}
        </button>

        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-green-500" />
          <span>Secure SSL Encrypted Payment</span>
        </div>
      </AnimatedElement>
    </div>
  );
}
