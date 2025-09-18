// src/components/FeaturesSection.tsx
import { SectionHeading } from '../SectionHeading';
import { Globe, Pencil, IndianRupee, Rocket } from 'lucide-react';

// We define our features as an array of objects. This is clean and scalable.
const featuresData = [
  {
    icon: <Globe className="h-12 w-12 text-primary" />,
    title: 'Professional Showcase Website',
    description:
      'Attract new admissions and build your brand with a fast, modern, and mobile-friendly website.',
  },
  {
    icon: <Pencil className="h-12 w-12 text-primary" />,
    title: 'Customization on your finger tips',
    description:
      'indivio offers hassle free site manipulation, without even touching a single code. Just by using InDashboard.',
  },
  {
    icon: <IndianRupee className="h-12 w-12 text-primary" />,
    title: 'Online Fee Payments',
    description:
      'Attract new admissions and build your brand with a fast, modern, and mobile-friendly website.',
  },
  {
    icon: <Rocket className="h-12 w-12 text-primary" />,
    title: 'Grow Digitally with Infinite possibilities',
    description:
      'indivio offers hassle free site manipulation, without even touching a single code. Just by using InDashboard.',
  },
];

export function FeaturesSection() {
  return (
    // This section will have the same gradient background to feel connected
    <section className="bg-hero-gradient py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <SectionHeading>
          Everything You Need to Manage and Grow Online
        </SectionHeading>

        {/* This grid is responsive: 1 column on mobile, 2 on desktop */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              // These classes create the card and the hover effect
              className="bg-accent-light flex cursor-pointer items-start gap-6 rounded-2xl p-8 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="flex-shrink-0">{feature.icon}</div>
              <div>
                <h3 className="mb-2 font-display text-xl font-bold text-primary">
                  {feature.title}
                </h3>
                <p className="text-dark/70">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
