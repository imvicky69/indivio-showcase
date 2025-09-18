// src/components/LaunchProcess.tsx
import React from 'react';
import { SectionHeading } from '../SectionHeading';
import {
  ClipboardList,
  Construction,
  Rocket,
  ChevronRight,
} from 'lucide-react';

// Data for the 3-step process
const processSteps = [
  {
    icon: <ClipboardList className="h-10 w-10 text-primary" />,
    step: '01',
    title: 'Consultation & Onboarding',
    description:
      "We start with a conversation to understand your school's unique identity. We handle all the technical setup for you.",
  },
  {
    icon: <Construction className="h-10 w-10 text-primary" />,
    step: '02',
    title: 'We Build & Customize',
    description:
      'You provide the content, and our team builds your professional website, customizing it with your logo and colours.',
  },
  {
    icon: <Rocket className="h-10 w-10 text-primary" />,
    step: '03',
    title: 'Launch & Training',
    description:
      'We launch your new website and provide a simple training session to show you how easy it is to manage your content.',
  },
];

export function LaunchProcess() {
  return (
    <section className="bg-white py-20 sm:py-28 px-4 sm:px-6">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <SectionHeading>Your Digital Campus, Live in 7 Days</SectionHeading>
        </div>

        {/* Main container for the steps */}
        <div className="mt-16 flex flex-col items-stretch justify-center gap-8 md:flex-row">
          {processSteps.map((item, index) => (
            <React.Fragment key={index}>
              {/* The Step Card */}
              <div className="flex flex-1 flex-col items-center rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
                <div className="flex items-center justify-center gap-4">
                  <span className="font-display text-5xl font-bold text-primary/20">
                    {item.step}
                  </span>
                  {item.icon}
                </div>
                <h3 className="text-dark mt-4 font-display text-xl font-bold">
                  {item.title}
                </h3>
                <p className="text-dark/70 mt-2 flex-grow">
                  {item.description}
                </p>
              </div>

              {/* The Connector Arrow (visible only on desktop and not after the last item) */}
              {index < processSteps.length - 1 && (
                <div className="hidden items-center justify-center md:flex">
                  <ChevronRight className="h-12 w-12 text-slate-300" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
