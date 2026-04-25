import type { LucideIcon } from 'lucide-react';

export type Message = {
  id: string;
  role: 'user' | 'bot';
  content: string;
};

export type ChatAction = {
  label: string;
  icon: LucideIcon;
};
