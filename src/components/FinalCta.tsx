// src/components/FinalCta.tsx
import Link from 'next/link';
import { SectionHeading } from './SectionHeading';

export function FinalCta() {
  return (
    // We use the familiar gradient to frame the final call to action.
    <section className="bg-hero-gradient py-20 sm:py-28">
      <div className="container mx-auto px-6 text-center">
        <SectionHeading>
          Let&apos;s Build Your School&apos;s Digital Future.
        </SectionHeading>

        <p className="mx-auto mt-4 max-w-3xl font-sans text-lg text-dark/70 md:text-xl">
          See how easy and affordable it can be to get a professional online
          presence. Schedule a free, no-obligation demo with our team today.
        </p>

        <div className="mt-10">
          <Link
            href="/demo" // This should point to your demo request or contact page
            className="inline-block rounded-full bg-primary px-8 py-3 font-medium text-light transition-opacity hover:opacity-90"
          >
            Request My Free Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
