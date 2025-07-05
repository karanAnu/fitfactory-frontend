import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import TrainerSlider from "../components/TrainerSlider";
import TestimonialSlider from "../components/TestimonialSlider";
import GalleryWithLightbox from "../components/GalleryWithLightbox";
import BlogSection from "../components/BlogSection";
import { FaInstagram, FaWhatsapp, FaYoutube, FaArrowUp } from "react-icons/fa";

function Home() {
  const [showScroll, setShowScroll] = useState(false);
  const location = useLocation();

  // ✅ Auto-scroll if ?scrollTo=plans etc. is present in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scrollTo = params.get("scrollTo");
    if (scrollTo) {
      const section = document.getElementById(scrollTo);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 0);
      }
    }
  }, [location.search]);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
      <button
        onClick={() => {
          const root = document.documentElement;
          root.classList.toggle("dark");
          localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
        }}
        className="fixed top-4 right-4 bg-yellow-400 text-black dark:bg-gray-700 dark:text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition z-50"
      >
        Toggle Dark 🌙
      </button>

      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-yellow-400 text-black dark:bg-yellow-600 dark:text-white p-3 rounded-full shadow-lg hover:bg-yellow-500 transition z-50"
        >
          <FaArrowUp />
        </button>
      )}

      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-auto py-28 md:h-screen bg-cover bg-center flex items-center justify-center text-center px-4"
        style={{ backgroundImage: "url('/sanjay.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative z-10 max-w-4xl text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Welcome to <span className="text-yellow-400">Fit</span>
            <span className="text-red-500">Factory</span> Gym
          </h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-6">
            FitFactory is more than just a gym — it's a lifestyle. 💪<br />
            High-end equipment, expert trainers, and a vibe that keeps you coming back.
          </p>
          <p className="text-base text-gray-300 mb-8">
            🕙 Open 6 Days a Week &nbsp; | &nbsp; 🧍‍♂️ Personal Training &nbsp; | &nbsp; ✅ Guaranteed Results
          </p>
          <a
            href="#plans"
            className="bg-green-500 hover:bg-green-600 transition px-6 py-3 text-lg font-semibold rounded-lg shadow-lg"
          >
            Join Now
          </a>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="py-20 bg-black text-white text-center">
  <h2 className="text-3xl font-bold text-yellow-400 mb-10">Choose Your Plan</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
    {/* Basic Plan */}
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-yellow-400 transition">
      <h3 className="text-2xl font-bold text-yellow-300 mb-4">Basic Plan</h3>
      <p className="text-gray-300 mb-4">Perfect for beginners starting their fitness journey.</p>
      <ul className="text-left text-gray-400 list-disc list-inside mb-4">
        <li>Access to gym floor</li>
        <li>1 personal session</li>
        <li>Locker facility</li>
      </ul>
      <p className="text-2xl font-bold text-green-400 mb-4">₹999/month</p>
      <button className="bg-yellow-400 text-black font-bold px-6 py-2 rounded hover:bg-yellow-500 transition">
        Join Now
      </button>
    </div>

    {/* Pro Plan */}
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-yellow-400 transition scale-105">
      <h3 className="text-2xl font-bold text-yellow-300 mb-4">Pro Plan</h3>
      <p className="text-gray-300 mb-4">Designed for intermediate users with added benefits.</p>
      <ul className="text-left text-gray-400 list-disc list-inside mb-4">
        <li>All Basic Plan features</li>
        <li>Weekly diet chart</li>
        <li>3 personal training sessions</li>
      </ul>
      <p className="text-2xl font-bold text-green-400 mb-4">₹1499/month</p>
      <button className="bg-yellow-400 text-black font-bold px-6 py-2 rounded hover:bg-yellow-500 transition">
        Join Now
      </button>
    </div>

    {/* Elite Plan */}
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-yellow-400 transition">
      <h3 className="text-2xl font-bold text-yellow-300 mb-4">Elite Plan</h3>
      <p className="text-gray-300 mb-4">For serious fitness enthusiasts and athletes.</p>
      <ul className="text-left text-gray-400 list-disc list-inside mb-4">
        <li>Unlimited gym access</li>
        <li>Daily personal training</li>
        <li>Custom workout & diet plan</li>
        <li>Priority support</li>
      </ul>
      <p className="text-2xl font-bold text-green-400 mb-4">₹2499/month</p>
      <button className="bg-yellow-400 text-black font-bold px-6 py-2 rounded hover:bg-yellow-500 transition">
        Join Now
      </button>
    </div>
  </div>
</section>

      {/* Trainers Section */}
      <section id="trainers" className="py-20 bg-black text-white">
        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-10">Meet Our Trainers</h2>
        <TrainerSlider />
      </section>

      {/* Testimonials */}
      <section className="bg-black dark:bg-gray-800 py-16">
        <TestimonialSlider />
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 bg-black text-white">
        {/* Optional: Add stats or progress info here */}
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-black text-white">
        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-10">Gallery</h2>
        <div className="max-w-6xl mx-auto px-4">
          <GalleryWithLightbox />
        </div>
      </section>

      {/* ✅ Blog Section */}
      <BlogSection />

      {/* Footer */}
      <footer className="bg-black text-yellow-400 py-10 text-center">
        <div className="mb-4">Follow us on:</div>
        <div className="flex justify-center gap-6 text-xl">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
        </div>
        <p className="mt-6">&copy; 2025 FitFactory. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;