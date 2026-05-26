// ============================================================
// NotesPanel.jsx — Notes creation and display
// Props: notes, onAdd, onDelete, searchQuery
// ============================================================

import { useState, useCallback } from "react";
import { Plus, Trash2, StickyNote } from "lucide-react";

// Available note accent colors
const NOTE_COLORS = ["indigo", "purple", "green", "yellow", "red"];

const COLOR_STYLES = {
  indigo: {
    border: "border-indigo-500/30",
    accent: "bg-indigo-500/10 text-indigo-400",
  },
  purple: {
    border: "border-purple-500/30",
    accent: "bg-purple-500/10 text-purple-400",
  },
  green: {
    border: "border-green-500/30",
    accent: "bg-green-500/10 text-green-400",
  },
  yellow: {
    border: "border-yellow-500/30",
    accent: "bg-yellow-500/10 text-yellow-400",
  },
  red: { border: "border-red-500/30", accent: "bg-red-500/10 text-red-400" },
};

const NotesPanel = ({ notes, onAdd, onDelete, searchQuery }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("indigo");
  const [showForm, setShowForm] = useState(false);

  // useCallback — form submit handler
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onAdd(title, content, color);
      setTitle("");
      setContent("");
      setColor("indigo");
      setShowForm(false);
    },
    [title, content, color, onAdd],
  );

  // Filter notes based on search query
  const filteredNotes = notes.filter((note) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(q) ||
      note.content.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Add Note Button */}
      <button
        onClick={() => setShowForm((v) => !v)}
        className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-colors shadow-lg shadow-indigo-500/20"
      >
        <Plus size={16} />
        {showForm ? "Cancel" : "New Note"}
      </button>

      {/* Add Note Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 border border-gray-700 rounded-2xl p-5 space-y-4"
        >
          <input
            type="text"
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-900 text-gray-200 text-sm px-4 py-2.5 rounded-xl border border-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-gray-500"
          />
          <textarea
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full bg-gray-900 text-gray-200 text-sm px-4 py-2.5 rounded-xl border border-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-gray-500 resize-none"
          />

          {/* Color picker */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-xs">Color:</span>
            {NOTE_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`
                  w-6 h-6 rounded-full border-2 transition-transform
                  ${COLOR_STYLES[c].accent.split(" ")[0]}
                  ${color === c ? "border-white scale-110" : "border-transparent"}
                `}
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl transition-colors"
          >
            Save Note
          </button>
        </form>
      )}

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-600">
          <StickyNote size={40} className="mb-3 opacity-40" />
          <p className="text-sm">
            {searchQuery
              ? "No notes match your search."
              : "No notes yet. Create one!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredNotes.map((note) => {
            const styles = COLOR_STYLES[note.color] || COLOR_STYLES.indigo;
            return (
              <div
                key={note.id}
                className={`
                  bg-gray-800 border ${styles.border} rounded-2xl p-5
                  hover:shadow-lg hover:shadow-black/20 transition-all duration-200
                  hover:-translate-y-0.5 group relative
                `}
              >
                {/* Color accent bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl ${styles.accent.split(" ")[0]}`}
                />

                {/* Delete button */}
                <button
                  onClick={() => onDelete(note.id)}
                  className="absolute top-4 right-4 text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Delete note"
                >
                  <Trash2 size={15} />
                </button>

                <h3 className="text-white font-semibold text-sm mb-2 pr-6">
                  {note.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-4">
                  {note.content}
                </p>
                <p className="text-gray-600 text-xs mt-3">
                  {new Date(note.createdAt).toLocaleDateString()}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NotesPanel;
