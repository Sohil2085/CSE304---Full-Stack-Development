import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../theme";

export default function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-gray-900 dark:to-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold tracking-wide cursor-pointer hover:text-gray-200 transition"
        >
          📚 Library Portal
        </h1>
        <div className="space-x-6 font-medium flex items-center">
          <Link
            to="/"
            className="hover:text-gray-200 transition duration-200"
          >
            Login
          </Link>
          <Link
            to="/profile"
            className="hover:text-gray-200 transition duration-200"
          >
            Profile
          </Link>
          <button
            onClick={toggleTheme}
            className="ml-4 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition text-sm"
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </div>
    </nav>
  );
}
