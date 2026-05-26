// ============================================================
// useNotes.js — Custom Hook for Notes Management
// Hooks used: useState, useEffect, useCallback
// ============================================================

import { useState, useEffect, useCallback } from "react";
import { saveToStorage, loadFromStorage } from "../utils/localStorage";

const STORAGE_KEY = "productivity_notes";

export const useNotes = () => {
  // Notes list localStorage se load karo initially
  const [notes, setNotes] = useState(() => loadFromStorage(STORAGE_KEY, []));

  // Notes change hone par localStorage update karo
  useEffect(() => {
    saveToStorage(STORAGE_KEY, notes);
  }, [notes]);

  // useCallback — naya note add karo
  const addNote = useCallback((title, content, color = "indigo") => {
    if (!title.trim() && !content.trim()) return;
    const newNote = {
      id: Date.now(),
      title: title.trim() || "Untitled",
      content: content.trim(),
      color,
      createdAt: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
  }, []);

  // useCallback — note delete karo
  const deleteNote = useCallback((id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }, []);

  // useCallback — note update karo
  const updateNote = useCallback((id, updates) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, ...updates } : note)),
    );
  }, []);

  return { notes, addNote, deleteNote, updateNote };
};
