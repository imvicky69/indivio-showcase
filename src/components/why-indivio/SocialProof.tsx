// src/components/SocialProof.tsx
'use client';

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { SectionHeading } from '../SectionHeading';
import { ArrowLeft, ArrowRight, Star, Users, GraduationCap, BookOpen } from 'lucide-react';

const testimonials = [
  {
    quote:
      "Indivio transformed our school's online presence completely. Parents now easily find admission information, view our achievements, and stay updated with school events. Our admission inquiries increased by 40% in just 6 months!",
    author: 'Mrs. Priya Sharma',
    position: 'Principal',
    institution: 'Sunrise Public School, Delhi',
    students: '1,200+ Students',
    type: 'school',
    rating: 5,
    highlight: 'Increased admissions by 40%'
  },
  {
    quote:
      'As a teacher for 15 years, I was initially hesitant about technology. But Indivio made it so simple! I can now update student achievements, post class photos, and communicate with parents effortlessly. The parent feedback has been overwhelmingly positive.',
    author: 'Mr. Rajesh Kumar',
    position: 'Senior Mathematics Teacher',
    institution: 'St. Mary\'s High School, Mumbai',
    students: '800+ Students',
    type: 'teacher',
    rating: 5,
    highlight: 'Easy teacher adoption'
  },
  {
    quote:
      'Managing our coaching center became so much easier with Indivio. We can showcase our results, manage batch schedules, and handle admissions seamlessly. Parents appreciate the transparency and professional approach.',
    author: 'Dr. Anjali Singh',
    position: 'Director',
    institution: 'Apex IIT-JEE Coaching, Kota',
    students: '500+ Students',
    type: 'coaching',
    rating: 5,
    highlight: 'Streamlined operations'
  },
  {
    quote:
      'The Smart Toppers Grid feature is amazing! Our students feel proud seeing their achievements displayed professionally. It has become a great motivation for other students to perform better. Parents share these achievements on social media, giving us free publicity.',
    author: 'Ms. Kavita Patel',
    position: 'Academic Coordinator',
    institution: 'Bright Future School, Pune',
    students: '600+ Students',
    type: 'school',
    rating: 5,
    highlight: 'Student motivation increased'
  },
  {
    quote:
      'As an independent tutor, having a professional website was always a dream. Indivio made it affordable and hassle-free. Now I get inquiries from across the city, and parents trust me more because of my professional online presence.',
    author: 'Prof. Mohit Gupta',
    position: 'Physics & Chemistry Tutor',
    institution: 'Individual Practice, Jaipur',
    students: '150+ Students',
    type: 'tutor',
    rating: 5,
    highlight: 'Expanded reach city-wide'
  },
  {
    quote:
      'The parent communication features have been a game-changer. We send updates about assignments, events, and achievements instantly. Parents are more engaged, and we\'ve reduced miscommunication significantly. The admin dashboard is incredibly user-friendly.',
    author: 'Mrs. Deepika Agarwal',
    position: 'Administrative Head',
    institution: 'Green Valley International School, Bangalore',
    students: '2,000+ Students',
    type: 'admin',
    rating: 5,
    highlight: 'Improved parent engagement'
  },
  {
    quote:
      'During admission season, our website handles hundreds of applications without any issues. The online admission system has reduced our paperwork by 80% and made the process smooth for parents. We can track everything digitally.',
    author: 'Mr. Sanjay Krishnamurthy',
    position: 'Admission Officer',
    institution: 'Chennai Public School, Chennai',
    students: '1,500+ Students',
    type: 'admin',
    rating: 5,
    highlight: 'Reduced paperwork by 80%'
  },
  {
    quote:
      'Our rural school now has the same professional online presence as city schools. Parents in nearby villages can easily access information about our programs. It has helped us break geographical barriers and attract students from wider areas.',
    author: 'Mr. Ravi Yadav',
    position: 'Principal',
    institution: 'Rural Excellence School, Haryana',
    students: '300+ Students',
    type: 'rural',
    rating: 5,
    highlight: 'Broke geographical barriers'
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'school':
      return <GraduationCap className="h-5 w-5" />;
    case 'teacher':
      return <BookOpen className="h-5 w-5" />;
    case 'coaching':
      return <Users className="h-5 w-5" />;
    case 'tutor':
      return <BookOpen className="h-5 w-5" />;
    case 'admin':
      return <Users className="h-5 w-5" />;
    case 'rural':
      return <GraduationCap className="h-5 w-5" />;
    default:
      return <Users className="h-5 w-5" />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'school':
      return 'text-blue-600 bg-blue-50';
    case 'teacher':
      return 'text-green-600 bg-green-50';
    case 'coaching':
      return 'text-purple-600 bg-purple-50';
    case 'tutor':
      return 'text-orange-600 bg-orange-50';
    case 'admin':
      return 'text-indigo-600 bg-indigo-50';
    case 'rural':
      return 'text-emerald-600 bg-emerald-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

export function SocialProof() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    skipSnaps: false,
    dragFree: true
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <SectionHeading>Trusted by Educators Across India</SectionHeading>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            From small rural schools to large urban institutions, see how Indivio is transforming 
            education management and helping schools grow digitally.
          </p>
        </div>

        {/* Statistics Row */}
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-8 text-center md:grid-cols-4">
          <div>
            <div className="text-3xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">Happy Schools</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">2L+</div>
            <div className="text-sm text-muted-foreground">Students Served</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">98%</div>
            <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">Support Available</div>
          </div>
        </div>

        {/* Enhanced Testimonials Carousel */}
        <div className="relative mx-auto mt-16 max-w-6xl">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 flex-grow-0 px-4 md:w-1/2 lg:w-1/3">
                  <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-8 transition-all duration-300 hover:shadow-lg">
                    {/* Header with rating and type */}
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${getTypeColor(testimonial.type)}`}>
                        {getTypeIcon(testimonial.type)}
                        {testimonial.type.charAt(0).toUpperCase() + testimonial.type.slice(1)}
                      </div>
                    </div>

                    {/* Quote */}
                    <p className="text-dark/80 mb-6 text-base leading-relaxed">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>

                    {/* Highlight */}
                    <div className="mb-4 rounded-lg bg-primary/10 p-3 text-center">
                      <div className="text-sm font-semibold text-primary">Key Impact:</div>
                      <div className="text-sm text-primary">{testimonial.highlight}</div>
                    </div>

                    {/* Author Info */}
                    <div className="border-t border-slate-200 pt-4">
                      <div className="font-display text-lg font-bold text-primary">
                        {testimonial.author}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.position}
                      </div>
                      <div className="text-sm font-medium text-foreground">
                        {testimonial.institution}
                      </div>
                      <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        {testimonial.students}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition hover:bg-slate-100"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="h-6 w-6 text-primary" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition hover:bg-slate-100"
            aria-label="Next testimonial"
          >
            <ArrowRight className="h-6 w-6 text-primary" />
          </button>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-8">
            <h3 className="mb-4 font-display text-2xl font-bold text-foreground">
              Ready to Join These Success Stories?
            </h3>
            <p className="mb-6 text-muted-foreground">
              See how Indivio can transform your school's digital presence and operations.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button className="rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90">
                Start Your Transformation
              </button>
              <button className="rounded-full border border-primary px-8 py-3 font-semibold text-primary transition hover:bg-primary/10">
                Talk to Our Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
