// pages/ForgotPassword.jsx
import { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email.");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });

      if (res.data.success) {
        setMessage("✅ OTP sent! Check your email.");
        localStorage.setItem("resetEmail", email); // store for next step
        window.location.href = "/reset-password"; // go to reset screen
      } else {
        setMessage(res.data.message || "Email not found.");
      }
    } catch (err) {
      console.error("Forgot error:", err);
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-8 text-yellow-400">
      <img src={logo} alt="FitFactory Logo" className="w-24 h-24 mb-6" />
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded bg-black text-yellow-400 border border-yellow-500 text-center"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-300 transition"
          >
            Send OTP
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm text-white">{message}</p>}
      </div>
    </div>
  );
}