// ============================================================
// usePomodoro.js — Custom Hook for Pomodoro Timer
//
// Pomodoro technique: 25 min kaam, 5 min break
// Hooks used: useState, useEffect, useRef, useCallback
// ============================================================

import { useState, useEffect, useRef, useCallback } from "react";

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

export const usePomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0); // Completed pomodoro count

  // useRef — interval ID store karta hai
  // Ref isliye use kiya kyunki interval ID ko change karne par
  // component re-render nahi hona chahiye
  const intervalRef = useRef(null);

  // useEffect — timer logic: jab isRunning true ho tab countdown shuru karo
  useEffect(() => {
    if (isRunning) {
      // setInterval har 1 second mein timeLeft ko 1 se kam karta hai
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Timer khatam! Mode switch karo
            clearInterval(intervalRef.current);
            setIsRunning(false);

            if (!isBreak) {
              // Work session complete — break time shuru karo
              setSessions((s) => s + 1);
              setIsBreak(true);
              return BREAK_TIME;
            } else {
              // Break khatam — work time wapas
              setIsBreak(false);
              return WORK_TIME;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      // isRunning false ho gaya — interval clear karo
      clearInterval(intervalRef.current);
    }

    // Cleanup: component unmount hone par interval clear karo
    return () => clearInterval(intervalRef.current);
  }, [isRunning, isBreak]);

  // useCallback — start/pause toggle
  const toggleTimer = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  // useCallback — timer reset karta hai
  const resetTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(WORK_TIME);
  }, []);

  // Progress percentage calculate karo (0 to 100)
  const totalTime = isBreak ? BREAK_TIME : WORK_TIME;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  return {
    timeLeft,
    isRunning,
    isBreak,
    sessions,
    progress,
    toggleTimer,
    resetTimer,
  };
};
