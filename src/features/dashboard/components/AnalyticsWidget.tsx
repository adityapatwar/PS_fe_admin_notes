import React, { useState } from 'react';
import { TrendingUp, Users, FileText, Calendar, BarChart3 } from 'lucide-react';
import { useUserAnalytics, useNotesAnalytics } from '../hooks/useDashboardApi';

type AnalyticsType = 'users' | 'notes';
type TimePeriod = 7 | 30 | 90;

export const AnalyticsWidget: React.FC = () => {
  const [activeType, setActiveType] = useState<AnalyticsType>('users');
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(30);

  const { data: userAnalytics, isLoading: userLoading, error: userError } = useUserAnalytics({ days: timePeriod });
  const { data: notesAnalytics, isLoading: notesLoading, error: notesError } = useNotesAnalytics({ days: timePeriod });

  const isLoading = activeType === 'users' ? userLoading : notesLoading;
  const error = activeType === 'users' ? userError : notesError;
  const data = activeType === 'users' ? userAnalytics : notesAnalytics;

  // Safe data validation and transformation
  const getChartData = () => {
    // Ensure data exists and is an array
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [];
    }
    
    try {
      if (activeType === 'users') {
        return data.map(item => ({
          date: item.date || '',
          value1: item.registrations || 0,
          value2: item.logins || 0,
          value3: item.activeUsers || 0,
          label1: 'Registrations',
          label2: 'Logins',
          label3: 'Active Users'
        }));
      } else {
        return data.map(item => ({
          date: item.date || '',
          value1: item.notesCreated || 0,
          value2: item.notesUpdated || 0,
          value3: item.notesDeleted || 0,
          label1: 'Created',
          label2: 'Updated',
          label3: 'Deleted'
        }));
      }
    } catch (err) {
      console.error('Error transforming chart data:', err);
      return [];
    }
  };

  const chartData = getChartData();
  const maxValue = chartData.length > 0 
    ? Math.max(...chartData.flatMap(item => [item.value1, item.value2, item.value3])) 
    : 0;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch (err) {
      return dateString;
    }
  };

  const getTotalValues = () => {
    if (!chartData.length) return { total1: 0, total2: 0, total3: 0 };
    
    try {
      return chartData.reduce((acc, item) => ({
        total1: acc.total1 + (item.value1 || 0),
        total2: acc.total2 + (item.value2 || 0),
        total3: acc.total3 + (item.value3 || 0),
      }), { total1: 0, total2: 0, total3: 0 });
    } catch (err) {
      console.error('Error calculating totals:', err);
      return { total1: 0, total2: 0, total3: 0 };
    }
  };

  const totals = getTotalValues();

  // Error state
  if (error) {
    return (
      <div className="bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl border border-slate-200/60 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">Analytics</h3>
              <p className="text-sm text-slate-600 mt-1">Detailed insights and trends</p>
            </div>
            <BarChart3 className="h-5 w-5 text-indigo-500" />
          </div>
        </div>
        
        <div className="p-6">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-red-500" />
            </div>
            <h4 className="text-lg font-medium text-slate-800 mb-2">Failed to Load Analytics</h4>
            <p className="text-slate-600 mb-4">
              Unable to fetch analytics data. Please try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-sm shadow-sm rounded-2xl border border-slate-200/60 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-indigo-50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Analytics</h3>
            <p className="text-sm text-slate-600 mt-1">Detailed insights and trends</p>
          </div>
          <BarChart3 className="h-5 w-5 text-indigo-500" />
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Type Toggle */}
          <div className="flex bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setActiveType('users')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeType === 'users'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Users</span>
            </button>
            <button
              onClick={() => setActiveType('notes')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeType === 'notes'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Notes</span>
            </button>
          </div>
          
          {/* Time Period Toggle */}
          <div className="flex bg-white rounded-lg p-1 shadow-sm">
            {[7, 30, 90].map((days) => (
              <button
                key={days}
                onClick={() => setTimePeriod(days as TimePeriod)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  timePeriod === days
                    ? 'bg-indigo-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                {days}d
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {isLoading ? (
          <div className="animate-pulse space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-slate-100 rounded-lg p-4">
                  <div className="h-4 bg-slate-200 rounded w-20 mb-2"></div>
                  <div className="h-6 bg-slate-200 rounded w-16"></div>
                </div>
              ))}
            </div>
            <div className="h-64 bg-slate-100 rounded-lg"></div>
          </div>
        ) : chartData.length === 0 ? (
          // Empty state
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-8 w-8 text-slate-400" />
            </div>
            <h4 className="text-lg font-medium text-slate-800 mb-2">No Data Available</h4>
            <p className="text-slate-600">
              No analytics data found for the selected time period.
            </p>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                      {chartData[0]?.label1 || 'Metric 1'}
                    </p>
                    <p className="text-2xl font-bold text-blue-700 mt-1">
                      {totals.total1.toLocaleString()}
                    </p>
                  </div>
                  <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-green-600 uppercase tracking-wide">
                      {chartData[0]?.label2 || 'Metric 2'}
                    </p>
                    <p className="text-2xl font-bold text-green-700 mt-1">
                      {totals.total2.toLocaleString()}
                    </p>
                  </div>
                  <div className="h-8 w-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-purple-600 uppercase tracking-wide">
                      {chartData[0]?.label3 || 'Metric 3'}
                    </p>
                    <p className="text-2xl font-bold text-purple-700 mt-1">
                      {totals.total3.toLocaleString()}
                    </p>
                  </div>
                  <div className="h-8 w-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chart */}
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-slate-700">
                  {activeType === 'users' ? 'User Activity' : 'Notes Activity'} Trends
                </h4>
                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-600">{chartData[0]?.label1 || 'Metric 1'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <span className="text-slate-600">{chartData[0]?.label2 || 'Metric 2'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                    <span className="text-slate-600">{chartData[0]?.label3 || 'Metric 3'}</span>
                  </div>
                </div>
              </div>
              
              <div className="h-64 flex items-end space-x-1 overflow-x-auto">
                {chartData.slice(-14).map((item, index) => {
                  const safeMaxValue = maxValue > 0 ? maxValue : 1; // Prevent division by zero
                  
                  return (
                    <div key={index} className="flex-1 min-w-0 flex flex-col items-center space-y-1">
                      <div className="w-full flex flex-col items-center space-y-1 h-48">
                        {/* Value 1 Bar */}
                        <div className="w-full flex flex-col items-center">
                          <div
                            className="w-4 bg-blue-500 rounded-t"
                            style={{
                              height: `${Math.max((item.value1 / safeMaxValue) * 60, item.value1 > 0 ? 2 : 0)}px`,
                            }}
                          ></div>
                        </div>
                        
                        {/* Value 2 Bar */}
                        <div className="w-full flex flex-col items-center">
                          <div
                            className="w-4 bg-green-500"
                            style={{
                              height: `${Math.max((item.value2 / safeMaxValue) * 60, item.value2 > 0 ? 2 : 0)}px`,
                            }}
                          ></div>
                        </div>
                        
                        {/* Value 3 Bar */}
                        <div className="w-full flex flex-col items-center">
                          <div
                            className="w-4 bg-purple-500 rounded-b"
                            style={{
                              height: `${Math.max((item.value3 / safeMaxValue) * 60, item.value3 > 0 ? 2 : 0)}px`,
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      <span className="text-xs text-slate-500 transform -rotate-45 origin-center whitespace-nowrap">
                        {formatDate(item.date)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
