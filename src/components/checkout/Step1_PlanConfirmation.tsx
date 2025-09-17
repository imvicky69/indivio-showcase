'use client';

import { useState, useEffect } from 'react';
import { Plan, Offer, getOffers } from '@/lib/plans';
import { Check, TicketPercent, XCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface Step1Props {
  plan: Plan;
  onDiscountApply: (offer: Offer | null) => void;
}

export function Step1_PlanConfirmation({ plan, onDiscountApply }: Step1Props) {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedOffer, setAppliedOffer] = useState<Offer | null>(null);

  // Fetch available offers when the component mounts
  useEffect(() => {
    const fetchOffers = async () => {
      const availableOffers = await getOffers();
      setOffers(availableOffers);
    };
    fetchOffers();
  }, []);

  const handleApplyCode = () => {
    if (!discountCode) return;

    const validOffer = offers.find(offer => offer.code.toLowerCase() === discountCode.toLowerCase());

    if (validOffer) {
      toast.success(`Success! "${validOffer.code}" applied.`);
      setAppliedOffer(validOffer);
      onDiscountApply(validOffer);
    } else {
      toast.error('This discount code is not valid.');
      setAppliedOffer(null);
      onDiscountApply(null);
    }
  };

  const handleRemoveCode = () => {
    setAppliedOffer(null);
    setDiscountCode('');
    onDiscountApply(null);
    toast.success('Discount code removed.');
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-8">
        <h2 className="text-2xl font-bold font-display text-primary">Confirm Your Plan</h2>
        <p className="text-muted-foreground mt-1">Review your selection before we proceed.</p>
        
        <div className="mt-8 bg-muted/50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
            <p className="text-muted-foreground mt-1">{plan.description}</p>
            <div className="mt-4">
                <span className="text-4xl font-bold text-foreground">
                  ₹{plan.price.toLocaleString('en-IN')}
                </span>
                <span className="text-muted-foreground font-medium">{plan.pricePeriod}</span>
            </div>
        </div>

        <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4">Key features included:</h4>
            <ul className="space-y-3">
              {plan.features.slice(0, 5).map((feature) => ( // Show first 5 features
                <li key={feature} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
        </div>
      </div>
      
      {/* Discount Code Section */}
      <div className="bg-gray-50 p-8 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-2">
            <TicketPercent className="w-5 h-5 text-gray-500" />
            <label htmlFor="discountCode" className="font-semibold text-foreground">
                Have a Discount Code?
            </label>
        </div>
        
        {!appliedOffer ? (
          <div className="flex gap-4">
              <input
                type="text"
                id="discountCode"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="e.g., LAUNCH25"
                className="w-full bg-white border border-gray-300 rounded-md p-3"
              />
              <button onClick={handleApplyCode} className="px-6 py-2 bg-gray-800 text-white rounded-md font-semibold hover:bg-gray-700 whitespace-nowrap">
                Apply
              </button>
          </div>
        ) : (
          <div className="bg-green-100 border border-green-400 text-green-800 p-4 rounded-lg flex justify-between items-center">
              <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">&apos;{appliedOffer.code}&apos; applied!</span>
              </div>
              <button onClick={handleRemoveCode}>
                  <XCircle className="w-6 h-6 text-green-700 hover:text-green-900" />
              </button>
          </div>
        )}
      </div>
    </div>
  );
}