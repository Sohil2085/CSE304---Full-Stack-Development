import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!name) return alert("Please enter your name");
    try {
      await axios.post("http://localhost:5000/api/login", { name }, { withCredentials: true });
      navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Welcome to <span className="text-indigo-600">Library Portal</span>
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Enter your name to log in and start your session
        </p>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none mb-5"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:opacity-90 transition"
        >
          🚀 Login
        </button>
      </div>
    </div>
  );
}
