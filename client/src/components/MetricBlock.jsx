// /components/MetricBlock.jsx
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import formatTrendDescription from './trendUtils';

export default function MetricBlock({ title, value, icon, withRightBorder, trendValue }) {
  const isPositiveTrend = trendValue >= 0;
  const trendDescription = formatTrendDescription(title, trendValue);

  return (
    <div
      className={`flex flex-col justify-between gap-2 pr-4 ${
        withRightBorder ? 'md:border-r-2 border-gray-200' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-semibold text-gray-800">{value}</p>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
        <div className="p-3 rounded-full">{icon}</div>
      </div>
      {trendValue !== undefined && (
        <div className={`flex items-center text-sm ${isPositiveTrend ? 'text-green-600' : 'text-red-600'}`}>
          {isPositiveTrend ? (
            <TrendingUp className="w-4 h-4 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 mr-1" />
          )}
          <span>{trendDescription}</span>
        </div>
      )}
    </div>
  );
}
