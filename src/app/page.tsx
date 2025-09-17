// src/app/page.tsx
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection'; // <-- Import the new section
import { TechStackSection } from '@/components/TechStackSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { GlobalCtaSection } from '@/components/GlobalCtaSection'; 
import {TechAdvantageSection} from '@/components/TechAdvantageSection';
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TechAdvantageSection />
      <HowItWorksSection />
      <TechStackSection />
      <GlobalCtaSection 
        layout="split" // Use the new, more engaging layout
        accentText="Dive Deeper"
        heading="Explore Everything Included in Our Platform"
        subheading="See the full list of features that will transform your school's digital presence, from admissions to alumni engagement."
        buttons={[
          { text: 'View All Features', href: '/features', variant: 'primary' },
          { text: 'See Pricing', href: '/pricing', variant: 'secondary' },
        ]}
      />
    </>
  );
}