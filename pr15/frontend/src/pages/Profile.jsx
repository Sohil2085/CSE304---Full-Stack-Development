import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/profile", { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => navigate("/"));
  }, [navigate]);

  const handleLogout = async () => {
    await axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true });
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          👤 User Profile
        </h2>
        {user ? (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
              <p className="text-lg">
                <span className="font-semibold text-gray-700">Name:</span> {user.name}
              </p>
              <p className="text-lg">
                <span className="font-semibold text-gray-700">Login Time:</span>{" "}
                {new Date(user.loginTime).toLocaleString()}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold py-3 rounded-lg shadow-md hover:opacity-90 transition"
            >
              🔒 Logout
            </button>
          </div>
        ) : (
          <p className="text-gray-500">Loading session...</p>
        )}
      </div>
    </div>
  );
}
