import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!name) return toast.error("Please enter your name");
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/login", { name }, { withCredentials: true });
      toast.success("Login successful!");
      navigate("/profile");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full max-w-md rounded-2xl shadow-lg p-10 bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Welcome to <span className="text-gray-600 dark:text-gray-300">Library Portal</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
          Enter your name to log in and start your session
        </p>

        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full p-3 rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none mb-6 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-gray-800 hover:bg-gray-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg shadow transition flex items-center justify-center dark:bg-gray-600 dark:hover:bg-gray-500"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "🚀 Login"
          )}
        </button>
      </div>
    </div>
  );
}
