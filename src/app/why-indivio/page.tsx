// src/app/why-indivio/page.tsx
import type { Metadata } from 'next';
import { WhyIndivioHero } from '@/components/WhyIndivioHero';
import { OurStory } from '@/components/OurStory';
import { IndivioDifference } from '@/components/IndivioDifference';
import { LaunchProcess } from '@/components/LaunchProcess';
import { FounderMessage } from '@/components/FounderMessage';
import { CtaSection } from '@/components/CtaSection';
import DomeGallery from '@/components/DomeGallery';
// Step 1: Set the page-specific SEO metadata
export const metadata: Metadata = {
  title: 'Why Indivio? | Your Trusted Digital Partner for Schools in India',
  description:
    "Learn about Indivio's mission to empower schools with affordable, modern technology. Discover our story, our process, and why we're the right partner for you.",
};

const whyIndivioCtaProps = {
  heading: 'We’re not just a vendor. We’re your digital partner.',
  subheading: "Let's start the conversation about your school's future.",
  buttons: [
    { text: 'View Our Plans', href: '/pricing', primary: false }, // Outlined button
    { text: 'Book a Free Demo', href: '/demo', primary: true }, // Filled button
  ],
};

// Step 3: Assemble the page with the section placeholders
export default function WhyIndivioPage() {
  return (
    <div className="relative min-h-screen">
      <WhyIndivioHero />
      <OurStory />
      <IndivioDifference />
      <LaunchProcess />
      <FounderMessage />

      <CtaSection {...whyIndivioCtaProps} />
      <div className="my-8 h-[600px] p-4">
        {/* <h2 className="mb-4 text-2xl font-bold text-blue-700">
          Dome Gallery Section (Debug)
        </h2> */}
        <DomeGallery />
      </div>
    </div>
  );
}
