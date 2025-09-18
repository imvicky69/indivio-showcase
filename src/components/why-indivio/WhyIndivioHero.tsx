// src/components/WhyIndivioHero.tsx

export function WhyIndivioHero() {
  return (
    // Reusing our familiar gradient for brand consistency.
    // The padding is adjusted to give this page a unique feel.
    <section className="bg-hero-gradient pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="container mx-auto px-6 text-center">
        {/* Visual Placeholder: A clean circle for an authentic photo or illustration */}
        <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full border-4 border-primary/20 bg-white shadow-lg">
          {/* Placeholder Icon */}
          <svg
            className="h-16 w-16 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 8v8m-3-5v5m-3-8v8M4 21h16a2 2 0 002-2V5a2 2 0 00-2-2H4a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </div>

        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-4xl font-bold text-primary sm:text-5xl md:text-6xl">
            Built for Education. Backed by Technology. Driven by Partnership.
          </h1>
          <p className="mt-6 font-sans text-lg text-dark/70 md:text-xl">
            At Indivio, we&apos;re on a mission to give every school in India a
            digital identity that&apos;s powerful, affordable, and ready for the
            future.
          </p>
        </div>
      </div>
    </section>
  );
}
