// src/components/FaqPageContent.tsx
'use client';

import { useState, useMemo } from 'react';
import { Search, HelpCircle, Users, BookOpen, Settings, CreditCard, Shield } from 'lucide-react';
import { AccordionItem } from './AccordionItem';

// Comprehensive FAQ data structured by category with enhanced school-focused content
const faqData = [
  {
    category: 'Getting Started',
    icon: <HelpCircle className="h-5 w-5" />,
    questions: [
      {
        id: 'g1',
        q: 'What is Indivio and how does it help my school?',
        a: "Indivio is India's first education-focused digital platform that provides schools with a professional website and complete management system. We help schools attract more admissions, communicate better with parents, showcase student achievements, and streamline administrative tasks - all without requiring any technical knowledge from your team.",
      },
      {
        id: 'g2',
        q: "I'm not tech-savvy. Can I still manage my school's website?",
        a: 'Absolutely! Indivio is designed specifically for educators, not developers. Our intuitive dashboard lets you update content, add photos, post announcements, and manage everything with simple point-and-click actions. We also provide comprehensive training and 24/7 support to ensure you\'re always comfortable using the platform.',
      },
      {
        id: 'g3',
        q: 'How is Indivio different from generic website builders like Wix or WordPress?',
        a: 'While generic builders require you to start from scratch and figure out what schools need, Indivio comes pre-built with everything educational institutions require: admission forms, faculty directories, student achievement showcases, event calendars, and parent communication tools. Plus, we handle all the technical maintenance, security, and hosting for you.',
      },
      {
        id: 'g4',
        q: 'What size schools is Indivio suitable for?',
        a: 'Indivio works perfectly for all educational institutions - from small coaching centers with 50 students to large schools with 5000+ students. Our plans are designed to scale with your needs, and our platform can handle high traffic during admission seasons without any performance issues.',
      },
    ],
  },
  {
    category: 'Features for Teachers & Staff',
    icon: <Users className="h-5 w-5" />,
    questions: [
      {
        id: 'f1',
        q: 'How can teachers update student achievements and results?',
        a: 'Teachers can easily log into the admin dashboard and update the Smart Toppers Grid with student photos, scores, and achievements. The system automatically organizes this information beautifully on your website. Teachers can also add student work samples, project photos, and academic milestones through the simple content management system.',
      },
      {
        id: 'f2',
        q: 'Can multiple teachers and staff members access the system?',
        a: 'Yes! You can create different access levels for various staff members. Principals get full access, teachers can update their specific sections, office staff can manage admissions, and you can even give limited access to students for certain activities. Every action is tracked for security and accountability.',
      },
      {
        id: 'f3',
        q: 'How do we communicate with parents through the platform?',
        a: 'Indivio includes multiple communication tools: automated email notifications for events and announcements, a parent portal where parents can access student information, direct messaging capabilities, and even SMS integration for urgent communications. You can send bulk updates or individual messages as needed.',
      },
      {
        id: 'f4',
        q: 'Can we showcase our school events and activities?',
        a: 'Absolutely! The platform includes a comprehensive events management system where you can create event pages, upload photo galleries from school functions, manage event registrations, and even livestream special occasions. Parents love seeing their children\'s school activities documented professionally.',
      },
    ],
  },
  {
    category: 'Student & Parent Experience',
    icon: <BookOpen className="h-5 w-5" />,
    questions: [
      {
        id: 's1',
        q: 'How do parents access information about their children?',
        a: 'Parents receive secure login credentials to access a dedicated parent portal where they can view their child\'s academic progress, attendance records, upcoming events, fee payment history, and direct messages from teachers. Everything is organized clearly and accessible from any device.',
      },
      {
        id: 's2',
        q: 'Can prospective parents apply for admission online?',
        a: 'Yes! Our admission portal streamlines the entire process. Prospective parents can view admission requirements, download forms, submit applications online, upload required documents, track application status, and even schedule admission interviews - all through your website.',
      },
      {
        id: 's3',
        q: 'How do we handle fee payments and receipts?',
        a: 'Indivio integrates with secure payment gateways to accept online fee payments. Parents can pay fees using credit cards, debit cards, UPI, or net banking. The system automatically generates receipts, tracks payment history, sends payment reminders, and provides financial reports for your administration.',
      },
      {
        id: 's4',
        q: 'Is student information kept secure and private?',
        a: 'Student data security is our top priority. We use bank-level encryption, secure cloud hosting, regular security audits, and comply with international data protection standards. Only authorized personnel can access student information, and all activities are logged for security monitoring.',
      },
    ],
  },
  {
    category: 'Technical & Management',
    icon: <Settings className="h-5 w-5" />,
    questions: [
      {
        id: 't1',
        q: 'Do we need to buy separate hosting or domain names?',
        a: "No additional purchases needed! Every plan includes secure cloud hosting on Google's infrastructure, SSL certificates for security, and a free .indivio.in subdomain. If you want a custom domain (like www.yourschool.com), we can help you set that up with our Growth and Pro plans.",
      },
      {
        id: 't2',
        q: 'What happens if our website gets high traffic during admissions?',
        a: 'Our platform is built to handle traffic spikes automatically. During admission seasons when hundreds of parents might visit simultaneously, our cloud infrastructure scales up instantly to ensure your website remains fast and accessible. You never need to worry about technical limitations affecting your admissions.',
      },
      {
        id: 't3',
        q: 'How do you ensure our website loads fast for parents on mobile?',
        a: 'We use advanced optimization techniques including image compression, content delivery networks (CDN), mobile-first design, and efficient coding practices. Our websites typically load in under 2 seconds even on slower mobile connections, ensuring parents can access information quickly from anywhere.',
      },
      {
        id: 't4',
        q: 'Can we integrate with our existing school management software?',
        a: 'Yes! We can integrate with most popular school management systems to sync student data, attendance records, and academic information. This prevents duplicate data entry and ensures everything stays coordinated. Our technical team handles all integration work for you.',
      },
      {
        id: 't5',
        q: 'What if we need customizations specific to our school?',
        a: 'Our Pro plan includes custom feature development. Whether you need specific forms, unique reporting requirements, integration with specialized software, or custom design elements, our development team can build exactly what your school needs while maintaining the platform\'s ease of use.',
      },
    ],
  },
  {
    category: 'Pricing & Plans',
    icon: <CreditCard className="h-5 w-5" />,
    questions: [
      {
        id: 'p1',
        q: 'What exactly is included in the pricing?',
        a: 'Our pricing is completely transparent and all-inclusive. You get complete website design and development, secure cloud hosting, SSL certificates, mobile optimization, content management system, basic SEO setup, email support, and all the features mentioned in your chosen plan. No hidden charges, ever.',
      },
      {
        id: 'p2',
        q: 'Why do you charge only 50% upfront?',
        a: 'We believe in building trust through results. You pay 50% to start your project, and we deliver a complete, functional website. Only after you\'re satisfied with the final result do you pay the remaining 50% and go live. This approach ensures you\'re completely happy with your investment.',
      },
      {
        id: 'p3',
        q: 'What are the renewal costs after the first year?',
        a: 'Renewal costs are significantly lower than the first-year investment. Starter plan renewals begin at ₹2,999/year, Growth at ₹4,999/year, and Pro at ₹7,999/year. These renewal fees cover hosting, maintenance, security updates, and ongoing support - everything needed to keep your school online.',
      },
      {
        id: 'p4',
        q: 'Can we upgrade or downgrade our plan later?',
        a: 'Absolutely! Your school\'s needs may change over time. You can upgrade to access more features anytime by paying the difference, or downgrade during renewal if you need fewer features. We\'ll help you choose the right plan based on your current requirements and growth plans.',
      },
      {
        id: 'p5',
        q: 'Do you offer any discounts for multiple schools or long-term commitments?',
        a: 'Yes! We offer special rates for educational groups managing multiple institutions, NGOs working in education, and schools willing to commit to multi-year plans. We also have seasonal promotions and referral discounts. Contact our team to discuss options that work best for your situation.',
      },
    ],
  },
  {
    category: 'Support & Training',
    icon: <Shield className="h-5 w-5" />,
    questions: [
      {
        id: 'sup1',
        q: 'What kind of training do you provide to our staff?',
        a: 'We provide comprehensive training including live video sessions for your admin team, recorded tutorials for ongoing reference, written guides for common tasks, and one-on-one support calls when needed. We ensure your entire team is comfortable using the platform before you go live.',
      },
      {
        id: 'sup2',
        q: 'What if we need help after our website is live?',
        a: 'You get ongoing support through multiple channels: 24/7 chat support through our website, email support with response within 4 hours, phone support during business hours, and access to our comprehensive knowledge base with tutorials and guides.',
      },
      {
        id: 'sup3',
        q: 'Do you provide content creation help?',
        a: 'Yes! Our team can help you write compelling content for your school pages, optimize text for better search rankings, suggest improvements for better parent engagement, and even help with photo selection and editing. We want your school to make the best possible impression online.',
      },
      {
        id: 'sup4',
        q: 'How quickly do you respond to technical issues?',
        a: 'Critical issues (website down, payment problems) are addressed within 1 hour. General support requests get responses within 4 hours during business days. Non-urgent feature requests and general questions are typically resolved within 24 hours. Our goal is to never let technical issues impact your school operations.',
      },
    ],
  },
];

