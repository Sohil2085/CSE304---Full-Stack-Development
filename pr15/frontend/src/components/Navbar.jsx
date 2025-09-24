import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold tracking-wide cursor-pointer hover:text-gray-200 transition"
        >
          📚 Library Portal
        </h1>
        <div className="space-x-6 font-medium">
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
        </div>
      </div>
    </nav>
  );
}
