import Sidebar from "../components/UserSidebar";
import Titlebar from "../components/UserTitlebar";
import Dashboard from "../components/Dashboard"; // Replace with {children} when ready
import AttendanceHistory from "../pages/AttendanceHistory";
import Analytics from "../pages/Analytics";

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen w-full m-0">
      <Sidebar />
      <main className="flex-1 bg-white overflow-hidden flex flex-col">
        {/* Titlebar fixed height */}
        <div className="flex-shrink-0">
          <Titlebar />
        </div>

        {/* Content area fills remaining space with scroll */}
        <div className="flex-1 overflow-y-auto">
          {/* Replace Dashboard with children for routing/layout slots */}
          {/* <AttendanceHistory /> */}
          <Analytics />
          {/* <Dashboard /> */}
          {/* {children} */}
        </div>
      </main>
    </div>
  );
}
