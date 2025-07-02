// src/App.jsx
import 'aos/dist/aos.css';
import AOS from 'aos';
import { useEffect } from 'react';
import Home from './pages/Home';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return <Home />;
}

export default App;