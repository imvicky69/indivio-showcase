// src/components/HeroSection.tsx

export function HeroSection() {
  return (
    <section className="bg-hero-gradient min-h-screen flex items-center justify-center pt-24 pb-12">
      <div className="container mx-auto px-6 text-center">
        
        {/* 
          This structure now perfectly mirrors the `SectionHeading` component for consistency,
          but we are using an <h1> for SEO on the main page title.
        */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8">
          <span className="w-7 h-7 sm:w-8 sm:h-8 bg-accent rounded-full flex-shrink-0"></span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary font-display max-w-4xl">
            Your All-in-One School Website & Management Portal.
          </h1>
        </div>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-dark/70 font-sans">
          We handle the technology so you can focus on education. Effortlessly
          manage admissions, fees, and parent communication.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-3 font-medium text-primary border border-primary/80 rounded-full hover:bg-primary/5 transition-colors w-full sm:w-auto">
            Book Your site Now
          </button>
          <button className="px-8 py-3 font-medium text-light bg-primary rounded-full hover:opacity-90 transition-opacity w-full sm:w-auto">
            See a live example
          </button>
        </div>
        
      </div>
    </section>
  );
}