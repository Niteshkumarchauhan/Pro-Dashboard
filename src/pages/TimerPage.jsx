// ============================================================
// TimerPage.jsx — Pomodoro Timer page
// ============================================================

import { Timer as TimerIcon, Info } from "lucide-react";
import Timer from "../components/Timer";

const TimerPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
            <TimerIcon size={20} className="text-indigo-400" />
          </div>
          <div>
            <h2 className="text-white font-semibold">Pomodoro Timer</h2>
            <p className="text-gray-500 text-xs">25 min focus · 5 min break</p>
          </div>
        </div>
      </div>

      {/* Timer component */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
        <Timer />
      </div>

      {/* How it works */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
        <h3 className="text-white font-semibold flex items-center gap-2 mb-4">
          <Info size={16} className="text-indigo-400" />
          How Pomodoro Works
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              step: "1",
              title: "Focus",
              desc: "Work on a single task for 25 minutes without interruption.",
              color: "indigo",
            },
            {
              step: "2",
              title: "Break",
              desc: "Take a 5-minute break to rest your mind.",
              color: "green",
            },
            {
              step: "3",
              title: "Repeat",
              desc: "After 4 sessions, take a longer 15–30 min break.",
              color: "purple",
            },
          ].map(({ step, title, desc, color }) => (
            <div key={step} className="bg-gray-800 rounded-xl p-4">
              <div
                className={`w-8 h-8 bg-${color}-500/15 text-${color}-400 rounded-lg flex items-center justify-center font-bold text-sm mb-3`}
              >
                {step}
              </div>
              <h4 className="text-white text-sm font-semibold mb-1">{title}</h4>
              <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimerPage;
