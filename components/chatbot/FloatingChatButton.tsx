'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faEnvelope, faCommentDots, faUsers, faBookOpen, faHeartPulse } from '@fortawesome/free-solid-svg-icons';
import { useChatbot } from './ChatbotProvider';
import SpeedDialMenu from './SpeedDialMenu';

const actionItems = [
  { label: 'Donate Now', icon: faHeartPulse },
  { label: 'Get Help', icon: faCircleQuestion },
  { label: 'Volunteer', icon: faUsers },
  { label: 'Contact Us', icon: faEnvelope },
  { label: 'FAQs', icon: faBookOpen },
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
        className="group inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#0369a1] text-white transition-colors duration-300 hover:bg-[#091c37] focus:outline-none focus:ring-2 focus:ring-cyan-300"
      >
        <FontAwesomeIcon icon={faCommentDots} className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
}
