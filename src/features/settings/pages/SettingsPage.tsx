import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  Save,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Smartphone,
  Mail,
  Lock,
  Moon,
  Sun,
  Monitor
} from 'lucide-react';

/**
 * Modern Settings page component with comprehensive user preferences
 */
export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: false,
    marketing: false
  });

  const tabs = [
    { id: 'profile', name: 'Profil', icon: User },
    { id: 'security', name: 'Keamanan', icon: Shield },
    { id: 'notifications', name: 'Notifikasi', icon: Bell },
    { id: 'appearance', name: 'Tampilan', icon: Palette },
    { id: 'preferences', name: 'Preferensi', icon: Settings }
  ];

  const handleSave = () => {
    // Simulate save action
    console.log('Settings saved');
  };

  const renderProfileSettings = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="h-20 w-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <User className="h-10 w-10 text-white" />
            </div>
            <button className="absolute -bottom-2 -right-2 h-8 w-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-blue-100 hover:bg-blue-50 transition-colors">
              <Settings className="h-4 w-4 text-blue-600" />
            </button>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-800">John Doe</h3>
            <p className="text-slate-600">john.doe@example.com</p>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200 mt-2">
              <Check className="h-3 w-3 mr-1" />
              Akun Terverifikasi
            </span>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Nama Depan</label>
            <input
              type="text"
              defaultValue="John"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Nama Belakang</label>
            <input
              type="text"
              defaultValue="Doe"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Nomor Telepon</label>
            <input
              type="tel"
              defaultValue="+62 812-3456-7890"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input
              type="email"
              defaultValue="john.doe@example.com"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Jabatan</label>
            <input
              type="text"
              defaultValue="Administrator"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
            <textarea
              rows={3}
              defaultValue="Experienced administrator with expertise in system management."
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      {/* Security Status */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-green-100 rounded-xl flex items-center justify-center">
            <Shield className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-800">Keamanan Akun Baik</h3>
            <p className="text-green-600 text-sm">Semua pengaturan keamanan telah dikonfigurasi dengan benar</p>
          </div>
        </div>
      </div>

      {/* Password Change */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
          <Lock className="h-5 w-5 text-slate-600" />
          <span>Ubah Password</span>
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Password Saat Ini</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password Baru</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Konfirmasi Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Smartphone className="h-5 w-5 text-slate-600" />
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Autentikasi Dua Faktor</h3>
              <p className="text-sm text-slate-600">Tambahkan lapisan keamanan ekstra untuk akun Anda</p>
            </div>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-200">
            Aktifkan
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
          <Mail className="h-5 w-5 text-slate-600" />
          <span>Notifikasi Email</span>
        </h3>
        <div className="space-y-4">
          {[
            { key: 'email', label: 'Notifikasi Umum', desc: 'Terima update penting via email' },
            { key: 'marketing', label: 'Email Marketing', desc: 'Newsletter dan promosi produk' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="font-medium text-slate-800">{item.label}</p>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[item.key as keyof typeof notifications]}
                  onChange={(e) => setNotifications(prev => ({ ...prev, [item.key]: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
          <Bell className="h-5 w-5 text-slate-600" />
          <span>Notifikasi Push</span>
        </h3>
        <div className="space-y-4">
          {[
            { key: 'push', label: 'Notifikasi Browser', desc: 'Notifikasi real-time di browser' },
            { key: 'sms', label: 'SMS Alerts', desc: 'Peringatan penting via SMS' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="font-medium text-slate-800">{item.label}</p>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[item.key as keyof typeof notifications]}
                  onChange={(e) => setNotifications(prev => ({ ...prev, [item.key]: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      {/* Theme Selection */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
          <Palette className="h-5 w-5 text-slate-600" />
          <span>Tema Aplikasi</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'light', name: 'Light', icon: Sun, active: !isDarkMode },
            { id: 'dark', name: 'Dark', icon: Moon, active: isDarkMode },
            { id: 'system', name: 'System', icon: Monitor, active: false }
          ].map((theme) => (
            <button
              key={theme.id}
              onClick={() => setIsDarkMode(theme.id === 'dark')}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                theme.active 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <theme.icon className={`h-6 w-6 ${theme.active ? 'text-blue-600' : 'text-slate-600'}`} />
                <span className={`font-medium ${theme.active ? 'text-blue-800' : 'text-slate-700'}`}>
                  {theme.name}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Language Selection */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
          <Globe className="h-5 w-5 text-slate-600" />
          <span>Bahasa</span>
        </h3>
        <select className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-200">
          <option value="id">Bahasa Indonesia</option>
          <option value="en">English</option>
          <option value="ms">Bahasa Malaysia</option>
        </select>
      </div>
    </div>
  );

  const renderPreferencesSettings = () => (
    <div className="space-y-6">
      {/* General Preferences */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Preferensi Umum</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div>
              <p className="font-medium text-slate-800">Auto-save</p>
              <p className="text-sm text-slate-600">Simpan perubahan secara otomatis</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div>
              <p className="font-medium text-slate-800">Compact Mode</p>
              <p className="text-sm text-slate-600">Tampilan yang lebih padat</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Modern Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-white via-slate-50/50 to-blue-50/30 backdrop-blur-sm rounded-3xl p-6 lg:p-8 border border-slate-200/60 shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/40 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 bg-gradient-to-br from-slate-600 to-slate-800 rounded-2xl flex items-center justify-center shadow-lg">
              <Settings className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-slate-600 to-blue-600 bg-clip-text text-transparent">
                Pengaturan
              </h1>
              <p className="text-slate-600 mt-1">
                Kelola preferensi akun dan konfigurasi aplikasi Anda
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
            <nav className="p-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-100 shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${activeTab === tab.id ? 'text-blue-600' : 'text-slate-500'}`} />
                    <span className="font-medium text-sm">{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm p-6">
            {activeTab === 'profile' && renderProfileSettings()}
            {activeTab === 'security' && renderSecuritySettings()}
            {activeTab === 'notifications' && renderNotificationSettings()}
            {activeTab === 'appearance' && renderAppearanceSettings()}
            {activeTab === 'preferences' && renderPreferencesSettings()}

            {/* Save Button */}
            <div className="flex justify-end pt-6 border-t border-slate-200 mt-8">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <Save className="h-4 w-4" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
