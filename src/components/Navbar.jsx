import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.png";
import isDevMode from "../config";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const location = useLocation();
  const navigate = useNavigate();

  const forcedLogin = isDevMode ? true : isLoggedIn;

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Plans", href: "#plans", scrollToHome: true }, // ✅ ScrollToHome added
    { name: "Trainers", href: "#trainers" },
    { name: "Gallery", href: "#gallery" },
    { name: "Blog", href: "/blogs" }, // ✅ Route to blog page
    { name: "Tracker", href: "/tracker" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const link of navLinks) {
        if (link.href.startsWith("#")) {
          const section = document.querySelector(link.href);
          if (section && section.offsetTop <= scrollPosition) {
            setActiveSection(link.href);
          }
        }
      }
    };

    if (location.pathname === "/home") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [location.pathname]);

  const handleClick = (e, href, scrollToHome = false) => {
    e.preventDefault();

    if (href.startsWith("#")) {
      if (location.pathname === "/home") {
        const section = document.querySelector(href);
        if (section) {
          setTimeout(() => {
            section.scrollIntoView({ behavior: "smooth" });
          }, 0);
        }
      } else if (scrollToHome) {
        navigate(`/home?scrollTo=${href.substring(1)}`);
      }
      setMenuOpen(false);
    } else {
      navigate(href);
      setMenuOpen(false);
    }
  };

  const isActive = (href) => {
    if (href.startsWith("#")) return location.pathname === "/home" && activeSection === href;
    return location.pathname === href;
  };

  const showLinks = forcedLogin;
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
  const showAuthButtons = !forcedLogin && !isDevMode;

  return (
    <nav className="bg-black text-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to={forcedLogin ? "/home" : "/"} className="flex items-center gap-2">
          <img
            src={logo}
            alt="FitFactory"
            className={`${
              isAuthPage ? "w-14 h-14" : "w-10 h-10"
            } transition-transform duration-700 ease-in-out`}
          />
          {!isAuthPage && (
            <span className="ml-1 text-xl font-extrabold text-yellow-400 tracking-wider hidden sm:block">
              FitFactory
            </span>
          )}
        </Link>

        {/* Desktop Navigation */}
        {showLinks && (
          <div className="hidden md:flex gap-6 items-center">
            {navLinks.map((link) =>
              link.href.startsWith("#") ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href, link.scrollToHome)}
                  className={`relative group font-semibold text-[18px] transition duration-300 ${
                    isActive(link.href) ? "text-yellow-400" : "text-white"
                  } hover:text-yellow-400`}
                >
                  {link.name}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] w-0 bg-yellow-400 transition-all duration-300 group-hover:w-full ${
                      isActive(link.href) ? "w-full" : ""
                    }`}
                  />
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative group font-semibold text-[18px] transition duration-300 ${
                    isActive(link.href) ? "text-yellow-400" : "text-white"
                  } hover:text-yellow-400`}
                >
                  {link.name}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] w-0 bg-yellow-400 transition-all duration-300 group-hover:w-full ${
                      isActive(link.href) ? "w-full" : ""
                    }`}
                  />
                </Link>
              )
            )}
            <button
              onClick={() => setIsLoggedIn(false)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-4"
            >
              Logout
            </button>
          </div>
        )}

        {/* Mobile Toggle */}
        <div className="md:hidden">
          {showLinks && (
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <X size={24} className="text-yellow-400" />
              ) : (
                <Menu size={24} className="text-yellow-400" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && showLinks && (
        <div className="md:hidden bg-black px-6 pb-6">
          <div className="flex flex-col gap-4 mt-4">
            {navLinks.map((link) =>
              link.href.startsWith("#") ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href, link.scrollToHome)}
                  className={`font-semibold text-lg ${
                    isActive(link.href) ? "text-yellow-400" : "text-white"
                  } hover:text-yellow-400`}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-semibold text-lg ${
                    isActive(link.href) ? "text-yellow-400" : "text-white"
                  } hover:text-yellow-400`}
                >
                  {link.name}
                </Link>
              )
            )}
            <button
              onClick={() => {
                setMenuOpen(false);
                setIsLoggedIn(false);
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}