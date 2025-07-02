// src/components/Footer.jsx
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">FitFactory Gym</h3>
          <p className="text-sm text-gray-400">
            Unleash your potential with expert trainers and premium facilities.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/plans">Membership</Link></li>
            <li><Link to="/trainers">Trainers</Link></li>
            <li><Link to="/facilities">Facilities</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Connect</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/contact">Contact</Link></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href="https://maps.google.com" target="_blank" rel="noreferrer">Location</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Account</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-10">
        © {new Date().getFullYear()} FitFactory Gym. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;