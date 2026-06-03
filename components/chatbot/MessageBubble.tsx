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
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
          isUser
            ? 'bg-[#0ea5e9] text-white rounded-bl-lg rounded-br-2xl rounded-tl-2xl rounded-tr-lg'
            : 'bg-slate-100 text-slate-800 rounded-bl-2xl rounded-br-2xl rounded-tl-lg rounded-tr-2xl'
        }`}
        aria-label={`${message.role} message`}
      >
        <p>{message.content}</p>
      </div>
    </div>
  );
}
