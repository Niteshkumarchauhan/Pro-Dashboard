// ============================================================
// useTasks.js — Custom Hook for Task Management
//
// Custom hooks ek reusable logic ka piece hota hai.
// Yahan hum tasks ki saari state aur functions ek jagah rakhte hain
// taaki koi bhi component use kar sake.
//
// Hooks used inside: useState, useEffect, useCallback
// ============================================================

import { useState, useEffect, useCallback } from "react";
import { saveToStorage, loadFromStorage } from "../utils/localStorage";

const STORAGE_KEY = "productivity_tasks";

export const useTasks = () => {
  // useState — tasks ki list store karta hai
  // Initial value localStorage se load hoti hai (agar pehle save ki ho)
  const [tasks, setTasks] = useState(() => loadFromStorage(STORAGE_KEY, []));

  // useEffect — jab bhi tasks change ho, localStorage mein save karo
  // Dependency array mein [tasks] hai, isliye sirf tasks change hone par chalega
  useEffect(() => {
    saveToStorage(STORAGE_KEY, tasks);
  }, [tasks]);

  // useCallback — addTask function ko memoize karta hai
  // Matlab: yeh function tab hi naya banega jab setTasks change ho
  // Isse child components unnecessary re-render nahi honge
  const addTask = useCallback((text, priority = "medium") => {
    if (!text.trim()) return; // Empty task mat add karo
    const newTask = {
      id: Date.now(), // Unique ID for each task
      text: text.trim(),
      completed: false,
      priority, // 'low' | 'medium' | 'high'
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]); // Naya task top par add karo
  }, []);

  // useCallback — task complete/incomplete toggle karta hai
  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }, []);

  // useCallback — task delete karta hai
  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  // useCallback — saare completed tasks ek saath clear karta hai
  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  }, []);

  return { tasks, addTask, toggleTask, deleteTask, clearCompleted };
};
