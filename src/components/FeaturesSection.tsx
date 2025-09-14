// src/components/FeaturesSection.tsx
import { SectionHeading } from './SectionHeading';
import { Globe, Pencil, IndianRupee, Rocket } from 'lucide-react';

// We define our features as an array of objects. This is clean and scalable.
const featuresData = [
  {
    icon: <Globe className="w-12 h-12 text-primary" />,
    title: 'Professional Showcase Website',
    description: 'Attract new admissions and build your brand with a fast, modern, and mobile-friendly website.',
  },
  {
    icon: <Pencil className="w-12 h-12 text-primary" />,
    title: 'Customization on your finger tips',
    description: 'indivio offers hassle free site manipulation, without even touching a single code. Just by using InDashboard.',
  },
  {
    icon: <IndianRupee className="w-12 h-12 text-primary" />,
    title: 'Online Fee Payments',
    description: 'Attract new admissions and build your brand with a fast, modern, and mobile-friendly website.',
  },
  {
    icon: <Rocket className="w-12 h-12 text-primary" />,
    title: 'Grow Digitally with Infinite possibilities',
    description: 'indivio offers hassle free site manipulation, without even touching a single code. Just by using InDashboard.',
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {featuresData.map((feature, index) => (
            <div 
              key={index}
              // These classes create the card and the hover effect
              className="bg-accent-light p-8 rounded-2xl flex gap-6 items-start
                         transition-all duration-300 ease-in-out 
                         hover:shadow-xl hover:-translate-y-2 cursor-pointer"
            >
              <div className="flex-shrink-0">{feature.icon}</div>
              <div>
                <h3 className="text-xl font-bold font-display text-primary mb-2">{feature.title}</h3>
                <p className="text-dark/70">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}