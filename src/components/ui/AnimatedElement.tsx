// src/components/ui/AnimatedElement.tsx
"use client";

import { motion } from 'framer-motion';
import React from 'react';

// Define the props our component will accept
type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'; // Control animation direction
  once?: boolean; // Control if the animation repeats on scroll
};

export function AnimatedElement({
  children,
  className = '',
  delay = 0,
  direction = 'up', // Default direction
  once = false, // <-- THE FIX: Default to repeating the animation
}: AnimatedElementProps) {
  
  // Define animation variants based on the direction prop
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -20 : direction === 'right' ? 20 : 0,
      y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      // The viewport prop now uses the 'once' prop we passed in
      viewport={{ once: once }}
      transition={{
        duration: 0.5,
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
}