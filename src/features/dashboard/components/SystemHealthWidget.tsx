import React from 'react';
import { Activity, Database, Clock, Cpu, HardDrive, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { useSystemHealth } from '../hooks/useDashboardApi';

export const SystemHealthWidget: React.FC = () => {
  const { data: health, isLoading, error } = useSystemHealth();

  if (isLoading) {
    return (
      <div className="bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl border border-slate-200/60 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-green-50">
          <div className="animate-pulse">
            <div className="h-6 bg-slate-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-48"></div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse flex items-center justify-between p-3 rounded-xl bg-slate-50/50">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 bg-slate-200 rounded-full"></div>
                <div className="h-4 bg-slate-200 rounded w-24"></div>
              </div>
              <div className="h-4 bg-slate-200 rounded w-16"></div>
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
              <h3 className="text-lg font-semibold text-slate-800">System Health</h3>
              <p className="text-sm text-slate-600 mt-1">Error loading health data</p>
            </div>
            <XCircle className="h-5 w-5 text-red-500" />
          </div>
        </div>
        <div className="p-6">
          <div className="text-center py-4">
            <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-sm text-red-600">Failed to load system health</p>
          </div>
        </div>
      </div>
    );
  }

  if (!health) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'up':
        return 'green';
      case 'warning':
      case 'slow':
        return 'yellow';
      case 'critical':
      case 'down':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'up':
        return <CheckCircle className="h-4 w-4" />;
      case 'warning':
      case 'slow':
        return <AlertTriangle className="h-4 w-4" />;
      case 'critical':
      case 'down':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getUsageColor = (usage: number) => {
    if (usage >= 90) return 'red';
    if (usage >= 75) return 'yellow';
    return 'green';
  };

  // Safe string formatting with null checks
  const formatStatus = (status: string | undefined | null): string => {
    if (!status || typeof status !== 'string') return 'Unknown';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const metrics = [
    {
      label: 'System Status',
      value: formatStatus(health.status),
      status: health.status || 'unknown',
      icon: <Activity className="h-4 w-4" />,
    },
    {
      label: 'Database',
      value: formatStatus(health.databaseStatus),
      status: health.databaseStatus || 'unknown',
      icon: <Database className="h-4 w-4" />,
    },
    {
      label: 'Uptime',
      value: health.uptime || 'Unknown',
      status: 'healthy',
      icon: <Clock className="h-4 w-4" />,
    },
    {
      label: 'Memory Usage',
      value: `${health.memoryUsage || 0}%`,
      status: (health.memoryUsage || 0) >= 90 ? 'critical' : (health.memoryUsage || 0) >= 75 ? 'warning' : 'healthy',
      icon: <HardDrive className="h-4 w-4" />,
      progress: health.memoryUsage || 0,
    },
    {
      label: 'CPU Usage',
      value: `${health.cpuUsage || 0}%`,
      status: (health.cpuUsage || 0) >= 90 ? 'critical' : (health.cpuUsage || 0) >= 75 ? 'warning' : 'healthy',
      icon: <Cpu className="h-4 w-4" />,
      progress: health.cpuUsage || 0,
    },
  ];

  const overallStatusColor = getStatusColor(health.status || 'unknown');

  return (
    <div className="bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl border border-slate-200/60 overflow-hidden">
      <div className={`px-6 py-5 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-${overallStatusColor}-50`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">System Health</h3>
            <p className="text-sm text-slate-600 mt-1">Real-time system monitoring</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`h-2 w-2 bg-${overallStatusColor}-500 rounded-full animate-pulse`}></div>
            <span className={`text-sm font-medium text-${overallStatusColor}-600`}>
              {formatStatus(health.status)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        {metrics.map((metric, index) => {
          const statusColor = getStatusColor(metric.status);
          
          return (
            <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 hover:bg-slate-100/50 transition-all duration-200">
              <div className="flex items-center space-x-3">
                <div className={`text-${statusColor}-500`}>
                  {metric.icon}
                </div>
                <span className="text-sm font-medium text-slate-700">{metric.label}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`text-sm font-semibold text-${statusColor}-600`}>
                  {metric.value}
                </span>
                {metric.progress !== undefined && (
                  <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-${getUsageColor(metric.progress)}-500 transition-all duration-300`}
                      style={{ width: `${metric.progress}%` }}
                    ></div>
                  </div>
                )}
                <div className={`text-${statusColor}-500`}>
                  {getStatusIcon(metric.status)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
