// src/components/SocialProof.tsx
'use client';

import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { SectionHeading } from '../SectionHeading';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    quote:
      "Indivio gave our school the professional online presence we always wanted but thought we couldn't afford. The process was seamless, and the toppers grid is a huge hit with parents!",
    author: 'Principal',
    institution: 'Sunrise Public School',
  },
  {
    quote:
      'Managing our course announcements and faculty profiles is incredibly easy now. Our new website looks fantastic and has directly led to an increase in admission inquiries.',
    author: 'Director',
    institution: 'Apex Coaching Academy',
  },
  {
    quote:
      'As an independent tutor, having a credible website has been a game-changer for my personal brand. The all-inclusive plan is perfect and so affordable.',
    author: 'Physics Tutor',
    institution: 'Self-Employed',
  },
];

export function SocialProof() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

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
          <SectionHeading>Loved by Institutions Like Yours</SectionHeading>
        </div>

        <div className="relative mx-auto mt-12 max-w-4xl">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 flex-grow-0">
                  <div className="p-8 text-center">
                    <p className="text-dark/80 text-2xl italic">
                      &apos;{testimonial.quote}&apos;
                    </p>
                    <p className="mt-6 font-display text-lg font-bold text-primary">
                      - {testimonial.author},{' '}
                      <span className="font-normal">
                        {testimonial.institution}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={scrollPrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition hover:bg-slate-100"
          >
            <ArrowLeft className="h-6 w-6 text-primary" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition hover:bg-slate-100"
          >
            <ArrowRight className="h-6 w-6 text-primary" />
          </button>
        </div>
      </div>
    </section>
  );
}
