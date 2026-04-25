'use client';

interface QuickActionsProps {
  actions: string[];
  onSelect: (action: string) => void;
}

export default function QuickActions({ actions, onSelect }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action) => (
        <button
          key={action}
          type="button"
          onClick={() => onSelect(action)}
          className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition duration-200 ease-in-out hover:bg-white hover:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-300"
        >
          {action}
        </button>
      ))}
    </div>
  );
}
