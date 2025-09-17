// src/components/LaunchProcess.tsx
import React from 'react';
import { SectionHeading } from './SectionHeading';
import { ClipboardList, Construction, Rocket, ChevronRight } from 'lucide-react';

// Data for the 3-step process
const processSteps = [
  {
    icon: <ClipboardList className="w-10 h-10 text-primary" />,
    step: '01',
    title: 'Consultation & Onboarding',
    description: 'We start with a conversation to understand your school\'s unique identity. We handle all the technical setup for you.',
  },
  {
    icon: <Construction className="w-10 h-10 text-primary" />,
    step: '02',
    title: 'We Build & Customize',
    description: 'You provide the content, and our team builds your professional website, customizing it with your logo and colours.',
  },
  {
    icon: <Rocket className="w-10 h-10 text-primary" />,
    step: '03',
    title: 'Launch & Training',
    description: 'We launch your new website and provide a simple training session to show you how easy it is to manage your content.',
  },
];

export function LaunchProcess() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <SectionHeading>Your Digital Campus, Live in 7 Days</SectionHeading>
        </div>
        
        {/* Main container for the steps */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 mt-16">
          {processSteps.map((item, index) => (
            <React.Fragment key={index}>
              {/* The Step Card */}
              <div className="flex-1 flex flex-col items-center text-center p-6 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-center gap-4">
                  <span className="text-5xl font-bold font-display text-primary/20">{item.step}</span>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold font-display text-dark mt-4">{item.title}</h3>
                <p className="text-dark/70 mt-2 flex-grow">{item.description}</p>
              </div>

              {/* The Connector Arrow (visible only on desktop and not after the last item) */}
              {index < processSteps.length - 1 && (
                <div className="hidden md:flex items-center justify-center">
                  <ChevronRight className="w-12 h-12 text-slate-300" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}