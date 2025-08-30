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
import halfLogo from "../../../shared/utils/icons/logo-half.png";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../../shared/firebase/auth";
import { useAuth } from "../../../shared/context/AuthContext";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/");
  };

  const topMenuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", to: "dashboard" },
    { icon: <Clock size={20} />, label: "Attendance History", to: "attendance-history" },
    { icon: <BarChart2 size={20} />, label: "Analytics", to: "analytics" },
    { icon: <Bell size={20} />, label: "Notifications", to: "notifications" },
  ];
  const bottomMenuItems = [
    { icon: <Settings size={20} />, label: "Settings", color: "text-gray-400" },
    { icon: <LogOut size={20} />, label: "Logout", color: "text-red-400", action: handleLogout },
  ];

  return (
    <aside
      className={`h-screen bg-gray-900 shadow-md transition-all duration-300 top-0 left-0 z-50 flex flex-col ${isOpen ? "w-64" : "w-20"}`}
    >
      {/* Header */}
      <div className={`relative pt-6 p-4 flex ${isOpen ? "justify-between" : "justify-center"} items-center`}>
        {isOpen ? (
          <>
            <img src={fullLogo} alt="Logo" className="h-6" />
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-green-400 transition-colors duration-150"
            >
              <X size={20} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => setIsOpen(true)}
              className="text-gray-300 mb-5 hover:text-green-400 transition-colors duration-150"
            >
              <Menu size={20} />
            </button>
            <img src={halfLogo} alt="Logo" className="h-8" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col justify-between flex-grow pb-4 pt-3">
        <div className="flex flex-col gap-2 text-[14.5px]">
          {topMenuItems.map((item, idx) => (
            <NavLink
              to={`/${item.to}`}
              key={idx}
              className={({ isActive }) =>
                `${isOpen ? "flex items-center px-3" : "flex justify-center"} py-2 mx-2 rounded-md cursor-pointer transition-colors duration-150 ${
                  isActive
                    ? "bg-green-600 text-white font-semibold"
                    : "text-gray-300 hover:bg-gray-800 hover:text-green-400"
                }`
              }
            >
              <div className="w-6 flex justify-center">{item.icon}</div>
              {isOpen && <span className="ml-3">{item.label}</span>}
            </NavLink>
          ))}
        </div>
        <div className="flex flex-col gap-2 text-[14.5px] mb-4">
          {bottomMenuItems.map((item, idx) => (
            <div
              key={idx}
              onClick={item.action}
              className={`${isOpen ? "flex items-center px-3" : "flex justify-center"} py-2 mx-2 rounded-md cursor-pointer transition-colors duration-150 ${item.color} hover:bg-gray-800 hover:text-green-400`}
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
