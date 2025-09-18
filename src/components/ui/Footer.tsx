import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Linkedin, Instagram } from 'lucide-react';

// Data for navigation links, consistent with the Navbar for better UX
const navLinks = [
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/why-indivio', label: "Why Indivio ?" },
  { href: '/faq', label: 'FAQ' },
];

// Data for social media links
const socialLinks = [
  { href: 'https://twitter.com/indivio-in', icon: <Twitter className="h-6 w-6" />, label: 'Twitter' },
  { href: 'https://linkedin.com/company/indivio-tech', icon: <Linkedin className="h-6 w-6" />, label: 'LinkedIn' },
  { href: 'https://instagram.com/indivio.in', icon: <Instagram className="h-6 w-6" />, label: 'Instagram' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // A permanent dark theme for the footer for a strong visual anchor
    <footer className="bg-gray-950 text-gray-300">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          
          {/* Column 1: Brand, Tagline, and Social Icons (Spans 4 columns on desktop) */}
          <div className="md:col-span-4 lg:col-span-5">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="bg-white rounded-full p-1">
                <Image
                  src="/fevicon.png"
                  alt="Indivio Logo"
                  width={48}
                  height={48}
                />
              </div>
              <span className="text-2xl font-bold text-white font-display">
                Indivio EdTech
              </span>
            </Link>
            <p className="max-w-xs text-gray-400">
              Your School&apos;s Professional Website & Management Portal. All in One.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-gray-400 transition-colors hover:text-primary"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (Spans 2 columns) */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Contact Info (Spans 3 columns) */}
          <div className="md:col-span-3">
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li><a href="tel:+919211641566" className="transition-colors hover:text-primary">+91 9211641566</a></li>
              <li><a href="mailto:hello@indivio.in" className="transition-colors hover:text-primary">hello@indivio.in</a></li>
              <li className="text-gray-400">
                3rd Floor, KARV, Thana Road<br />
                Nirmali, Supaul, Bihar 847452
              </li>
            </ul>
          </div>

          {/* Column 4: Legal (Spans 2 columns) */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li><Link href="/terms" className="transition-colors hover:text-primary">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="transition-colors hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 sm:flex-row">
          <p className="text-sm text-gray-500">
            © {currentYear} Indivio EdTech. All Rights Reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
}