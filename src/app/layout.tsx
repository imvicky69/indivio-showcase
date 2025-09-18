import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import NextTopLoader from 'nextjs-toploader';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

// Define viewport settings
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#ffffff',
};

// Define metadata for the entire site
export const metadata: Metadata = {
  title: {
    template: '%s | Indivio - School Management & Website Solution',
    default:
      'Indivio - Affordable School Management System & Website Solution for Educational Institutions',
  },
  description:
    'Indivio offers affordable all-in-one school management software and professional website solutions for schools, colleges, and educational institutions. Streamline operations, enhance communication, and establish your digital presence with our cost-effective SaaS platform.',
  keywords: [
    'school management system',
    'affordable school ERP',
    'school website builder',
    'education management software',
    'school administration portal',
    'student information system',
    'academic management system',
    'education SaaS platform',
    'budget-friendly school software',
    'digital school platform',
    'school management solution',
    'educational institution website',
    'school portal development',
    'online school management',
    'digital campus solution',
    'school automation software',
    'integrated school system',
    'educational content management',
    'virtual learning environment',
    'school communication platform',
    'parent-teacher portal',
    'fee management system',
    'admission management software',
    'school records management',
    'attendance tracking system',
    'educational analytics dashboard',
    'school report generation',
    'education technology solution',
    'exam management software',
    'school cloud solution',
    'low-cost school management',
    'indivio education platform',
    'online school administration',
  ],
  category: 'education technology',
  applicationName: 'Indivio School Management Platform',
  referrer: 'origin-when-cross-origin',
  authors: [{ name: 'Indivio Team', url: 'https://indivio.in/about' }],
  creator: 'Indivio Education Solutions',
  publisher: 'Indivio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://indivio.in'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'hi-IN': '/hi',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Indivio - Affordable School Management & Website Solution',
    description:
      "Transform your educational institution with Indivio's cost-effective school management system and professional website solution. Designed for schools, colleges, and educational organizations of all sizes.",
    url: 'https://indivio.in',
    siteName: 'Indivio - School Management Solutions',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/indivio.png',
        width: 1200,
        height: 630,
        alt: 'Indivio School Management Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indivio - Affordable School Management & Website Solution',
    description:
      "Transform your educational institution with Indivio's cost-effective school management system and professional website solution.",
    creator: '@indivio',
    images: ['/indivio.png'],
  },
  verification: {
    google: 'google-site-verification-code', // Replace with your actual verification code

    other: {
      me: ['hello@indivio.in'], // Replace with your actual email
    },
  },
  icons: {
    icon: [
      { url: '/fevicon.png', sizes: '32x32' },
      { url: '/fevicon.png', sizes: '192x192' },
    ],
    apple: [{ url: '/fevicon.png', sizes: '180x180' }],
    shortcut: [{ url: '/fevicon.png' }],
  },
  manifest: '/site.webmanifest',
  abstract:
    'Indivio provides affordable school management and website solutions for educational institutions.',
  appLinks: {
    web: {
      url: 'https://indivio.in',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Structured data for SEO (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Indivio School Management System',
    applicationCategory: 'EducationApplication',
    operatingSystem: 'Web-based',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    description:
      'Affordable all-in-one school management software and website solution for educational institutions',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '56',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Indivio',
      logo: {
        '@type': 'ImageObject',
        url: 'https://indivio.in/logo.png',
      },
    },
  };

  // Organization schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Indivio',
    url: 'https://indivio.in',
    logo: 'https://indivio.in/logo.png',
    sameAs: [
      'https://www.facebook.com/indivio',
      'https://www.linkedin.com/company/indivio-tech',
      'https://twitter.com/indivio_in',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9211641566',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi'],
    },
  };

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {/* Google Tag Manager code can be added here */}
      </head>
      {/* --- THE FIX: Use the correct script URL for the Web Checkout SDK --- */}
      <Script
        src="https://mercury.phonepe.com/web/bundle/checkout.js"
        strategy="afterInteractive"
      />
      <body>
        <NextTopLoader color="hsl(var(--primary))" showSpinner={false} />
        <Navbar />
        <main className="overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
