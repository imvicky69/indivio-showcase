// src/components/ui/Button.tsx
import React from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils'; // <-- Import our new utility

// 1. Define button variants with CVA
const buttonVariants = cva(
  // Base styles applied to all variants
  'inline-block px-8 py-3 font-medium rounded-full transition-all duration-300 ease-in-out w-full sm:w-auto text-center transform hover:-translate-y-1',
  {
    variants: {
      variant: {
        // Variant-specific styles
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg',
        secondary: 'text-primary border border-primary hover:bg-primary/10',
      },
    },
    defaultVariants: {
      variant: 'primary', // Default variant is 'primary'
    },
  }
);

// 2. Define props, extending the CVA variants
export interface ButtonProps extends React.ComponentProps<typeof Link>, VariantProps<typeof buttonVariants> {
  // No need to define 'variant' again, it's inherited from VariantProps
}

// 3. Create the component
const Button = React.forwardRef<HTMLAnchorElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        // 4. Use the `cn` utility to merge classes perfectly
        className={cn(buttonVariants({ variant, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };