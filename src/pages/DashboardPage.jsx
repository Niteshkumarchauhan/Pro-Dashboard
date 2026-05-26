// ============================================================
// DashboardPage.jsx — Main overview page
//
// Hooks used:
//   useState  — loading state
//   useEffect — fetch fake API data from JSONPlaceholder
//   useMemo   — calculate stats from tasks without re-computing
// ============================================================

import { useState, useEffect, useMemo } from "react";
import {
  CheckSquare,
  ListTodo,
  Flame,
  TrendingUp,
  Clock,
  Star,
  AlertCircle,
  Activity,
} from "lucide-react";
import StatsCard from "../components/StatsCard";
import TaskCard from "../components/TaskCard";

const DashboardPage = ({ tasks, onToggleTask, onDeleteTask }) => {
  // useState — API se aaye recent todos store karne ke liye
  const [apiTodos, setApiTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect — component mount hone par JSONPlaceholder se data fetch karo
  // Yeh real-world API call ka simulation hai
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=5",
        );
        const data = await res.json();
        setApiTodos(data);
      } catch (err) {
        console.error("Failed to fetch todos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []); // Empty array = sirf ek baar chalega (on mount)

  // useMemo — task statistics calculate karo
  // Yeh tab hi recalculate hoga jab tasks array change hoga
  // Agar useMemo na hota, har render par yeh calculation dobara hoti
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const highPriority = tasks.filter(
      (t) => t.priority === "high" && !t.completed,
    ).length;
    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending, highPriority, completionRate };
  }, [tasks]); // Dependency: tasks change hone par hi recalculate karo

  // Recent tasks — last 3 incomplete tasks
  const recentTasks = useMemo(
    () => tasks.filter((t) => !t.completed).slice(0, 3),
    [tasks],
  );

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h2 className="text-white text-2xl font-bold mb-1">Good day! 👋</h2>
          <p className="text-indigo-200 text-sm">
            You have{" "}
            <span className="font-semibold text-white">
              {stats.pending} tasks
            </span>{" "}
            pending today.
            {stats.completionRate > 0 && ` ${stats.completionRate}% complete!`}
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
          <Activity size={18} className="text-indigo-200" />
          <span className="text-white text-sm font-medium">
            {stats.completionRate}% done
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard
          title="Total Tasks"
          value={stats.total}
          subtitle="All time"
          icon={ListTodo}
          color="indigo"
        />
        <StatsCard
          title="Completed"
          value={stats.completed}
          subtitle="Tasks done"
          icon={CheckSquare}
          color="green"
          trend={stats.completionRate}
        />
        <StatsCard
          title="Pending"
          value={stats.pending}
          subtitle="Need attention"
          icon={Clock}
          color="yellow"
        />
        <StatsCard
          title="High Priority"
          value={stats.highPriority}
          subtitle="Urgent tasks"
          icon={AlertCircle}
          color="red"
        />
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Tasks */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Flame size={18} className="text-orange-400" />
              Active Tasks
            </h3>
            <span className="text-xs text-gray-500">
              {recentTasks.length} showing
            </span>
          </div>

          {recentTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              <CheckSquare size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">All caught up! 🎉</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={onToggleTask}
                  onDelete={onDeleteTask}
                />
              ))}
            </div>
          )}
        </div>

        {/* API Todos from JSONPlaceholder */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Star size={18} className="text-yellow-400" />
              Sample Todos
            </h3>
            <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-lg">
              via JSONPlaceholder
            </span>
          </div>

          {loading ? (
            // Loading skeleton
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-10 bg-gray-800 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {apiTodos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/60"
                >
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      todo.completed ? "bg-green-400" : "bg-yellow-400"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      todo.completed
                        ? "line-through text-gray-500"
                        : "text-gray-300"
                    }`}
                  >
                    {todo.title}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Progress bar */}
      {stats.total > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <TrendingUp size={18} className="text-indigo-400" />
              Overall Progress
            </h3>
            <span className="text-indigo-400 font-bold">
              {stats.completionRate}%
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-indigo-600 to-purple-500 h-3 rounded-full transition-all duration-700"
              style={{ width: `${stats.completionRate}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>{stats.completed} completed</span>
            <span>{stats.pending} remaining</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
