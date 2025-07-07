import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";

export default function VerifyOtp({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("pendingEmail");
    const name = localStorage.getItem("pendingName");
    const phone = localStorage.getItem("pendingPhone");
    const password = localStorage.getItem("pendingPassword");

    if (!otp || !email || !name || !phone || !password) {
      alert("Missing information. Please try again.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
        name,
        email,
        phone,
        password,
        otp,
      });

      if (res.data.success) {
        alert("🎉 Signup complete!");
        localStorage.setItem("token", res.data.token);
        setIsLoggedIn(true);

        // 🧹 Clean localStorage
        localStorage.removeItem("pendingEmail");
        localStorage.removeItem("pendingName");
        localStorage.removeItem("pendingPhone");
        localStorage.removeItem("pendingPassword");

        navigate("/login");
      } else {
        alert(res.data.message || "OTP verification failed.");
      }
    } catch (err) {
      console.error("OTP verify error:", err.response?.data || err.message);
      alert("Something went wrong. Try again.");
    }
  };

  const handleResend = () => {
    if (resendTimer > 0) return;

    alert("OTP resent ✅");
    setResendTimer(30);
    // Optional: Call resend OTP API here if needed
  };

  return (
    <div
      className={`min-h-screen bg-black flex flex-col items-center justify-center px-4 py-8 text-yellow-400 transition-opacity duration-700 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <img src={logo} alt="FitFactory Logo" className="w-24 h-24 mb-6" />

      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Verify OTP</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter OTP"
            className="px-4 py-2 rounded bg-black text-yellow-400 border border-yellow-500 focus:outline-none text-center"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button
            type="submit"
            className="bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-300 transition"
          >
            Verify
          </button>
        </form>

        <div className="mt-4 text-sm text-center text-gray-300">
          Didn’t receive OTP?{" "}
          <button
            onClick={handleResend}
            disabled={resendTimer > 0}
            className={`underline font-semibold ${
              resendTimer > 0 ? "text-gray-500 cursor-not-allowed" : "text-yellow-400 hover:text-yellow-300"
            }`}
          >
            Resend {resendTimer > 0 ? `in ${resendTimer}s` : ""}
          </button>
        </div>
      </div>
    </div>
  );
}