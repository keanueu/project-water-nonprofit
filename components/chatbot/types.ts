import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type Message = {
  id: string;
  role: 'user' | 'bot';
  content: string;
};

export type ChatAction = {
  label: string;
  icon: IconDefinition;
};
