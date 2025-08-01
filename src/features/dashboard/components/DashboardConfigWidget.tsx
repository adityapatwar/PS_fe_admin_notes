import React, { useState } from 'react';
import { Settings, Save, RefreshCw, Monitor, Moon, Sun, Grid, List, MoreHorizontal } from 'lucide-react';
import { useDashboardConfig, useUpdateDashboardConfig } from '../hooks/useDashboardApi';

export const DashboardConfigWidget: React.FC = () => {
  const { data: config, isLoading, error, refetch } = useDashboardConfig();
  const updateConfig = useUpdateDashboardConfig();
  
  const [localConfig, setLocalConfig] = useState({
    theme: 'light' as 'light' | 'dark',
    refreshInterval: 30,
    layout: 'grid' as 'grid' | 'list' | 'compact',
    widgets: [] as string[],
  });

  // Update local config when data is loaded
  React.useEffect(() => {
    if (config) {
      setLocalConfig({
        theme: config.theme,
        refreshInterval: config.refreshInterval,
        layout: config.layout,
        widgets: config.widgets,
      });
    }
  }, [config]);

  const handleSave = async () => {
    try {
      await updateConfig.mutateAsync(localConfig);
    } catch (error) {
      console.error('Failed to update config:', error);
    }
  };

  const availableWidgets = [
    { id: 'statistics', name: 'Statistik', icon: Grid },
    { id: 'user-analytics', name: 'Analitik Pengguna', icon: Monitor },
    { id: 'notes-analytics', name: 'Analitik Catatan', icon: List },
    { id: 'system-health', name: 'Kesehatan Sistem', icon: RefreshCw },
  ];

  if (isLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm shadow-sm rounded-2xl border border-slate-200/60 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200/60">
          <div className="animate-pulse">
            <div className="h-6 bg-slate-200 rounded w-40 mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-56"></div>
          </div>
        </div>
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-12 bg-slate-100 rounded-lg"></div>
            ))}
          </div>
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
              <h3 className="text-lg font-semibold text-slate-800">Konfigurasi Dashboard</h3>
              <p className="text-sm text-slate-600 mt-1">Error memuat konfigurasi</p>
            </div>
            <Settings className="h-5 w-5 text-red-500" />
          </div>
        </div>
        <div className="p-6">
          <div className="text-center py-4">
            <Settings className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-sm text-red-600">Gagal memuat konfigurasi dashboard</p>
            <button
              onClick={() => refetch()}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm shadow-sm rounded-2xl border border-slate-200/60 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Konfigurasi Dashboard</h3>
            <p className="text-sm text-slate-600 mt-1">Personalisasi tampilan dashboard Anda</p>
          </div>
          <Settings className="h-5 w-5 text-blue-500" />
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Theme Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">Tema</label>
          <div className="flex space-x-3">
            <button
              onClick={() => setLocalConfig(prev => ({ ...prev, theme: 'light' }))}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-all ${
                localConfig.theme === 'light'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Sun className="h-4 w-4" />
              <span>Terang</span>
            </button>
            <button
              onClick={() => setLocalConfig(prev => ({ ...prev, theme: 'dark' }))}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-all ${
                localConfig.theme === 'dark'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <Moon className="h-4 w-4" />
              <span>Gelap</span>
            </button>
          </div>
        </div>

        {/* Layout Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">Layout</label>
          <div className="flex space-x-3">
            {[
              { value: 'grid', label: 'Grid', icon: Grid },
              { value: 'list', label: 'List', icon: List },
              { value: 'compact', label: 'Kompak', icon: MoreHorizontal },
            ].map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setLocalConfig(prev => ({ ...prev, layout: value as any }))}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-all ${
                  localConfig.layout === value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Refresh Interval */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Interval Refresh ({localConfig.refreshInterval} detik)
          </label>
          <input
            type="range"
            min="15"
            max="300"
            step="15"
            value={localConfig.refreshInterval}
            onChange={(e) => setLocalConfig(prev => ({ ...prev, refreshInterval: parseInt(e.target.value) }))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>15s</span>
            <span>5m</span>
          </div>
        </div>

        {/* Widget Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">Widget Aktif</label>
          <div className="space-y-2">
            {availableWidgets.map(({ id, name, icon: Icon }) => (
              <label key={id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localConfig.widgets.includes(id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setLocalConfig(prev => ({ ...prev, widgets: [...prev.widgets, id] }));
                    } else {
                      setLocalConfig(prev => ({ ...prev, widgets: prev.widgets.filter(w => w !== id) }));
                    }
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                />
                <Icon className="h-4 w-4 text-slate-500" />
                <span className="text-sm text-slate-700">{name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-slate-200">
          <button
            onClick={handleSave}
            disabled={updateConfig.isPending}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {updateConfig.isPending ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>{updateConfig.isPending ? 'Menyimpan...' : 'Simpan Konfigurasi'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
