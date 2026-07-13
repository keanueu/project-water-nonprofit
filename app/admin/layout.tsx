"use client";

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faChevronLeft, faXmark, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faGauge, faHandshakeAngle, faBullhorn, faUsers, faGear, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
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
        "flex items-center p-2.5 rounded-xl text-sky-300/70 hover:bg-red-500/15 hover:text-red-300 transition-all group",
        isLoggingOut && 'opacity-50 cursor-not-allowed'
      )}
      title="Logout"
    >
      <FontAwesomeIcon icon={faArrowRightFromBracket} className={cn(isCollapsed ? 'mx-auto' : 'mr-3', 'w-4 h-4')} />
      {!isCollapsed && <span className="text-sm font-medium">{isLoggingOut ? 'Logging out...' : 'Logout'}</span>}
      {isCollapsed && (
        <div className="absolute left-[4.5rem] bg-[#091c37] text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-xl border border-white/10">
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
  const { user } = useAuth();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    if (isMobileMenuOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMobileMenuOpen]);

  const userInitials = React.useMemo(() => {
    const first = user?.firstName?.[0] || '';
    const last = user?.lastName?.[0] || '';
    if (first || last) return (first + last).toUpperCase();
    const email = user?.email || '';
    return email.slice(0, 2).toUpperCase();
  }, [user]);

  const userName = React.useMemo(() => {
    const name = [user?.firstName, user?.lastName].filter(Boolean).join(' ');
    return name || user?.email || 'Admin';
  }, [user]);

  return (
    <div className="flex h-screen bg-slate-50/50 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          "text-white transition-all duration-300 flex flex-col",
          isMobileMenuOpen
            ? "fixed inset-y-0 left-0 z-50 w-64 translate-x-0"
            : "fixed inset-y-0 left-0 z-50 w-64 -translate-x-full lg:translate-x-0 lg:static",
          isCollapsed && 'lg:w-[4.5rem] lg:overflow-hidden'
        )}
        style={{ backgroundColor: '#091c37' }}
      >
        <div className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            {!isCollapsed ? (
              <Image src="/footer-logo.png" alt="Project Water" width={140} height={36} className="block brightness-0 invert" />
            ) : (
              <Image src="/footer-logo.png" alt="Project Water" width={32} height={32} className="block brightness-0 invert" />
            )}
          </div>

          <div className="flex items-center">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-1.5 rounded-lg text-sky-300/50 hover:text-white hover:bg-white/10 transition-all"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 rounded-lg lg:hidden text-sky-300/50 hover:text-white hover:bg-white/10"
              aria-label="Close mobile menu"
            >
              <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="px-3 mb-2">
          <div className="h-px w-full bg-white/[0.07]" />
        </div>

        <nav className="flex-1 px-3 py-2 space-y-0.5">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-xl transition-all relative group",
                  isActive
                    ? "bg-[#0369a1] text-white shadow-lg shadow-[#0369a1]/20"
                    : "text-sky-300/60 hover:bg-white/[0.07] hover:text-sky-100"
                )}
              >
                <FontAwesomeIcon icon={item.icon} className={cn(isCollapsed ? 'mx-auto' : 'mr-3', 'w-4 h-4')} />
                {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                {isCollapsed && (
                  <div className="absolute left-[4.5rem] bg-[#091c37] text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-xl border border-white/10">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 mb-2">
          <div className="h-px w-full bg-white/[0.07]" />
        </div>

        <div className="px-3 pb-4">
          <LogoutButton isCollapsed={isCollapsed} />
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center lg:hidden mr-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
              className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 rounded-full transition-colors"
            >
              <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faChevronRight} className="w-4 h-4" />
            </button>
          </div>
          <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 px-4 py-2 rounded-full w-80 focus-within:border-[#0369a1] focus-within:ring-2 focus-within:ring-[#0369a1]/20 transition-all">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-slate-400 mr-2.5 w-3.5 h-3.5" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center space-x-3">
            <NotificationDropdown />
            <div className="h-7 w-px bg-slate-200" />
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-[#091c37]">{userName}</p>
                <p className="text-xs text-slate-400">Administrator</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#0369a1]/10 flex items-center justify-center text-[#0369a1] font-bold text-xs border border-[#0369a1]/20">
                {userInitials}
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
