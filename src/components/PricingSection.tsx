'use client';

import { Plan } from '@/lib/plans';
import { Check, Star } from 'lucide-react';
import { Button } from './ui/Button'; // Assuming your button component is improved

interface PricingSectionProps {
  plans: Plan[];
}

export function PricingSection({ plans }: PricingSectionProps) {
  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">
            Simple, Transparent Pricing For Every School
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            No hidden fees, no surprises. Choose the plan that fits your
            school&apos;s needs and budget.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl border p-8 ${
                plan.isMostPopular
                  ? 'relative border-2 border-primary shadow-2xl'
                  : 'border-border bg-muted/30'
              }`}
            >
              {plan.isMostPopular && (
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                  <span className="flex items-center gap-2 rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
                    <Star className="h-4 w-4" />
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="font-display text-2xl font-bold text-foreground">
                {plan.name}
              </h3>
              <p className="mt-2 text-muted-foreground">{plan.description}</p>

              <div className="mt-6">
                <span className="text-5xl font-bold text-foreground">
                  ₹{plan.price.toLocaleString('en-IN')}
                </span>
                <span className="font-medium text-muted-foreground">
                  {plan.pricePeriod}
                </span>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-4">
                <Button href={`/checkout/${plan.id}`} variant="primary">
                  Book Now
                </Button>
                <Button href={`/pricing/${plan.id}`} variant="secondary">
                  More Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
