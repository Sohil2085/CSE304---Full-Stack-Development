import { useEffect, useState } from "react";
import Contact from "./pages/Contact";
import { ToasterProvider } from "./components/Toaster";

export default function App() {
  const [theme, setTheme] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("theme") || "dark" : "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ToasterProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-900 dark:to-slate-800 text-slate-100 flex items-center justify-center p-6">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="absolute top-4 right-4 px-3 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-xs font-semibold"
        >
          Toggle {theme === "dark" ? "Light" : "Dark"}
        </button>
        <Contact />
      </div>
    </ToasterProvider>
  );
}
