// src/components/SectionHeading.tsx
import React from 'react';

type SectionHeadingProps = {
  children: React.ReactNode;
};

export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4 mb-12">
      {/* <span className="w-7 h-7 sm:w-8 sm:h-8 bg-accent rounded-full flex-shrink-0"></span> */}
      <h2 className="text-3xl sm:text-4xl font-bold text-primary font-display">
        {children}
      </h2>
    </div>
  );
}