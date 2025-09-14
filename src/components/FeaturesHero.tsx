// src/components/FeaturesHero.tsx
import Link from 'next/link';

// A simple, stylish placeholder for the composite image
const CompositeImagePlaceholder = () => (
  <div className="relative w-full max-w-lg mx-auto mt-12 md:mt-0 md:mx-0">
    {/* Tablet in the back */}
    <div className="relative z-0 w-[85%] h-auto bg-white rounded-xl shadow-lg border p-2">
      <div className="bg-gray-100 h-48 rounded-md"></div>
    </div>
    {/* Laptop in the front */}
    <div className="absolute z-10 -bottom-8 -right-4 w-[90%] h-auto bg-white rounded-xl shadow-2xl border p-2">
      <div className="bg-gray-200 h-52 rounded-md"></div>
      <div className="absolute -bottom-2 left-0 w-full h-2 bg-gray-300 rounded-b-md"></div>
    </div>
  </div>
);

export function FeaturesHero() {
  return (
    <section className="bg-hero-gradient min-h-screen flex items-center pt-32 pb-20 md:pt-24 md:pb-12">
      <div className="container mx-auto px-6">
        {/* Grid for layout: 2 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Column 1: Text Content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary font-display">
              More Than a Website. It's Your School's Digital Campus.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-dark/70 font-sans">
              Attract new admissions with a stunning, high-performance website today, 
              built on a platform ready to manage your entire school operations tomorrow. 
              We handle all the technology, affordably.
            </p>
            <div className="mt-10">
              <Link
                href="/demo" // This should link to a live demo page
                className="inline-block px-8 py-3 font-medium text-light bg-primary rounded-full hover:opacity-90 transition-opacity"
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