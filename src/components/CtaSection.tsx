// src/components/CtaSection.tsx
import { SectionHeading } from './SectionHeading';
import { Button } from './ui/Button'; // <-- IMPORT OUR NEW BUTTON

// The types and default props logic remain the same and are perfectly fine.
type ButtonProps = {
  text: string;
  href: string;
  primary?: boolean;
};

type CtaSectionProps = {
  heading?: string;
  subheading?: string;
  buttons?: ButtonProps[];
};

const defaultHeading = 'Ready to take your school to the next level?';
const defaultSubheading =
  'Get started today and receive free 1-year hosting with any of our all-in-one management packages. No restrictions, full performance.';
const defaultButtons: ButtonProps[] = [
  { text: 'Book Your site Now', href: '/booking', primary: false },
];

export function CtaSection({
  heading = defaultHeading,
  subheading = defaultSubheading, // Use the passed subheading, or default if undefined
  buttons = defaultButtons,
}: CtaSectionProps) {
  return (
    // The hero-gradient now correctly adapts to the theme.
    <section className="bg-hero-gradient py-20 sm:py-28">
      <div className="container mx-auto px-6 text-center">
        <SectionHeading>{heading}</SectionHeading>

        {/* We only render the subheading if it exists */}
        {subheading && (
          // FIXED: Use text-muted-foreground for the subheading text.
          <p className="mx-auto mt-4 max-w-3xl font-sans text-lg text-muted-foreground md:text-xl">
            {subheading}
          </p>
        )}

        {/* === THE MAGIC HAPPENS HERE === */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {buttons.map((button) => (
            <Button
              key={button.href}
              href={button.href}
              // We pass the 'variant' prop to control the style
              variant={button.primary ? 'primary' : 'secondary'}
            >
              {button.text}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
