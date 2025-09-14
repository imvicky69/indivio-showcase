// src/components/CtaSection.tsx
import Link from 'next/link';
import { SectionHeading } from './SectionHeading';

export function CtaSection() {
  return (
    // We reuse the same gradient for a cohesive feel
    <section className="bg-hero-gradient py-20 sm:py-28">
      <div className="container mx-auto px-6 text-center">
        
        <SectionHeading>
          Ready to take your school to the next level?
        </SectionHeading>

        <p className="max-w-3xl mx-auto mt-4 text-lg md:text-xl text-dark/70 font-sans">
          Get started today and receive free 1-year hosting with any
          of our all-in-one management packages. No restrictions, full
          performance.
        </p>

        {/* 
          Using a Next.js Link for the button for better navigation/SEO.
          The styling is identical to our other outlined button.
        */}
        <div className="mt-10">
          <Link 
            href="/booking" // This should point to your actual booking or contact page
            className="inline-block px-8 py-3 font-medium text-primary border border-primary/80 rounded-full hover:bg-primary/5 transition-colors"
          >
            Book Your site Now
          </Link>
        </div>
        
      </div>
    </section>
  );
}