// src/app/privacy-policy/page.tsx
import type { Metadata } from 'next';
import { PageHero } from '@/components/ui/PageHero';
import { PrivacyPolicyContent } from '@/components/PrivacyPolicyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy | Indivio',
  description:
    'Learn how Indivio collects, uses, and protects your personal and institutional data. Your privacy and security are our top priorities.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        subtitle="Your privacy is our priority. Here's how we collect, use, and protect your data."
      />
      <PrivacyPolicyContent />
    </>
  );
}
