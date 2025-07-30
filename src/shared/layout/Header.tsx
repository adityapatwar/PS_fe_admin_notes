import React from 'react';
import { Menu, Bell, Search, Settings, ChevronDown, Sidebar } from 'lucide-react';
import { useAuth } from '../../features/auth';

interface HeaderProps {
  onMenuClick: () => void;
  onMinimizeClick: () => void;
  sidebarMinimized: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  onMenuClick, 
  onMinimizeClick, 
  sidebarMinimized 
}) => {
  const { user } = useAuth();

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm sticky top-0 z-40">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left section with enhanced mobile menu and search */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2.5 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Desktop sidebar toggle button */}
          <button
            onClick={onMinimizeClick}
            className="hidden lg:flex p-2.5 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={sidebarMinimized ? 'Expand sidebar' : 'Minimize sidebar'}
            title={sidebarMinimized ? 'Expand sidebar' : 'Minimize sidebar'}
          >
            <Sidebar className="h-5 w-5" />
          </button>
          
          {/* Enhanced search bar with responsive width */}
          <div className="hidden sm:block">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200" />
              </div>
              <input
                type="text"
                placeholder="Search anything..."
                className={`
                  block pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50/50 placeholder-slate-400 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white 
                  transition-all duration-200 hover:bg-white/80
                  ${sidebarMinimized ? 'w-64 lg:w-96' : 'w-64 lg:w-80'}
                `}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <kbd className="hidden lg:inline-flex items-center px-2 py-1 text-xs font-medium text-slate-400 bg-slate-100 border border-slate-200 rounded-md">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>
        </div>

        {/* Right section with enhanced notifications and user menu */}
        <div className="flex items-center space-x-3">
          {/* Quick actions */}
          <button className="hidden md:flex p-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Settings className="h-4 w-4" />
          </button>

          {/* Enhanced notifications with badge */}
          <button className="relative p-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
              3
            </span>
          </button>

          {/* Enhanced user profile dropdown */}
          <div className="relative group">
            <button className="flex items-center space-x-3 p-2 rounded-xl hover:bg-slate-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-sm font-semibold text-white">
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-slate-700">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-slate-500">Administrator</p>
              </div>
              <ChevronDown className="hidden sm:block h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors duration-200" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
