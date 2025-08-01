import React, { useState, useEffect } from 'react';
import { X, User as UserIcon, Mail, Lock, Shield, Save, Loader } from 'lucide-react';
import { User, CreateUserRequest, UpdateUserRequest } from '../types';
import { useCreateUser, useUpdateUser } from '../hooks/useUsers';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User | null;
}

/**
 * Enhanced user modal with role restrictions and API integration
 */
export const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, user }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user' as 'admin' | 'user' | 'moderator',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();

  const isEditing = !!user;
  const isLoading = createUserMutation.isLoading || updateUserMutation.isLoading;

  useEffect(() => {
    if (isOpen) {
      if (user) {
        setFormData({
          email: user.email,
          password: '', // Don't populate password for editing
          role: user.role,
        });
      } else {
        setFormData({
          email: '',
          password: '',
          role: 'user', // Default to user role for new users
        });
      }
      setErrors({});
    }
  }, [isOpen, user]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Masukkan alamat email yang valid';
    }

    if (!isEditing && !formData.password.trim()) {
      newErrors.password = 'Password wajib diisi';
    } else if (!isEditing && formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }

    if (!formData.role) {
      newErrors.role = 'Role wajib dipilih';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      if (isEditing && user) {
        const updateData: UpdateUserRequest = {
          email: formData.email,
          role: formData.role,
        };
        
        // Only include password if it's provided
        if (formData.password.trim()) {
          updateData.password = formData.password;
        }

        await updateUserMutation.mutateAsync({
          userId: user.id,
          userData: updateData,
        });
      } else {
        const createData: CreateUserRequest = {
          email: formData.email,
          password: formData.password,
          role: formData.role, // Will always be 'user' for new users
        };

        await createUserMutation.mutateAsync(createData);
      }

      onClose();
    } catch (error: any) {
      // Handle API errors
      if (error.message) {
        setErrors({ submit: error.message });
      } else {
        setErrors({ submit: 'Terjadi kesalahan yang tidak terduga' });
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-200/60 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200/60">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
              <UserIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {isEditing ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}
              </h2>
              <p className="text-sm text-slate-600">
                {isEditing ? 'Perbarui informasi pengguna' : 'Tambahkan pengguna baru ke sistem'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Alamat Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bg-slate-50/80 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.email
                    ? 'border-red-300 focus:ring-red-500/20 focus:border-red-400'
                    : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-400'
                }`}
                placeholder="user@example.com"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password {isEditing && <span className="text-slate-500">(kosongkan jika tidak ingin mengubah)</span>}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bg-slate-50/80 border rounded-xl text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.password
                    ? 'border-red-300 focus:ring-red-500/20 focus:border-red-400'
                    : 'border-slate-200 focus:ring-blue-500/20 focus:border-blue-400'
                }`}
                placeholder={isEditing ? "Masukkan password baru" : "Masukkan password"}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Role Field - Restricted for new users */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Peran Pengguna
            </label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              {!isEditing ? (
                // For new users, only show "User" role
                <div className="w-full pl-10 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-600">
                  User
                  <input type="hidden" value="user" />
                </div>
              ) : (
                // For editing, show current role but disabled
                <div className="w-full pl-10 pr-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl text-sm text-slate-600">
                  {formData.role === 'admin' ? 'Admin' : formData.role === 'moderator' ? 'Moderator' : 'User'}
                  <input type="hidden" value={formData.role} />
                </div>
              )}
            </div>
            {!isEditing && (
              <p className="mt-1 text-xs text-slate-500">
                Pengguna baru otomatis mendapat peran "User"
              </p>
            )}
            {isEditing && (
              <p className="mt-1 text-xs text-slate-500">
                Ubah peran melalui tabel pengguna
              </p>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <Loader className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  {isEditing ? 'Perbarui Pengguna' : 'Tambah Pengguna'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
