// src/components/FeaturesHero.tsx
import Link from 'next/link';

const CompositeImagePlaceholder = () => (
  <div className="relative w-full max-w-lg mx-auto mt-12 md:mt-0 md:mx-0">
    <div className="relative z-0 w-[85%] h-auto bg-card rounded-xl shadow-lg border p-2">
      <div className="bg-muted/50 h-48 rounded-md"></div>
    </div>
    <div className="absolute z-10 -bottom-8 -right-4 w-[90%] h-auto bg-card rounded-xl shadow-2xl border p-2">
      <div className="bg-muted h-52 rounded-md"></div>
      <div className="absolute -bottom-2 left-0 w-full h-2 bg-border rounded-b-md"></div>
    </div>
  </div>
);

export function FeaturesHero() {
  return (
    <section className="bg-hero-gradient min-h-screen flex items-center pt-32 pb-20 md:pt-24 md:pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="text-center md:text-left">
            {/* FIXED: Use text-foreground for the main heading */}
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground font-display">
              More Than a Website. It&apos;s Your School&apos;s Digital Campus.
            </h1>
            {/* FIXED: Use text-muted-foreground for the subheading */}
            <p className="mt-6 text-lg md:text-xl text-muted-foreground font-sans">
              Attract new admissions with a stunning, high-performance website today, 
              built on a platform ready to manage your entire school operations tomorrow. 
              We handle all the technology, affordably.
            </p>
            <div className="mt-10">
              {/* FIXED: Use bg-primary and text-primary-foreground for the button */}
              <Link
                href="/demo"
                className="inline-block px-8 py-3 font-medium bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
              >
                See a Live Demo Site
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <CompositeImagePlaceholder />
          </div>

        </div>
      </div>
    </section>
  );
}