// ============================================================
// Sidebar.jsx — Left navigation panel
// Props: activePage, setActivePage
// ============================================================

import {
  LayoutDashboard,
  CheckSquare,
  StickyNote,
  Timer,
  BarChart2,
  Zap,
} from "lucide-react";

// Navigation items array — easy to extend later
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "notes", label: "Notes", icon: StickyNote },
  { id: "timer", label: "Pomodoro", icon: Timer },
  { id: "stats", label: "Stats", icon: BarChart2 },
];

const Sidebar = ({ activePage, setActivePage }) => {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-800">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <Zap size={18} className="text-white" />
        </div>
        <span className="text-white font-bold text-lg tracking-tight">
          ProDash
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = activePage === id;
          return (
            <button
              key={id}
              onClick={() => setActivePage(id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                transition-all duration-200 cursor-pointer
                ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }
              `}
            >
              <Icon size={18} />
              {label}
              {/* Active indicator dot */}
              {isActive && (
                <span className="ml-auto w-2 h-2 bg-white rounded-full opacity-80" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-800">
        <p className="text-xs text-gray-600">v1.0.0 · ProDash</p>
      </div>
    </aside>
  );
};

export default Sidebar;
