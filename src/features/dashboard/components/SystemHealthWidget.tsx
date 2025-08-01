import React from 'react';
import { Activity, Database, Clock, Cpu, HardDrive, AlertTriangle, CheckCircle, XCircle, Zap, Globe } from 'lucide-react';
import { useSystemHealth } from '../hooks/useDashboardApi';

export const SystemHealthWidget: React.FC = () => {
  const { data: health, isLoading, error } = useSystemHealth();

  if (isLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm shadow-sm rounded-2xl border border-slate-200/60 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-green-50">
          <div className="animate-pulse">
            <div className="h-6 bg-slate-200 rounded w-32 mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-48"></div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
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
      <div className="bg-white/80 backdrop-blur-sm shadow-sm rounded-2xl border border-slate-200/60 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-red-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Kesehatan Sistem</h3>
              <p className="text-sm text-slate-600 mt-1">Error memuat data kesehatan</p>
            </div>
            <XCircle className="h-5 w-5 text-red-500" />
          </div>
        </div>
        <div className="p-6">
          <div className="text-center py-4">
            <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-sm text-red-600">Gagal memuat kesehatan sistem</p>
          </div>
        </div>
      </div>
    );
  }

  if (!health) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
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
    switch (status?.toLowerCase()) {
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

  const formatStatus = (status: string | undefined | null): string => {
    if (!status || typeof status !== 'string') return 'Tidak Diketahui';
    const statusMap: { [key: string]: string } = {
      'healthy': 'Sehat',
      'warning': 'Peringatan',
      'critical': 'Kritis',
      'up': 'Aktif',
      'down': 'Mati',
      'unsupported': 'Tidak Didukung'
    };
    return statusMap[status.toLowerCase()] || status.charAt(0).toUpperCase() + status.slice(1);
  };

  const overallStatusColor = getStatusColor(health.database?.status || 'unknown');

  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-sm rounded-2xl border border-slate-200/60 overflow-hidden">
      <div className={`px-6 py-5 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-${overallStatusColor}-50`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Kesehatan Sistem</h3>
            <p className="text-sm text-slate-600 mt-1">Monitoring sistem real-time</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`h-2 w-2 bg-${overallStatusColor}-500 rounded-full animate-pulse`}></div>
            <span className={`text-sm font-medium text-${overallStatusColor}-600`}>
              {formatStatus(health.database?.status)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        {/* Database Health */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-800">Database</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-semibold text-${getStatusColor(health.database?.status)}-600`}>
                {formatStatus(health.database?.status)}
              </span>
              <div className={`text-${getStatusColor(health.database?.status)}-500`}>
                {getStatusIcon(health.database?.status)}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-blue-600">Response Time:</span>
              <span className="ml-2 font-medium text-blue-800">{health.database?.responseTime || 'N/A'}</span>
            </div>
            <div>
              <span className="text-blue-600">Aktif:</span>
              <span className="ml-2 font-medium text-blue-800">{health.database?.connectionPool?.active || 0}</span>
            </div>
            <div>
              <span className="text-blue-600">Idle:</span>
              <span className="ml-2 font-medium text-blue-800">{health.database?.connectionPool?.idle || 0}</span>
            </div>
            <div>
              <span className="text-blue-600">Max:</span>
              <span className="ml-2 font-medium text-blue-800">{health.database?.connectionPool?.max || 0}</span>
            </div>
          </div>
        </div>

        {/* System Metrics */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 hover:bg-slate-100/50 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <Clock className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-slate-700">Uptime</span>
            </div>
            <span className="text-sm font-semibold text-green-600">
              {health.system?.uptime || 'N/A'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 hover:bg-slate-100/50 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <HardDrive className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-slate-700">Memory Usage</span>
            </div>
            <span className="text-sm font-semibold text-blue-600">
              {health.system?.memoryUsage || 'N/A'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 hover:bg-slate-100/50 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <Cpu className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium text-slate-700">CPU Usage</span>
            </div>
            <span className="text-sm font-semibold text-purple-600">
              {formatStatus(health.system?.cpuUsage)}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 hover:bg-slate-100/50 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <HardDrive className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-slate-700">Disk Usage</span>
            </div>
            <span className="text-sm font-semibold text-orange-600">
              {health.system?.diskUsage || 'N/A'}
            </span>
          </div>
        </div>

        {/* API Metrics */}
        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-200">
          <div className="flex items-center space-x-2 mb-3">
            <Globe className="h-5 w-5 text-indigo-600" />
            <span className="font-medium text-indigo-800">API Performance</span>
          </div>
          
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-indigo-600">Requests/Min:</span>
              <span className="font-medium text-indigo-800">{health.api?.requestsPerMinute || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-indigo-600">Avg Response:</span>
              <span className="font-medium text-indigo-800">{health.api?.averageResponseTime || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-indigo-600">Error Rate:</span>
              <span className="font-medium text-indigo-800">{health.api?.errorRate || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
