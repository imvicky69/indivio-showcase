// src/components/TechStackSection.tsx
import Image from 'next/image';
import { SectionHeading } from '../SectionHeading';
import { ReactLogo } from '../icons/ReactLogo';
import { NextJsLogo } from '../icons/NextJsLogo';
import { TypeScriptLogo } from '../icons/TypeScriptLogo';
import { Lock } from 'lucide-react';

const techData = [
  {
    name: 'React',
    icon: <ReactLogo className="h-12 w-12" />,
    power: 'Powers a dynamic and fast user-interface.',
  },
  {
    name: 'Next.js',
    icon: <NextJsLogo className="h-12 w-12" />,
    power: 'Enables server-side rendering for top-tier SEO.',
  },
  {
    name: 'TypeScript',
    icon: <TypeScriptLogo className="h-12 w-12 rounded-lg" />,
    power: 'Ensures code is robust, scalable, and error-free.',
  },
  {
    name: 'Google Cloud',
    // Use Next.js Image for optimization
    icon: (
      <div className="flex h-12 w-12 items-center justify-center">
        <Image
          src="/logo.png"
          alt="Google Cloud Logo"
          width={24}
          height={24}
          className="h-6"
        />
      </div>
    ),
    power: 'Provides reliable and scalable backend infrastructure.',
  },
  {
    name: 'Secured API',
    icon: <Lock className="h-12 w-12 text-slate-500" />,
    power: 'Protects all data communication with modern security.',
  },
];

export function TechStackSection() {
  return (
    <section>
      {/* Top part with the heading */}
      <div className="bg-hero-gradient pb-16 pt-20">
        <div className="container mx-auto px-6 text-center">
          <SectionHeading>Built by Modern Technology</SectionHeading>
          <p className="text-dark/70 mx-auto max-w-2xl text-lg">
            We use industry-leading frameworks and infrastructure to build fast,
            scalable, and secure solutions.
          </p>
        </div>
      </div>

      {/* Bottom part with the tech logos */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 md:grid-cols-5">
            {techData.map((tech) => (
              <div
                key={tech.name}
                className="group relative flex flex-col items-center gap-3"
              >
                {/* Icon */}
                <div className="transition-transform duration-300 group-hover:scale-110">
                  {tech.icon}
                </div>
                {/* Name */}
                <span className="text-dark/80 font-medium">{tech.name}</span>
                {/* Hover Tooltip (the "power") */}
                <div className="bg-dark text-light pointer-events-none absolute -top-14 w-max rounded-md p-2 px-3 text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {tech.power}
                  {/* Tooltip Arrow */}
                  <svg
                    className="text-dark absolute left-0 top-full h-2 w-full"
                    x="0px"
                    y="0px"
                    viewBox="0 0 255 255"
                  >
                    <polygon
                      className="fill-current"
                      points="0,0 127.5,127.5 255,0"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
