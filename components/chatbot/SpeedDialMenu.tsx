'use client';

import type { ChatAction } from './types';

interface SpeedDialMenuProps {
  actions: ChatAction[];
  visible: boolean;
  onSelect: (label: string) => void;
}

export default function SpeedDialMenu({ actions, visible, onSelect }: SpeedDialMenuProps) {
  return (
    <div
      className={`flex flex-col items-end gap-3 transition-all duration-200 ease-in-out ${
        visible ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-3'
      }`}
      role="menu"
      aria-hidden={!visible}
    >
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.label}
            type="button"
            onClick={() => onSelect(action.label)}
            className="inline-flex w-full items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition duration-200 ease-in-out hover:-translate-y-0.5 hover:scale-[1.01] hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            role="menuitem"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>{action.label}</span>
          </button>
        );
      })}
    </div>
  );
}
