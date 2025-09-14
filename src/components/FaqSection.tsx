// src/components/FaqSection.tsx

// This directive marks this as a Client Component, allowing interactivity.
"use client"; 

import { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { ChevronDown } from 'lucide-react';

// Data array for our FAQ content
const faqData = [
  {
    question: 'What happens after the first year?',
    answer: 'After the initial one-year term, you only need to pay a small annual renewal fee, which starts at just ₹999/year. This covers your hosting, security, maintenance, and ongoing support.',
  },
  {
    question: 'Can I use my own domain name (e.g., www.myschool.com)?',
    answer: 'Yes! Our Growth and Pro plans are designed for you to connect your own custom domain name, strengthening your school\'s brand and online identity.',
  },
  {
    question: 'Is there a separate setup fee?',
    answer: 'No. The plan price you see is a one-time fee for the entire first year. This includes the complete design, development, and setup of your website with no hidden charges.',
  },
  {
    question: 'Can I upgrade my plan later?',
    answer: 'Absolutely. We understand that your needs can change. You can easily upgrade your plan at any time to access more features as your school grows.',
  },
];

export function FaqSection() {
  // 'useState' tracks which accordion item is open. 'null' means all are closed.
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Start with the first one open

  const handleToggle = (index: number) => {
    // If the clicked item is already open, close it. Otherwise, open it.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <SectionHeading>Your Questions, Answered</SectionHeading>

        <div className="max-w-3xl mx-auto mt-12 space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="border-b border-slate-200">
              <button
                onClick={() => handleToggle(index)}
                className="w-full flex justify-between items-center py-4 text-left"
              >
                <span className="text-lg font-medium text-dark">{faq.question}</span>
                <ChevronDown
                  className={`w-6 h-6 text-primary transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {/* This div's height animates based on the 'openIndex' state */}
              <div
                className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pb-4 text-dark/70">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}