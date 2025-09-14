// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer'; // <-- Import the Footer

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: 'Indivio: Connecting Dots',
  description:
    "Your School's Professional Website & Management Portal. All in One.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="overflow-x-hidden">
        <Navbar />
        <main className="overflow-x-hidden">{children}</main>
        <Footer /> {/* <-- Place the Footer here */}
      </body>
    </html>
  );
}
