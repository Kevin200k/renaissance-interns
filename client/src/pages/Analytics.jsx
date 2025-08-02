import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle,
  SlidersHorizontal,
  XCircle,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import dayjs from 'dayjs';

const attendanceSummary = {
  totalCheckIns: { value: 72, trendValue: 5 },
  avgCheckInTime: { value: '9:15 AM', trendValue: -0.08 },
  onTimePercentage: { value: '92%', trendValue: 1.5 },
  absences: { value: 5, trendValue: -1 },
};

const dateRanges = [
  { label: 'Last 7 days', value: 'last7days' },
  { label: 'Last 30 days', value: 'last30days' },
  { label: 'This month', value: 'thisMonth' },
  { label: 'Last month', value: 'lastMonth' },
  { label: 'This year', value: 'thisYear' },
  { label: 'All time', value: 'allTime' },
];

const attendanceByCategoryData = [
  { name: 'Weekday', value: 80, color: '#4F46E5' },
  { name: 'Weekend', value: 20, color: '#A78BFA' },
];

export default function Analytics() {
  const [selectedDateRange, setSelectedDateRange] = useState('last30days');

  const simulatedAttendanceData = useMemo(() => {
    const data = [];
    const today = dayjs();
    let startDate;

    if (selectedDateRange === 'last7days') {
      startDate = today.subtract(6, 'day');
    } else if (selectedDateRange === 'last30days') {
      startDate = today.subtract(29, 'day');
    } else if (selectedDateRange === 'thisMonth') {
      startDate = today.startOf('month');
    } else if (selectedDateRange === 'lastMonth') {
      startDate = today.subtract(1, 'month').startOf('month');
    } else {
      startDate = today.subtract(29, 'day'); // fallback
    }

    const daysCount = today.diff(startDate, 'day') + 1;

    for (let i = 0; i < daysCount; i++) {
      const date = startDate.add(i, 'day');
      const statusRand = Math.random();
      let status;
      if (statusRand < 0.7) status = 'On Time';
      else if (statusRand < 0.9) status = 'Late';
      else status = 'Absent';

      data.push({
        date: date.format('MMM D'),
        day: date.format('dd')[0],
        status,
      });
    }

    return data;
  }, [selectedDateRange]);

  return (
    <div className="min-h-screen p-7 font-inter">
      {/* Date Filter */}
      <div className="flex items-center justify-end mb-6">
        <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm p-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <select
            className="bg-transparent outline-none text-gray-700 font-medium cursor-pointer"
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
          >
            {dateRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <button className="p-1 rounded-md hover:bg-gray-100 transition">
            <SlidersHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-7 bg-white border rounded-xl p-7">
        <MetricBlock
          title="Total Check-Ins"
          value={attendanceSummary.totalCheckIns.value}
          icon={<Calendar className="w-7 h-7 text-blue-500" />}
          trendValue={attendanceSummary.totalCheckIns.trendValue}
          withRightBorder
        />
        <MetricBlock
          title="Avg. Check-In Time"
          value={attendanceSummary.avgCheckInTime.value}
          icon={<Clock className="w-7 h-7 text-purple-500" />}
          trendValue={attendanceSummary.avgCheckInTime.trendValue}
          withRightBorder
        />
        <MetricBlock
          title="On-Time Percentage"
          value={attendanceSummary.onTimePercentage.value}
          icon={<CheckCircle className="w-7 h-7 text-green-500" />}
          trendValue={attendanceSummary.onTimePercentage.trendValue}
          withRightBorder
        />
        <MetricBlock
          title="Absences"
          value={attendanceSummary.absences.value}
          icon={<XCircle className="w-7 h-7 text-red-500" />}
          trendValue={attendanceSummary.absences.trendValue}
          withRightBorder={false}
        />
      </div>

      {/* Attendance Over Time */}
      <div className="mt-10 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Attendance Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={simulatedAttendanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              interval={simulatedAttendanceData.length > 15 ? Math.ceil(simulatedAttendanceData.length / 10) : 0}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: 'rgba(0,0,0,0.05)' }}
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#e5e7eb',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                padding: '0.5rem 0.75rem'
              }}
              formatter={(value, name, props) => [props.payload.status, 'Status']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Bar dataKey="status" fill="#8884d8" radius={[10, 10, 0, 0]}>
              {simulatedAttendanceData.map((entry, index) => {
                let fillColor = '#A0AEC0'; // Default gray for Absent
                if (entry.status === 'On Time') fillColor = '#4F46E5'; // Purple
                else if (entry.status === 'Late') fillColor = '#EF4444'; // Red
                return <Cell key={`cell-${index}`} fill={fillColor} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Attendance by Day Type */}
      <div className="mt-10 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Attendance by Day Type</h2>
        <ResponsiveContainer width="100%" height={250}>
          <RechartsPieChart>
            <Pie
              data={attendanceByCategoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {attendanceByCategoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#e5e7eb',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                padding: '0.5rem 0.75rem'
              }}
              formatter={(value, name, props) => [`${value}%`, props.payload.name]}
            />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// 🔧 Trend formatter
function formatTrendDescription(title, trendValue) {
  if (trendValue === 0) return 'No change';
  const abs = Math.abs(trendValue);
  const isUp = trendValue > 0;

  switch (title) {
    case 'Avg. Check-In Time': {
      const minutes = Math.round(abs * 60);
      return `${minutes} min ${isUp ? 'later' : 'earlier'} than usual`;
    }
    case 'Total Check-Ins':
    case 'Absences':
      return `${abs} ${isUp ? 'more' : 'fewer'} than last period`;
    case 'On-Time Percentage':
      return `${isUp ? '+' : '-'}${abs}% from last period`;
    default:
      return `${isUp ? '+' : '-'}${abs}`;
  }
}

// 📦 Metric block
function MetricBlock({ title, value, icon, withRightBorder, trendValue }) {
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
        <div
          className={`flex items-center text-sm ${
            isPositiveTrend ? 'text-green-600' : 'text-red-600'
          }`}
        >
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
