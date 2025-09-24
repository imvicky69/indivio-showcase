// src/components/HeroSection.tsx
import Image from 'next/image';
import { Button } from '../ui/Button'; // Import the Button component
import { GraduationCap, Users, BookOpen, Award } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-hero-gradient pb-12 pt-24">
      <div className="container mx-auto px-6">
        {/* Main Hero Content */}
        <div className="text-center">
          <div className="mb-8 flex flex-col items-center justify-center gap-3 sm:gap-4">
            <Image
              src="/fevicon.png"
              alt="Indivio Logo"
              width={100}
              height={100}
              className="mb-4"
            />
            <h1 className="max-w-4xl font-display text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
              Empower Your School's Digital Journey
            </h1>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <GraduationCap className="h-4 w-4" />
                For Schools
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                For Teachers
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                For Coaching Centers
              </span>
            </div>
          </div>

          <p className="mx-auto max-w-3xl font-sans text-lg text-muted-foreground md:text-xl">
            Complete school website and management solution designed by educators, for educators. 
            Streamline admissions, showcase achievements, engage parents, and grow your institution 
            with India's most affordable education platform.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/booking" variant="primary" className="min-w-[200px]">
              Start Your Digital Transformation
            </Button>
            <Button href="/demo" variant="secondary" className="min-w-[200px]">
              See Live School Examples
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <p className="mb-4 text-sm text-muted-foreground">Trusted by 500+ Educational Institutions across India</p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Award className="h-4 w-4 text-primary" />
                <span>7-Day Quick Setup</span>
              </div>
              <div className="flex items-center gap-1">
                <GraduationCap className="h-4 w-4 text-primary" />
                <span>Built for Indian Schools</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4 text-primary" />
                <span>No Technical Knowledge Required</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-background/50 p-6 text-center backdrop-blur-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">For Principals & Administrators</h3>
            <p className="text-sm text-muted-foreground">
              Professional website, admissions management, and parent communication tools
            </p>
          </div>
          
          <div className="rounded-xl bg-background/50 p-6 text-center backdrop-blur-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">For Teachers & Faculty</h3>
            <p className="text-sm text-muted-foreground">
              Easy content updates, student achievements showcase, and curriculum management
            </p>
          </div>
          
          <div className="rounded-xl bg-background/50 p-6 text-center backdrop-blur-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 font-semibold text-foreground">For Students & Parents</h3>
            <p className="text-sm text-muted-foreground">
              Easy access to school information, events, achievements, and communication
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
