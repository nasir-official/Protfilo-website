import { useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';

const Portfolio = () => {
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
};

export default Portfolio;
