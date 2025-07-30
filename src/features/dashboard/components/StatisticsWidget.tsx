import React from 'react';
import { Users, FileText, UserCheck, UserPlus, Calendar, TrendingUp } from 'lucide-react';
import { useDashboardStatistics } from '../hooks/useDashboardApi';
import { StatCard } from './StatCard';

export const StatisticsWidget: React.FC = () => {
  const { data: statistics, isLoading, error } = useDashboardStatistics();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-24"></div>
                  <div className="h-8 bg-slate-200 rounded w-16"></div>
                </div>
                <div className="h-12 w-12 bg-slate-200 rounded-xl"></div>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <div className="h-3 bg-slate-200 rounded w-12"></div>
                <div className="h-3 bg-slate-200 rounded w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-red-100 rounded-xl flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-red-800">Failed to load statistics</h3>
            <p className="text-xs text-red-600 mt-1">Please try refreshing the page</p>
          </div>
        </div>
      </div>
    );
  }

  if (!statistics) {
    return null;
  }

  const stats = [
    {
      title: 'Total Users',
      value: statistics.totalUsers.toLocaleString(),
      icon: <Users className="h-6 w-6 text-white" />,
      change: '+12%',
      changeType: 'positive' as const,
      description: 'registered users'
    },
    {
      title: 'Total Notes',
      value: statistics.totalNotes.toLocaleString(),
      icon: <FileText className="h-6 w-6 text-white" />,
      change: '+8%',
      changeType: 'positive' as const,
      description: 'documents created'
    },
    {
      title: 'Active Users',
      value: statistics.activeUsers.toLocaleString(),
      icon: <UserCheck className="h-6 w-6 text-white" />,
      change: '+5%',
      changeType: 'positive' as const,
      description: 'last 24 hours'
    },
    {
      title: 'New Users',
      value: statistics.newUsers.toLocaleString(),
      icon: <UserPlus className="h-6 w-6 text-white" />,
      change: '+15%',
      changeType: 'positive' as const,
      description: 'today'
    },
    {
      title: 'Notes Today',
      value: statistics.notesToday.toLocaleString(),
      icon: <Calendar className="h-6 w-6 text-white" />,
      change: '+23%',
      changeType: 'positive' as const,
      description: 'created today'
    },
    {
      title: 'Users Today',
      value: statistics.usersToday.toLocaleString(),
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      change: '+18%',
      changeType: 'positive' as const,
      description: 'new registrations'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">Statistics Overview</h2>
        <div className="text-xs text-slate-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard key={`stat-${index}`} {...stat} />
        ))}
      </div>
    </div>
  );
};