export function FaqPageContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openId, setOpenId] = useState<string | null>('g1'); // Default to first question open
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = useMemo(() => {
    let filtered = faqData;

    // Filter by category if selected
    if (selectedCategory) {
      filtered = filtered.filter(category => category.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const lowercasedFilter = searchTerm.toLowerCase();
      filtered = filtered
        .map((category) => ({
          ...category,
          questions: category.questions.filter(
            (item) =>
              item.q.toLowerCase().includes(lowercasedFilter) ||
              item.a.toLowerCase().includes(lowercasedFilter)
          ),
        }))
        .filter((category) => category.questions.length > 0);
    }

    return filtered;
  }, [searchTerm, selectedCategory]);

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Enhanced Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground">
            Everything You Need to Know About Indivio
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            From getting started to advanced features, find answers to all your questions about 
            transforming your school's digital presence.
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
              selectedCategory === null
                ? 'bg-primary text-primary-foreground'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Categories
          </button>
          {faqData.map((category) => (
            <button
              key={category.category}
              onClick={() => setSelectedCategory(category.category)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedCategory === category.category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {category.icon}
              {category.category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative mb-12">
          <input
            type="text"
            placeholder="Search for specific questions or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-4 pl-12 text-lg transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-400" />
        </div>

        {/* FAQ Categories & Questions */}
        <div className="space-y-12">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((category) => (
              <div key={category.category} className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    {category.icon}
                  </div>
                  <h2 className="font-display text-2xl font-bold text-primary">
                    {category.category}
                  </h2>
                  <span className="rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
                    {category.questions.length} questions
                  </span>
                </div>
                <div className="space-y-3">
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
            <div className="text-center py-12">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">No results found</h3>
              <p className="text-slate-600">
                Try searching with different keywords or browse by category above.
              </p>
            </div>
          )}
        </div>

        {/* Additional Help Section */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 p-8 text-center">
          <h3 className="mb-4 font-display text-2xl font-bold text-foreground">
            Still Have Questions?
          </h3>
          <p className="mb-6 text-muted-foreground">
            Our education specialists are here to help you make the best decision for your school.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button className="rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90">
              Talk to an Education Specialist
            </button>
            <button className="rounded-full border border-primary px-8 py-3 font-semibold text-primary transition hover:bg-primary/10">
              Schedule a Live Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
