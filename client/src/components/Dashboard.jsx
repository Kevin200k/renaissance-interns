import AttendanceIcon from "../assets/icons/attendance.svg";
import {
  CalendarDays,
  Percent,
  Flame,
  Clock,
  Smile,
  HelpCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Dummy data for weekly check-in chart
const attendanceData = [
  { day: "Mon", time: 9.1 },
  { day: "Tue", time: 8.3 },
  { day: "Wed", time: 9.0 },
  { day: "Thu", time: 9.2 },
  { day: "Fri", time: 9.05 },
  { day: "Sat", time: 10.1 },
  { day: "Sun", time: 9.0 },
];

// Illustration (replace if needed)
const illustrationUrl = AttendanceIcon;

export default function Dashboard() {
  const userName = "Michael";

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col space-y-6">
      {/* --- Title Bar --- */}
      <div className="flex items-center hidden justify-between bg-white">
        {/* Left: Logo & Help */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-purple-700 tracking-tight">
            Dashboard
          </h1>
          <button
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-purple-600 transition"
            onClick={() => alert("Help modal or route here")}
          >
            <HelpCircle className="w-4 h-4" />
            Help
          </button>
        </div>

        {/* Right: User Avatar */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700 hidden sm:inline">Hi, {userName}</span>
          <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-semibold text-base">
            {userName[0]}
          </div>
        </div>
      </div>

      {/* --- Dashboard Grid --- */}
      <div className="flex flex-grow gap-8">
        {/* Left: Attendance CTA + Illustration */}
        <div className="flex flex-col w-1/2 space-y-8">
          {/* CTA Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col justify-center items-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Take Attendance</h2>
            <p className="text-gray-600 mb-6 text-center max-w-xs">
              Mark attendance quickly and keep track of your daily check-ins.
            </p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-3 font-semibold transition">
              Take Attendance
            </button>
          </div>

          {/* Illustration Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex justify-center items-center">
            <img
              src={illustrationUrl}
              alt="Attendance Illustration"
              className="max-h-64 object-contain"
            />
          </div>
        </div>

        {/* Right: Summary Cards + Summary + Chart */}
        <div className="flex flex-col w-1/2 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-6">
            <SummaryCard
              title="Days Present"
              value="42"
              icon={<CalendarDays className="w-5 h-5 text-purple-600" />}
            />
            <SummaryCard
              title="Attendance %"
              value="87%"
              icon={<Percent className="w-5 h-5 text-green-600" />}
            />
            <SummaryCard
              title="Streak"
              value="5 days"
              icon={<Flame className="w-5 h-5 text-orange-500" />}
            />
            <SummaryCard
              title="Last Check-In"
              value="9:02 AM"
              icon={<Clock className="w-5 h-5 text-blue-500" />}
            />
          </div>

          {/* Personalized Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between h-36">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-50 rounded-full">
                <Smile className="text-purple-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">Today's Summary</h3>
                <p className="text-gray-600">
                  You checked in at <span className="font-semibold">9:02 AM</span>
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Great job maintaining your streak. Remember: consistency builds habits!
            </p>
          </div>

          {/* Line Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Weekly Check-In Times</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={attendanceData}>
                <defs>
                  <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" />
                <YAxis
                  domain={[8.5, 10.5]}
                  tickFormatter={(t) => `${t.toFixed(1)} AM`}
                />
                <Tooltip formatter={(value) => `${value.toFixed(2)} AM`} />
                <Line
                  type="monotone"
                  dataKey="time"
                  stroke="#8b5cf6"
                  strokeWidth={2.5}
                  fill="url(#purpleGradient)"
                  dot={{ stroke: "#8b5cf6", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable summary card
function SummaryCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
      <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
