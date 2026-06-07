import React from 'react';

type Props = {
  children: string | number | null | undefined;
  className?: string;
};

export default function TextWithNumbers({ children, className }: Props) {
  const text = children == null ? '' : String(children);
  if (!text) return null;

  // Split on sequences that look like numbers, currency, times, or percentages.
  const parts = text.split(/(\$?\d[\d,:\.\/\-]*%?)/g);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (!part) return null;
        // mark parts that contain a digit as numeric
        if (/\d/.test(part)) return (
          <span key={i} className="numbers">{part}</span>
        );
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </span>
  );
}
