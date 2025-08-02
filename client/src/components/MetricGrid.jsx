

// /components/MetricGrid.jsx
import React from 'react';
import MetricBlock from './MetricBlock';
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';

export default function MetricGrid({ summary }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-7 bg-white border rounded-xl p-7">
      <MetricBlock
        title="Total Check-Ins"
        value={summary.totalCheckIns.value}
        icon={<Calendar className="w-7 h-7 text-blue-500" />}
        trendValue={summary.totalCheckIns.trendValue}
        withRightBorder
      />
      <MetricBlock
        title="Avg. Check-In Time"
        value={summary.avgCheckInTime.value}
        icon={<Clock className="w-7 h-7 text-purple-500" />}
        trendValue={summary.avgCheckInTime.trendValue}
        withRightBorder
      />
      <MetricBlock
        title="On-Time Percentage"
        value={summary.onTimePercentage.value}
        icon={<CheckCircle className="w-7 h-7 text-green-500" />}
        trendValue={summary.onTimePercentage.trendValue}
        withRightBorder
      />
      <MetricBlock
        title="Days Attended"
        value={summary.daysAttended.value}
        icon={<XCircle className="w-7 h-7 text-red-500" />}
        trendValue={summary.daysAttended.trendValue}
      />
    </div>
  );
}