import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  changeType: 'positive' | 'negative';
  description: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  changeType,
  description,
}) => {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-200 group">
      <div className="flex items-center justify-between mb-4">
        <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
          {icon}
        </div>
        <div className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
          changeType === 'positive' 
            ? 'bg-green-100 text-green-700 border border-green-200' 
            : 'bg-red-100 text-red-700 border border-red-200'
        }`}>
          {changeType === 'positive' ? (
            <ArrowUpRight className="h-3 w-3" />
          ) : (
            <ArrowDownRight className="h-3 w-3" />
          )}
          <span>{change}</span>
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-slate-600">{title}</h3>
        <p className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
          {value}
        </p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </div>
  );
};
