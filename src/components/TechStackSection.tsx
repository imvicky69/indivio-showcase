// src/components/TechStackSection.tsx
import { SectionHeading } from './SectionHeading';
import { ReactLogo } from './icons/ReactLogo';
import { NextJsLogo } from './icons/NextJsLogo';
import { TypeScriptLogo } from './icons/TypeScriptLogo';
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
    // Using a simple div for this logo as it's text-based
    icon: <div className="h-12 w-12 flex items-center justify-center"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/2560px-Google_Cloud_logo.svg.png" alt="Google Cloud Logo" className="h-6"/></div>,
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
      <div className="bg-hero-gradient pt-20 pb-16">
        <div className="container mx-auto px-6 text-center">
          <SectionHeading>Built by Modern Technology</SectionHeading>
          <p className="max-w-2xl mx-auto text-lg text-dark/70">
            We use industry-leading frameworks and infrastructure to
            build fast, scalable, and secure solutions.
          </p>
        </div>
      </div>

      {/* Bottom part with the tech logos */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-12 gap-x-8">
            {techData.map((tech) => (
              <div key={tech.name} className="relative group flex flex-col items-center gap-3">
                {/* Icon */}
                <div className="transition-transform duration-300 group-hover:scale-110">
                  {tech.icon}
                </div>
                {/* Name */}
                <span className="font-medium text-dark/80">{tech.name}</span>
                {/* Hover Tooltip (the "power") */}
                <div className="absolute -top-14 w-max p-2 px-3 bg-dark text-light text-sm rounded-md 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                pointer-events-none">
                  {tech.power}
                  {/* Tooltip Arrow */}
                  <svg className="absolute text-dark h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}