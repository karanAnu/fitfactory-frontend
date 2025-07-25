import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Tracker from "./pages/Tracker";
import VerifyOtp from "./pages/VerifyOtp";
import BlogDetail from "./pages/BlogDetail";
import Blogs from "./pages/Blogs";
import AdminSubscription from "./pages/AdminSubscription";
import Subscription from "./pages/Subscription";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";

// ✅ Wrapper to access location and manage layout
function AppWrapper() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const hideLayoutPaths = [
    "/",
    "/login",
    "/signup",
    "/verify-otp",
    "/forgot-password",
    "/reset-password",
  ];
  const hideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <>
      {/* ✅ Navbar (only when logged in and not on auth pages) */}
      {isLoggedIn && !hideLayout && (
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}

      <Routes>
        {/* ✅ Public Routes */}
        <Route
          path="/"
          element={!isLoggedIn ? <Landing /> : <Navigate to="/home" />}
        />
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Login setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isLoggedIn ? (
              <Signup setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/verify-otp"
          element={
            !isLoggedIn ? (
              <VerifyOtp setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/forgot-password"
          element={
            !isLoggedIn ? <ForgotPassword /> : <Navigate to="/home" />
          }
        />
        <Route
          path="/reset-password"
          element={
            !isLoggedIn ? <ResetPassword /> : <Navigate to="/home" />
          }
        />

        {/* ✅ Private Routes */}
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/tracker"
          element={isLoggedIn ? <Tracker /> : <Navigate to="/" />}
        />
        <Route
          path="/subscription"
          element={isLoggedIn ? <Subscription /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/subscription"
          element={isLoggedIn ? <AdminSubscription /> : <Navigate to="/" />}
        />

        {/* ✅ Always public blog routes */}
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>

      {/* ✅ Footer */}
      {isLoggedIn && !hideLayout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}