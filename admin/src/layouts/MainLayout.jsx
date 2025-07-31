import Sidebar from "../components/AdminSidebar";
import Titlebar from "../../../shared/components/Titlebar";
import { Outlet } from "react-router-dom";

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <main className="flex-1 bg-gray-50 overflow-hidden flex flex-col">
        {/* Titlebar fixed height */}
        <div className="mb-6 flex-shrink-0 bg-amber-600">
          <Titlebar />
        </div>

        {/* Content area fills remaining space with scroll */}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
