import type { Metadata } from 'next';
import { Inter, Libre_Baskerville } from 'next/font/google';
import SiteChrome from '@/components/SiteChrome';
import './globals.css';

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-libre-baskerville',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Project Water',
  description: 'Public, proven, reliable water access across sub-Saharan Africa.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${libreBaskerville.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white text-[#091c37]">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
