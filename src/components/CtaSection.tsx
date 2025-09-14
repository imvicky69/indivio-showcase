// src/components/CtaSection.tsx
import Link from 'next/link';
import { SectionHeading } from './SectionHeading';

// Define the shape of a button object for type safety
type ButtonProps = {
  text: string;
  href: string;
  primary?: boolean; // To distinguish between filled (true) and outlined (false) styles
};

// Define the props for the CtaSection component
type CtaSectionProps = {
  heading?: string;
  subheading?: string;
  buttons?: ButtonProps[];
};

// Set the default content for when the component is used on the homepage
const defaultHeading = "Ready to take your school to the next level?";
const defaultSubheading = "Get started today and receive free 1-year hosting with any of our all-in-one management packages. No restrictions, full performance.";
const defaultButtons: ButtonProps[] = [
  { text: 'Book Your site Now', href: '/booking', primary: false },
];

export function CtaSection({
  heading = defaultHeading,
  subheading = defaultSubheading,
  buttons = defaultButtons,
}: CtaSectionProps) {
  return (
    <section className="bg-hero-gradient py-20 sm:py-28">
      <div className="container mx-auto px-6 text-center">
        
        <SectionHeading>{heading}</SectionHeading>

        <p className="max-w-3xl mx-auto mt-4 text-lg md:text-xl text-dark/70 font-sans">
          {subheading}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {buttons.map((button) => (
            <Link 
              key={button.href}
              href={button.href}
              className={`inline-block px-8 py-3 font-medium rounded-full transition-all w-full sm:w-auto
                ${button.primary 
                  ? 'bg-primary text-light hover:opacity-90' // Filled button style
                  : 'text-primary border border-primary/80 hover:bg-primary/5' // Outlined button style
                }`}
            >
              {button.text}
            </Link>
          ))}
        </div>
        
      </div>
    </section>
  );
}