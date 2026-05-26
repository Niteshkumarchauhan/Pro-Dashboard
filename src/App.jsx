// ============================================================
// App.jsx — Root Component (Main Entry Point)
//
// Yahan saare hooks ka use hota hai aur state top-level par
// manage hoti hai, phir props ke through child components
// ko pass ki jaati hai. Isse "lifting state up" kehte hain.
//
// Hooks Summary:
//   useState   — activePage, searchQuery manage karta hai
//   useEffect  — (useTasks/useNotes hooks ke andar)
//   useRef     — (Navbar + Timer ke andar)
//   useMemo    — (DashboardPage + TasksPage + StatsPage ke andar)
//   useCallback — (useTasks + useNotes hooks ke andar)
// ============================================================

import { useState } from "react";

// Custom hooks
import { useTasks } from "./hooks/useTasks";
import { useNotes } from "./hooks/useNotes";

// Layout components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

// Pages
import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import NotesPage from "./pages/NotesPage";
import TimerPage from "./pages/TimerPage";
import StatsPage from "./pages/StatsPage";

const App = () => {
  // useState — currently active page/section
  const [activePage, setActivePage] = useState("dashboard");

  // useState — global search query (shared across pages)
  const [searchQuery, setSearchQuery] = useState("");

  // useState — mobile sidebar toggle
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Custom hooks — task and note state + handlers
  // useCallback is used inside these hooks for stable function references
  const { tasks, addTask, toggleTask, deleteTask, clearCompleted } = useTasks();

  const { notes, addNote, deleteNote } = useNotes();

  // Render the correct page based on activePage state
  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <DashboardPage
            tasks={tasks}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
          />
        );
      case "tasks":
        return (
          <TasksPage
            tasks={tasks}
            onAdd={addTask}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onClearCompleted={clearCompleted}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        );
      case "notes":
        return (
          <NotesPage
            notes={notes}
            onAdd={addNote}
            onDelete={deleteNote}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        );
      case "timer":
        return <TimerPage />;
      case "stats":
        return <StatsPage tasks={tasks} />;
      default:
        return null;
    }
  };

  return (
    // Dark background for the entire app
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* ── Sidebar (desktop: always visible, mobile: overlay) ── */}
      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — fixed on desktop, slide-in on mobile */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-30
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <Sidebar
          activePage={activePage}
          setActivePage={(page) => {
            setActivePage(page);
            setSearchQuery(""); // Clear search when switching pages
            setSidebarOpen(false);
          }}
        />
      </div>

      {/* ── Main content area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activePage={activePage}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Page content with scroll */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">{renderPage()}</div>
        </main>
      </div>
    </div>
  );
};

export default App;
