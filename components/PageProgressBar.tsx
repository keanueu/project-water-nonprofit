'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PageProgressBar() {
  const [width, setWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsVisible(true);
    setWidth(40);

    const interval = setInterval(() => {
      setWidth((prev) => {
        if (prev < 90) {
          return prev + Math.random() * 30;
        }
        return prev;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [pathname]);

  useEffect(() => {
    if (pathname) {
      setWidth(100);
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [pathname]);

  if (!isVisible && width === 0) return null;

  return (
    <div
      className={`fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-600 z-[9999] transition-all duration-300 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        width: `${width}%`,
      }}
    />
  );
}
