'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const navLinks = [
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/who-its-for', label: "Who It's For" },
    { href: '/contact', label: 'Contact' },
  ];

  const pathname = usePathname();
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // <-- State for mobile menu

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [pathname, isMenuOpen]);

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        hasScrolled || isMenuOpen
          ? 'bg-background/80 shadow-lg backdrop-blur-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Indivio Logo"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-foreground/80 transition-colors hover:text-foreground ${
                pathname === link.href ? 'font-semibold text-foreground' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <Link
          href="/booking"
          className="hidden rounded-full bg-foreground px-5 py-2.5 text-center font-semibold text-background transition-all hover:bg-foreground/80 md:inline-block"
        >
          Book Now
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="z-50 text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute left-0 top-full w-full bg-background/95 shadow-lg backdrop-blur-sm md:hidden"
          >
            <nav className="flex flex-col items-center gap-6 px-6 py-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg text-foreground/80 transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/booking"
                className="w-full max-w-xs rounded-full bg-primary px-5 py-3 text-center font-semibold text-primary-foreground transition-all hover:bg-primary/90"
              >
                Book Now
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
