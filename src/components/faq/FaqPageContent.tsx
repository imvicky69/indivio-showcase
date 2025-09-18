// src/components/FaqPageContent.tsx
'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { AccordionItem } from './AccordionItem';

// Comprehensive FAQ data structured by category
const faqData = [
  {
    category: 'General Questions',
    questions: [
      {
        id: 'g1',
        q: 'What is Indivio and who is it for?',
        a: "Indivio is an all-in-one platform providing schools, coaching centers, and individual tutors with a professional website and management dashboard. It's for any educational institution in India looking for an affordable, modern, and hassle-free digital presence.",
      },
      {
        id: 'g2',
        q: 'How is Indivio different from a generic website builder like Wix?',
        a: 'While Wix is a general tool, Indivio is built specifically for educators. We provide tailored features like a "Smart Toppers Grid" and an "Events Calendar" out of the box. More importantly, we are a full-service partner—we handle the entire setup, hosting, and security for you.',
      },
    ],
  },
  {
    category: 'Website Features',
    questions: [
      {
        id: 'f1',
        q: 'Can I have a photo and video gallery?',
        a: 'Yes! Our Growth and Pro plans include a beautiful, easy-to-manage gallery module to showcase your campus life, events, and functions.',
      },
      {
        id: 'f2',
        q: 'Is the website mobile-friendly?',
        a: 'Absolutely. Every website we build uses a "mobile-first" design approach, ensuring it looks perfect and is easy to use on all devices, from smartphones to desktops.',
      },
      {
        id: 'f3',
        q: 'Can I update the content myself?',
        a: 'Yes! Every plan includes access to your secure Admin Dashboard. From there, you can easily update text, upload photos, post news, and manage your toppers grid without any technical knowledge.',
      },
    ],
  },
  {
    category: 'Pricing & Billing',
    questions: [
      {
        id: 'p1',
        q: 'What is included in the first-year fee?',
        a: 'The one-time first-year fee is all-inclusive. It covers the complete design and development of your website, 1 year of secure hosting, a free `.indivio.in` subdomain, and our onboarding support.',
      },
      {
        id: 'p2',
        q: 'What is the renewal cost after one year?',
        a: 'To keep your website live after the first year, we charge a simple, affordable annual renewal fee starting at just ₹999/year. This covers your hosting, maintenance, and ongoing support.',
      },
      {
        id: 'p3',
        q: 'Are there any hidden fees?',
        a: 'No. We believe in honest, transparent pricing. The price you see for the plan is what you pay for the entire first year. There are no hidden setup fees or charges.',
      },
    ],
  },
  {
    category: 'Technical & Hosting',
    questions: [
      {
        id: 't1',
        q: 'Do I need to buy my own hosting or domain?',
        a: "No, you don't need to buy hosting; it's included. A free `.indivio.in` subdomain is also included. If you want a custom domain (like `www.yourschool.com`), you can purchase one and connect it with our Growth or Pro plans.",
      },
      {
        id: 't2',
        q: 'How do you ensure my website is secure?',
        a: "Your website is built on Google's secure cloud infrastructure and includes an SSL certificate for encrypted connections. We handle all security updates and maintenance behind the scenes.",
      },
    ],
  },
  {
    category: 'Onboarding Process',
    questions: [
      {
        id: 'o1',
        q: 'How long does it take to get my website live?',
        a: 'Our standard launch process takes just 7 business days from the time we receive all your required content (text, photos, logo).',
      },
      {
        id: 'o2',
        q: 'What information do I need to provide?',
        a: 'We\'ll provide you with a simple checklist. Generally, this includes your school\'s logo, the text for each page (like "About Us"), photos for the gallery, and details for your toppers grid.',
      },
    ],
  },
];

export function FaqPageContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openId, setOpenId] = useState<string | null>('g1'); // Default to first question open

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = useMemo(() => {
    if (!searchTerm) return faqData;

    const lowercasedFilter = searchTerm.toLowerCase();

    return faqData
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (item) =>
            item.q.toLowerCase().includes(lowercasedFilter) ||
            item.a.toLowerCase().includes(lowercasedFilter)
        ),
      }))
      .filter((category) => category.questions.length > 0);
  }, [searchTerm]);

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto max-w-4xl px-6">
        {/* Search Bar */}
        <div className="relative mb-12">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-4 pl-12 transition focus:border-primary focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-400" />
        </div>

        {/* FAQ Categories & Questions */}
        <div className="space-y-12">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((category) => (
              <div key={category.category}>
                <h2 className="mb-4 border-b border-slate-200 pb-2 font-display text-2xl font-bold text-primary">
                  {category.category}
                </h2>
                <div className="space-y-2">
                  {category.questions.map((item) => (
                    <AccordionItem
                      key={item.id}
                      question={item.q}
                      answer={item.a}
                      isOpen={openId === item.id}
                      onToggle={() => handleToggle(item.id)}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-dark/60 py-12 text-center">
              <h3 className="text-xl font-semibold">No results found</h3>
              <p>Try searching with different keywords.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
