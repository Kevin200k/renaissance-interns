import Sidebar from "../components/UserSidebar";
import Titlebar from "../components/UserTitlebar";
import Dashboard from "../components/Dashboard"; // Replace with {children} when ready

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <main className="flex-1 bg-gray-50 overflow-hidden flex flex-col">
        {/* Titlebar fixed height */}
        <div className="mb-6 flex-shrink-0">
          <Titlebar />
        </div>

        {/* Content area fills remaining space with scroll */}
        <div className="flex-1 overflow-y-auto">
          {/* Replace Dashboard with children for routing/layout slots */}
          <Dashboard />
          {/* {children} */}
        </div>
      </main>
    </div>
  );
}
