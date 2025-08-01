import React from 'react';
import { X, Code, Wrench, Clock, AlertTriangle } from 'lucide-react';

interface DevelopmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature?: string;
}

/**
 * Development notification modal component
 */
export const DevelopmentModal: React.FC<DevelopmentModalProps> = ({ 
  isOpen, 
  onClose, 
  feature = "Fitur ini" 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-200/60 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200/60">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center">
              <Code className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Sedang Dikembangkan
              </h2>
              <p className="text-sm text-slate-600">
                Fitur dalam tahap pengembangan
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

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Icon and Message */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl flex items-center justify-center mb-4">
              <Wrench className="h-8 w-8 text-yellow-600" />
            </div>
            
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {feature} Sedang Dikembangkan
            </h3>
            
            <p className="text-slate-600 leading-relaxed">
              Maaf, fitur ini sedang dalam tahap pengembangan dan belum tersedia. 
              Tim kami sedang bekerja keras untuk menghadirkan fitur terbaik untuk Anda.
            </p>
          </div>

          {/* Features List */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200/60">
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">Yang Sedang Dikembangkan:</span>
            </div>
            
            <ul className="space-y-2 text-sm text-yellow-700">
              <li className="flex items-center space-x-2">
                <div className="h-1.5 w-1.5 bg-yellow-500 rounded-full"></div>
                <span>Pengubahan peran pengguna</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="h-1.5 w-1.5 bg-yellow-500 rounded-full"></div>
                <span>Manajemen izin akses</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="h-1.5 w-1.5 bg-yellow-500 rounded-full"></div>
                <span>Audit log aktivitas</span>
              </li>
            </ul>
          </div>

          {/* Timeline */}
          <div className="bg-blue-50/80 rounded-2xl p-4 border border-blue-200/60">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Estimasi Waktu:</span>
            </div>
            <p className="text-sm text-blue-700">
              Fitur ini direncanakan akan tersedia dalam update berikutnya. 
              Terima kasih atas kesabaran Anda.
            </p>
          </div>

          {/* Action Button */}
          <div className="flex justify-center pt-2">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Mengerti
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
