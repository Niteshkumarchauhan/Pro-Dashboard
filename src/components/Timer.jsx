// ============================================================
// Timer.jsx — Pomodoro Timer Component
// Uses usePomodoro custom hook (useRef + useEffect inside)
// ============================================================

import { Play, Pause, RotateCcw, Coffee, Brain } from "lucide-react";
import { usePomodoro } from "../hooks/usePomodoro";
import { formatTime } from "../utils/formatTime";

const Timer = () => {
  const {
    timeLeft,
    isRunning,
    isBreak,
    sessions,
    progress,
    toggleTimer,
    resetTimer,
  } = usePomodoro();

  // SVG circle progress ring dimensions
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  // strokeDashoffset controls how much of the ring is "filled"
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-8 py-8">
      {/* Mode badge */}
      <div
        className={`
        flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
        ${
          isBreak
            ? "bg-green-500/15 text-green-400 border border-green-500/30"
            : "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30"
        }
      `}
      >
        {isBreak ? <Coffee size={16} /> : <Brain size={16} />}
        {isBreak ? "Break Time — Relax!" : "Focus Session"}
      </div>

      {/* Circular progress ring */}
      <div className="relative w-52 h-52">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          {/* Background ring */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#1f2937"
            strokeWidth="10"
          />
          {/* Progress ring */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={isBreak ? "#22c55e" : "#6366f1"}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>

        {/* Time display in center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-white font-mono tracking-wider">
            {formatTime(timeLeft)}
          </span>
          <span className="text-xs text-gray-500 mt-1">
            {isBreak ? "break" : "focus"}
          </span>
        </div>
      </div>

      {/* Control buttons */}
      <div className="flex items-center gap-4">
        {/* Reset */}
        <button
          onClick={resetTimer}
          className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-xl flex items-center justify-center text-gray-400 hover:text-white transition-all"
          aria-label="Reset timer"
        >
          <RotateCcw size={18} />
        </button>

        {/* Play / Pause — main button */}
        <button
          onClick={toggleTimer}
          className={`
            w-16 h-16 rounded-2xl flex items-center justify-center text-white
            font-medium shadow-lg transition-all duration-200 hover:scale-105
            ${
              isBreak
                ? "bg-green-600 hover:bg-green-500 shadow-green-500/25"
                : "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/25"
            }
          `}
          aria-label={isRunning ? "Pause timer" : "Start timer"}
        >
          {isRunning ? (
            <Pause size={24} />
          ) : (
            <Play size={24} className="ml-1" />
          )}
        </button>

        {/* Sessions completed badge */}
        <div className="w-12 h-12 bg-gray-800 rounded-xl flex flex-col items-center justify-center">
          <span className="text-white font-bold text-lg leading-none">
            {sessions}
          </span>
          <span className="text-gray-500 text-xs">done</span>
        </div>
      </div>

      {/* Tips */}
      <div className="text-center max-w-xs">
        <p className="text-gray-500 text-sm">
          {isBreak
            ? "☕ Take a short walk, stretch, or grab some water."
            : "🎯 Stay focused. Avoid distractions for 25 minutes."}
        </p>
      </div>
    </div>
  );
};

export default Timer;
