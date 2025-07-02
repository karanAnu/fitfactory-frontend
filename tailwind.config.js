/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // ensures all React files are scanned
  ],
  darkMode: 'class', // ✅ enables dark mode using a class on <html>
  theme: {
    extend: {
      colors: {
        // custom colors if you want
        primary: '#2563eb', // blue-600
        secondary: '#1e293b', // slate-800
      },
      fontFamily: {
        // custom font setup
        sans: ['Inter', 'sans-serif'],
      },
      // you can extend more if needed
    },
  },
  plugins: [
    require('tailwindcss-animate'), // optional plugin if you're using extra animations
  ],
};