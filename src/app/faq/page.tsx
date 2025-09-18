// src/app/faq/page.tsx
import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { FaqPageContent } from '@/components/faq/FaqPageContent';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) | Indivio',
  description:
    "Find answers to common questions about Indivio's features, pricing, hosting, technical details, and onboarding process.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Have a question? We're here to help. Find the answers you're looking for below."
      />
      <FaqPageContent />
    </>
  );
}
