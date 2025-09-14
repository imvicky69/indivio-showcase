// src/components/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';

export function Navbar() {
  // Array of navigation links for easy mapping
  const navLinks = [
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/who-its-for', label: "Who It's For" },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="absolute left-0 right-0 top-0 z-10 py-6">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="inline-block">
          <Image
            src="/logo.png"
            alt="Indivio"
            width={140}
            height={36}
            className="object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-dark/80 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <Link
          href="/get-a-demo"
          className="hidden rounded-full bg-primary px-5 py-2.5 font-semibold text-light transition-opacity hover:opacity-90 md:block"
        >
          Get a Free Demo
        </Link>

        {/* Mobile Menu Button (functionality can be added later) */}
        <button className="text-dark md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>
  );
}
