import React from 'react';
import { X, FileText, Calendar, Tag, AlertCircle, Archive, Clock, Star, TrendingUp } from 'lucide-react';
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
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden border border-slate-200/60">
        {/* Modern Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-6 text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-14 w-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <FileText className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Notes dari {userName}</h2>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2 text-blue-100">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {notes?.length || 0} catatan total
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-100">
                    <Star className="h-4 w-4" />
                    <span className="text-sm">
                      Aktivitas tinggi
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-white/20 rounded-2xl transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <LoadingSpinner size="lg" />
                <p className="text-slate-600 mt-4">Memuat catatan...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="h-16 w-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-red-600 mb-2">Gagal memuat notes</h3>
              <p className="text-red-500 text-sm">
                Terjadi kesalahan saat mengambil data catatan
              </p>
            </div>
          ) : !notes || notes.length === 0 ? (
            <div className="text-center py-16">
              <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-600 mb-2">Belum ada catatan</h3>
              <p className="text-slate-500 text-sm">
                Pengguna ini belum membuat catatan apapun
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="group bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Note Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors">
                        {note.title}
                      </h3>
                      <div className="flex items-center space-x-3 mb-4">
                        <span className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-medium border ${getCategoryColor(note.category)}`}>
                          <span className="capitalize">{note.category}</span>
                        </span>
                        <span className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-medium border ${getPriorityColor(note.priority)}`}>
                          {getPriorityIcon(note.priority)}
                          <span className="capitalize">{note.priority}</span>
                        </span>
                        {note.isArchived && (
                          <span className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-medium border bg-gray-100 text-gray-600 border-gray-200">
                            <Archive className="h-3 w-3" />
                            <span>Archived</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Note Content */}
                  <div className="mb-6">
                    <div className="bg-slate-50/80 rounded-xl p-4 border border-slate-200/60">
                      <p className="text-slate-700 leading-relaxed">
                        {note.content}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  {note.tags && note.tags.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center space-x-2 flex-wrap">
                        <Tag className="h-4 w-4 text-slate-400" />
                        {note.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Note Footer */}
                  <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-200/60">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>Dibuat: {formatDate(note.createdAt)}</span>
                      </div>
                      {note.updatedAt.getTime() !== note.createdAt.getTime() && (
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>Diupdate: {formatDate(note.updatedAt)}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                        ID: {note.id.slice(0, 8)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modern Footer */}
        <div className="bg-slate-50/80 backdrop-blur-sm px-8 py-6 border-t border-slate-200/60">
          <div className="flex justify-between items-center">
            <div className="text-sm text-slate-600">
              {notes && notes.length > 0 && (
                <span>Menampilkan {notes.length} catatan dari {userName}</span>
              )}
            </div>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-slate-600 text-white rounded-xl hover:bg-slate-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
