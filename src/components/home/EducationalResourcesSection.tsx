// src/components/home/EducationalResourcesSection.tsx
import { SectionHeading } from '../SectionHeading';
import { 
  BookOpen, 
  Video, 
  FileText, 
  Users, 
  Download, 
  ExternalLink,
  Lightbulb,
  Target,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const resourceCategories = [
  {
    id: 'guides',
    title: 'Implementation Guides',
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    description: 'Step-by-step guides for digital transformation',
    resources: [
      {
        title: 'Complete School Digital Transformation Checklist',
        description: 'A comprehensive 50-point checklist covering everything from website setup to parent onboarding.',
        type: 'PDF Guide',
        duration: '15 min read',
        featured: true
      },
      {
        title: 'Teacher Training Manual for Digital Tools',
        description: 'Help your faculty adapt to digital tools with our proven training methodology.',
        type: 'Training Manual',
        duration: '30 min read'
      },
      {
        title: 'Parent Communication Best Practices',
        description: 'Strategies to improve parent engagement through digital channels.',
        type: 'Best Practices',
        duration: '10 min read'
      }
    ]
  },
  {
    id: 'tutorials',
    title: 'Video Tutorials',
    icon: <Video className="h-8 w-8 text-primary" />,
    description: 'Watch and learn from real school implementations',
    resources: [
      {
        title: 'Setting Up Your School Website in 7 Days',
        description: 'Follow along as we set up a complete school website from planning to launch.',
        type: 'Video Series',
        duration: '45 min total',
        featured: true
      },
      {
        title: 'Managing Student Achievements & Toppers Grid',
        description: 'Learn how to showcase student success and motivate your entire school community.',
        type: 'Tutorial Video',
        duration: '12 min'
      },
      {
        title: 'Admission Season Management Made Easy',
        description: 'Handle admission rush efficiently with digital tools and automation.',
        type: 'Case Study Video',
        duration: '18 min'
      }
    ]
  },
  {
    id: 'templates',
    title: 'Templates & Tools',
    icon: <FileText className="h-8 w-8 text-primary" />,
    description: 'Ready-to-use templates for quick implementation',
    resources: [
      {
        title: 'School Website Content Templates',
        description: 'Pre-written content for About Us, Admission, and Faculty pages tailored for Indian schools.',
        type: 'Content Templates',
        duration: 'Ready to use',
        featured: true
      },
      {
        title: 'Parent Communication Email Templates',
        description: 'Professional email templates for announcements, events, and academic updates.',
        type: 'Email Templates',
        duration: 'Ready to use'
      },
      {
        title: 'Social Media Content Calendar for Schools',
        description: 'A complete month\'s worth of social media content ideas for educational institutions.',
        type: 'Social Media Kit',
        duration: 'Monthly planner'
      }
    ]
  },
  {
    id: 'case-studies',
    title: 'Success Stories',
    icon: <Target className="h-8 w-8 text-primary" />,
    description: 'Learn from schools that transformed digitally',
    resources: [
      {
        title: 'How Delhi School Increased Admissions by 60%',
        description: 'Complete case study of digital transformation leading to significant admission growth.',
        type: 'Case Study',
        duration: '8 min read',
        featured: true
      },
      {
        title: 'Rural School\'s Journey to Digital Excellence',
        description: 'Inspiring story of how a small rural school leveraged technology for growth.',
        type: 'Success Story',
        duration: '6 min read'
      },
      {
        title: 'Coaching Center\'s 3x Revenue Growth Strategy',
        description: 'How digital tools helped a coaching center triple their revenue in 18 months.',
        type: 'Case Study',
        duration: '10 min read'
      }
    ]
  }
];

const benefits = [
  {
    icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
    title: 'Implementation Made Simple',
    description: 'Clear, actionable guidance for every step of your digital journey'
  },
  {
    icon: <Users className="h-6 w-6 text-blue-500" />,
    title: 'Proven by 500+ Schools',
    description: 'Strategies tested and refined by hundreds of educational institutions'
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-green-500" />,
    title: 'Zero Learning Curve',
    description: 'Designed specifically for educators, not tech experts'
  }
];

export function EducationalResourcesSection() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <SectionHeading>Educational Resources & Learning Center</SectionHeading>
        
        <div className="mb-12 text-center">
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Beyond just providing software, we're committed to your success. Access our comprehensive 
            library of guides, tutorials, and resources designed specifically for Indian educational institutions.
          </p>
        </div>

        {/* Benefits Overview */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-4 rounded-xl bg-white p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                {benefit.icon}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Resource Categories */}
        <div className="space-y-16">
          {resourceCategories.map((category, categoryIndex) => (
            <div key={category.id} className="rounded-2xl bg-white p-8">
              {/* Category Header */}
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>

              {/* Resources Grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {category.resources.map((resource, resourceIndex) => (
                  <div
                    key={resourceIndex}
                    className={`group relative overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:shadow-lg ${
                      resource.featured
                        ? 'border-primary bg-primary/5'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    {/* Featured Badge */}
                    {resource.featured && (
                      <div className="absolute right-4 top-4">
                        <span className="rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                          Popular
                        </span>
                      </div>
                    )}

                    {/* Resource Content */}
                    <div className="mb-4">
                      <h4 className="mb-2 font-display text-lg font-bold text-foreground">
                        {resource.title}
                      </h4>
                      <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                        {resource.description}
                      </p>
                    </div>

                    {/* Resource Meta */}
                    <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="rounded-full bg-white/50 px-2 py-1 font-medium">
                        {resource.type}
                      </span>
                      <span>{resource.duration}</span>
                    </div>

                    {/* Action Button */}
                    <button className={`flex w-full items-center justify-center gap-2 rounded-lg py-2 px-4 text-sm font-medium transition ${
                      resource.featured
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-white text-foreground hover:bg-slate-100'
                    }`}>
                      {category.id === 'tutorials' ? (
                        <>
                          <Video className="h-4 w-4" />
                          Watch Now
                        </>
                      ) : category.id === 'templates' ? (
                        <>
                          <Download className="h-4 w-4" />
                          Download
                        </>
                      ) : (
                        <>
                          <ExternalLink className="h-4 w-4" />
                          Read More
                        </>
                      )}
                    </button>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-8">
            <h3 className="mb-4 font-display text-2xl font-bold text-foreground">
              Ready to Start Your Digital Transformation?
            </h3>
            <p className="mb-6 text-lg text-muted-foreground">
              Access all these resources and more when you join the Indivio community. 
              Our education specialists are here to guide you every step of the way.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button className="flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90">
                Get Started Today
                <ArrowRight className="h-4 w-4" />
              </button>
              <button className="rounded-full border border-primary px-8 py-3 font-semibold text-primary transition hover:bg-primary/10">
                Talk to Education Specialist
              </button>
            </div>
            
            {/* Additional Info */}
            <div className="mt-6 text-sm text-muted-foreground">
              <p>🎯 <strong>Free consultation included</strong> • 📚 <strong>All resources included</strong> • 🤝 <strong>Ongoing support guaranteed</strong></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}