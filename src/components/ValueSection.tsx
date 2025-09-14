// src/components/ValueSection.tsx
import { SectionHeading } from './SectionHeading';
import { PackageCheck, CircleDollarSign, Zap, Handshake } from 'lucide-react';

// Data array for the value propositions
const valueData = [
  {
    icon: <PackageCheck className="w-12 h-12 text-primary" />,
    title: 'All-Inclusive First Year',
    description: 'Your fee includes design, setup, hosting, security, and support for a full year. No hidden costs or surprises.',
  },
  {
    icon: <CircleDollarSign className="w-12 h-12 text-primary" />,
    title: 'Extremely Affordable Renewal',
    description: 'After the first year, hosting and maintenance starts at just ₹999/year, keeping your costs predictable and low.',
  },
  {
    icon: <Zap className="w-12 h-12 text-primary" />,
    title: 'Built for Performance',
    description: 'Your website is built with modern technology, ensuring it\'s fast, secure, and reliable for a great user experience.',
  },
  {
    icon: <Handshake className="w-12 h-12 text-primary" />,
    title: 'We Set You Up for Success',
    description: 'We don’t just give you tools; our guided onboarding process and dedicated support are included in every plan.',
  },
];

export function ValueSection() {
  return (
    // Use the gradient background for visual separation from the white plans section
    <section className="bg-hero-gradient py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <SectionHeading>More Value, No Surprises</SectionHeading>

        {/* Responsive 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 max-w-5xl mx-auto mt-16">
          {valueData.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start text-center sm:text-left gap-6">
              <div className="mx-auto sm:mx-0 flex-shrink-0">{item.icon}</div>
              <div>
                <h3 className="text-xl font-bold font-display text-dark mb-2">{item.title}</h3>
                <p className="text-dark/70">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}