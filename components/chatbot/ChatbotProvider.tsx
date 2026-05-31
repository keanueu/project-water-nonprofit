'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Message } from './types';

interface ChatbotContextValue {
  chatOpen: boolean;
  speedDialOpen: boolean;
  messages: Message[];
  toggleSpeedDial: () => void;
  openChatWindow: () => void;
  closeChat: () => void;
  sendMessage: (content: string) => void;
  triggerQuickAction: (label: string) => void;
}

const ChatbotContext = createContext<ChatbotContextValue | null>(null);

const initialMessages: Message[] = [
  {
    id: 'bot-1',
    role: 'bot',
    content:
      'Hi there! I’m your Support Assistant. Ask me about donations, volunteering, or how Project Water works.',
  },
];

function createId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return Math.random().toString(36).slice(2, 10);
}

function generateBotReply(content: string) {
  const normalized = content.trim().toLowerCase();

  if (normalized.includes('donate')) {
    return 'You can donate securely through our site. I can guide you to the donate page and explain how your gift is used.';
  }

  if (normalized.includes('volunteer')) {
    return 'Volunteering helps spread awareness and support local campaigns. I can share opportunities that are currently available.';
  }

  if (normalized.includes('faq') || normalized.includes('help')) {
    return 'I can answer common questions or send you to our FAQ page for details about Project Water, impact, and support.';
  }

  if (normalized.includes('contact')) {
    return 'You can reach our team through the contact page. I’ll open the right section for you when you’re ready.';
  }

  return 'That sounds great. I’m here to help with project support, donations, volunteer options, and any other questions you have.';
}

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const toggleSpeedDial = () => {
    setChatOpen(false);
    setSpeedDialOpen((current) => !current);
  };

  const openChatWindow = () => {
    setSpeedDialOpen(false);
    setChatOpen(true);
  };

  const closeChat = () => {
    setSpeedDialOpen(false);
    setChatOpen(false);
  };

  const addMessage = (message: Message) => {
    setMessages((current) => [...current, message]);
  };

  const sendMessage = (content: string) => {
    const trimmed = content.trim();
    if (!trimmed) {
      return;
    }

    const userMessage: Message = {
      id: `user-${createId()}`,
      role: 'user',
      content: trimmed,
    };

    addMessage(userMessage);
    openChatWindow();

    // Insert a temporary bot message while we fetch the AI reply
    const botId = `bot-${createId()}`;
    addMessage({ id: botId, role: 'bot', content: 'Thinking...' });

    (async () => {
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: trimmed }),
        });

        const data = await res.json().catch(() => null);
        const reply = data?.reply || data?.error || generateBotReply(trimmed);

        setMessages((current) =>
          current.map((m) => (m.id === botId ? { ...m, content: reply } : m)),
        );
      } catch (err) {
        setMessages((current) =>
          current.map((m) =>
            m.id === botId
              ? { ...m, content: 'Sorry — I could not reach the assistant. Try again later.' }
              : m,
          ),
        );
      }
    })();
  };

  const triggerQuickAction = (label: string) => {
    sendMessage(label);
  };

  const value = useMemo(
    () => ({
      chatOpen,
      speedDialOpen,
      messages,
      toggleSpeedDial,
      openChatWindow,
      closeChat,
      sendMessage,
      triggerQuickAction,
    }),
    [chatOpen, closeChat, messages, openChatWindow, sendMessage, speedDialOpen, toggleSpeedDial],
  );

  return <ChatbotContext.Provider value={value}>{children}</ChatbotContext.Provider>;
}

export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within ChatbotProvider');
  }
  return context;
}
