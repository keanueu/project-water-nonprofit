"use client";

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faGauge, faHandshakeAngle, faBullhorn, faUsers, faGear, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import dynamic from 'next/dynamic';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const NotificationDropdown = dynamic(() => import('../../components/admin/NotificationDropdown'), { ssr: false });

const sidebarItems = [
  { icon: faGauge, label: 'Overview', href: '/admin' },
  { icon: faHandshakeAngle, label: 'Donations', href: '/admin/donations' },
  { icon: faBullhorn, label: 'Campaigns', href: '/admin/campaigns' },
  { icon: faUsers, label: 'Users', href: '/admin/users' },
  { icon: faGear, label: 'Settings', href: '/admin/settings' },
];

function LogoutButton({ isCollapsed }: { isCollapsed: boolean }) {
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try { await logout(); } finally { setIsLoggingOut(false); }
  };

  return (
    <button 
      onClick={handleLogout} 
      disabled={isLoggingOut}
      className={cn(
        "flex items-center p-3 rounded-lg text-sky-100 hover:bg-red-800 hover:text-white transition-colors group",
        isLoggingOut && 'opacity-50 cursor-not-allowed'
      )}
      title="Logout"
    >
      <FontAwesomeIcon icon={faArrowRightFromBracket} className={cn(isCollapsed ? 'mx-auto' : 'mr-3')} />
      {!isCollapsed && <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>}
      {isCollapsed && (
        <div className="absolute left-20 bg-red-900 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none ml-2 shadow-lg">
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </div>
      )}
    </button>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    if (isMobileMenuOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMobileMenuOpen]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={cn(
          "text-white transition-all duration-300 flex flex-col",
          // Mobile: fixed drawer that overlays content, Desktop (lg): static in flow
          isMobileMenuOpen ? "fixed inset-y-0 left-0 z-50 w-64 transform translate-x-0 lg:static lg:translate-x-0" : "fixed inset-y-0 left-0 z-50 w-64 transform -translate-x-full lg:translate-x-0 lg:static",
          isCollapsed && 'lg:w-20 lg:overflow-hidden'
        )}
        style={{ backgroundColor: 'var(--donate-blue)' }}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {!isCollapsed ? (
              <Image src="/footer-logo.png" alt="Project Water" width={140} height={36} className="block" />
            ) : (
              <Image src="/footer-logo.png" alt="Project Water" width={36} height={36} className="block" />
            )}
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 rounded-md transition-colors hidden lg:inline-flex"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <FontAwesomeIcon icon={isCollapsed ? faBars : faXmark} className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1 rounded-md lg:hidden"
              aria-label="Close mobile menu"
              style={{ display: isMobileMenuOpen ? 'inline-flex' : 'none' }}
            >
              <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
            </button>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "flex items-center p-3 rounded-lg transition-colors group",
                pathname === item.href 
                  ? "text-white" 
                  : "text-sky-100 hover:bg-[var(--donate-blue-hover)] hover:text-white"
              )}
              style={ pathname === item.href ? { backgroundColor: 'var(--donate-blue-active)' } : undefined }
            >
              <FontAwesomeIcon icon={item.icon}  className={cn(isCollapsed ? "mx-auto" : "mr-3")} />
              {!isCollapsed && <span>{item.label}</span>}
              {isCollapsed && (
                <div className="absolute left-20 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none ml-2 shadow-lg"
                  style={{ backgroundColor: 'var(--donate-blue)', border: '1px solid var(--donate-blue-active)', color: '#fff' }}>
                  {item.label}
                </div>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t" style={{ borderColor: 'var(--donate-blue-hover)' }}>
          {/* Use the Auth logout handler to ensure session is cleared */}
          <LogoutButton isCollapsed={isCollapsed} />
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center lg:hidden mr-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
            >
              <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md w-96">
            <FontAwesomeIcon icon={faMagnifyingGlass}  className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>

          <div className="flex items-center space-x-4">
            <NotificationDropdown />
            <div className="h-8 w-px bg-gray-200 mx-2"></div>
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-700">Jane Doe</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
