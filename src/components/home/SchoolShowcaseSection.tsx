// src/components/home/SchoolShowcaseSection.tsx
'use client';

import { useState } from 'react';
import { SectionHeading } from '../SectionHeading';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Award, 
  ExternalLink,
  ArrowRight,
  MapPin,
  Star,
  Calendar,
  Image as ImageIcon
} from 'lucide-react';

const schoolShowcases = [
  {
    id: 'primary-school',
    type: 'Primary School',
    name: 'Sunshine Primary School',
    location: 'Mumbai, Maharashtra',
    description: 'A vibrant primary school focusing on holistic child development with modern teaching methods.',
    features: ['Student Achievement Gallery', 'Parent Communication Portal', 'Event Calendar', 'Admission Management'],
    highlights: {
      students: '850+',
      rating: '4.8',
      established: '1995'
    },
    image: '/showcase/primary-school.jpg',
    color: 'bg-blue-50 border-blue-200',
    accentColor: 'text-blue-600',
    icon: <GraduationCap className="h-6 w-6" />
  },
  {
    id: 'high-school',
    type: 'High School',
    name: 'Delhi International High School',
    location: 'Delhi, NCR',
    description: 'Premier high school with focus on academic excellence, sports, and extracurricular activities.',
    features: ['Advanced Toppers Grid', 'Faculty Profiles', 'Sports Achievement Showcase', 'Alumni Network'],
    highlights: {
      students: '1,200+',
      rating: '4.9',
      established: '1982'
    },
    image: '/showcase/high-school.jpg',
    color: 'bg-green-50 border-green-200',
    accentColor: 'text-green-600',
    icon: <Award className="h-6 w-6" />
  },
  {
    id: 'coaching-center',
    type: 'Coaching Center',
    name: 'Elite IIT-JEE Academy',
    location: 'Kota, Rajasthan',
    description: 'Leading coaching institute for competitive exams with proven track record of success.',
    features: ['Result Analytics Dashboard', 'Course Management', 'Student Progress Tracking', 'Online Test Series'],
    highlights: {
      students: '2,500+',
      rating: '4.7',
      established: '2005'
    },
    image: '/showcase/coaching-center.jpg',
    color: 'bg-purple-50 border-purple-200',
    accentColor: 'text-purple-600',
    icon: <BookOpen className="h-6 w-6" />
  },
  {
    id: 'international-school',
    type: 'International School',
    name: 'Bangalore World School',
    location: 'Bangalore, Karnataka',
    description: 'World-class international curriculum with focus on global citizenship and innovation.',
    features: ['Multi-language Support', 'International Program Showcase', 'Global Alumni Network', 'Virtual Campus Tours'],
    highlights: {
      students: '800+',
      rating: '4.9',
      established: '2010'
    },
    image: '/showcase/international-school.jpg',
    color: 'bg-orange-50 border-orange-200',
    accentColor: 'text-orange-600',
    icon: <Users className="h-6 w-6" />
  }
];

const websiteFeatures = [
  {
    icon: <ImageIcon className="h-5 w-5" />,
    name: 'Photo Galleries',
    description: 'Showcase school life and events'
  },
  {
    icon: <Calendar className="h-5 w-5" />,
    name: 'Event Management',
    description: 'Keep community informed'
  },
  {
    icon: <Award className="h-5 w-5" />,
    name: 'Achievement Display',
    description: 'Celebrate student success'
  },
  {
    icon: <Users className="h-5 w-5" />,
    name: 'Faculty Profiles',
    description: 'Highlight qualified staff'
  }
];

