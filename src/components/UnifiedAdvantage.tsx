// src/components/UnifiedAdvantage.tsx
import { SectionHeading } from './SectionHeading';
import { Smile, Zap, Handshake } from 'lucide-react';

const advantages = [
  {
    icon: <Smile className="w-10 h-10 text-primary" />,
    title: 'Simplicity at its Core',
    description: 'Our intuitive dashboard means you can make updates in minutes, not days. No technical skills required.',
  },
  {
    icon: <Zap className="w-10 h-10 text-primary" />,
    title: 'Built for Performance',
    description: 'Every Indivio site is fast, secure, and SEO-ready, ensuring a great experience for your visitors and better visibility on Google.',
  },
  {
    icon: <Handshake className="w-10 h-10 text-primary" />,
    title: 'A True Partnership',
    description: 'We\'re more than a tool; we\'re your dedicated digital partner. Our support is always just a call or email away.',
  },
];

export function UnifiedAdvantage() {
  return (
    <section className="bg-hero-gradient py-20 sm:py-28">
      <div className="container mx-auto px-6 text-center">
        <SectionHeading>A Powerful Foundation for Every Educator</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto mt-16">
          {advantages.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              {item.icon}
              <h3 className="mt-4 text-xl font-bold font-display text-dark">{item.title}</h3>
              <p className="mt-2 text-dark/70">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}