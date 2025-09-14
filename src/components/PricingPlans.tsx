// src/components/PricingPlans.tsx
import { Check, Building } from 'lucide-react';
import Link from 'next/link';

// A data array for the plans to keep the component clean and maintainable
const plansData = [
  {
    name: 'Starter',
    tagline: 'Perfect for getting your school online.',
    price: '9,999',
    features: [
      'Professional 5-Page Website',
      'Easy Content Editing',
      '1 Year Free Hosting & Subdomain',
      'Admin Dashboard Access',
      'Onboarding Support',
    ],
    cta: 'Get Started',
    isPopular: false,
  },
  {
    name: 'Growth',
    tagline: 'For growing schools that want more control.',
    price: '17,999',
    features: [
      'Everything in Starter, plus:',
      'Up to 10 Pages',
      'Connect Your Custom Domain',
      'Full Theme Customization',
      'Photo & Video Gallery',
      'Events & Announcements Module',
    ],
    cta: 'Choose Growth',
    isPopular: true,
  },
  {
    name: 'Pro',
    tagline: 'The complete solution for established institutions.',
    price: '29,999',
    features: [
      'Everything in Growth, plus:',
      'Unlimited Pages',
      'Smart Toppers Grid',
      'Advanced SEO Optimization',
      'Student Inquiry Form',
      'Priority Support',
    ],
    cta: 'Go Pro',
    isPopular: false,
  },
];

export function PricingPlans() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-6">
        {/* Responsive grid for the pricing cards */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
          {plansData.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex h-full flex-col rounded-2xl border p-8 ${plan.isPopular ? 'border-2 border-accent' : 'border-slate-200'}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-sm font-bold uppercase text-light">
                  Most Popular
                </div>
              )}

              <h3 className="font-display text-2xl font-bold text-primary">
                {plan.name}
              </h3>
              <p className="mt-2 text-dark/70">{plan.tagline}</p>

              <div className="mt-6">
                <span className="text-5xl font-bold text-dark">
                  ₹{plan.price}
                </span>
                <span className="text-dark/60"> /first year</span>
              </div>

              <ul className="mt-8 flex-grow space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/booking"
                className={`mt-8 w-full rounded-lg px-6 py-3 text-center font-semibold transition-colors ${
                  plan.isPopular
                    ? 'bg-primary text-light hover:opacity-90'
                    : 'bg-slate-100 text-primary hover:bg-slate-200'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Enterprise Callout */}
        <div className="mx-auto mt-20 max-w-4xl rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Building className="h-12 w-12 flex-shrink-0 text-primary" />
            <div>
              <h4 className="font-display text-xl font-bold text-primary">
                Looking for more?
              </h4>
              <p className="mt-2 text-dark/70">
                For enterprise deployments, custom integrations, or a tailored
                support plan, contact our team and we&apos;ll craft a plan that
                fits your needs.
              </p>
            </div>
            <div className="mt-6 sm:ml-6 sm:mt-0">
              <Link
                href="/contact"
                className="inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-light"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
