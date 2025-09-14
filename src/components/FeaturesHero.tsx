// src/components/FeaturesHero.tsx
import Link from 'next/link';

// A simple, stylish placeholder for the composite image
const CompositeImagePlaceholder = () => (
  <div className="relative mx-auto mt-12 w-full max-w-lg md:mx-0 md:mt-0">
    {/* Tablet in the back */}
    <div className="relative z-0 h-auto w-[85%] rounded-xl border bg-white p-2 shadow-lg">
      <div className="h-48 rounded-md bg-gray-100"></div>
    </div>
    {/* Laptop in the front */}
    <div className="absolute -bottom-8 -right-4 z-10 h-auto w-[90%] rounded-xl border bg-white p-2 shadow-2xl">
      <div className="h-52 rounded-md bg-gray-200"></div>
      <div className="absolute -bottom-2 left-0 h-2 w-full rounded-b-md bg-gray-300"></div>
    </div>
  </div>
);

export function FeaturesHero() {
  return (
    <section className="flex min-h-screen items-center bg-hero-gradient pb-20 pt-32 md:pb-12 md:pt-24">
      <div className="container mx-auto px-6">
        {/* Grid for layout: 2 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          {/* Column 1: Text Content */}
          <div className="text-center md:text-left">
            <h1 className="font-display text-4xl font-bold text-primary lg:text-5xl">
              More Than a Website. It&apos;s Your School&apos;s Digital Campus.
            </h1>
            <p className="mt-6 font-sans text-lg text-dark/70 md:text-xl">
              Attract new admissions with a stunning, high-performance website
              today, built on a platform ready to manage your entire school
              operations tomorrow. We handle all the technology, affordably.
            </p>
            <div className="mt-10">
              <Link
                href="/demo" // This should link to a live demo page
                className="inline-block rounded-full bg-primary px-8 py-3 font-medium text-light transition-opacity hover:opacity-90"
              >
                See a Live Demo Site
              </Link>
            </div>
          </div>

          {/* Column 2: Visual Placeholder */}
          <div className="flex items-center justify-center">
            <CompositeImagePlaceholder />
          </div>
        </div>
      </div>
    </section>
  );
}
