import React from 'react';
import Link from 'next/link';

type ButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: string;
    children: React.ReactNode;
  };

export default function Button({ href, children, className = '', ...rest }: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition-colors';
  const cls = `${base} ${className}`.trim();

  if (href) {
    return (
      // next/link supports className on the Link element in this project setup
      <Link href={href} className={cls} {...(rest as any)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...(rest as any)}>
      {children}
    </button>
  );
}
