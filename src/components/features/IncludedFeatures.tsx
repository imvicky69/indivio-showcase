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
  MessageCircle,
  CreditCard,
  Shield,
  BarChart3,
} from 'lucide-react';

// Enhanced data array with more comprehensive features for schools and teachers
const featuresList = [
  {
    icon: <LayoutDashboard className="h-10 w-10 text-primary" />,
    title: 'Dynamic Homepage Builder',
    description:
      'Create stunning first impressions with customizable hero sections, announcements, and welcome messages. Update content instantly without any technical knowledge.',
  },
  {
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    title: 'Complete School Profile Pages',
    description:
      "Showcase your institution's unique story, history, mission, vision, and values. Build trust with comprehensive about pages that connect with prospective parents.",
  },
  {
    icon: <ClipboardEdit className="h-10 w-10 text-primary" />,
    title: 'Smart Admissions Portal',
    description:
      'Streamline your admission process with online applications, document uploads, fee payments, and automated workflows. Reduce paperwork by 80%.',
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Faculty Management System',
    description:
      'Highlight your experienced teaching staff with professional profiles, qualifications, achievements, and photos. Build credibility with detailed faculty information.',
  },
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: 'Smart Academic Achievers Grid',
    description:
      'Celebrate student excellence with automated toppers displays, result analytics, and achievement galleries. Motivate students and attract new admissions.',
  },
  {
    icon: <ImageIcon className="h-10 w-10 text-primary" />,
    title: 'Multimedia Gallery System',
    description:
      'Bring your campus to life with organized photo and video galleries for events, sports, cultural activities, and daily school life.',
  },
  {
    icon: <CalendarDays className="h-10 w-10 text-primary" />,
    title: 'Events & News Management',
    description:
      'Keep your community informed with comprehensive event calendars, school news, holiday schedules, and important announcements.',
  },
  {
    icon: <Smartphone className="h-10 w-10 text-primary" />,
    title: 'Mobile-First Experience',
    description:
      'Ensure perfect functionality across all devices with responsive design, mobile apps, offline access, and push notifications.',
  },
  {
    icon: <MessageCircle className="h-10 w-10 text-primary" />,
    title: 'Parent Communication Hub',
    description:
      'Bridge the gap between school and home with direct messaging, progress reports, feedback systems, and automated notifications.',
  },
  {
    icon: <CreditCard className="h-10 w-10 text-primary" />,
    title: 'Online Fee Management',
    description:
      'Simplify fee collection with secure payment gateways, automated receipts, installment plans, and comprehensive financial tracking.',
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: 'Enterprise Security & Privacy',
    description:
      'Protect sensitive data with bank-level security, regular backups, privacy compliance, and secure access controls for all users.',
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
    title: 'Analytics & Growth Insights',
    description:
      'Make data-driven decisions with detailed analytics on website traffic, admission trends, student performance, and parent engagement.',
  },
];

export function IncludedFeatures() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <SectionHeading>Complete Education Management Platform</SectionHeading>
        
        <div className="mb-12 text-center">
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Every feature designed specifically for educational institutions. From basic website needs 
            to advanced management tools, we've got everything covered in one comprehensive platform.
          </p>
        </div>

        {/* Enhanced grid with more comprehensive features */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuresList.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-primary hover:shadow-xl"
            >
              {/* Feature Icon */}
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                {feature.icon}
              </div>

              {/* Feature Content */}
              <h3 className="mb-3 font-display text-lg font-bold text-dark">
                {feature.title}
              </h3>
              <p className="text-dark/70 mb-4 leading-relaxed">{feature.description}</p>

              {/* Additional details for enhanced UX */}
              <div className="rounded-lg bg-primary/5 p-3">
                <div className="text-xs font-medium text-primary">Perfect for:</div>
                <div className="text-xs text-primary/80">
                  {index % 3 === 0 && 'Schools & Colleges'}
                  {index % 3 === 1 && 'Teachers & Staff'}
                  {index % 3 === 2 && 'Parents & Students'}
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>
          ))}
        </div>

        {/* Call-to-action section */}
        <div className="mt-16">
          <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-8 text-center">
            <h3 className="mb-4 font-display text-2xl font-bold text-foreground">
              Everything Your School Needs in One Platform
            </h3>
            <p className="mb-6 text-lg text-muted-foreground">
              Stop juggling multiple tools. Get everything you need to manage and grow your educational institution 
              in one comprehensive, easy-to-use platform.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button className="rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90">
                Start Your Digital Transformation
              </button>
              <button className="rounded-full border border-primary px-8 py-3 font-semibold text-primary transition hover:bg-primary/10">
                See All Features in Action
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
