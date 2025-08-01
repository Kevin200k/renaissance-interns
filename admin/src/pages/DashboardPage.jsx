import React from 'react';
import {
  Ellipsis,
  UserCheck,
  UserX,
  TriangleAlert,
  Clock,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Sample chart data
const weeklyAttendanceData = [
  { day: 'Mon', present: 15, absent: 2 },
  { day: 'Tue', present: 14, absent: 3 },
  { day: 'Wed', present: 16, absent: 1 },
  { day: 'Thu', present: 13, absent: 4 },
  { day: 'Fri', present: 15, absent: 2 },
];

const presentAbsentStats = [
  {
    icon: <UserX size={32} strokeWidth={1.5} className="text-red-400" />,
    title: "Today's Absent",
    count: 2,
    option: <Ellipsis />,
  },
  {
    icon: <UserCheck size={32} strokeWidth={1.5} className="text-green-400" />,
    title: "Today's Present",
    count: 15,
    option: <Ellipsis />,
  },
];

const lowAttendanceAlert = [
  { name: 'Michael Amos', percentage: 40, option: <Ellipsis /> },
  { name: 'Joshua Damilola', percentage: 37, option: <Ellipsis /> },
  { name: 'Chimdi Ken-nnadi', percentage: 20, option: <Ellipsis /> },
  { name: 'Chidubbem Amos', percentage: 10, option: <Ellipsis /> },
];

const latestCheckedIn = [
  { name: 'Damilola Joshua', time: '07:00', location: 'B2' },
  { name: 'Praise Chinedu', time: '07:10', location: 'B3' },
  { name: 'Amanda Chikamsu', time: '07:20', location: 'B4' },
  { name: 'Peculiar Enakwho', time: '07:30', location: 'B2' },
];

const DashboardPage = () => {
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">

        {/* Left Column */}
        <div className="grid gap-6">

          {/* Present / Absent Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {presentAbsentStats.map((info, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white shadow-md rounded-xl p-4"
              >
                <div className="flex items-center gap-4">
                  {info.icon}
                  <div>
                    <p className="text-gray-500 text-sm">{info.title}</p>
                    <p className="text-2xl font-bold">{info.count}</p>
                  </div>
                </div>
                <span className="text-gray-400 cursor-pointer">{info.option}</span>
              </div>
            ))}
          </div>

          {/* Low Attendance & Latest Check-ins */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Low Attendance Alert */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg">
                  <TriangleAlert className='text-red-400' />
                  <h2 className="text-sm">Low Attendance Alert</h2>
                </div>
                <span className="text-gray-400 text-sm">Lowest 4</span>
              </div>

              <ul>
                {lowAttendanceAlert.slice(0, 3).map((student, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center py-2 hover:bg-yellow-50 cursor-pointer rounded-md px-2 text-gray-500"
                  >
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.percentage}% attendance</p>
                    </div>
                    <span className="text-gray-400 cursor-pointer">{student.option}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Latest Check-ins */}
            <div className="bg-white rounded-xl shadow-md p-4">
              <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg mb-4">
                <Clock className='text-blue-400' />
                <h2 className="text-sm">Latest Check-ins</h2>
              </div>

              <ul>
                {latestCheckedIn.slice(0, 4).map((student, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center py-2 hover:bg-blue-50 cursor-pointer rounded-md px-2 text-gray-500"
                  >
                    <div className="font-medium">
                      <div>{student.name}</div>
                      <div className="text-xs">{student.time}</div>
                    </div>
                    <p className="text-gray-500 text-center">location: {student.location}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column - Weekly Attendance Graph */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Weekly Attendance Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={weeklyAttendanceData}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="present" stroke="#16a34a" name="Present" />
              <Line type="monotone" dataKey="absent" stroke="#dc2626" name="Absent" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="p-4 grid grid-cols-[1fr_1fr_1fr] gap-3">

        {/* Student Management Card */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Student Management</h2>
            <span className="text-sm text-gray-500">Last Reviewed</span>
          </div>
          <p className="text-gray-600 text-sm">
            You haven't reviewed any intern yet.{' '}
            <span className="text-blue-600 font-medium cursor-pointer hover:underline">
              Click to get started.
            </span>
          </p>
        </div>

        {/* Location Management Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold text-gray-800">
              Current Attendance Location Radius
            </h2>
            <span className="text-sm text-gray-500">Updated 2 days ago</span>
          </div>
          <p className="text-gray-600 mb-4">
            The current geofence radius for attendance is set to{' '}
            <span className="font-medium text-blue-600">100 meters</span>. Students must be within
            this range to check in.
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Update Radius
          </button>
        </div>

        {/* Flagged Attendance Notifications */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Flagged Attendance</h2>
            <span className="text-sm text-gray-500">Recent Flags</span>
          </div>
          <ul className="space-y-3">
            {[
              { name: 'Emeka Uzo', issue: 'Checked in from out-of-zone location', time: '07:05' },
              { name: 'Ifeoma James', issue: 'Multiple check-ins', time: '07:12' },
              { name: 'Chika Odinaka', issue: 'Late check-in', time: '08:00' },
            ].map((flag, idx) => (
              <li
                key={idx}
                className="flex justify-between items-start text-sm text-gray-600 hover:bg-red-50 p-2 rounded-md"
              >
                <div>
                  <p className="font-medium">{flag.name}</p>
                  <p className="text-xs text-red-500">{flag.issue}</p>
                </div>
                <span className="text-xs text-gray-500">{flag.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default DashboardPage;
