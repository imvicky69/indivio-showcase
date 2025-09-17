// src/app/terms-and-conditions/page.tsx
import type { Metadata } from 'next';
import { PageHero } from '@/components/PageHero';
import { TermsAndConditionsContent } from '@/components/TermsAndConditionsContent';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Indivio',
  description: "Please read the Terms and Conditions for using Indivio's services. This agreement governs your use of our website development, hosting, and management platform.",
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <PageHero 
        title="Terms and Conditions"
        subtitle="This agreement governs your use of our platform. Please read it carefully."
      />
      <TermsAndConditionsContent />
    </>
  );
}