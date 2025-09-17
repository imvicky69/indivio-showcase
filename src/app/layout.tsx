import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Indivio: Connecting Dots',
  description: "Your School's Professional Website & Management Portal. All in One.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
      
          <NextTopLoader color="hsl(var(--primary))" showSpinner={false} />
          <Navbar />
          <main className="overflow-x-hidden">{children}</main>
          <Footer />
        
      </body>
    </html>
  );
}