export function SchoolShowcaseSection() {
  const [selectedSchool, setSelectedSchool] = useState(schoolShowcases[0]);

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <SectionHeading>See Indivio in Action Across Different School Types</SectionHeading>
        
        <div className="mb-12 text-center">
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            From small primary schools to large coaching institutes, see how Indivio adapts to 
            different educational environments while maintaining excellence in design and functionality.
          </p>
        </div>

        {/* School Type Selector */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {schoolShowcases.map((school) => (
            <button
              key={school.id}
              onClick={() => setSelectedSchool(school)}
              className={`flex items-center gap-2 rounded-full px-6 py-3 font-medium transition ${
                selectedSchool.id === school.id
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {school.icon}
              {school.type}
            </button>
          ))}
        </div>

        {/* Selected School Showcase */}
        <div className="mx-auto max-w-6xl">
          <div className={`rounded-2xl border-2 p-8 ${selectedSchool.color}`}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* School Information */}
              <div>
                <div className="mb-6">
                  <div className="mb-2 flex items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${selectedSchool.accentColor} bg-white/50`}>
                      {selectedSchool.type}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{selectedSchool.highlights.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="mb-2 font-display text-2xl font-bold text-foreground">
                    {selectedSchool.name}
                  </h3>
                  
                  <div className="mb-4 flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedSchool.location}</span>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedSchool.description}
                  </p>
                </div>

                {/* School Stats */}
                <div className="mb-6 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${selectedSchool.accentColor}`}>
                      {selectedSchool.highlights.students}
                    </div>
                    <div className="text-xs text-muted-foreground">Students</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${selectedSchool.accentColor}`}>
                      {selectedSchool.highlights.rating}★
                    </div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${selectedSchool.accentColor}`}>
                      {selectedSchool.highlights.established}
                    </div>
                    <div className="text-xs text-muted-foreground">Established</div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="mb-6">
                  <h4 className="mb-3 font-semibold text-foreground">Key Features Used:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedSchool.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className={`h-2 w-2 rounded-full ${selectedSchool.accentColor} bg-current`}></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:bg-primary/90">
                    <ExternalLink className="h-4 w-4" />
                    View Live Demo
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-lg border border-primary px-6 py-3 font-medium text-primary transition hover:bg-primary/10">
                    Create Similar Website
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Website Preview */}
              <div className="flex items-center justify-center">
                <div className="w-full max-w-md">
                  {/* Browser Window Mock */}
                  <div className="rounded-2xl border border-slate-300 bg-white shadow-xl">
                    {/* Browser Header */}
                    <div className="flex items-center gap-2 rounded-t-2xl bg-slate-100 p-4">
                      <div className="h-3 w-3 rounded-full bg-red-400"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                      <div className="h-3 w-3 rounded-full bg-green-400"></div>
                      <div className="ml-4 flex-1 rounded bg-slate-200 px-3 py-1 text-xs text-slate-500">
                        {selectedSchool.name.toLowerCase().replace(/\s+/g, '')}.indivio.in
                      </div>
                    </div>
                    
                    {/* Website Content Preview */}
                    <div className="p-6">
                      <div className="mb-4 h-24 rounded-lg bg-gradient-to-r from-primary/20 to-primary/10"></div>
                      <div className="mb-3 h-4 w-3/4 rounded bg-slate-200"></div>
                      <div className="mb-3 h-3 w-full rounded bg-slate-100"></div>
                      <div className="mb-3 h-3 w-5/6 rounded bg-slate-100"></div>
                      <div className="mb-4 grid grid-cols-2 gap-2">
                        <div className="h-12 rounded bg-slate-100"></div>
                        <div className="h-12 rounded bg-slate-100"></div>
                      </div>
                      <div className="h-8 w-1/2 rounded bg-primary/20"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Common Website Features */}
        <div className="mt-16">
          <h3 className="mb-8 text-center font-display text-2xl font-bold text-foreground">
            Common Features Across All School Types
          </h3>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {websiteFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h4 className="mb-1 font-medium text-foreground">{feature.name}</h4>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="mx-auto max-w-2xl rounded-2xl bg-slate-50 p-8">
            <h3 className="mb-4 font-display text-2xl font-bold text-foreground">
              Ready to Create Your School's Success Story?
            </h3>
            <p className="mb-6 text-muted-foreground">
              Join these successful institutions and create a digital presence that drives admissions and engagement.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button className="rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90">
                Start Building Your Website
              </button>
              <button className="rounded-full border border-primary px-8 py-3 font-semibold text-primary transition hover:bg-primary/10">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}