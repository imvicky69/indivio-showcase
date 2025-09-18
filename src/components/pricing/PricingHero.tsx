// src/components/PricingHero.tsx

export function PricingHero() {
  return (
    // We reuse the gradient for a familiar, clean look, but add more vertical padding
    // to give it a spacious, uncluttered feel. pt-32 pushes it below the navbar.
    <section className="bg-hero-gradient pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="container mx-auto px-6 text-center">
        {/* We add a max-width to the text container to control line length and improve readability */}
        <div className="mx-auto max-w-4xl">
          <h1 className="font-display text-4xl font-bold text-primary sm:text-5xl md:text-6xl">
            Simple, Transparent Pricing for Every School
          </h1>
          <p className="mt-6 font-sans text-lg text-dark/70 md:text-xl">
            Find the perfect plan to build your school&apos;s digital presence
            and connect with your community. No hidden fees, ever.
          </p>
        </div>
      </div>
    </section>
  );
}
