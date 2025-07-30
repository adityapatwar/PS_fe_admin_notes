import React from 'react';
import { X, FileText, Calendar, Tag, AlertCircle, Archive, Clock } from 'lucide-react';
import { useUserNotes } from '../hooks/useUsers';
import { UserNote } from '../types';
import { LoadingSpinner } from '../../../shared/components/LoadingSpinner';

interface UserNotesModalProps {
  userId: string;
  userName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const UserNotesModal: React.FC<UserNotesModalProps> = ({
  userId,
  userName,
  isOpen,
  onClose,
}) => {
  const { data: notes, isLoading, error } = useUserNotes(userId);

  if (!isOpen) return null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'work':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'personal':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'project':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'meeting':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'idea':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-3 w-3" />;
      case 'medium':
        return <Clock className="h-3 w-3" />;
      case 'low':
        return <FileText className="h-3 w-3" />;
      default:
        return <FileText className="h-3 w-3" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Notes dari {userName}</h2>
                <p className="text-blue-100 text-sm">
                  {notes?.length || 0} catatan ditemukan
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-xl transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <p className="text-red-600 font-medium">Gagal memuat notes</p>
              <p className="text-red-500 text-sm mt-1">
                Terjadi kesalahan saat mengambil data notes
              </p>
            </div>
          ) : !notes || notes.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">Belum ada notes</p>
              <p className="text-gray-400 text-sm mt-1">
                User ini belum membuat catatan apapun
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
                >
                  {/* Note Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {note.title}
                      </h3>
                      <div className="flex items-center space-x-3 mb-3">
                        <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-medium border ${getCategoryColor(note.category)}`}>
                          <span className="capitalize">{note.category}</span>
                        </span>
                        <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-medium border ${getPriorityColor(note.priority)}`}>
                          {getPriorityIcon(note.priority)}
                          <span className="capitalize">{note.priority}</span>
                        </span>
                        {note.isArchived && (
                          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-medium border bg-gray-100 text-gray-600 border-gray-200">
                            <Archive className="h-3 w-3" />
                            <span>Archived</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Note Content */}
                  <div className="mb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {note.content}
                    </p>
                  </div>

                  {/* Tags */}
                  {note.tags && note.tags.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 flex-wrap">
                        <Tag className="h-4 w-4 text-gray-400" />
                        {note.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Note Footer */}
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Dibuat: {formatDate(note.createdAt)}</span>
                      </div>
                      {note.updatedAt.getTime() !== note.createdAt.getTime() && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Diupdate: {formatDate(note.updatedAt)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors duration-200"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
