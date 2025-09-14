// src/app/page.tsx
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection'; // <-- Import the new section
import { TechStackSection } from '@/components/TechStackSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { CtaSection } from '@/components/CtaSection'; // <-- Import the new section
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TechStackSection />
      <CtaSection />
      {/* <-- Add it right after the hero */}
      {/* 
        <PricingSection /> 
        <ContactSection />
      */}
    </>
  );
}