// ============================================================
// Navbar.jsx — Top navigation bar with search
// Props: searchQuery, setSearchQuery, activePage, onMenuClick
// useRef — search input auto-focus ke liye
// ============================================================

import { useRef, useEffect } from "react";
import { Search, Bell, User, Menu } from "lucide-react";

// Page title mapping
const PAGE_TITLES = {
  dashboard: "Dashboard",
  tasks: "Task Manager",
  notes: "Notes",
  timer: "Pomodoro Timer",
  stats: "Productivity Stats",
};

const Navbar = ({ searchQuery, setSearchQuery, activePage, onMenuClick }) => {
  // useRef — input element ka direct reference rakhta hai
  // Isse hum programmatically focus kar sakte hain
  const searchRef = useRef(null);

  // useEffect — jab bhi activePage change ho, search input focus karo
  // Yeh UX improve karta hai — user ko manually click nahi karna padta
  useEffect(() => {
    if (activePage === "tasks" || activePage === "notes") {
      // Small delay taaki page transition complete ho
      const timer = setTimeout(() => searchRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [activePage]);

  return (
    <header className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 lg:px-6">
      {/* Left: Hamburger (mobile) + Page Title */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
        <h1 className="text-white font-semibold text-xl">
          {PAGE_TITLES[activePage] || "Dashboard"}
        </h1>
      </div>

      {/* Right side: Search + Icons */}
      <div className="flex items-center gap-3">
        {/* Search Bar — useRef attached here */}
        <div className="relative hidden sm:block">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            ref={searchRef}
            type="text"
            placeholder="Search tasks, notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
              bg-gray-800 text-gray-200 text-sm
              pl-9 pr-4 py-2 rounded-xl w-56 lg:w-64
              border border-gray-700 focus:border-indigo-500
              focus:outline-none focus:ring-1 focus:ring-indigo-500
              placeholder-gray-500
            "
          />
        </div>

        {/* Notification Bell */}
        <button className="w-9 h-9 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
          <Bell size={17} />
        </button>

        {/* User Avatar */}
        <button className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white hover:bg-indigo-500 transition-colors">
          <User size={17} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
