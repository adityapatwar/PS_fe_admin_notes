import React from 'react';
import { Calendar, Mail, Shield, User as UserIcon, FileText } from 'lucide-react';
import { User } from '../types';
import { useUserNotes } from '../hooks/useUsers';
import { Modal } from '../../../shared/components/Modal';
import { LoadingSpinner } from '../../../shared/components/LoadingSpinner';

interface UserDetailModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

export const UserDetailModal: React.FC<UserDetailModalProps> = ({
  user,
  isOpen,
  onClose,
}) => {
  const { data: notes, isLoading: notesLoading } = useUserNotes(user.id);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="User Details"
      size="lg"
    >
      <div className="space-y-6">
        {/* User Info */}
        <div className="flex items-start space-x-4">
          <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-xl font-medium text-white">
              {user.firstName[0]}{user.lastName[0]}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-gray-600">{user.email}</p>
            <div className="mt-2 flex items-center space-x-4">
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  user.role === 'admin'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {user.role}
              </span>
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  user.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {user.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>

        {/* User Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <UserIcon className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">User ID</p>
              <p className="text-sm text-gray-600">{user.id}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Mail className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">Email</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Shield className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">Role</p>
              <p className="text-sm text-gray-600 capitalize">{user.role}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">Created</p>
              <p className="text-sm text-gray-600">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* User Notes */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="h-5 w-5 text-gray-400" />
            <h4 className="text-lg font-medium text-gray-900">Notes</h4>
          </div>
          
          {notesLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : notes && notes.length > 0 ? (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {notes.map((note) => (
                <div key={note.id} className="border border-gray-200 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">{note.title}</h5>
                  <p className="text-sm text-gray-600 mb-2">{note.content}</p>
                  <p className="text-xs text-gray-400">
                    Created: {new Date(note.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No notes available for this user.</p>
          )}
        </div>
      </div>
    </Modal>
  );
};
