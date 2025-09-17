import { Button } from './ui/Button'; // Assuming you have the improved Button component
import { cn } from '@/lib/utils'; // Assuming you have the cn utility

interface CtaButton {
  text: string;
  href: string;
  variant: 'primary' | 'secondary';
}

interface GlobalCtaSectionProps {
  accentText?: string;
  heading: string;
  subheading?: string;
  buttons: CtaButton[];
  layout?: 'simple' | 'split'; // 'simple' is centered, 'split' has text left, buttons right
  className?: string;
}

export function GlobalCtaSection({
  accentText,
  heading,
  subheading,
  buttons,
  layout = 'simple',
  className = '',
}: GlobalCtaSectionProps) {
  const baseClasses = 'py-20 sm:py-28';

  if (layout === 'split') {
    return (
      <section className={cn(baseClasses, 'bg-hero-gradient', className)}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">
            <div className="text-center lg:w-3/5 lg:text-left">
              {accentText && (
                <p className="mb-2 font-semibold text-primary">{accentText}</p>
              )}
              <h2 className="max-w-2xl font-display text-3xl font-bold text-foreground sm:text-4xl">
                {heading}
              </h2>
              {subheading && (
                <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                  {subheading}
                </p>
              )}
            </div>
            <div className="flex w-full flex-col items-center gap-4 sm:flex-row lg:w-auto">
              {buttons.map((button) => (
                <Button
                  key={button.href}
                  href={button.href}
                  variant={button.variant}
                  className="w-full sm:w-auto"
                >
                  {button.text}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default 'simple' layout
  return (
    <section className={cn(baseClasses, 'bg-hero-gradient', className)}>
      <div className="container mx-auto px-6 text-center">
        {accentText && (
          <p className="mb-2 font-semibold text-primary">{accentText}</p>
        )}
        <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold text-foreground sm:text-4xl">
          {heading}
        </h2>
        {subheading && (
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            {subheading}
          </p>
        )}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {buttons.map((button) => (
            <Button
              key={button.href}
              href={button.href}
              variant={button.variant}
            >
              {button.text}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
