import React, { useState } from 'react';
import { 
  Edit, 
  Trash2, 
  Shield, 
  User as UserIcon, 
  Crown,
  MoreVertical,
  Eye,
  UserCheck,
  UserX,
  Calendar,
  FileText,
  Users
} from 'lucide-react';
import { User } from '../types';
import { useDeleteUser } from '../hooks/useUsers';
import { DevelopmentModal } from './DevelopmentModal';

interface UserTableProps {
  users: User[];
  isLoading?: boolean;
  onEditUser: (user: User) => void;
  onViewNotes: (user: User) => void;
}

/**
 * Enhanced user table component with development modal for role changes
 */
export const UserTable: React.FC<UserTableProps> = ({ 
  users, 
  isLoading, 
  onEditUser, 
  onViewNotes 
}) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isDevelopmentModalOpen, setIsDevelopmentModalOpen] = useState(false);
  const deleteUserMutation = useDeleteUser();

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus user ini?')) {
      try {
        await deleteUserMutation.mutateAsync(userId);
        // Success feedback could be handled by a toast notification
      } catch (error) {
        console.error('Failed to delete user:', error);
        // Error feedback could be handled by a toast notification
      }
    }
  };

  const handleChangeRoleClick = () => {
    setSelectedUser(null);
    setIsDevelopmentModalOpen(true);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-4 w-4 text-yellow-600" />;
      case 'moderator':
        return <Shield className="h-4 w-4 text-blue-600" />;
      default:
        return <UserIcon className="h-4 w-4 text-slate-600" />;
    }
  };

  const getRoleBadge = (role: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (role) {
      case 'admin':
        return `${baseClasses} bg-yellow-100/80 text-yellow-800 border border-yellow-200/60`;
      case 'moderator':
        return `${baseClasses} bg-blue-100/80 text-blue-800 border border-blue-200/60`;
      default:
        return `${baseClasses} bg-slate-100/80 text-slate-800 border border-slate-200/60`;
    }
  };

  const getStatusBadge = (status?: string) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-100/80 text-green-800 border border-green-200/60`;
      case 'inactive':
        return `${baseClasses} bg-red-100/80 text-red-800 border border-red-200/60`;
      default:
        return `${baseClasses} bg-slate-100/80 text-slate-800 border border-slate-200/60`;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-slate-200/80 rounded-2xl"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200/80 rounded-xl w-1/4"></div>
                <div className="h-3 bg-slate-200/80 rounded-xl w-1/6"></div>
              </div>
              <div className="h-8 w-20 bg-slate-200/80 rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show empty state if no users after filtering
  if (users.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto h-16 w-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mb-4">
          <Users className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">Tidak ada pengguna ditemukan</h3>
        <p className="text-slate-500 mb-6">
          Coba ubah filter pencarian atau tambah pengguna baru.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200/60">
          <thead className="bg-slate-50/80 backdrop-blur-sm">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Pengguna
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Peran & Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Aktivitas
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Dibuat
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white/50 backdrop-blur-sm divide-y divide-slate-200/60">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-12 w-12 bg-gradient-to-br from-slate-400 to-slate-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      <span className="text-sm font-medium text-white">
                        {user.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-slate-900">
                        {user.email.split('@')[0]}
                      </div>
                      <div className="text-sm text-slate-500">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(user.role)}
                      <span className={getRoleBadge(user.role)}>
                        {user.role}
                      </span>
                    </div>
                    {user.status && (
                      <span className={getStatusBadge(user.status)}>
                        {user.status}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  <div className="space-y-1">
                    {user.notesCount !== undefined && (
                      <div className="flex items-center space-x-1">
                        <FileText className="h-4 w-4 text-slate-400" />
                        <span>{user.notesCount} catatan</span>
                      </div>
                    )}
                    {user.lastLogin && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span className="text-xs">
                          {formatDate(user.lastLogin)}
                        </span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {formatDate(user.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onViewNotes(user)}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl transition-all duration-200"
                      title="Lihat Catatan"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    
                    <button
                      onClick={() => onEditUser(user)}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50/80 rounded-xl transition-all duration-200"
                      title="Edit Pengguna"
                    >
                      <Edit className="h-4 w-4" />
                    </button>

                    <div className="relative">
                      <button
                        onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50/80 rounded-xl transition-all duration-200"
                        title="Aksi Lainnya"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>

                      {selectedUser === user.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200/60 z-10">
                          <div className="py-1">
                            <div className="px-3 py-2 text-xs font-medium text-slate-500 border-b border-slate-100/60">
                              Ubah Peran
                            </div>
                            {(['admin', 'moderator', 'user'] as const).map((role) => (
                              <button
                                key={role}
                                onClick={handleChangeRoleClick}
                                className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50/80 transition-colors flex items-center space-x-2 text-slate-700"
                              >
                                {getRoleIcon(role)}
                                <span className="capitalize">{role}</span>
                                {user.role === role && <span className="text-xs text-slate-400">(saat ini)</span>}
                              </button>
                            ))}
                            
                            <div className="border-t border-slate-100/60 mt-1">
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                disabled={deleteUserMutation.isLoading}
                                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50/80 transition-colors flex items-center space-x-2"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span>Hapus Pengguna</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Development Modal */}
      <DevelopmentModal
        isOpen={isDevelopmentModalOpen}
        onClose={() => setIsDevelopmentModalOpen(false)}
        feature="Pengubahan peran pengguna"
      />
    </>
  );
};
