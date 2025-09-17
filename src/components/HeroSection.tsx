// src/components/HeroSection.tsx
import { Button } from './ui/Button'; // Import the Button component

export function HeroSection() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-hero-gradient pb-12 pt-24">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-8 flex items-center justify-center gap-3 sm:gap-4">
          {/* The orange dot now uses the 'accent' color from our theme */}
          <span className="h-7 w-7 flex-shrink-0 rounded-full bg-accent sm:h-8 sm:w-8"></span>

          {/* FIXED: The heading now uses the theme's main text color */}
          <h1 className="max-w-4xl font-display text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
            Your All-in-One School Website & Management Portal.
          </h1>
        </div>

        {/* FIXED: The paragraph now uses the theme's muted text color */}
        <p className="mx-auto max-w-2xl font-sans text-lg text-muted-foreground md:text-xl">
          We handle the technology so you can focus on education. Effortlessly
          manage admissions, fees, and parent communication.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* FIXED: This is now a secondary, outlined button */}
          <Button href="/booking" variant="secondary">
            Book Your site Now
          </Button>

          {/* FIXED: This is now a primary, filled button */}
          <Button href="/demo" variant="primary">
            See a live example
          </Button>
        </div>
      </div>
    </section>
  );
}
