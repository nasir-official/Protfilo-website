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
            page_name: 'home_react_adv_css'
          }),
        });
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    };

    trackPageView();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      <footer className="footer">
        <p>&copy; 2026 Muhammad Nasir. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
