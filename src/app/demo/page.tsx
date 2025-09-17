// src/app/demo/page.tsx
import type { Metadata } from 'next';
import { DemoPageContent } from '@/components/DemoPageContent';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Live Demo | Indivio School Website & Management Platform',
  description: 'Experience the Indivio platform firsthand. Interact with a live demo of a school website and see how easy it is to manage content from the admin dashboard.',
};

export default function DemoPage() {
  return (
    // We use Suspense as a good practice for client components,
    // though it's not strictly necessary here.
    <Suspense fallback={<div>Loading Demo...</div>}>
      <DemoPageContent />
    </Suspense>
  );
}