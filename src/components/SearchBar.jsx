// ============================================================
// SearchBar.jsx — Standalone search input component
// Props: value, onChange, placeholder
// ============================================================

import { Search, X } from "lucide-react";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="relative">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full bg-gray-800 text-gray-200 text-sm
          pl-9 pr-9 py-2.5 rounded-xl
          border border-gray-700 focus:border-indigo-500
          focus:outline-none focus:ring-1 focus:ring-indigo-500
          placeholder-gray-500
        "
      />
      {/* Clear button — only show when there's text */}
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
