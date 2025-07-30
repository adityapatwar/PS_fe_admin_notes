import React from 'react';
import { Activity, User, FileText, Shield, Clock, AlertCircle } from 'lucide-react';
import { useRecentActivities } from '../hooks/useDashboardApi';
import { RecentActivity } from '../types/api';

export const RecentActivitiesWidget: React.FC = () => {
  const { data: activities, isLoading, error } = useRecentActivities({ limit: 10 });

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'user_registration':
      case 'user_login':
        return <User className="h-4 w-4" />;
      case 'note_created':
      case 'note_updated':
      case 'note_deleted':
        return <FileText className="h-4 w-4" />;
      case 'admin_action':
        return <Shield className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: RecentActivity['type']) => {
    switch (type) {
      case 'user_registration':
        return 'green';
      case 'user_login':
        return 'blue';
      case 'note_created':
        return 'indigo';
      case 'note_updated':
        return 'yellow';
      case 'note_deleted':
        return 'red';
      case 'admin_action':
        return 'purple';
      default:
        return 'gray';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  if (isLoading) {
    return (
      <div className="bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl border border-slate-200/60 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-blue-50">
          <div className="animate-pulse">
            <div className="h-6 bg-slate-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-48"></div>
          </div>
        </div>
        <div className="p-6 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse flex items-start space-x-3 p-3 rounded-xl">
              <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
              </div>
              <div className="h-3 bg-slate-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl border border-slate-200/60 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-red-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Recent Activities</h3>
              <p className="text-sm text-slate-600 mt-1">Error loading activities</p>
            </div>
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
        </div>
        <div className="p-6">
          <div className="text-center py-4">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-sm text-red-600">Failed to load recent activities</p>
          </div>
        </div>
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl border border-slate-200/60 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Recent Activities</h3>
              <p className="text-sm text-slate-600 mt-1">Latest system activities</p>
            </div>
            <Activity className="h-5 w-5 text-blue-500" />
          </div>
        </div>
        <div className="p-6">
          <div className="text-center py-8">
            <Activity className="h-8 w-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-600">No recent activities</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl border border-slate-200/60 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Recent Activities</h3>
            <p className="text-sm text-slate-600 mt-1">Latest system activities</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-slate-500">Live</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {activities.map((activity) => {
            const color = getActivityColor(activity.type);
            const icon = getActivityIcon(activity.type);
            
            return (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 group">
                <div className={`h-8 w-8 bg-${color}-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-${color}-200 transition-colors duration-200`}>
                  <div className={`text-${color}-600`}>
                    {icon}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800 group-hover:text-slate-900 transition-colors duration-200">
                        {activity.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        {activity.userName && (
                          <>
                            <span className="text-xs text-slate-600 font-medium">
                              {activity.userName}
                            </span>
                            <span className="text-xs text-slate-400">•</span>
                          </>
                        )}
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3 text-slate-400" />
                          <span className="text-xs text-slate-500">
                            {formatTimeAgo(activity.timestamp)}
                          </span>
                        </div>
                      </div>
                      
                      {activity.details && Object.keys(activity.details).length > 0 && (
                        <div className="mt-2 text-xs text-slate-500">
                          {activity.details.email && (
                            <span className="inline-block bg-slate-100 px-2 py-1 rounded mr-2">
                              {activity.details.email}
                            </span>
                          )}
                          {activity.details.title && (
                            <span className="inline-block bg-slate-100 px-2 py-1 rounded mr-2">
                              "{activity.details.title}"
                            </span>
                          )}
                          {activity.details.source && (
                            <span className="inline-block bg-slate-100 px-2 py-1 rounded">
                              via {activity.details.source}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-200">
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200">
            View all activities →
          </button>
        </div>
      </div>
    </div>
  );
};
