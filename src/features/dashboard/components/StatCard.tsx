import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  description?: string;
  gradient?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  changeType = 'neutral',
  description,
  gradient = 'from-blue-500 to-blue-600'
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-slate-600';
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive':
        return <TrendingUp className="h-3 w-3" />;
      case 'negative':
        return <TrendingDown className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      <div className="relative p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-slate-800 mb-2">{value}</p>
            
            {/* Change indicator */}
            {change && (
              <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
                {getChangeIcon()}
                <span className="text-sm font-medium">{change}</span>
                {description && (
                  <span className="text-xs text-slate-500 ml-1">
                    {description}
                  </span>
                )}
              </div>
            )}
            
            {description && !change && (
              <p className="text-xs text-slate-500">{description}</p>
            )}
          </div>
          
          {/* Icon */}
          <div className={`h-12 w-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
        </div>
      </div>
      
      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-slate-300/30 transition-colors duration-300"></div>
    </div>
  );
};
