// src/components/WhoItsForHero.tsx
import { School, Landmark, User } from 'lucide-react';

// Data for the interactive icons
const segments = [
  { name: 'K-12 Schools', icon: <School className="w-10 h-10" /> },
  { name: 'Coaching Centers', icon: <Landmark className="w-10 h-10" /> },
  { name: 'Individual Tutors', icon: <User className="w-10 h-10" /> },
];

export function WhoItsForHero() {
  return (
    <section className="bg-hero-gradient pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary font-display">
            For the Visionaries Shaping Tomorrow&quot;s Minds.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-dark/70 font-sans">
            Indivio is designed for the unique needs of modern educational institutions. Whether you&apos;re a bustling school, a focused coaching center, or a passionate individual tutor, our platform is built to help you connect, manage, and grow.
          </p>
        </div>

        {/* Interactive Icons Section */}
        <div className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12">
          {segments.map((segment, index) => (
            <div key={index} className="group flex flex-col items-center gap-3 text-primary cursor-pointer">
              <div className="p-5 bg-white rounded-full border-2 border-primary/20 shadow-lg 
                              transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:border-accent">
                {segment.icon}
              </div>
              <span className="font-semibold text-dark/80 transition-colors group-hover:text-primary">{segment.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}