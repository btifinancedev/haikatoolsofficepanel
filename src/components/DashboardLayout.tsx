// src/components/DashboardLayout.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react'; // Import signOut
import {
  LayoutDashboard,
  HardDrive,
  LinkIcon,
  Palette,
  Newspaper,
  Settings,
  Activity,
  Shield,
  Download,
  Trash2,
  AlertTriangle,
  HelpCircle,
  LogOut,
  Menu,
} from 'lucide-react';
import { FaTelegramPlane } from 'react-icons/fa'; // For Telegram Bot icon

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e293b] text-gray-300 flex flex-col">
        <div className="flex items-center justify-center h-16 bg-[#1e293b] text-white text-2xl font-bold">
          {/* <img src="/logo.png" alt="Admin Panel" className="h-8 w-8 mr-2" /> */}
          2FA Panel
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          <NavLink href="/dashboard" icon={<LayoutDashboard size={20} />} text="Dashboard" />
          <DisclosureNavLink icon={<HardDrive size={20} />} text="Attachments">
            <NavLink href="/dashboard/attachments/files" text="Files" />
            <NavLink href="/dashboard/attachments/images" text="Images" />
          </DisclosureNavLink>
          <DisclosureNavLink icon={<LinkIcon size={20} />} text="Redirect URLs + More" fireIcon={true}>
            <NavLink href="/dashboard/redirects" text="Redirects" />
            <NavLink href="/dashboard/shortener" text="URL Shortener" />
          </DisclosureNavLink>
          <NavLink href="/dashboard/personalization" icon={<Palette size={20} />} text="Personalization" />
          <NavLink href="/dashboard/news" icon={<Newspaper size={20} />} text="News & Updates" />
          <NavLink href="/dashboard/settings" icon={<Settings size={20} />} text="Settings" />

          <div className="text-xs font-semibold text-gray-500 uppercase px-4 mt-6">SPAM TRACKING</div>
          <NavLink href="/dashboard/realtime-tracking" icon={<Activity size={20} />} text="Realtime tracking" liveIndicator={true} />

          <div className="text-xs font-semibold text-gray-500 uppercase px-4 mt-6">SECURITY</div>
          <NavLink href="/dashboard/telegram-bot-2fa" icon={<FaTelegramPlane size={20} />} text="Telegram Bot 2FA" />

          <div className="text-xs font-semibold text-gray-500 uppercase px-4 mt-6">ACTIONS</div>
          <NavLink href="/dashboard/download-data" icon={<Download size={20} />} text="Download Data" />
          <NavLink href="/dashboard/clear-bots-visitors" icon={<Trash2 size={20} />} text="Clear Bots & Visitors" />
          <NavLink href="/dashboard/erase-all-data" icon={<AlertTriangle size={20} />} text="Erase all Data" />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center h-16 bg-white shadow-md px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <button className="text-gray-500 focus:outline-none focus:text-gray-900 md:hidden">
              <Menu size={24} />
            </button>
            <span className="ml-2 text-sm font-medium text-orange-600 flex items-center">
              <AlertTriangle size={16} className="mr-1" />
              Subscription: Expires today
            </span>
          </div>
          <nav className="flex items-center space-x-4">
            <Link href="/help" className="text-gray-500 hover:text-gray-700 flex items-center">
              <HelpCenter size={20} className="mr-1" /> Help Center
            </Link>
            {/* Modified Logout Button */}
            <button
              onClick={() => signOut({ callbackUrl: '/login' })} // Redirect to login after logout
              className="text-gray-500 hover:text-gray-700 flex items-center"
            >
              <LogOut size={20} className="mr-1" /> Logout
            </button>
          </nav>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}

interface NavLinkProps {
  href: string;
  icon?: React.ReactNode;
  text: string;
  liveIndicator?: boolean;
}

function NavLink({ href, icon, text, liveIndicator }: NavLinkProps) {
  return (
    <Link href={href} className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
      {icon && <span className="mr-3">{icon}</span>}
      {text}
      {liveIndicator && (
        <span className="ml-auto bg-green-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
          Live
        </span>
      )}
    </Link>
  );
}

interface DisclosureNavLinkProps {
  icon: React.ReactNode;
  text: string;
  children: React.ReactNode;
  fireIcon?: boolean;
}

function DisclosureNavLink({ icon, text, children, fireIcon }: DisclosureNavLinkProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
      >
        <span className="flex items-center">
          <span className="mr-3">{icon}</span>
          {text}
        </span>
        {fireIcon && <span className="text-orange-500 ml-2">🔥</span>}
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-90' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
      {isOpen && <div className="ml-6 mt-1 space-y-1">{children}</div>}
    </div>
  );
}

// Dummy component for HelpCenter, replace with actual icon if available in lucide-react or react-icons
function HelpCenter(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9.228a4.5 4.5 0 111.414 1.414l-1.414 1.414m-4.899 4.899a4.5 4.5 0 01-1.414-1.414L11.293 8.707m-1.414 1.414L8.707 11.293m-4.899 4.899L8.707 11.293M12 18V6" />
    </svg>
  );
}