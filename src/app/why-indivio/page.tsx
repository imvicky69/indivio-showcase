// src/app/why-indivio/page.tsx
import type { Metadata } from 'next';
import { WhyIndivioHero } from '@/components/why-indivio/WhyIndivioHero';
import { OurStory } from '@/components/why-indivio/OurStory';
import { IndivioDifference } from '@/components/why-indivio/IndivioDifference';
import { LaunchProcess } from '@/components/why-indivio/LaunchProcess';
import { FounderMessage } from '@/components/why-indivio/FounderMessage';
import { CtaSection } from '@/components/ui/CtaSection';

import { ValueSection } from '@/components/why-indivio/ValueSection';
import { UnifiedAdvantage } from '@/components/why-indivio/UnifiedAdvantage';
import { SocialProof } from '@/components/why-indivio/SocialProof';
import { FindYourFit } from '@/components/why-indivio/FindYourFit';
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
      <ValueSection />
      <IndivioDifference />
      <FounderMessage />
    <UnifiedAdvantage />
    <SocialProof />
    <LaunchProcess />
    <FindYourFit />
      <CtaSection {...whyIndivioCtaProps} />
      <div className="my-8 h-[600px] p-4"></div>
    </div>
  );
}
