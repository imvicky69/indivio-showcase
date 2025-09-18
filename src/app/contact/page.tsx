import type { Metadata } from 'next';
import { ContactFormArea } from '@/components/contact/ContactFormArea'; // <-- Import the new component
import { CtaSection } from '@/components/ui/CtaSection';

export const metadata: Metadata = {
  title: 'Contact Us | Get in Touch with the Indivio Team',
  description:
    "Have a question? Contact the Indivio team via our contact form, email, or phone. We're here to help you with your school's digital needs.",
};

// Customize the CTA for the contact page
const contactCtaProps = {
  heading: 'Ready to See Indivio in Action?',
  subheading:
    "Let us show you how our platform can transform your school's digital presence.",
  buttons: [
    { text: 'Book a Free, Personalized Demo', href: '/demo', primary: true },
  ],
};

export default function ContactPage() {
  return (
    <div className="mx-4 md:mx-12">
      <ContactFormArea /> {/* <-- Use the new, all-in-one component */}
      <CtaSection {...contactCtaProps} />
    </div>
  );
}
