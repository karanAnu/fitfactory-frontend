import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, email, password } = formData;

    if (!name || !phone || !email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", formData);

      if (response.data.success) {
        alert("OTP sent to your email ✅");

        // ✅ Save all required data in localStorage
        localStorage.setItem("pendingName", name);
        localStorage.setItem("pendingPhone", phone);
        localStorage.setItem("pendingEmail", email);
        localStorage.setItem("pendingPassword", password);

        navigate("/verify-otp");
      } else {
        alert(response.data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error.message);
      alert("Failed to send OTP. Please check your server or try again.");
    }
  };

  return (
    <div
      className={`min-h-screen bg-black flex flex-col items-center justify-center px-4 py-8 text-yellow-400 transition-opacity duration-700 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <img src={logo} alt="FitFactory Logo" className="w-24 h-24 mb-6" />

      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Sign Up</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="px-4 py-2 rounded bg-black text-yellow-400 border border-yellow-500 focus:outline-none"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="px-4 py-2 rounded bg-black text-yellow-400 border border-yellow-500 focus:outline-none"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="px-4 py-2 rounded bg-black text-yellow-400 border border-yellow-500 focus:outline-none"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="px-4 py-2 rounded bg-black text-yellow-400 border border-yellow-500 focus:outline-none"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-300 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-yellow-400 underline hover:text-yellow-300">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}