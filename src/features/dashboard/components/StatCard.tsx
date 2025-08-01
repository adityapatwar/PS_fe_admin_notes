import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  description: string;
  gradient: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  changeType = 'neutral',
  description,
  gradient
}) => {
  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive':
        return <TrendingUp className="h-3 w-3" />;
      case 'negative':
        return <TrendingDown className="h-3 w-3" />;
      default:
        return <Minus className="h-3 w-3" />;
    }
  };

  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600 bg-green-50';
      case 'negative':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div className="group relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-6 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1">
      {/* Background gradient decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-slate-100/50 to-transparent rounded-full -translate-y-12 translate-x-12 group-hover:scale-110 transition-transform duration-300"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-600">{title}</p>
              {change && (
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getChangeColor()}`}>
                  {getChangeIcon()}
                  <span>{change}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-1">
              <p className="text-2xl lg:text-3xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                {value}
              </p>
              <p className="text-xs text-slate-500">{description}</p>
            </div>
          </div>
          
          <div className={`h-12 w-12 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};
