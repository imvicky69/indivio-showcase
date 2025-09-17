// src/components/FaqLinkSection.tsx
import Link from 'next/link';

export function FaqLinkSection() {
  return (
    // We use the gradient background to frame the main content block
    <section className="bg-hero-gradient py-16 sm:py-20">
      <div className="container mx-auto px-6">
        
        {/* The main content block with a white background to make it pop */}
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-12 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-primary">
                Have a Quick Question?
              </h2>
              <p className="mt-2 text-dark/70">
                You might find an instant answer on our comprehensive FAQ page.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/pricing#faq" // We can link directly to the FAQ section on the pricing page
                className="inline-block px-8 py-3 font-semibold text-primary border border-primary/80 rounded-full hover:bg-primary/5 transition-colors"
              >
                View Our FAQs
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}