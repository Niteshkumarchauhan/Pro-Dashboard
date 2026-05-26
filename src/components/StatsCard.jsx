// ============================================================
// StatsCard.jsx — Reusable metric card for dashboard
// Props: title, value, subtitle, icon, color, trend
// ============================================================

const COLOR_MAP = {
  indigo: {
    bg: "bg-indigo-500/10",
    text: "text-indigo-400",
    border: "border-indigo-500/20",
  },
  green: {
    bg: "bg-green-500/10",
    text: "text-green-400",
    border: "border-green-500/20",
  },
  yellow: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
    border: "border-yellow-500/20",
  },
  red: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    border: "border-red-500/20",
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    border: "border-purple-500/20",
  },
};

const StatsCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "indigo",
  trend,
}) => {
  const colors = COLOR_MAP[color] || COLOR_MAP.indigo;

  return (
    <div
      className={`
      bg-gray-900 border ${colors.border} rounded-2xl p-5
      hover:border-opacity-60 hover:shadow-lg hover:shadow-black/20
      transition-all duration-300 hover:-translate-y-0.5
    `}
    >
      {/* Top row: title + icon */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-400 text-sm font-medium">{title}</span>
        <div
          className={`w-10 h-10 ${colors.bg} rounded-xl flex items-center justify-center`}
        >
          {Icon && <Icon size={20} className={colors.text} />}
        </div>
      </div>

      {/* Main value */}
      <div className={`text-3xl font-bold ${colors.text} mb-1`}>{value}</div>

      {/* Subtitle / trend */}
      <div className="flex items-center gap-2">
        <span className="text-gray-500 text-xs">{subtitle}</span>
        {trend !== undefined && (
          <span
            className={`text-xs font-medium ${trend >= 0 ? "text-green-400" : "text-red-400"}`}
          >
            {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
