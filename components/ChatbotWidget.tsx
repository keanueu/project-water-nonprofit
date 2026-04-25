'use client';

import ChatWindow from '@/components/chatbot/ChatWindow';
import FloatingChatButton from '@/components/chatbot/FloatingChatButton';
import { ChatbotProvider } from '@/components/chatbot/ChatbotProvider';

export default function ChatbotWidget() {
  return (
    <ChatbotProvider>
      <FloatingChatButton />
      <ChatWindow />
    </ChatbotProvider>
  );
}
