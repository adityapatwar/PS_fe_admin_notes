import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut,
  X,
  Shield,
  Zap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../features/auth';

interface SidebarProps {
  isOpen: boolean;
  isMinimized: boolean;
  onToggle: () => void;
  onMinimize: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, badge: null },
  { name: 'User Management', href: '/users', icon: Users, badge: '12' },
  { name: 'Settings', href: '/settings', icon: Settings, badge: null },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  isMinimized, 
  onToggle, 
  onMinimize 
}) => {
  const { logout, user } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  // Close sidebar on mobile when navigating
  const handleNavClick = () => {
    if (window.innerWidth < 1024) { // lg breakpoint
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile backdrop with blur effect */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm lg:hidden transition-all duration-300"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      {/* Fixed positioned sidebar with proper z-index */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-full bg-white/95 backdrop-blur-xl shadow-2xl border-r border-slate-200/60 
          transition-all duration-300 ease-in-out
          lg:translate-x-0 lg:z-30
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isMinimized ? 'lg:w-20' : 'lg:w-72'}
          w-72
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex flex-col h-full">
          {/* Header with brand identity and minimize button */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200/60 bg-gradient-to-r from-blue-50 to-indigo-50 relative">
            {/* Brand section */}
            <div className={`flex items-center space-x-3 transition-all duration-300 ${isMinimized ? 'lg:justify-center lg:space-x-0' : ''}`}>
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-4 w-4 text-white" />
              </div>
              {!isMinimized && (
                <div className="lg:block">
                  <h1 className="text-lg font-bold text-slate-800">AdminHub</h1>
                  <p className="text-xs text-slate-500">Management Portal</p>
                </div>
              )}
            </div>

            {/* Control buttons */}
            <div className="flex items-center space-x-2">
              {/* Desktop minimize button */}
              <button
                onClick={onMinimize}
                className="hidden lg:flex p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={isMinimized ? 'Expand sidebar' : 'Minimize sidebar'}
                title={isMinimized ? 'Expand sidebar' : 'Minimize sidebar'}
              >
                {isMinimized ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <ChevronLeft className="h-4 w-4" />
                )}
              </button>

              {/* Mobile close button */}
              <button
                onClick={onToggle}
                className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Navigation with responsive design for minimized state */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            <div className="mb-6">
              {!isMinimized && (
                <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Main Navigation
                </p>
              )}
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={handleNavClick}
                  className={({ isActive }) => {
                    return `group flex items-center justify-between px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    } ${isMinimized ? 'lg:justify-center lg:px-2' : ''}`;
                  }}
                  title={isMinimized ? item.name : undefined}
                >
                  <div className={`flex items-center ${isMinimized ? 'lg:justify-center' : ''}`}>
                    <item.icon className={`h-5 w-5 flex-shrink-0 ${isMinimized ? 'lg:mr-0' : 'mr-3'}`} />
                    {!isMinimized && (
                      <span className="lg:block">{item.name}</span>
                    )}
                  </div>
                  {item.badge && !isMinimized && (
                    <span className="ml-auto inline-flex items-center px-2 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full group-hover:bg-white/20 lg:block">
                      {item.badge}
                    </span>
                  )}
                  {/* Tooltip for minimized state */}
                  {isMinimized && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 hidden lg:block">
                      {item.name}
                      {item.badge && (
                        <span className="ml-2 px-1.5 py-0.5 bg-slate-600 rounded-full text-xs">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Quick stats section - hidden when minimized */}
            {!isMinimized && (
              <div className="mt-8 p-4 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-200/60 lg:block">
                <div className="flex items-center space-x-2 mb-3">
                  <Zap className="h-4 w-4 text-blue-500" />
                  <p className="text-sm font-semibold text-slate-700">Quick Stats</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600">Active Users</span>
                    <span className="font-medium text-slate-800">1,234</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600">System Health</span>
                    <span className="font-medium text-green-600">98.5%</span>
                  </div>
                </div>
              </div>
            )}
          </nav>

          {/* User section with responsive design */}
          <div className="border-t border-slate-200/60 p-4 bg-gradient-to-r from-slate-50 to-blue-50">
            {/* User profile */}
            <div className={`flex items-center mb-4 p-3 bg-white/60 rounded-xl border border-slate-200/60 transition-all duration-300 ${
              isMinimized ? 'lg:justify-center lg:p-2' : 'space-x-3'
            }`}>
              <div className="flex-shrink-0">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
                  <span className="text-sm font-semibold text-white">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                </div>
              </div>
              {!isMinimized && (
                <div className="flex-1 min-w-0 lg:block">
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                  <p className="text-xs text-blue-600 font-medium">Administrator</p>
                </div>
              )}
            </div>
            
            {/* Logout button */}
            <button
              onClick={handleLogout}
              className={`flex items-center w-full px-3 py-3 text-sm font-medium text-slate-700 rounded-xl hover:bg-red-50 hover:text-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 group ${
                isMinimized ? 'lg:justify-center lg:px-2' : ''
              }`}
              title={isMinimized ? 'Sign out' : undefined}
            >
              <LogOut className={`h-4 w-4 group-hover:text-red-600 transition-colors duration-200 ${
                isMinimized ? 'lg:mr-0' : 'mr-3'
              }`} />
              {!isMinimized && (
                <span className="lg:block">Sign out</span>
              )}
              {/* Tooltip for minimized state */}
              {isMinimized && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 hidden lg:block">
                  Sign out
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
