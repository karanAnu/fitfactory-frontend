// src/pages/ResetPassword.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!email) return alert("Please enter your email");

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      if (res.data.success) {
        alert("OTP sent to your email ✅");
        setStep(2);
      } else {
        alert(res.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!otp || !newPassword) return alert("Enter OTP and new password");

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      if (res.data.success) {
        alert("Password reset successful ✅");
        navigate("/login");
      } else {
        alert(res.data.message || "Reset failed");
      }
    } catch (err) {
      console.error(err);
      alert("Reset failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-10 text-yellow-400">
      <img src={logo} alt="Logo" className="w-24 h-24 mb-6" />

      <div className="bg-gray-900 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Reset Password</h2>

        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your registered email"
              className="w-full px-4 py-2 mb-4 rounded bg-black text-yellow-400 border border-yellow-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSendOTP}
              className="w-full bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-300 transition"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full px-4 py-2 mb-3 rounded bg-black text-yellow-400 border border-yellow-500 focus:outline-none"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 mb-4 rounded bg-black text-yellow-400 border border-yellow-500 focus:outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              onClick={handleResetPassword}
              className="w-full bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-300 transition"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}

        <p className="mt-4 text-sm text-gray-400 text-center">
          Remember your password?{" "}
          <a href="/login" className="text-yellow-300 underline hover:text-yellow-400">
            Go to Login
          </a>
        </p>
      </div>
    </div>
  );
}