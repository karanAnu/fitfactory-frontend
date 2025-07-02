import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Plans", href: "#plans" },
    { name: "Trainers", href: "#trainers" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScroll = () => {
    const scrollPosition = window.scrollY + 200;
    for (const link of navLinks) {
      const section = document.querySelector(link.href);
      if (section && section.offsetTop <= scrollPosition) {
        setActiveSection(link.href);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: "smooth",
      });
      setMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-blue-600">FitFactory</a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`relative group font-medium transition 
                ${activeSection === link.href ? "text-blue-600" : "text-gray-700"}`
              }
            >
              {link.name}
              <span className={`absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-600 transition-all duration-300 
                group-hover:w-full origin-right 
                ${activeSection === link.href ? "w-full" : ""}`}
              ></span>
            </a>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4 items-center">
          <a href="/login" className="text-gray-700 hover:text-blue-600">Login</a>
          <a href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Sign Up</a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-6 pb-6">
          <div className="flex flex-col gap-4 mt-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`font-medium ${activeSection === link.href ? "text-blue-600" : "text-gray-700"}`}
              >
                {link.name}
              </a>
            ))}
            <hr className="my-2" />
            <a href="/login" className="text-gray-700 hover:text-blue-600 font-medium">Login</a>
            <a href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-center">Sign Up</a>
          </div>
        </div>
      )}
    </nav>
  );
}