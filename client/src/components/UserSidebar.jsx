import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  Clock,
  BarChart2,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

import fullLogo from "../../../shared/utils/icons/logo.png";
import halfLogo from "../../../shared/utils/icons/logo-half.jpg";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const topMenuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", to: "dashboard" },
    { icon: <Clock size={20} />, label: "Attendance History", to: "attendance-history" },
    { icon: <BarChart2 size={20} />, label: "Analytics", to: "analytics" },
    { icon: <Bell size={20} />, label: "Notifications", to: "notifications" },
  ];

  const bottomMenuItems = [
    { icon: <Settings size={20} />, label: "Settings", color: "text-gray-700" },
    { icon: <LogOut size={20} />, label: "Logout", color: "text-red-500" },
  ];

  return (
    <aside
      className={`h-screen bg-white transition-all duration-300  top-0 left-0 z-50 flex flex-col ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header */}
      <div className={`relative p-4 flex ${isOpen ? "justify-between" : "justify-center"} items-center`}>
        {isOpen ? (
          <>
            <img src={fullLogo} alt="Logo" className="h-6" />
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-purple-700"
            >
              <X size={20} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => setIsOpen(true)}
              className="text-gray-600 mb-5 hover:text-purple-700"
            >
              <Menu size={20} />
            </button>
            <img src={halfLogo} alt="Logo" className="h-8" />
          </div>
        )}
      </div>

      {/* Navigation content area */}
      <nav className="flex flex-col justify-between flex-grow pb-4 pt-3">
        {/* Top menu items */}
        <div className="flex flex-col gap-2 text-[14.5px]">
          {topMenuItems.map((item, idx) => (
            <NavLink to={`/${ item.to }`}
              key={idx}
              className={({ isActive }) => `${
                isOpen ? "flex items-center px-3" : "flex justify-center"
                } py-2 mx-2 rounded-md cursor-pointer text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200 ${
                    isActive ? "bg-purple-100 text-purple-700 font-semibold" : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                  }`}
            >
              <div className="w-6 flex justify-center">{item.icon}</div>
              {isOpen && <span className="ml-3">{item.label}</span>}
            </NavLink>
          ))}
        </div>

        {/* Bottom menu items */}
        <div className="flex flex-col gap-2 text-[14.5px] mb-4">
          {bottomMenuItems.map((item, idx) => (
            <div
              key={idx}
              className={`${
                isOpen ? "flex items-center px-3" : "flex justify-center"
              } py-2 mx-2 rounded-md hover:bg-purple-50 cursor-pointer transition-colors duration-200 ${
                item.color
              } hover:text-purple-700`}
            >
              <div className="w-6 flex justify-center">{item.icon}</div>
              {isOpen && <span className="ml-3">{item.label}</span>}
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}
