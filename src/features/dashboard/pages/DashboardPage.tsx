import React from 'react';
import { Users, FileText, TrendingUp, Activity, ArrowUpRight, ArrowDownRight, Settings } from 'lucide-react';
import { useUsers } from '../../users/hooks/useUsers';
import { StatCard } from '../components/StatCard';

export const DashboardPage: React.FC = () => {
  const { data: users, isLoading, error } = useUsers();

  const stats = [
    {
      title: 'Total Users',
      value: Array.isArray(users) ? users.length.toString() : '0',
      icon: <Users className="h-6 w-6 text-white" />,
      change: '+12%',
      changeType: 'positive' as const,
      description: 'vs last month'
    },
    {
      title: 'Active Sessions',
      value: '2,345',
      icon: <Activity className="h-6 w-6 text-white" />,
      change: '+8%',
      changeType: 'positive' as const,
      description: 'currently online'
    },
    {
      title: 'Total Notes',
      value: '1,234',
      icon: <FileText className="h-6 w-6 text-white" />,
      change: '+23%',
      changeType: 'positive' as const,
      description: 'documents created'
    },
    {
      title: 'Growth Rate',
      value: '15.3%',
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      change: '+2.1%',
      changeType: 'positive' as const,
      description: 'monthly growth'
    },
  ];

  // Safe function to get user initials
  const getInitials = (user: any): string => {
    try {
      if (!user) return 'U';
      
      const firstName = user.firstName || user.first_name || '';
      const lastName = user.lastName || user.last_name || '';
      
      const firstInitial = typeof firstName === 'string' && firstName.length > 0 ? firstName[0].toUpperCase() : '';
      const lastInitial = typeof lastName === 'string' && lastName.length > 0 ? lastName[0].toUpperCase() : '';
      
      return firstInitial + lastInitial || 'U';
    } catch (e) {
      console.error('Error getting initials:', e);
      return 'U';
    }
  };

  // Safe function to get user display name
  const getDisplayName = (user: any): string => {
    try {
      if (!user) return 'Unknown User';
      
      const firstName = user.firstName || user.first_name || '';
      const lastName = user.lastName || user.last_name || '';
      
      const fullName = `${firstName} ${lastName}`.trim();
      return fullName || user.name || user.username || 'Unknown User';
    } catch (e) {
      console.error('Error getting display name:', e);
      return 'Unknown User';
    }
  };

  // Safe function to get user email
  const getUserEmail = (user: any): string => {
    try {
      return user?.email || user?.emailAddress || 'No email provided';
    } catch (e) {
      console.error('Error getting email:', e);
      return 'No email provided';
    }
  };

  // Safe function to get user status
  const getUserStatus = (user: any): boolean => {
    try {
      return user?.isActive || user?.active || user?.status === 'active' || false;
    } catch (e) {
      console.error('Error getting status:', e);
      return false;
    }
  };

  // Render recent users section
  const renderRecentUsers = () => {
    if (isLoading) {
      return (
        <div className="animate-pulse space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-slate-200 rounded-xl"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
              </div>
              <div className="h-6 w-16 bg-slate-200 rounded-full"></div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-8">
          <div className="h-12 w-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Users className="h-6 w-6 text-red-500" />
          </div>
          <p className="text-sm text-red-600 font-medium">Error loading users</p>
          <p className="text-xs text-slate-500 mt-1">Please try refreshing the page</p>
        </div>
      );
    }

    if (!users || !Array.isArray(users) || users.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="h-12 w-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Users className="h-6 w-6 text-slate-400" />
          </div>
          <p className="text-sm text-slate-600 font-medium">No users found</p>
          <p className="text-xs text-slate-500 mt-1">Users will appear here once added</p>
        </div>
      );
    }

    try {
      const safeUsers = users.slice(0, 5);
      
      return (
        <div className="space-y-3">
          {safeUsers.map((user, index) => {
            const userId = user?.id || user?.userId || `user-${index}`;
            const initials = getInitials(user);
            const displayName = getDisplayName(user);
            const email = getUserEmail(user);
            const isActive = getUserStatus(user);

            return (
              <div key={userId} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 group">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
                  <span className="text-sm font-semibold text-white">
                    {initials}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate group-hover:text-blue-600 transition-colors duration-200">
                    {displayName}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {email}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full ${
                      isActive
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-red-100 text-red-700 border border-red-200'
                    }`}
                  >
                    <div className={`h-1.5 w-1.5 rounded-full mr-1.5 ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    {isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      );
    } catch (e) {
      console.error('Error rendering users:', e);
      return (
        <div className="text-center py-8">
          <div className="h-12 w-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Users className="h-6 w-6 text-red-500" />
          </div>
          <p className="text-sm text-red-600 font-medium">Error displaying users</p>
          <p className="text-xs text-slate-500 mt-1">Please contact support if this persists</p>
        </div>
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Enhanced header section */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h1>
            <p className="text-slate-600 max-w-2xl">
              Welcome back! Here's a comprehensive overview of your application's performance and user activity.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-700">Last updated</p>
              <p className="text-xs text-slate-500">2 minutes ago</p>
            </div>
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Enhanced stats grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={`stat-${index}`} {...stat} />
        ))}
      </div>

      {/* Enhanced content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent users - spans 2 columns on xl screens */}
        <div className="xl:col-span-2 bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl border border-slate-200/60 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-blue-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Recent Users</h3>
                <p className="text-sm text-slate-600 mt-1">Latest user registrations and activity</p>
              </div>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200">
                View all
              </button>
            </div>
          </div>
          <div className="p-6">
            {renderRecentUsers()}
          </div>
        </div>

        {/* System health - single column */}
        <div className="bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl border border-slate-200/60 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-green-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">System Health</h3>
                <p className="text-sm text-slate-600 mt-1">Real-time monitoring</p>
              </div>
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {[
              { label: 'API Response Time', value: '125ms', status: 'excellent', color: 'green' },
              { label: 'Database Status', value: 'Healthy', status: 'good', color: 'green' },
              { label: 'Server Uptime', value: '99.9%', status: 'excellent', color: 'green' },
              { label: 'Memory Usage', value: '68%', status: 'warning', color: 'yellow' },
              { label: 'CPU Usage', value: '45%', status: 'good', color: 'blue' },
            ].map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 hover:bg-slate-100/50 transition-all duration-200">
                <div className="flex items-center space-x-3">
                  <div className={`h-2 w-2 rounded-full bg-${metric.color}-500`}></div>
                  <span className="text-sm font-medium text-slate-700">{metric.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-semibold text-${metric.color}-600`}>
                    {metric.value}
                  </span>
                  {metric.status === 'excellent' && <ArrowUpRight className="h-3 w-3 text-green-500" />}
                  {metric.status === 'warning' && <ArrowDownRight className="h-3 w-3 text-yellow-500" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional analytics section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl border border-slate-200/60 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Activity Timeline</h3>
          <div className="space-y-4">
            {[
              { time: '2 min ago', action: 'New user registered', user: 'John Doe', type: 'user' },
              { time: '15 min ago', action: 'System backup completed', user: 'System', type: 'system' },
              { time: '1 hour ago', action: 'Database optimized', user: 'Admin', type: 'maintenance' },
              { time: '3 hours ago', action: 'Security scan completed', user: 'System', type: 'security' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200">
                <div className={`h-2 w-2 rounded-full mt-2 ${
                  activity.type === 'user' ? 'bg-blue-500' :
                  activity.type === 'system' ? 'bg-green-500' :
                  activity.type === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-slate-500">{activity.user}</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl border border-slate-200/60 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Add User', icon: Users, color: 'blue' },
              { label: 'Generate Report', icon: FileText, color: 'green' },
              { label: 'System Settings', icon: Settings, color: 'purple' },
              { label: 'View Analytics', icon: TrendingUp, color: 'orange' },
            ].map((action, index) => (
              <button
                key={index}
                className={`p-4 rounded-xl border-2 border-dashed border-${action.color}-200 hover:border-${action.color}-300 hover:bg-${action.color}-50 transition-all duration-200 group`}
              >
                <action.icon className={`h-6 w-6 text-${action.color}-500 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200`} />
                <p className={`text-sm font-medium text-${action.color}-700`}>{action.label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
