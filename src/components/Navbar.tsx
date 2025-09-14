// src/components/Navbar.tsx
import Link from 'next/link';

export function Navbar() {
  // Array of navigation links for easy mapping
  const navLinks = [
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/who-its-for', label: 'Who It\'s For' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="absolute top-0 left-0 right-0 z-10 py-6">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold font-display text-dark">
          indivio
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-dark/80 hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <Link href="/get-a-demo" className="hidden md:block px-5 py-2.5 font-semibold text-light bg-primary rounded-full hover:opacity-90 transition-opacity">
          Get a Free Demo
        </Link>

        {/* Mobile Menu Button (functionality can be added later) */}
        <button className="md:hidden text-dark">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </div>
    </header>
  );
}