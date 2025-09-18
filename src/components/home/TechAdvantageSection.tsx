
import { SectionHeading } from '@/components/SectionHeading';
import { XCircle, CheckCircle } from 'lucide-react';

const oldWayPoints = [
  'Slow & Vulnerable platforms like WordPress.',
  'Generic templates that can hurt your brand.',
  'Compatibility issues and frequent updates.',
  'Security patches and plugin management headaches.',
];

const indivioWayPoints = [
  'Blazing Fast & Secure with a modern, server-first approach.',
  'Tailored to Education, designed for performance and SEO.',
  'Fully Managed so you can focus on what matters most.',
  'Seamless, hassle-free updates and maintenance.',
];

// A small sub-component for consistency
function AdvantagePoint({ text, isPositive }: { text: string; isPositive: boolean }) {
  return (
    <li className="flex items-start gap-3">
      {isPositive ? (
        <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
      ) : (
        <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
      )}
      <span className="text-muted-foreground">{text}</span>
    </li>
  );
}

export function TechAdvantageSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <SectionHeading>
          Beyond Platforms. A Modern, Performance-First Foundation.
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* The Old Way Column */}
          <div className="rounded-xl border border-border bg-muted/30 p-8">
            <h3 className="text-2xl font-bold font-display text-foreground mb-6">
              The Old Way: Generic Builders
            </h3>
            <ul className="space-y-4">
              {oldWayPoints.map((point) => (
                <AdvantagePoint key={point} text={point} isPositive={false} />
              ))}
            </ul>
          </div>

          {/* The Indivio Way Column */}
          <div className="rounded-xl border-2 border-primary bg-background shadow-lg p-8">
            <h3 className="text-2xl font-bold font-display text-primary mb-6">
              The Indivio Way: Modern Stack
            </h3>
            <ul className="space-y-4">
              {indivioWayPoints.map((point) => (
                <AdvantagePoint key={point} text={point} isPositive={true} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}