// src/components/FutureReady.tsx
import { SectionHeading } from './SectionHeading';
import { CreditCard, UserCheck, MessageSquare, CalendarClock } from 'lucide-react';

// Data for the upcoming features
const futureFeaturesData = [
  {
    icon: <CreditCard className="w-10 h-10" />,
    title: 'Online Fee Payment Gateway',
  },
  {
    icon: <UserCheck className="w-10 h-10" />,
    title: 'Student Attendance Management',
  },
  {
    icon: <MessageSquare className="w-10 h-10" />,
    title: 'Parent-Teacher Communication Portal',
  },
  {
    icon: <CalendarClock className="w-10 h-10" />,
    title: 'Digital Timetables & Schedules',
  },
];

export function FutureReady() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-6 text-center">
        <SectionHeading>Ready for Tomorrow</SectionHeading>
        <p className="max-w-3xl mx-auto mt-4 text-lg md:text-xl text-dark/70">
          Your Indivio website is the foundation. We are constantly building new modules to help you manage your entire institution.
        </p>

        {/* Responsive grid for the teaser cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {futureFeaturesData.map((feature, index) => (
            <div
              key={index}
              className="relative bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-6 
                         flex flex-col items-center justify-center text-center text-slate-500"
            >
              {/* "Coming Soon" Badge */}
              <div className="absolute -top-3 bg-accent text-light text-xs font-bold uppercase px-3 py-1 rounded-full">
                Coming Soon
              </div>
              
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold font-display">{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}