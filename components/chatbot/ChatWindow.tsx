'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useChatbot } from './ChatbotProvider';
import MessageBubble from './MessageBubble';
import QuickActions from './QuickActions';

const quickReplies = [
  'How can I donate?',
  'I want to volunteer',
  'Where can I find FAQs?',
  'Tell me about impact reports',
];

export default function ChatWindow() {
  const { chatOpen, messages, closeChat, sendMessage, triggerQuickAction } = useChatbot();
  const [draft, setDraft] = useState('');
  const scrollAnchor = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chatOpen || !scrollAnchor.current) {
      return;
    }

    scrollAnchor.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [chatOpen, messages.length]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = draft.trim();
    if (!trimmed) {
      return;
    }

    sendMessage(trimmed);
    setDraft('');
  };

  return (
    <div
      className={`fixed bottom-24 right-6 z-50 w-[min(95vw,380px)] max-w-full rounded-2xl border border-slate-200 bg-white/98 shadow-[0_22px_65px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-all duration-200 ease-in-out ${
        chatOpen ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-6'
      }`}
      role="dialog"
      aria-label="Support Assistant chat window"
      aria-modal="false"
    >
      <div className="flex items-center justify-between gap-3 rounded-t-2xl border-b border-slate-200 bg-white px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-[#0369a1] shadow-sm">
            <span className="text-lg font-bold">PW</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Support Assistant</p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Available to help
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={closeChat}
          aria-label="Close chat window"
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-300"
        >
          <FontAwesomeIcon icon={faXmark} className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="max-h-[420px] space-y-4 overflow-hidden">
        <div className="scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent overflow-y-auto px-5 py-5" style={{ maxHeight: '280px' }}>
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>
          <div ref={scrollAnchor} />
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-5 py-4">
          <div className="mb-4">
            <p className="text-sm font-semibold text-slate-900">Quick replies</p>
            <p className="mt-1 text-sm text-slate-500">Tap an example to start faster.</p>
          </div>
          <QuickActions actions={quickReplies} onSelect={triggerQuickAction} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-3 border-t border-slate-200 bg-white px-4 py-4">
        <label htmlFor="assistant-input" className="sr-only">
          Type your message
        </label>
        <input
          id="assistant-input"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          className="flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0ea5e9] text-white transition-colors duration-300 hover:bg-[#0369a1] focus:outline-none focus:ring-2 focus:ring-cyan-300"
          aria-label="Send message"
        >
          <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
