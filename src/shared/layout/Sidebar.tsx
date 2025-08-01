import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Shield,
  ChevronRight,
  X
} from 'lucide-react';
import { useAuth } from '../../features/auth/contexts/AuthContext';
import { navigationConfig } from '../routing/routes';

/**
 * Icon mapping for navigation items
 */
const iconMap = {
  dashboard: LayoutDashboard,
  users: Users,
  settings: Settings,
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Fixed sidebar navigation component that stays in place during scroll
 */
export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, hasRole } = useAuth();
  const location = useLocation();

  // Filter navigation items based on user role
  const visibleNavItems = navigationConfig.filter(item => 
    item.roles.some(role => hasRole(role))
  );

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Fixed Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full z-50 
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'w-72' : 'w-0 lg:w-20'}
        bg-white/95 backdrop-blur-md shadow-xl border-r border-slate-200/60 
        flex flex-col overflow-hidden
      `}>
        
        {/* Header */}
        <div className={`p-4 border-b border-slate-200/60 flex-shrink-0 ${isOpen ? 'px-6' : 'px-3'}`}>
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-3 ${isOpen ? '' : 'justify-center'}`}>
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              {isOpen && (
                <div className="transition-opacity duration-200">
                  <h1 className="text-lg font-bold text-slate-800">PS Admin</h1>
                  <p className="text-xs text-slate-500">Portal Administrasi</p>
                </div>
              )}
            </div>
            
            {/* Close button for mobile */}
            {isOpen && (
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-slate-100 transition-colors lg:hidden"
              >
                <X className="h-5 w-5 text-slate-600" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Navigation */}
        <nav className={`flex-1 overflow-y-auto sidebar-scroll p-3 space-y-1 ${isOpen ? 'px-4' : 'px-2'}`}>
          {visibleNavItems.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            const isActive = location.pathname === item.path;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => window.innerWidth < 1024 && onClose()}
                className={({ isActive }) =>
                  `flex items-center ${isOpen ? 'justify-between px-4 py-3' : 'justify-center p-3'} 
                  rounded-2xl transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
                title={!isOpen ? item.name : undefined}
              >
                <div className={`flex items-center ${isOpen ? 'space-x-3' : ''}`}>
                  <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-slate-500 group-hover:text-slate-700'}`} />
                  {isOpen && (
                    <span className="font-medium text-sm">{item.name}</span>
                  )}
                </div>
                
                {isOpen && (
                  <ChevronRight className={`h-4 w-4 transition-transform ${
                    isActive ? 'text-blue-600' : 'text-slate-300 group-hover:text-slate-400'
                  }`} />
                )}

                {/* Tooltip for collapsed state */}
                {!isOpen && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                    {item.name}
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-slate-800"></div>
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User info - fixed at bottom */}
        {isOpen && (
          <div className="p-4 border-t border-slate-200/60 flex-shrink-0">
            <div className="flex items-center space-x-3 p-3 bg-slate-50/80 rounded-2xl">
              <div className="h-8 w-8 bg-gradient-to-br from-slate-400 to-slate-600 rounded-xl flex items-center justify-center">
                <span className="text-sm font-medium text-white">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">
                  {user?.email?.split('@')[0]}
                </p>
                <p className="text-xs text-slate-500 capitalize">
                  {user?.role}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
