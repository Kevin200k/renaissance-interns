import AttendanceIcon from "../../../shared/utils/icons/attendance.svg";
import {
  CalendarDays,
  Percent,
  Flame,
  Clock,
  Smile,
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

// Dummy check-in data
const attendanceData = [
  { day: "Mon", time: 9.1 },
  { day: "Tue", time: 8.3 },
  { day: "Wed", time: 9.0 },
  { day: "Thu", time: 9.2 },
  { day: "Fri", time: 9.05 },
  { day: "Sat", time: 10.1 },
  { day: "Sun", time: 9.0 },
];

export default function Dashboard() {
  const userName = "Michael";
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col space-y-6">
      
      {/* Greeting */}
      {/* <header>
        <h1 className="text-2xl font-semibold text-gray-900">Hi, {userName} 👋</h1>
        <p className="text-sm text-gray-500">{today}</p>
      </header> */}

      {/* Dashboard Layout */}
      <div className="flex flex-col lg:flex-row gap-6 flex-grow">
        
        {/* Left Column: CTA + Illustration */}
        <div className="flex flex-col gap-6 lg:w-1/2">
          {/* Attendance CTA */}
          <section>
              <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col justify-center items-center text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Take Attendance</h2>
                <p className="text-gray-600 mb-6 max-w-xs">
                  Mark your presence and keep your attendance history updated.
                </p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-3 font-semibold transition">
                  Take Attendance
                </button>
              </div>
              {/* Illustration */}
              <div className="bg-white rounded-xl shadow-lg p-6 flex justify-center items-center">
                <img
                  src={AttendanceIcon}
                  alt="Attendance Illustration"
                  className="max-h-64 object-contain"
                />
              </div>
          </section>
                      </div>

        {/* Right Column: Stats + Summary + Chart */}
        <div className="flex flex-col gap-6 lg:w-1/2">
          {/* Summary Cards */}
          <section className="grid grid-cols-2 gap-4">
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
          </section>

          {/* Personalized Summary */}
          <section className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-2">
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
            <p className="text-sm text-gray-600 mt-2">
              Great job maintaining your streak. Keep it going — consistency builds habits!
            </p>
          </section>

          {/* Weekly Chart */}
          <section className="bg-white rounded-xl shadow-lg p-6">
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
          </section>
        </div>
      </div>
    </div>
  );
}

// Reusable card component
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
