import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Landing() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-yellow-400 text-center p-6">
      <img src={logo} alt="FitFactory Logo" className="w-28 h-28 mb-6" />

      <h1 className="text-4xl font-bold mb-2">Welcome to <span className="text-white">FitFactory</span></h1>
      <p className="mb-8 text-lg text-gray-300">Train Hard. Stay Fit. 💪</p>

      <div className="flex gap-6">
        <Link
          to="/login"
          className="bg-yellow-400 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-300 transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}