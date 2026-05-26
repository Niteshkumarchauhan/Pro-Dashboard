// ============================================================
// TaskCard.jsx — Single task item component
// Props: task, onToggle, onDelete
// useCallback is used in parent to pass stable onToggle/onDelete
// ============================================================

import { Trash2, CheckCircle2, Circle } from "lucide-react";

// Priority badge colors
const PRIORITY_STYLES = {
  high: "bg-red-500/15 text-red-400 border-red-500/30",
  medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  low: "bg-green-500/15 text-green-400 border-green-500/30",
};

const TaskCard = ({ task, onToggle, onDelete }) => {
  return (
    <div
      className={`
      flex items-start gap-3 p-4 rounded-xl border
      transition-all duration-200 group
      ${
        task.completed
          ? "bg-gray-800/40 border-gray-700/50 opacity-60"
          : "bg-gray-800 border-gray-700 hover:border-indigo-500/40"
      }
    `}
    >
      {/* Checkbox toggle button */}
      <button
        onClick={() => onToggle(task.id)}
        className="mt-0.5 flex-shrink-0 text-gray-500 hover:text-indigo-400 transition-colors"
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
      >
        {task.completed ? (
          <CheckCircle2 size={20} className="text-indigo-400" />
        ) : (
          <Circle size={20} />
        )}
      </button>

      {/* Task text + priority */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium leading-relaxed ${
            task.completed ? "line-through text-gray-500" : "text-gray-200"
          }`}
        >
          {task.text}
        </p>
        <div className="flex items-center gap-2 mt-1.5">
          {/* Priority badge */}
          <span
            className={`
            text-xs px-2 py-0.5 rounded-full border font-medium
            ${PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.medium}
          `}
          >
            {task.priority}
          </span>
          {/* Creation date */}
          <span className="text-xs text-gray-600">
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Delete button — visible on hover */}
      <button
        onClick={() => onDelete(task.id)}
        className="flex-shrink-0 text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Delete task"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default TaskCard;
