// src/components/PlatformBenefits.tsx
import { SectionHeading } from './SectionHeading';
import { SlidersHorizontal, Zap, ShieldCheck, TrendingUp } from 'lucide-react';

// Data for the platform benefits
const benefitsData = [
  {
    icon: <SlidersHorizontal className="w-12 h-12 text-accent" />,
    title: 'Simple Content Dashboard',
    description: 'No more waiting for a developer. From your admin panel, you can update text and upload photos in minutes. If you can use email, you can use Indivio.',
  },
  {
    icon: <Zap className="w-12 h-12 text-accent" />,
    title: 'Blazing-Fast Performance',
    description: 'We use the latest React-based technology and a global hosting network to ensure your site loads instantly, which improves your ranking on Google.',
  },
  {
    icon: <ShieldCheck className="w-12 h-12 text-accent" />,
    title: 'All-Inclusive Hosting & Security',
    description: 'Forget the technical headaches. We handle your domain name, secure hosting (with SSL), and all software updates. It\'s all included in your plan.',
  },
  {
    icon: <TrendingUp className="w-12 h-12 text-accent" />,
    title: 'SEO-Ready from Day One',
    description: 'Our platform is built to be loved by Google, helping parents in your city find your school more easily and leading to more admission inquiries.',
  },
];

export function PlatformBenefits() {
  return (
    // We reuse the gradient background for visual rhythm
    <section className="bg-hero-gradient py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <SectionHeading>Effortless Management, Powerful Technology</SectionHeading>

        {/* Responsive grid for the benefit blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 max-w-5xl mx-auto mt-16">
          {benefitsData.map((benefit, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start text-center sm:text-left gap-6">
              <div className="mx-auto sm:mx-0 flex-shrink-0">{benefit.icon}</div>
              <div>
                <h3 className="text-xl font-bold font-display text-dark mb-2">{benefit.title}</h3>
                <p className="text-dark/70">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}