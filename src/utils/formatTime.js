// ============================================================
// formatTime.js — Helper to format seconds into MM:SS display
// Pomodoro timer ke liye seconds ko readable format mein convert
// ============================================================

/**
 * Convert total seconds to MM:SS string
 * @param {number} seconds - Total seconds remaining
 * @returns {string} Formatted time like "25:00"
 */
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  // padStart ensures single digits show as "05" not "5"
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};
