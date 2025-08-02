import { ChevronDown, HelpCircle } from "lucide-react";
import timelyLogo from "../utils/icons/timely.png";

export default function TitleBar() {
  const userName = "Michael";

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-sm">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <img
          src={timelyLogo}
          alt="Timely Logo"
          className="w-[40px] h-8 object-contain"
        />
      </div>

      {/* Right: Avatar + Name + Help */}
      <div className="flex items-center gap-3">
        {/* User Info */}
        <div className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-full cursor-pointer transition">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-semibold text-sm">
            {userName[0]}
          </div>
          <span className="text-sm font-medium text-gray-800">{userName}</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>

        {/* Help Icon */}
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-50 transition"
          title="Need help?"
        >
          <HelpCircle className="w-5 h-5 text-purple-600" />
        </button>
      </div>
    </div>
  );
}
