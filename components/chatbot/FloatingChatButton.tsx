'use client';

import { useEffect, useState } from 'react';
import { HelpCircle, Mail, MessageCircle, Users, BookOpen, HeartPulse } from 'lucide-react';
import { useChatbot } from './ChatbotProvider';
import SpeedDialMenu from './SpeedDialMenu';

const actionItems = [
  { label: 'Donate Now', icon: HeartPulse },
  { label: 'Get Help', icon: HelpCircle },
  { label: 'Volunteer', icon: Users },
  { label: 'Contact Us', icon: Mail },
  { label: 'FAQs', icon: BookOpen },
];

export default function FloatingChatButton() {
  const { chatOpen, speedDialOpen, toggleSpeedDial, openChatWindow, closeChat, triggerQuickAction } = useChatbot();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 280);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFabClick = () => {
    if (!speedDialOpen && !chatOpen) {
      toggleSpeedDial();
      return;
    }

    if (speedDialOpen) {
      openChatWindow();
      return;
    }

    closeChat();
  };

  const handleItemSelect = (label: string) => {
    triggerQuickAction(label);
    openChatWindow();
  };

  return (
    <div
      className={`fixed right-6 z-50 flex flex-col items-end gap-3 transition-all duration-300 ease-in-out ${
        scrolled ? 'bottom-24' : 'bottom-10'
      }`}
    >
      <SpeedDialMenu actions={actionItems} visible={speedDialOpen} onSelect={handleItemSelect} />

      <button
        type="button"
        onClick={handleFabClick}
        aria-expanded={chatOpen || speedDialOpen}
        aria-label="Open support assistant"
        className="group inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#0369a1] text-white shadow-[0_18px_38px_rgba(15,23,42,0.18)] transition duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-[#0c4a6e] focus:outline-none focus:ring-2 focus:ring-cyan-300"
      >
        <MessageCircle className="h-7 w-7" aria-hidden="true" />
      </button>
    </div>
  );
}
