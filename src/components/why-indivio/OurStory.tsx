// src/components/OurStory.tsx
import Image from 'next/image';
import { SectionHeading } from '../SectionHeading';
import {
  Target,
  Eye,
  Instagram,
  Github,
  Linkedin,
  PhoneCall,
} from 'lucide-react';

// Profile image using Next.js Image from public/profile-photo.jpeg
const ProfileImagePlaceholder = () => (
  <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-lg">
    <Image
      src="/fevicon.png"
      alt="Founder profile photo"
      fill
      sizes="(max-width: 768px) 6rem, 12rem"
      className="object-cover"
    />
  </div>
);

export function OurStory() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-6 text-center">
        <SectionHeading>
          Connecting the Dots for India&apos;s Educators
        </SectionHeading>

        {/* The entire narrative section is centered for impact */}
        <div className="mx-auto mt-12 max-w-4xl">
          {/* 1. The Profile-Style Visual */}
          <ProfileImagePlaceholder />

          {/* Social icons */}
          <div className="mt-4 flex items-center justify-center gap-4">
            <a
              href="#"
              aria-label="Instagram"
              className="text-dark/70 transition-colors hover:text-primary"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-dark/70 transition-colors hover:text-primary"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="text-dark/70 transition-colors hover:text-primary"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="tel:+919999999999"
              aria-label="Website"
              className="text-dark/70 transition-colors hover:text-primary"
            >
              <PhoneCall className="h-6 w-6" />
            </a>
          </div>

          <hr className="my-12 border-slate-200" />

          {/* 3. The Dynamic Mission & Vision Layout */}
          <div className="grid grid-cols-1 gap-12 text-left md:grid-cols-2">
            {/* Mission */}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-4">
                <Target className="h-10 w-10 text-primary" />
                <h3 className="font-display text-2xl font-bold text-primary">
                  Our Mission
                </h3>
              </div>
              <p className="text-dark/70 mt-4">
                To empower every school and coaching center with the same
                high-quality digital tools as large institutions—at a fraction
                of the cost.
              </p>
            </div>

            {/* Vision */}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-4">
                <Eye className="h-10 w-10 text-primary" />
                <h3 className="font-display text-2xl font-bold text-primary">
                  Our Vision
                </h3>
              </div>
              <p className="text-dark/70 mt-4">
                To become India&apos;s most trusted digital partner for
                educational institutions, building a secure and interconnected
                ecosystem that helps schools thrive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
