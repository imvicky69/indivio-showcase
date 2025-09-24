// src/components/HowItWorksSection.tsx
import React from 'react';
import { SectionHeading } from '../SectionHeading';
import { 
  ClipboardCheck, 
  ServerCog, 
  Rocket, 
  ArrowRight, 
  Users, 
  BookOpen, 
  GraduationCap,
  CheckCircle,
  Clock,
  Headphones
} from 'lucide-react';

// Enhanced steps with more detail and sub-steps for educators
const stepsData = [
  {
    icon: <ClipboardCheck className="h-12 w-12 text-primary" />,
    title: 'Choose Your Perfect Plan',
    description: 'Select the plan that fits your school size and requirements. Pay only 50% to get started.',
    details: [
      'Compare features across all plans',
      'Get personalized recommendations',
      'Flexible payment options available'
    ],
    timeframe: '5 minutes',
    userTypes: ['Principal', 'Administrator', 'IT Coordinator']
  },
  {
    icon: <ServerCog className="h-12 w-12 text-primary" />,
    title: 'We Build Your Digital Campus',
    description: 'Our education specialists design and develop your complete website and management system.',
    details: [
      'Custom design matching your school branding',
      'Content migration and organization',
      'Integration with your existing systems',
      'Mobile optimization and testing'
    ],
    timeframe: '7 business days',
    userTypes: ['Our Team', 'Design Specialists', 'Education Consultants']
  },
  {
    icon: <Rocket className="h-12 w-12 text-primary" />,
    title: 'Launch & Empower Your Team',
    description: 'Go live with comprehensive training for your staff and ongoing support for smooth operations.',
    details: [
      'Complete admin dashboard training',
      'Staff onboarding sessions',
      'Parent and student orientation',
      '24/7 technical support access'
    ],
    timeframe: '2-3 days',
    userTypes: ['Teachers', 'Admin Staff', 'IT Support']
  },
];

// Additional support features
const supportFeatures = [
  {
    icon: <Headphones className="h-8 w-8 text-primary" />,
    title: 'Dedicated Support Team',
    description: 'Get help from education technology specialists who understand schools'
  },
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: 'Comprehensive Training',
    description: 'Video tutorials and live training sessions for all staff members'
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'Community Access',
    description: 'Join our community of educators sharing best practices and tips'
  }
];

export function HowItWorksSection() {
  return (
    <section className="bg-hero-gradient py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <SectionHeading>How We Transform Your School Digitally</SectionHeading>
        
        <div className="mb-12 text-center">
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            From planning to launch, we handle everything so you can focus on what matters most - educating students. 
            Here's how we make the digital transformation seamless for your school.
          </p>
        </div>

        {/* Enhanced steps with detailed information */}
        <div className="space-y-16">
          {stepsData.map((step, index) => (
            <div key={index} className="mx-auto max-w-6xl">
              <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-12">
                {/* Step Icon and Number */}
                <div className="flex flex-col items-center text-center lg:w-1/4">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                    {step.icon}
                  </div>
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    {index + 1}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {step.timeframe}
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="mb-4 font-display text-2xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mb-6 text-lg text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Detailed checklist */}
                  <div className="mb-6">
                    <h4 className="mb-3 font-semibold text-foreground">What's Included:</h4>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* User types involved */}
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-medium text-muted-foreground">Involves:</span>
                    {step.userTypes.map((userType, userIndex) => (
                      <span
                        key={userIndex}
                        className="rounded-full bg-background/50 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {userType}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow connector (only show if not last step) */}
                {index < stepsData.length - 1 && (
                  <div className="hidden items-center text-slate-300 lg:flex">
                    <ArrowRight className="h-8 w-8" />
                  </div>
                )}
              </div>

              {/* Mobile arrow (only show if not last step) */}
              {index < stepsData.length - 1 && (
                <div className="mt-8 flex justify-center lg:hidden">
                  <ArrowRight className="h-8 w-8 rotate-90 text-slate-300" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Support Features Section */}
        <div className="mt-20">
          <div className="mx-auto max-w-4xl text-center">
            <h3 className="mb-8 font-display text-2xl font-bold text-foreground">
              Ongoing Support Every Step of the Way
            </h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {supportFeatures.map((feature, index) => (
                <div key={index} className="rounded-xl bg-background/50 p-6 backdrop-blur-sm">
                  <div className="mb-4 flex justify-center">{feature.icon}</div>
                  <h4 className="mb-2 font-semibold text-foreground">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Metrics */}
        <div className="mt-16 rounded-2xl bg-background/50 p-8 text-center backdrop-blur-sm">
          <h3 className="mb-4 font-display text-xl font-bold text-foreground">
            Join 500+ Schools Already Transforming Education
          </h3>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Schools Using Indivio</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">7 Days</div>
              <div className="text-sm text-muted-foreground">Average Setup Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
