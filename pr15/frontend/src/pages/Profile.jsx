import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/profile", { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => {
        toast.error("Session expired. Please log in again.");
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true });
      toast.success("Logged out successfully");
      navigate("/");
    } catch {
      toast.error("Logout failed");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-lg w-full rounded-2xl shadow-lg p-10 text-center bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-6">👤 User Profile</h2>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : user ? (
          <div className="space-y-6">
            <div className="p-6 rounded-lg shadow-inner text-left bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
              <p className="text-lg mb-3">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Name:</span> {user.name}
              </p>
              <p className="text-lg">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Login Time:</span>{" "}
                {new Date(user.loginTime).toLocaleString()}
              </p>
            </div>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-60 text-white font-semibold py-3 rounded-lg shadow transition flex items-center justify-center"
            >
              {loggingOut ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "🔒 Logout"
              )}
            </button>
          </div>
        ) : (
          <p className="text-gray-400">No session found.</p>
        )}
      </div>
    </div>
  );
}
