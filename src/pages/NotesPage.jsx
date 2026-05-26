// ============================================================
// NotesPage.jsx — Notes page wrapper
// ============================================================

import { StickyNote } from "lucide-react";
import NotesPanel from "../components/NotesPanel";

const NotesPage = ({ notes, onAdd, onDelete, searchQuery, setSearchQuery }) => {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center">
            <StickyNote size={20} className="text-purple-400" />
          </div>
          <div>
            <h2 className="text-white font-semibold">My Notes</h2>
            <p className="text-gray-500 text-xs">
              {notes.length} note{notes.length !== 1 ? "s" : ""} saved
            </p>
          </div>
        </div>
      </div>

      {/* Notes panel component */}
      <NotesPanel
        notes={notes}
        onAdd={onAdd}
        onDelete={onDelete}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default NotesPage;
