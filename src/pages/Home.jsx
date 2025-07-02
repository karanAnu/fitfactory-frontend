import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TrainerSlider from "../components/TrainerSlider";
import TestimonialSlider from "../components/TestimonialSlider";
import GalleryWithLightbox from "../components/GalleryWithLightbox";
import { FaInstagram, FaWhatsapp, FaYoutube, FaArrowUp } from "react-icons/fa";

function Home() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* ✅ Dark Mode Toggle */}
      <button
        onClick={() => {
          const root = document.documentElement;
          root.classList.toggle("dark");
          if (root.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
          } else {
            localStorage.setItem("theme", "light");
          }
        }}
        className="fixed top-4 right-4 bg-white text-gray-800 dark:bg-gray-800 dark:text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition z-50"
      >
        Toggle Dark 🌙
      </button>

      {/* ✅ Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition z-50"
        >
          <FaArrowUp />
        </button>
      )}

      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Hero Section */}
      <section
        id="home"
        className="relative h-[90vh] md:h-screen bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 px-4 max-w-2xl text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Welcome to FitFactory Gym
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Transform your body. Transform your life.
          </p>
          <a
            href="#plans"
            className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 text-lg font-semibold rounded-lg shadow-lg"
          >
            Join Now
          </a>
        </div>
      </section>

      {/* ✅ Plans Section */}
      <section id="plans" className="py-16 bg-white">
        <h2
          className="text-4xl font-bold text-center mb-10 text-blue-600"
          data-aos="fade-up"
        >
          Choose Your Plan
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div
            className="border p-6 rounded-xl shadow hover:shadow-lg transition"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h3 className="text-2xl font-semibold mb-4">Basic</h3>
            <p className="text-gray-600 mb-6">Access to all gym equipment</p>
            <p className="text-3xl font-bold mb-4">₹2,999 / 3 months</p>
            <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Get Started
            </button>
          </div>

          <div
            className="border p-6 rounded-xl shadow hover:shadow-lg transition bg-blue-50"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3 className="text-2xl font-semibold mb-4">Premium</h3>
            <p className="text-gray-600 mb-6">
              Includes gym + Extra Cardio access
            </p>
            <p className="text-3xl font-bold mb-4">₹3,999 / 3 months</p>
            <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Get Started
            </button>
          </div>

          <div
            className="border p-6 rounded-xl shadow hover:shadow-lg transition"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <h3 className="text-2xl font-semibold mb-4">Elite</h3>
            <p className="text-gray-600 mb-6">
              All benefits + Steam room access
            </p>
            <p className="text-3xl font-bold mb-4">₹5,499 / 3 months</p>
            <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* ✅ Trainers Section */}
      <section id="trainers" className="py-16 bg-gray-100">
        {/* <h2 className="text-4xl font-bold text-center mb-10 text-blue-600">
          Meet Our Trainers
        </h2> */}
        <TrainerSlider />
      </section>

      {/* ✅ Testimonials */}
      <TestimonialSlider />

      {/* ✅ Stats Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {/* CountUp stat cards */}
        </div>
      </section>

      {/* ✅ Gallery Section with animation */}
      <div data-aos="fade-up" id="gallery">
        <GalleryWithLightbox />
      </div>

      {/* ✅ Blog Section */}
      <section id="blog" className="py-16 bg-white" data-aos="fade-up">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-600">
            Latest Blog Posts
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <img
                src="/blog/post1.jpg"
                alt="Post 1"
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Top 5 Exercises for Full-Body Strength
                </h3>
                <p className="text-gray-600 text-sm">
                  Discover the best compound movements for overall strength and
                  muscle growth.
                </p>
                <a
                  href="#"
                  className="mt-4 inline-block text-blue-600 hover:underline font-medium"
                >
                  Read More →
                </a>
              </div>
            </div>

            <div
              className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <img
                src="/blog/post2.jpg"
                alt="Post 2"
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Gym Diet Plan: Fuel Your Fitness
                </h3>
                <p className="text-gray-600 text-sm">
                  A beginner-friendly guide to what to eat before and after
                  workouts.
                </p>
                <a
                  href="#"
                  className="mt-4 inline-block text-blue-600 hover:underline font-medium"
                >
                  Read More →
                </a>
              </div>
            </div>

            <div
              className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <img
                src="/blog/post3.jpg"
                alt="Post 3"
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Mental Health Benefits of Working Out
                </h3>
                <p className="text-gray-600 text-sm">
                  Learn how exercise boosts your mood, confidence, and reduces
                  anxiety.
                </p>
                <a
                  href="#"
                  className="mt-4 inline-block text-blue-600 hover:underline font-medium"
                >
                  Read More →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="bg-blue-900 text-white py-10 mt-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">FitFactory Gym</h3>
            <p>Your transformation is our mission. Join us and stay fit!</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p>📞 +91 7004305022</p>
            <p>📍 Circular Rd, Lalpur, Ranchi</p>
            <p>✉️ fitfactory@gym.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-6 text-2xl">
              <a
                href="https://www.instagram.com/fitfactorylalpur"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/917004305022"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-500 transition"
              >
                <FaWhatsapp />
              </a>
              <a href="#" className="hover:text-red-500 transition">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-gray-300 mt-8">
          &copy; 2025 FitFactory Gym. All rights reserved.
        </p>
      </footer>
    </>
  );
}

export default Home;
