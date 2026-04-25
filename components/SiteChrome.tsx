'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatbotWidget from '@/components/ChatbotWidget';
import ScrollToTop from '@/components/ScrollToTop';
import PageProgressBar from '@/components/PageProgressBar';

const HIDDEN_PREFIXES = ['/admin', '/login', '/signup', '/forgot-password'];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (hideChrome) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <PageProgressBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatbotWidget />
      <ScrollToTop />
    </>
  );
}
