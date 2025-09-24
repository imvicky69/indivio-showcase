// src/components/FeaturesSection.tsx
import { SectionHeading } from '../SectionHeading';
import { 
  Globe, 
  Pencil, 
  IndianRupee, 
  Rocket, 
  Users, 
  Award, 
  Calendar, 
  BookOpen,
  MessageCircle,
  Shield,
  Smartphone,
  BarChart3 
} from 'lucide-react';

// Enhanced features data with more school-specific content
const featuresData = [
  {
    icon: <Globe className="h-12 w-12 text-primary" />,
    title: 'Professional School Website',
    description:
      'Create a stunning first impression with a fast, mobile-friendly website that showcases your school\'s excellence and attracts new admissions.',
    benefits: ['SEO Optimized', 'Mobile Responsive', 'Fast Loading']
  },
  {
    icon: <Users className="h-12 w-12 text-primary" />,
    title: 'Student & Faculty Management',
    description:
      'Manage student records, faculty profiles, and academic achievements all in one place. Perfect for schools of any size.',
    benefits: ['Student Profiles', 'Faculty Directory', 'Easy Updates']
  },
  {
    icon: <Award className="h-12 w-12 text-primary" />,
    title: 'Achievement Showcase System',
    description:
      'Highlight your top performers with our Smart Toppers Grid. Celebrate academic excellence and inspire other students.',
    benefits: ['Auto-Updated Grid', 'Photo Gallery', 'Result Analytics']
  },
  {
    icon: <Calendar className="h-12 w-12 text-primary" />,
    title: 'Events & Communication Hub',
    description:
      'Keep parents and students informed with automated event notifications, school announcements, and important updates.',
    benefits: ['Event Calendar', 'Auto Notifications', 'Parent Portal']
  },
  {
    icon: <BookOpen className="h-12 w-12 text-primary" />,
    title: 'Academic Information Portal',
    description:
      'Streamline admissions with dedicated pages for courses, fees, admission procedures, and curriculum details.',
    benefits: ['Course Catalog', 'Fee Structure', 'Admission Forms']
  },
  {
    icon: <IndianRupee className="h-12 w-12 text-primary" />,
    title: 'Fee Management System',
    description:
      'Simplify fee collection with online payment integration, automated receipts, and financial tracking for parents and administrators.',
    benefits: ['Online Payments', 'Auto Receipts', 'Payment History']
  },
  {
    icon: <MessageCircle className="h-12 w-12 text-primary" />,
    title: 'Parent-Teacher Communication',
    description:
      'Bridge the gap between home and school with integrated messaging, progress reports, and parent feedback systems.',
    benefits: ['Direct Messaging', 'Progress Reports', 'Feedback System']
  },
  {
    icon: <Shield className="h-12 w-12 text-primary" />,
    title: 'Secure & Compliant Platform',
    description:
      'Rest easy knowing your school data is protected with enterprise-grade security, regular backups, and compliance standards.',
    benefits: ['Data Security', 'Auto Backups', 'Privacy Compliant']
  },
  {
    icon: <Smartphone className="h-12 w-12 text-primary" />,
    title: 'Mobile-First Experience',
    description:
      'Access everything from anywhere. Teachers, parents, and students can stay connected through any device, anytime.',
    benefits: ['Mobile App Ready', 'Offline Access', 'Push Notifications']
  },
  {
    icon: <BarChart3 className="h-12 w-12 text-primary" />,
    title: 'Analytics & Insights',
    description:
      'Make data-driven decisions with comprehensive analytics on admissions, website traffic, and student performance trends.',
    benefits: ['Admission Analytics', 'Performance Metrics', 'Custom Reports']
  },
  {
    icon: <Pencil className="h-12 w-12 text-primary" />,
    title: 'Easy Content Management',
    description:
      'Update your website content effortlessly with our intuitive dashboard. No technical knowledge required - perfect for busy educators.',
    benefits: ['Drag & Drop Editor', 'Real-time Updates', 'No Coding Required']
  },
  {
    icon: <Rocket className="h-12 w-12 text-primary" />,
    title: 'Growth & Marketing Tools',
    description:
      'Grow your school digitally with built-in SEO, social media integration, and marketing tools designed for educational institutions.',
    benefits: ['SEO Built-in', 'Social Integration', 'Lead Generation']
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-hero-gradient py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <SectionHeading>
          Everything Your School Needs to Thrive Digitally
        </SectionHeading>
        
        <div className="mb-12 text-center">
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            From admission management to parent communication, we've built every feature 
            specifically for the needs of Indian educational institutions.
          </p>
        </div>

        {/* Enhanced responsive grid for better content display */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="group bg-accent-light flex cursor-pointer flex-col rounded-2xl p-8 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">{feature.icon}</div>
                <div className="flex-1">
                  <h3 className="mb-3 font-display text-xl font-bold text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-dark/70 mb-4 leading-relaxed">{feature.description}</p>
                  
                  {/* Benefits list */}
                  <div className="flex flex-wrap gap-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <span
                        key={benefitIndex}
                        className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-action section */}
        <div className="mt-16 text-center">
          <div className="rounded-2xl bg-background/50 p-8 backdrop-blur-sm">
            <h3 className="mb-4 font-display text-2xl font-bold text-foreground">
              Ready to Transform Your School's Digital Presence?
            </h3>
            <p className="mb-6 text-muted-foreground">
              Join hundreds of schools already using Indivio to manage their operations and attract more students.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button className="rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90">
                Start Your Free Trial
              </button>
              <button className="rounded-full border border-primary px-8 py-3 font-semibold text-primary transition hover:bg-primary/10">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
