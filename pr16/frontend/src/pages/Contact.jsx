import { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useToast } from "../components/Toaster";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5500/api/contact", formData);
      setStatus({ success: res.data.success, msg: res.data.msg });
      setFormData({ name: "", email: "", message: "" });
      toast.show("Message sent successfully!", { type: "success" });
    } catch (err) {
      setStatus({ success: false, msg: err.response?.data?.msg || "Something went wrong" });
      toast.show("Failed to send message", { type: "error" });
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-lg rounded-2xl shadow-xl p-8 bg-slate-800/80 border border-slate-700 backdrop-blur text-slate-100">
      <h2 className="text-2xl font-bold mb-6 text-center">
        📬 Contact Me
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-slate-900/60 border border-slate-600 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-400 text-slate-100"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-slate-900/60 border border-slate-600 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-400 text-slate-100"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full bg-slate-900/60 border border-slate-600 p-3 rounded-lg h-32 resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-slate-400 text-slate-100"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
        >
          {loading && <Spinner size={18} className="text-white" />}<span>Send Message 🚀</span>
        </button>
      </form>
      {status && (
        <p
          className={`mt-4 text-center font-medium ${
            status.success ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          {status.msg}
        </p>
      )}
    </div>
  );
}
