import React from 'react';
import { Menu, Bell, Search, User, LogOut } from 'lucide-react';
import { useAuth } from '../../features/auth/contexts/AuthContext';

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

/**
 * Fixed header component that stays at the top during scroll
 */
export const Header: React.FC<HeaderProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/60 shadow-sm flex-shrink-0">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Menu toggle and search */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu toggle */}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-xl hover:bg-slate-100 transition-colors lg:hidden"
            >
              <Menu className="h-5 w-5 text-slate-600" />
            </button>

            {/* Desktop sidebar toggle */}
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex p-2 rounded-xl hover:bg-slate-100 transition-colors"
              title={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              <Menu className="h-5 w-5 text-slate-600" />
            </button>

            {/* Search bar */}
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari..."
                className="pl-10 pr-4 py-2 bg-slate-50/80 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 w-64"
              />
            </div>
          </div>

          {/* Right side - Notifications and user menu */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors">
              <Bell className="h-5 w-5 text-slate-600" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User menu */}
            <div className="flex items-center space-x-3 pl-3 border-l border-slate-200">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-slate-800">
                  {user?.email?.split('@')[0]}
                </p>
                <p className="text-xs text-slate-500 capitalize">
                  {user?.role}
                </p>
              </div>
              
              <div className="h-8 w-8 bg-gradient-to-br from-slate-400 to-slate-600 rounded-xl flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>

              <button
                onClick={logout}
                className="p-2 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
