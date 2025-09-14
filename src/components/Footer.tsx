// src/components/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';

// Data for the quick links to keep the JSX clean
const quickLinks = [
  { href: '/booking', label: 'Booking' },
  { href: '/feedbacks', label: 'Feedbacks' },
  { href: '/contact', label: 'Contacts' },
  { href: '/about', label: 'About Indivio' },
  { href: '/chat', label: 'Quick Chat' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full overflow-hidden border-t border-blue-800 bg-dark text-light shadow-2xl">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo and Brand */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-light/90 shadow-lg">
              <Image
                src="/indivio.png"
                alt="Indivio Logo"
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
            </div>
            <p className="text-lg font-semibold tracking-wide text-light drop-shadow">
              Indivio EdTech
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-light/90">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-opacity hover:opacity-80"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-light/90">
              Contact Info
            </h3>
            <div className="space-y-3">
              <a
                href="tel:+919211641566"
                className="block transition-opacity hover:opacity-80"
              >
                +91 9211641566
              </a>
              <a
                href="mailto:hello@indivio.in"
                className="block transition-opacity hover:opacity-80"
              >
                hello@indivio.in
              </a>
              <div>
                <p className="font-semibold">Address:</p>
                <p className="text-light/80">
                  3rd Floor, KARV, Thana Road
                  <br />
                  Nirmali, Supaul
                  <br />
                  Bihar 847452
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Legal */}
          <div className="sm:text-right">
            <div className="mb-6 space-y-2">
              <Link
                href="/terms"
                className="block text-lg font-bold text-light/90 transition-colors hover:text-blue-300"
              >
                T&C
              </Link>
              <Link
                href="/privacy"
                className="block text-lg font-bold text-light/90 transition-colors hover:text-blue-300"
              >
                Privacy Policy
              </Link>
            </div>
            <p className="text-xs text-light/60">
              All rights reserved
              <br />
              Indivio {currentYear}
            </p>
          </div>
        </div>
        {/* Mobile bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-blue-800 pt-6 text-xs text-light/60 sm:flex-row">
          <span>© {currentYear} Indivio EdTech</span>
          <span>
            Made with <span className="text-red-400">♥</span> in India
          </span>
        </div>
      </div>
    </footer>
  );
}
