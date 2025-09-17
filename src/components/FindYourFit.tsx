// src/components/FindYourFit.tsx
"use client"; // This is crucial for interactivity

import { useState } from 'react';
import { SectionHeading } from './SectionHeading';

// Data for the tabs
const tabData = {
  schools: {
    tabTitle: 'For Established Institutions',
    youNeed: ['A credible, professional online presence', 'Streamlined admissions information', 'A way to celebrate student success'],
    weProvide: ['Professional Showcase Website with About & Vision pages', 'Dedicated Admissions Portal section', 'The Smart Toppers Grid & Photo Galleries'],
  },
  coaching: {
    tabTitle: 'For the Competitive Edge',
    youNeed: ['Clarity on courses, batches, and faculty', 'A way to announce results and news instantly', 'A brand that stands out from competitors'],
    weProvide: ['Customizable pages for Course Details & Faculty', 'Easy-to-update Events & Announcements Module', 'Stunning, Mobile-First Design'],
  },
  tutors: {
    tabTitle: 'For the Passionate Educator',
    youNeed: ['A professional hub for your personal brand', 'An affordable, all-in-one solution', 'A simple way to manage inquiries'],
    weProvide: ['Beautiful, fast Single-Page Portfolio Website', 'All-Inclusive Hosting so you can focus on teaching', 'Integrated Contact Form for new students'],
  },
};

type TabKey = keyof typeof tabData;

export function FindYourFit() {
  const [activeTab, setActiveTab] = useState<TabKey>('schools');
  const activeContent = tabData[activeTab];

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <SectionHeading>A Platform Built for Your World</SectionHeading>
        </div>

        {/* Tab Buttons */}
        <div className="mt-12 flex justify-center border-b border-slate-200">
          {Object.keys(tabData).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as TabKey)}
              className={`px-6 py-3 font-semibold text-lg transition-colors -mb-px
                ${activeTab === key
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-dark/50 hover:text-primary'
                }`}
            >
              {tabData[key as TabKey].tabTitle}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="bg-blue-50 p-8 rounded-lg">
            <h3 className="text-xl font-bold font-display text-primary mb-4">You Need:</h3>
            <ul className="space-y-3 list-disc list-inside text-dark/80">
              {activeContent.youNeed.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="bg-green-50 p-8 rounded-lg">
            <h3 className="text-xl font-bold font-display text-green-700 mb-4">Indivio Provides:</h3>
            <ul className="space-y-3 list-disc list-inside text-dark/80">
              {activeContent.weProvide.map(item => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}