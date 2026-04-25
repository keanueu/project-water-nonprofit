'use client';

import type { Message } from './types';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-[1.5rem] px-4 py-3 text-sm leading-6 shadow-sm ${
          isUser
            ? 'bg-[#0ea5e9] text-white rounded-bl-[0.75rem] rounded-br-[1.5rem] rounded-tl-[1.5rem] rounded-tr-[0.75rem]'
            : 'bg-slate-100 text-slate-800 rounded-bl-[1.5rem] rounded-br-[1.5rem] rounded-tl-[0.75rem] rounded-tr-[1.5rem]'
        }`}
        aria-label={`${message.role} message`}
      >
        <p>{message.content}</p>
      </div>
    </div>
  );
}
