// src/components/IncludedFeatures.tsx
import { SectionHeading } from '@/components/SectionHeading';
import {
  LayoutDashboard,
  BookOpen,
  ClipboardEdit,
  Users,
  Award,
  Image as ImageIcon,
  CalendarDays,
  Smartphone,
} from 'lucide-react';

// Data array for all the included features. This makes it easy to manage.
const featuresList = [
  {
    icon: <LayoutDashboard className="h-10 w-10 text-primary" />,
    title: 'Dynamic Homepage',
    description:
      'Make a powerful first impression. Easily update notices, welcome messages, and hero images from your dashboard.',
  },
  {
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    title: 'About & Vision Pages',
    description:
      "Share your school's unique story, history, and mission to connect with prospective parents.",
  },
  {
    icon: <ClipboardEdit className="h-10 w-10 text-primary" />,
    title: 'Admissions Portal',
    description:
      'Streamline your intake process with a dedicated admissions page and clear instructions for parents.',
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Faculty Directory',
    description:
      'Showcase your experienced and dedicated staff with professional profiles and photos.',
  },
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: 'Smart Toppers Grid',
    description:
      'Celebrate student achievement. Proudly display photos and results of your academic toppers in a beautiful grid.',
  },
  {
    icon: <ImageIcon className="h-10 w-10 text-primary" />,
    title: 'Photo & Video Gallery',
    description:
      'Bring your campus to life. Easily upload and manage albums for events, sports days, and school functions.',
  },
  {
    icon: <CalendarDays className="h-10 w-10 text-primary" />,
    title: 'Events & News Calendar',
    description:
      'Keep everyone informed with a simple, up-to-date calendar of upcoming events and school news.',
  },
  {
    icon: <Smartphone className="h-10 w-10 text-primary" />,
    title: 'Mobile-First Design',
    description:
      'Your website will look perfect and be easy to use on any device—from a smartphone to a desktop computer.',
  },
];

export function IncludedFeatures() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <SectionHeading>Everything You Need to Shine Online</SectionHeading>

        {/* 
          A responsive grid that shows 1 column on mobile, 2 on tablets, 
          and 4 on larger desktops for a balanced look.
        */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuresList.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-start rounded-xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-primary hover:shadow-lg"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="mb-2 font-display text-lg font-bold text-dark">
                {feature.title}
              </h3>
              <p className="text-sm text-dark/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
