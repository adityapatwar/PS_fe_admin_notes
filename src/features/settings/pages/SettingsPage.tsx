import React from 'react';
import { Settings, User, Shield, Bell, Palette, Globe } from 'lucide-react';

/**
 * Settings page component
 * Placeholder for application settings and user preferences
 */
export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Settings className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
            <p className="text-slate-600">Manage your account and application preferences</p>
          </div>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="h-10 w-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Profile Settings</h3>
              <p className="text-sm text-slate-600">Update your personal information</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-sm font-medium text-slate-700">Profile management coming soon</p>
              <p className="text-xs text-slate-500 mt-1">Edit name, email, and profile picture</p>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="h-10 w-10 bg-red-100 rounded-xl flex items-center justify-center">
              <Shield className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Security</h3>
              <p className="text-sm text-slate-600">Manage your account security</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-sm font-medium text-slate-700">Security features coming soon</p>
              <p className="text-xs text-slate-500 mt-1">Password change, 2FA, and session management</p>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="h-10 w-10 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Bell className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Notifications</h3>
              <p className="text-sm text-slate-600">Configure your notification preferences</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-sm font-medium text-slate-700">Notification settings coming soon</p>
              <p className="text-xs text-slate-500 mt-1">Email, push, and in-app notifications</p>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="h-10 w-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Palette className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Appearance</h3>
              <p className="text-sm text-slate-600">Customize the look and feel</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-sm font-medium text-slate-700">Theme options coming soon</p>
              <p className="text-xs text-slate-500 mt-1">Dark mode, color themes, and layout options</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
