'use client';

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { Message } from './types';

type HistoryEntry = { role: 'user' | 'model'; content: string };

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
      'Hi there! I\'m your Support Assistant. Ask me about donations, volunteering, or how Project Water works.',
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
    return 'You can donate securely through our site. Visit our donate page to see how your gift makes an impact.';
  }

  if (normalized.includes('volunteer')) {
    return 'Volunteering helps spread awareness and support local campaigns. Check out our volunteer page for current opportunities.';
  }

  if (normalized.includes('faq') || normalized.includes('help')) {
    return 'I can help with common questions! You can also visit our FAQ page for detailed information about Project Water.';
  }

  if (normalized.includes('contact')) {
    return 'You can reach our team through the contact page. We\'d love to hear from you.';
  }

  return 'I\'m here to help with donations, volunteering, and questions about Project Water. What would you like to know?';
}

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const historyRef = useRef<HistoryEntry[]>([]);

  const toggleSpeedDial = useCallback(() => {
    setChatOpen(false);
    setSpeedDialOpen((current) => !current);
  }, []);

  const openChatWindow = useCallback(() => {
    setSpeedDialOpen(false);
    setChatOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setSpeedDialOpen(false);
    setChatOpen(false);
  }, []);

  const sendMessage = useCallback(
    (content: string) => {
      const trimmed = content.trim();
      if (!trimmed) {
        return;
      }

      const userMessage: Message = {
        id: `user-${createId()}`,
        role: 'user',
        content: trimmed,
      };

      setMessages((current) => [...current, userMessage]);
      setSpeedDialOpen(false);
      setChatOpen(true);

      const botId = `bot-${createId()}`;
      setMessages((current) => [...current, { id: botId, role: 'bot', content: 'Thinking...' }]);

      const recentHistory = historyRef.current.slice(-10);

      (async () => {
        try {
          const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: trimmed, history: recentHistory }),
          });

          const data = await res.json().catch(() => null);
          const reply = data?.reply || generateBotReply(trimmed);

          historyRef.current = [
            ...historyRef.current.slice(-10),
            { role: 'user', content: trimmed },
            { role: 'model', content: reply },
          ];

          setMessages((current) =>
            current.map((m) => (m.id === botId ? { ...m, content: reply } : m)),
          );
        } catch {
          setMessages((current) =>
            current.map((m) =>
              m.id === botId
                ? { ...m, content: 'Sorry — I could not reach the assistant. Try again later.' }
                : m,
            ),
          );
        }
      })();
    },
    [],
  );

  const triggerQuickAction = useCallback(
    (label: string) => {
      sendMessage(label);
    },
    [sendMessage],
  );

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
    [chatOpen, closeChat, messages, openChatWindow, sendMessage, speedDialOpen, toggleSpeedDial, triggerQuickAction],
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
