<div align="center">

# ⚡ ProDash

### A Modern Productivity Dashboard

**React 19 · Vite 8 · Tailwind CSS v4 · Lucide Icons**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Lucide](https://img.shields.io/badge/Lucide_React-1.16-F56565?style=flat-square)](https://lucide.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

A **portfolio-worthy**, full-featured productivity app that demonstrates all 5 core React hooks — `useState`, `useEffect`, `useRef`, `useMemo`, and `useCallback` — in a real-world SaaS-style dark UI.

[Features](#-features) · [Demo](#-live-preview) · [Quick Start](#-quick-start) · [Hooks Guide](#-react-hooks-guide) · [Folder Structure](#-folder-structure) · [Tech Stack](#-tech-stack)

</div>

---

## 🖥️ Live Preview

> Run locally with `npm run dev` → open [http://localhost:5173](http://localhost:5173)

| Page               | Description                                              |
| ------------------ | -------------------------------------------------------- |
| **Dashboard**      | Stats overview, API-fetched todos, progress bar          |
| **Task Manager**   | Add / complete / delete tasks with priority & search     |
| **Notes**          | Color-coded sticky notes with live search                |
| **Pomodoro Timer** | SVG circular countdown — 25 min focus, 5 min break       |
| **Stats**          | Completion rates, priority breakdown, achievement badges |

---

## ✨ Features

- 📊 **Dashboard** — Live stats cards, JSONPlaceholder API integration, overall progress bar
- ✅ **Task Manager** — Priority levels (High / Medium / Low), filter tabs, search, localStorage persistence
- 📝 **Notes** — Color-coded cards, create / delete, live search filter
- ⏱️ **Pomodoro Timer** — Animated SVG ring, session counter, auto-switch between focus & break
- 📈 **Stats & Achievements** — Completion rates, priority breakdown bars, unlockable badges
- 💾 **Persistence** — Tasks and notes survive page refresh via `localStorage`
- 📱 **Fully Responsive** — Slide-in sidebar on mobile, adaptive grid layouts
- 🎨 **Dark SaaS UI** — Indigo accent, smooth hover animations, custom scrollbar

---

## ⚡ Quick Start

### Prerequisites

Make sure you have these installed:

```
Node.js  >= 18.x
npm      >= 9.x
```

### Installation

```bash
# 1. Clone or navigate to the project
cd productivity-dashboard

# 2. Install all dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. That's it!

### Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start dev server with hot reload     |
| `npm run build`   | Build optimised production bundle    |
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint across all source files   |

---

## 🗂️ Folder Structure

```
productivity-dashboard/
│
├── public/                     # Static assets served as-is
│
├── src/
│   │
│   ├── components/             # Reusable UI building blocks
│   │   ├── Navbar.jsx          # Top bar — search input + mobile menu  [useRef]
│   │   ├── Sidebar.jsx         # Left navigation panel
│   │   ├── TaskCard.jsx        # Single task row with priority badge
│   │   ├── NotesPanel.jsx      # Notes grid + add-note form
│   │   ├── Timer.jsx           # Pomodoro SVG circular timer           [useRef]
│   │   ├── StatsCard.jsx       # Reusable metric card with color themes
│   │   └── SearchBar.jsx       # Controlled search input with clear btn
│   │
│   ├── pages/                  # Full page views (one per sidebar item)
│   │   ├── DashboardPage.jsx   # Overview                [useEffect · useMemo]
│   │   ├── TasksPage.jsx       # Task manager            [useMemo · useRef]
│   │   ├── NotesPage.jsx       # Notes wrapper
│   │   ├── TimerPage.jsx       # Pomodoro page
│   │   └── StatsPage.jsx       # Stats & achievements    [useMemo]
│   │
│   ├── hooks/                  # Custom hooks — reusable stateful logic
│   │   ├── useTasks.js         # Task CRUD + localStorage  [useState · useEffect · useCallback]
│   │   ├── useNotes.js         # Notes CRUD + localStorage [useState · useEffect · useCallback]
│   │   └── usePomodoro.js      # Timer engine              [useState · useEffect · useRef · useCallback]
│   │
│   ├── utils/                  # Pure helper functions (no React)
│   │   ├── localStorage.js     # saveToStorage / loadFromStorage
│   │   └── formatTime.js       # seconds → "MM:SS" string
│   │
│   ├── App.jsx                 # Root component — layout + state orchestration
│   ├── main.jsx                # ReactDOM.createRoot entry point
│   └── index.css               # Tailwind @import + custom scrollbar styles
│
├── index.html                  # HTML shell
├── vite.config.js              # Vite + Tailwind plugin config
├── package.json
└── README.md
```

---

## 🪝 React Hooks Guide

> **Hindi + English mix** — simple explanations with real code from this project.

---

### 1. `useState` — Data Store Karna (Storing State)

```jsx
// useTasks.js
const [tasks, setTasks] = useState(() =>
  loadFromStorage("productivity_tasks", []),
);
```

**Kya hai:** Component ke andar reactive data store karta hai.  
Jab `setTasks` call hota hai, React component ko dobara render karta hai with the new value.

**Is project mein kahan use hua:**

| State         | File             | Purpose               |
| ------------- | ---------------- | --------------------- |
| `tasks`       | `useTasks.js`    | Task list             |
| `notes`       | `useNotes.js`    | Notes list            |
| `timeLeft`    | `usePomodoro.js` | Seconds remaining     |
| `isRunning`   | `usePomodoro.js` | Timer on/off          |
| `activePage`  | `App.jsx`        | Current page          |
| `searchQuery` | `App.jsx`        | Global search text    |
| `sidebarOpen` | `App.jsx`        | Mobile sidebar toggle |

---

### 2. `useEffect` — Side Effects Handle Karna

```jsx
// DashboardPage.jsx — API call on mount
useEffect(() => {
  const fetchTodos = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=5",
    );
    const data = await res.json();
    setApiTodos(data);
  };
  fetchTodos();
}, []); // ← empty array = runs ONCE when component mounts
```

```jsx
// useTasks.js — sync to localStorage whenever tasks change
useEffect(() => {
  saveToStorage("productivity_tasks", tasks);
}, [tasks]); // ← runs every time `tasks` updates
```

**Kya hai:** Component render hone ke **baad** kuch kaam karta hai —  
API calls, subscriptions, timers, DOM manipulation.

**Cleanup function** — memory leaks rokne ke liye:

```jsx
// usePomodoro.js
useEffect(() => {
  if (isRunning) {
    intervalRef.current = setInterval(() => { ... }, 1000);
  }
  return () => clearInterval(intervalRef.current); // ← cleanup on unmount
}, [isRunning, isBreak]);
```

**Is project mein kahan use hua:**

| Effect                     | File                | Trigger                   |
| -------------------------- | ------------------- | ------------------------- |
| Fetch API todos            | `DashboardPage.jsx` | On mount (once)           |
| Save tasks to localStorage | `useTasks.js`       | Every tasks change        |
| Save notes to localStorage | `useNotes.js`       | Every notes change        |
| Run timer countdown        | `usePomodoro.js`    | When `isRunning` changes  |
| Auto-focus search input    | `Navbar.jsx`        | When `activePage` changes |

---

### 3. `useRef` — Re-render Ke Bina Value Store Karna

```jsx
// usePomodoro.js — interval ID store karo, re-render mat karo
const intervalRef = useRef(null);

useEffect(() => {
  if (isRunning) {
    intervalRef.current = setInterval(() => { ... }, 1000);
  }
  return () => clearInterval(intervalRef.current);
}, [isRunning]);
```

```jsx
// Navbar.jsx — DOM element directly access karo
const searchRef = useRef(null);

useEffect(() => {
  searchRef.current?.focus(); // programmatically focus the input
}, [activePage]);

return <input ref={searchRef} ... />;
```

**Kya hai:** Ek mutable box jisme koi bhi value rakh sakte ho.  
`ref.current` change karne se **component re-render nahi hota** — yahi iska superpower hai.

**2 main use cases:**

1. **DOM reference** — input focus, scroll, canvas, video player
2. **Mutable value** — interval IDs, previous values, flags

**Is project mein kahan use hua:**

| Ref           | File             | Purpose                            |
| ------------- | ---------------- | ---------------------------------- |
| `intervalRef` | `usePomodoro.js` | Store `setInterval` ID for cleanup |
| `searchRef`   | `Navbar.jsx`     | Auto-focus search input            |
| `inputRef`    | `TasksPage.jsx`  | Auto-focus task input on page load |

---

### 4. `useMemo` — Expensive Calculation Cache Karna

```jsx
// TasksPage.jsx — filtered + sorted list, only recompute when deps change
const filteredTasks = useMemo(() => {
  let result = tasks;

  if (searchQuery) {
    result = result.filter((t) =>
      t.text.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }
  if (filter === "active") result = result.filter((t) => !t.completed);
  if (filter === "completed") result = result.filter((t) => t.completed);

  const order = { high: 0, medium: 1, low: 2 };
  return [...result].sort((a, b) => order[a.priority] - order[b.priority]);
}, [tasks, filter, searchQuery]); // ← only recalculate when these change
```

**Kya hai:** Ek calculation ka **result yaad rakhta hai (memoize)**.  
Agar dependencies change nahi hui, cached result return karta hai — computation skip!

**Without `useMemo`:** Har render par filtering + sorting dobara hogi,  
even jab tasks, filter, searchQuery kuch bhi change nahi hua.

**With `useMemo`:** Sirf tab recalculate hoga jab `tasks`, `filter`, ya `searchQuery` change ho.

**Is project mein kahan use hua:**

| Memo            | File                | What it computes                |
| --------------- | ------------------- | ------------------------------- |
| `filteredTasks` | `TasksPage.jsx`     | Filtered + sorted task list     |
| `stats`         | `DashboardPage.jsx` | total, completed, pending, rate |
| `recentTasks`   | `DashboardPage.jsx` | Last 3 incomplete tasks         |
| `stats`         | `StatsPage.jsx`     | Full stats + priority breakdown |
| `counts`        | `TasksPage.jsx`     | Tab badge counts                |

---

### 5. `useCallback` — Function Reference Stable Rakhna

```jsx
// useTasks.js — stable function reference for child components
const addTask = useCallback((text, priority = "medium") => {
  if (!text.trim()) return;
  setTasks((prev) => [
    {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
    },
    ...prev,
  ]);
}, []); // ← no deps = function never changes

const toggleTask = useCallback((id) => {
  setTasks((prev) =>
    prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
  );
}, []);
```

**Kya hai:** Function ko **memoize** karta hai — same function reference return karta hai  
jab tak dependencies change na ho.

**Without `useCallback`:** Har parent render par `addTask` ka naya function create hoga.  
`TaskCard` ko yeh naya function prop mein milega → `TaskCard` bhi re-render hoga —  
even jab task data change nahi hua. **Unnecessary renders!**

**With `useCallback`:** `addTask` ka reference stable rehta hai.  
`TaskCard` sirf tab re-render hoga jab uska apna data change ho.

**Is project mein kahan use hua:**

| Callback         | File             | Passed to                  |
| ---------------- | ---------------- | -------------------------- |
| `addTask`        | `useTasks.js`    | `TasksPage` → form submit  |
| `toggleTask`     | `useTasks.js`    | `TaskCard` → checkbox      |
| `deleteTask`     | `useTasks.js`    | `TaskCard` → delete btn    |
| `clearCompleted` | `useTasks.js`    | `TasksPage` → clear btn    |
| `addNote`        | `useNotes.js`    | `NotesPanel` → form submit |
| `deleteNote`     | `useNotes.js`    | `NotesPanel` → delete btn  |
| `toggleTimer`    | `usePomodoro.js` | `Timer` → play/pause btn   |
| `resetTimer`     | `usePomodoro.js` | `Timer` → reset btn        |

---

## 🛠️ Tech Stack

| Technology                                                                | Version | Role                    |
| ------------------------------------------------------------------------- | ------- | ----------------------- |
| [React](https://react.dev)                                                | 19.2    | UI library              |
| [Vite](https://vite.dev)                                                  | 8.0     | Build tool + dev server |
| [Tailwind CSS](https://tailwindcss.com)                                   | v4.3    | Utility-first CSS       |
| [@tailwindcss/vite](https://tailwindcss.com/docs/installation/using-vite) | 4.3     | Tailwind v4 Vite plugin |
| [Lucide React](https://lucide.dev)                                        | 1.16    | Icon library            |
| [JSONPlaceholder](https://jsonplaceholder.typicode.com)                   | —       | Fake REST API           |

---

## 🎨 Design System

| Token          | Value                   | Usage                       |
| -------------- | ----------------------- | --------------------------- |
| Background     | `gray-950`              | App shell                   |
| Surface        | `gray-900`              | Cards, panels               |
| Elevated       | `gray-800`              | Inputs, hover states        |
| Border         | `gray-800` / `gray-700` | Card borders                |
| Accent         | `indigo-600`            | Primary actions, active nav |
| Success        | `green-400`             | Completed tasks             |
| Warning        | `yellow-400`            | Medium priority             |
| Danger         | `red-400`               | High priority, delete       |
| Text Primary   | `white`                 | Headings                    |
| Text Secondary | `gray-400`              | Body text                   |
| Text Muted     | `gray-500` / `gray-600` | Timestamps, hints           |

**Animations:**

- Card hover → `hover:-translate-y-0.5` + `hover:shadow-lg`
- Sidebar active → `bg-indigo-600` with `shadow-indigo-500/20`
- Timer ring → `stroke-dashoffset` with `transition: 1s linear`
- Progress bars → `transition-all duration-700`
- Loading skeletons → `animate-pulse`

---

## 📐 Architecture

```
App.jsx  (state owner)
│
├── useTasks()      → tasks, addTask, toggleTask, deleteTask, clearCompleted
├── useNotes()      → notes, addNote, deleteNote
├── useState()      → activePage, searchQuery, sidebarOpen
│
├── Sidebar         ← activePage, setActivePage
├── Navbar          ← searchQuery, setSearchQuery, activePage
│
└── Pages (rendered based on activePage)
    ├── DashboardPage  ← tasks, onToggleTask, onDeleteTask
    ├── TasksPage      ← tasks, onAdd, onToggle, onDelete, search
    ├── NotesPage      ← notes, onAdd, onDelete, search
    ├── TimerPage      → usePomodoro() (self-contained)
    └── StatsPage      ← tasks
```

**State flows top-down** (props), **events flow bottom-up** (callbacks).  
Custom hooks encapsulate logic — components stay clean and focused on UI.

---

## 🚀 Build & Deploy

```bash
# Production build
npm run build
# Output: dist/ folder (~230 KB JS, ~34 KB CSS)

# Preview production build locally
npm run preview
```

**Deploy to Vercel (recommended):**

```bash
npm i -g vercel
vercel
```

**Deploy to Netlify:**

```bash
npm run build
# Drag & drop the dist/ folder to netlify.com/drop
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch — `git checkout -b feature/amazing-feature`
3. Commit your changes — `git commit -m 'Add amazing feature'`
4. Push to the branch — `git push origin feature/amazing-feature`
5. Open a Pull Request

---

<div align="center">

Built with ❤️ by **Nitesh Kumar Chauhan**

_React · Vite · Tailwind CSS_

</div>
