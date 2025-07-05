import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Tracker from "./pages/Tracker";
import VerifyOtp from "./pages/VerifyOtp";
import BlogDetail from "./pages/BlogDetail";
import Blogs from "./pages/Blogs"; // ✅ Blog listing page
import isDevMode from "./config";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const forcedLogin = isDevMode ? true : isLoggedIn;

  return (
    <Router>
      <Navbar isLoggedIn={forcedLogin} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        {/* ✅ Public routes */}
        <Route
          path="/"
          element={!forcedLogin ? <Landing /> : <Navigate to="/home" />}
        />
        <Route
          path="/login"
          element={
            !forcedLogin ? (
              <Login setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !forcedLogin ? (
              <Signup setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/verify-otp"
          element={
            !forcedLogin ? (
              <VerifyOtp setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/home" />
            )
          }
        />

        {/* ✅ Private routes */}
        <Route
          path="/home"
          element={forcedLogin ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/tracker"
          element={forcedLogin ? <Tracker /> : <Navigate to="/" />}
        />

        {/* ✅ Blog listing page */}
        <Route path="/blogs" element={<Blogs />} />

        {/* ✅ Blog detail page */}
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>

      {/* ✅ Footer only when logged in or dev */}
      {forcedLogin && <Footer />}
    </Router>
  );
}

export default App;