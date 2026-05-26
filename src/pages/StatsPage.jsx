// ============================================================
// StatsPage.jsx — Productivity Statistics Page
//
// Hooks used:
//   useMemo — complex stats calculations, only rerun when tasks change
// ============================================================

import { useMemo } from "react";
import {
  BarChart2,
  CheckCircle2,
  Clock,
  Zap,
  TrendingUp,
  Award,
  Target,
  Layers,
} from "lucide-react";
import StatsCard from "../components/StatsCard";

const StatsPage = ({ tasks }) => {
  // useMemo — saari statistics ek baar calculate karo
  // Yeh tab hi dobara chalega jab tasks change ho
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Priority breakdown
    const byPriority = {
      high: tasks.filter((t) => t.priority === "high").length,
      medium: tasks.filter((t) => t.priority === "medium").length,
      low: tasks.filter((t) => t.priority === "low").length,
    };

    // Completion by priority
    const completedHigh = tasks.filter(
      (t) => t.priority === "high" && t.completed,
    ).length;
    const completedMedium = tasks.filter(
      (t) => t.priority === "medium" && t.completed,
    ).length;
    const completedLow = tasks.filter(
      (t) => t.priority === "low" && t.completed,
    ).length;

    return {
      total,
      completed,
      pending,
      rate,
      byPriority,
      completedHigh,
      completedMedium,
      completedLow,
    };
  }, [tasks]);

  // Priority bar data
  const priorityBars = [
    {
      label: "High Priority",
      total: stats.byPriority.high,
      done: stats.completedHigh,
      color: "bg-red-500",
      textColor: "text-red-400",
    },
    {
      label: "Medium Priority",
      total: stats.byPriority.medium,
      done: stats.completedMedium,
      color: "bg-yellow-500",
      textColor: "text-yellow-400",
    },
    {
      label: "Low Priority",
      total: stats.byPriority.low,
      done: stats.completedLow,
      color: "bg-green-500",
      textColor: "text-green-400",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
            <BarChart2 size={20} className="text-indigo-400" />
          </div>
          <div>
            <h2 className="text-white font-semibold">Productivity Stats</h2>
            <p className="text-gray-500 text-xs">
              Your task completion overview
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard
          title="Total Tasks"
          value={stats.total}
          subtitle="Created"
          icon={Layers}
          color="indigo"
        />
        <StatsCard
          title="Completed"
          value={stats.completed}
          subtitle="Finished"
          icon={CheckCircle2}
          color="green"
        />
        <StatsCard
          title="Pending"
          value={stats.pending}
          subtitle="In progress"
          icon={Clock}
          color="yellow"
        />
        <StatsCard
          title="Success Rate"
          value={`${stats.rate}%`}
          subtitle="Completion"
          icon={TrendingUp}
          color="purple"
        />
      </div>

      {/* Priority Breakdown */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
        <h3 className="text-white font-semibold flex items-center gap-2 mb-5">
          <Target size={18} className="text-indigo-400" />
          Priority Breakdown
        </h3>

        {stats.total === 0 ? (
          <div className="text-center py-8 text-gray-600">
            <BarChart2 size={36} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm">Add some tasks to see stats.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {priorityBars.map(({ label, total, done, color, textColor }) => {
              const pct = total > 0 ? Math.round((done / total) * 100) : 0;
              return (
                <div key={label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${textColor}`}>
                      {label}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {done}/{total}
                      <span className="text-gray-600 ml-1">({pct}%)</span>
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2.5">
                    <div
                      className={`${color} h-2.5 rounded-full transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Achievement badges */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
        <h3 className="text-white font-semibold flex items-center gap-2 mb-4">
          <Award size={18} className="text-yellow-400" />
          Achievements
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            {
              label: "First Task",
              unlocked: stats.total >= 1,
              icon: "🎯",
              desc: "Create your first task",
            },
            {
              label: "Go-Getter",
              unlocked: stats.total >= 5,
              icon: "🚀",
              desc: "Create 5 tasks",
            },
            {
              label: "Productive",
              unlocked: stats.completed >= 1,
              icon: "✅",
              desc: "Complete a task",
            },
            {
              label: "On a Roll",
              unlocked: stats.completed >= 5,
              icon: "🔥",
              desc: "Complete 5 tasks",
            },
            {
              label: "Half Way",
              unlocked: stats.rate >= 50,
              icon: "⚡",
              desc: "50% completion rate",
            },
            {
              label: "Perfectionist",
              unlocked: stats.rate === 100 && stats.total > 0,
              icon: "🏆",
              desc: "100% completion",
            },
          ].map(({ label, unlocked, icon, desc }) => (
            <div
              key={label}
              className={`
                p-4 rounded-xl border text-center transition-all
                ${
                  unlocked
                    ? "bg-indigo-500/10 border-indigo-500/30"
                    : "bg-gray-800/50 border-gray-700/50 opacity-40 grayscale"
                }
              `}
            >
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-white text-xs font-semibold">{label}</div>
              <div className="text-gray-500 text-xs mt-0.5">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational quote */}
      <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 rounded-2xl p-5 text-center">
        <Zap size={24} className="text-indigo-400 mx-auto mb-2" />
        <p className="text-gray-300 text-sm italic">
          "The secret of getting ahead is getting started."
        </p>
        <p className="text-gray-500 text-xs mt-1">— Mark Twain</p>
      </div>
    </div>
  );
};

export default StatsPage;
