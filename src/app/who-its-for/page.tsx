// src/app/who-its-for/page.tsx
import type { Metadata } from 'next';
import { WhoItsForHero } from '@/components/WhoItsForHero';
import { FindYourFit } from '@/components/FindYourFit';
import { UnifiedAdvantage } from '@/components/UnifiedAdvantage';
import { SocialProof } from '@/components/SocialProof';
import { CtaSection } from '@/components/CtaSection';

export const metadata: Metadata = {
  title: 'For Schools, Coaching Centers & Tutors | Indivio Platform',
  description: 'Discover how Indivio is tailored for K-12 schools, competitive coaching centers, and individual educators. Find the features built to solve your specific challenges.',
};

// Define the props for our reusable CTA section
const whoItsForCtaProps = {
  heading: "Ready to Build Your Digital Campus?",
  subheading: "Let's find the perfect plan for your institution's unique goals.",
  buttons: [
    { text: 'Explore Our Plans', href: '/pricing', primary: false },
    { text: 'Book a Free Demo', href: '/demo', primary: true },
  ]
};

export default function WhoItsForPage() {
  return (
    <>
      <WhoItsForHero />
      <FindYourFit />
      <UnifiedAdvantage />
      <SocialProof />
      <CtaSection {...whoItsForCtaProps} />
    </>
  );
}