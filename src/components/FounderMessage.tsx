// src/components/FounderMessage.tsx
import Image from 'next/image';
import { SectionHeading } from './SectionHeading';

// Use real profile image from public/profile-photo.jpeg
const HeadshotPlaceholder = () => (
  <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full border-4 border-primary/20 bg-white shadow-xl lg:h-64 lg:w-64">
    <Image
      src="/profile-photo.jpeg"
      alt="Founder headshot"
      fill
      sizes="(max-width: 1024px) 12rem, 16rem"
      className="object-cover"
    />
  </div>
);

export function FounderMessage() {
  return (
    <section className="bg-hero-gradient py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-3">
          {/* Column 1: The Headshot */}
          <div className="flex justify-center">
            <HeadshotPlaceholder />
          </div>

          {/* Column 2: The NEW Message */}
          <div className="text-center lg:col-span-2 lg:text-left">
            <SectionHeading>
              A Personal Commitment to Your Success
            </SectionHeading>

            {/* This text is now unique and focuses on the partnership promise */}
            <blockquote className="mt-4 text-lg leading-relaxed text-dark/80">
              &quot;In today&apos;s digital world, choosing a technology partner
              can be overwhelming. You&apos;re often faced with complex systems,
              impersonal support, and solutions that don&apos;t quite fit.{' '}
              <strong>My commitment with Indivio is to change that.</strong>
              <br />
              <br />
              We&apos;re not just a service provider; we are your dedicated
              digital partner. When you choose us, you&apos;re choosing a team
              that is personally invested in your school&apos;s success.
              We&apos;re here to listen, to adapt, and to ensure your digital
              campus exceeds your expectations for years to come.&quot;
            </blockquote>

            {/* Signature Block remains the same */}
            <div className="mt-8">
              <p className="font-display text-xl font-bold text-primary">
                Vikky Raja
              </p>
              <p className="text-dark/70">Founder & Full Stack Developer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
