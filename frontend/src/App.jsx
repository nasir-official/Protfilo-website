import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './index.css';

function App() {
  // Page View Tracking (Flask Integration)
  useEffect(() => {
    const trackPageView = async () => {
      try {
        await fetch('http://localhost:5000/api/track-view', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page_name: 'home_react'
          }),
        });
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    };

    trackPageView();
  }, []);

  return (
    <div className="bg-[#0a0e14] min-h-screen text-[#e6edf3]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      <footer className="py-12 border-t border-white/10 text-center">
        <p className="text-[#8b949e] text-sm">
          &copy; 2026 Muhammad Nasir. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
