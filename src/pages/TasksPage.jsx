// ============================================================
// TasksPage.jsx — Full Task Manager Page
//
// Hooks used:
//   useState   — new task input, priority selection, filter tab
//   useMemo    — filtered + sorted task list (performance optimization)
//   useCallback — passed down from App.jsx (addTask, toggleTask, deleteTask)
//   useRef     — input auto-focus (via Navbar)
// ============================================================

import { useState, useMemo, useRef, useEffect } from "react";
import { Plus, Trash2, CheckSquare, ListTodo } from "lucide-react";
import TaskCard from "../components/TaskCard";
import SearchBar from "../components/SearchBar";

const FILTERS = ["all", "active", "completed"];
const PRIORITIES = ["low", "medium", "high"];

const TasksPage = ({
  tasks,
  onAdd,
  onToggle,
  onDelete,
  onClearCompleted,
  searchQuery,
  setSearchQuery,
}) => {
  // useState — new task input value
  const [inputValue, setInputValue] = useState("");
  // useState — selected priority for new task
  const [priority, setPriority] = useState("medium");
  // useState — current filter tab
  const [filter, setFilter] = useState("all");

  // useRef — auto-focus the input when page loads
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onAdd(inputValue, priority);
    setInputValue("");
  };

  // useMemo — filtered task list
  // Yeh tab hi recalculate hoga jab tasks, filter, ya searchQuery change ho
  // Bina useMemo ke, har render par yeh filtering dobara hogi — wasteful!
  const filteredTasks = useMemo(() => {
    let result = tasks;

    // Apply search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((t) => t.text.toLowerCase().includes(q));
    }

    // Apply tab filter
    if (filter === "active") result = result.filter((t) => !t.completed);
    if (filter === "completed") result = result.filter((t) => t.completed);

    // Sort: incomplete first, then by priority (high > medium > low)
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return [...result].sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return (
        (priorityOrder[a.priority] ?? 1) - (priorityOrder[b.priority] ?? 1)
      );
    });
  }, [tasks, filter, searchQuery]);

  // useMemo — count stats for filter tabs
  const counts = useMemo(
    () => ({
      all: tasks.length,
      active: tasks.filter((t) => !t.completed).length,
      completed: tasks.filter((t) => t.completed).length,
    }),
    [tasks],
  );

  return (
    <div className="space-y-6">
      {/* Add Task Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border border-gray-800 rounded-2xl p-5"
      >
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Plus size={18} className="text-indigo-400" />
          Add New Task
        </h3>

        <div className="flex gap-3">
          {/* Task input — useRef attached */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What needs to be done?"
            className="
              flex-1 bg-gray-800 text-gray-200 text-sm
              px-4 py-3 rounded-xl border border-gray-700
              focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500
              placeholder-gray-500
            "
          />

          {/* Priority selector */}
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="bg-gray-800 text-gray-300 text-sm px-3 py-3 rounded-xl border border-gray-700 focus:border-indigo-500 focus:outline-none cursor-pointer"
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </option>
            ))}
          </select>

          {/* Submit button */}
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors shadow-lg shadow-indigo-500/20"
          >
            Add
          </button>
        </div>
      </form>

      {/* Search + Filter row */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        {/* Search */}
        <div className="w-full sm:w-72">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search tasks..."
          />
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 bg-gray-900 border border-gray-800 rounded-xl p-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`
                px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize
                ${
                  filter === f
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-gray-400 hover:text-white"
                }
              `}
            >
              {f}
              <span
                className={`ml-1.5 text-xs ${filter === f ? "text-indigo-200" : "text-gray-600"}`}
              >
                {counts[f]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <ListTodo size={18} className="text-indigo-400" />
            Tasks
            <span className="text-xs text-gray-500 font-normal">
              ({filteredTasks.length} showing)
            </span>
          </h3>

          {/* Clear completed button */}
          {counts.completed > 0 && (
            <button
              onClick={onClearCompleted}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-400 transition-colors"
            >
              <Trash2 size={13} />
              Clear completed ({counts.completed})
            </button>
          )}
        </div>

        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-600">
            <CheckSquare size={40} className="mb-3 opacity-40" />
            <p className="text-sm">
              {searchQuery
                ? "No tasks match your search."
                : filter === "completed"
                  ? "No completed tasks yet."
                  : "No tasks yet. Add one above!"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksPage;
