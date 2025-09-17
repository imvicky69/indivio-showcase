'use client';
import { Gift } from 'lucide-react';
import { Offer } from '@/lib/plans';

interface OffersSectionProps {
  offers: Offer[];
}

export function OffersSection({ offers }: OffersSectionProps) {
  if (!offers || offers.length === 0) {
    return null; // Don't render anything if there are no offers
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    // You could add a toast notification here for better UX
    alert(`Code "${code}" copied to clipboard!`);
  };

  return (
    <section className="bg-muted/50 py-20">
      <div className="container mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8">
            <Gift className="w-8 h-8 text-primary" />
            <h2 className="text-3xl sm:text-4xl font-bold text-primary font-display">
                Current Offers
            </h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-card border-2 border-primary/50 rounded-lg p-6 text-left flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-bold text-lg text-foreground">{offer.title}</h3>
                <p className="text-muted-foreground mt-1">{offer.description}</p>
              </div>
              <button
                onClick={() => handleCopyCode(offer.code)}
                className="bg-primary/10 border border-dashed border-primary text-primary font-mono py-2 px-4 rounded-md whitespace-nowrap"
              >
                {offer.code}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}