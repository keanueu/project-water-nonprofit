import { faChevronRight, faChevronLeft, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGauge, faHandshakeAngle, faBullhorn, faUsers, faGear, faBell, faMagnifyingGlass, faUser, faHeart } from '@fortawesome/free-solid-svg-icons';
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils'; // Assuming this exists for tailwind classes merging

const sidebarItems = [
  { icon: faGauge, label: 'Overview', href: '/admin' },
  { icon: faHandshakeAngle, label: 'Donations', href: '/admin/donations' },
  { icon: faBullhorn, label: 'Campaigns', href: '/admin/campaigns' },
  { icon: faUsers, label: 'Users', href: '/admin/users' },
  { icon: faGear, label: 'Settings', href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-indigo-900 text-white transition-all duration-300 flex flex-col",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          {!isCollapsed && <span className="font-bold text-xl">Charity OS</span>}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-indigo-800 rounded-md transition-colors"
          >
            {isCollapsed ? <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5" /> : <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center p-3 rounded-lg transition-colors group",
                pathname === item.href 
                  ? "bg-indigo-700 text-white" 
                  : "text-indigo-100 hover:bg-indigo-800 hover:text-white"
              )}
            >
              <FontAwesomeIcon icon={item.icon}  className={cn(isCollapsed ? "mx-auto" : "mr-3")} />
              {!isCollapsed && <span>{item.label}</span>}
              {isCollapsed && (
                <div className="absolute left-20 bg-indigo-900 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none ml-2 shadow-lg border border-indigo-700">
                  {item.label}
                </div>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-indigo-800">
          <Link
            href="/"
            className={cn(
              "flex items-center p-3 rounded-lg text-indigo-100 hover:bg-red-800 hover:text-white transition-colors group"
            )}
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket}  className={cn(isCollapsed ? "mx-auto" : "mr-3")} />
            {!isCollapsed && <span>Logout</span>}
            {isCollapsed && (
              <div className="absolute left-20 bg-red-900 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none ml-2 shadow-lg">
                Logout
              </div>
            )}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center bg-gray-100 px-3 py-2 rounded-md w-96">
            <FontAwesomeIcon icon={faMagnifyingGlass}  className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
              <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
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
