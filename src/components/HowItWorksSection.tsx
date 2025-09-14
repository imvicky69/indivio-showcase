// src/components/HowItWorksSection.tsx
import React from 'react';
import { SectionHeading } from './SectionHeading';
import { ClipboardCheck, ServerCog, Rocket, ArrowRight } from 'lucide-react';

// Define the steps in a data array for clean, scalable code
const stepsData = [
  {
    icon: <ClipboardCheck className="w-12 h-12 text-primary" />,
    title: 'Choose Your Plan',
    description: 'Go to the booking page and book your preferred plan by paying the half amount.',
  },
  {
    icon: <ServerCog className="w-12 h-12 text-primary" />,
    title: 'We Handle the Full Setup',
    description: 'We start your project setup, design, code, and everything else — completely hassle-free.',
  },
  {
    icon: <Rocket className="w-12 h-12 text-primary" />,
    title: 'Go Live & Manage with Ease',
    description: 'Make the remaining payment and get your InDashboard to access and manage your page changes.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-hero-gradient py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <SectionHeading>How It Works</SectionHeading>

        {/* 
          This is the main container for the steps.
          - On mobile: It's a flex-col with gaps for vertical stacking.
          - On desktop (lg): It becomes a flex-row to lay them out horizontally.
        */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-y-12 lg:gap-x-8">
          
          {stepsData.map((step, index) => (
            // Use React.Fragment to group each step with its following arrow
            <React.Fragment key={index}>
              
              {/* The Step Card */}
              <div className="flex flex-col items-center text-center max-w-xs">
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold font-display text-dark mb-2">{step.title}</h3>
                <p className="text-dark/70">{step.description}</p>
              </div>

              {/* 
                The Arrow Connector
                - It only shows if it's NOT the last item in the array.
                - It is hidden on mobile and appears on desktop (lg:flex).
              */}
              {index < stepsData.length - 1 && (
                <div className="hidden lg:flex items-center mx-4 text-slate-300">
                  <span className="text-2xl tracking-[-3px]">-----------</span>
                  <ArrowRight className="w-8 h-8 flex-shrink-0" />
                </div>
              )}

            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}