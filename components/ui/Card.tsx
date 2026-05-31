import React from 'react';

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export default function Card({ children, className = '', ...rest }: CardProps) {
  return (
    <div
      className={`rounded-3xl border border-slate-200 bg-white ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
}
