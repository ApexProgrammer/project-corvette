import React, { useState, useEffect } from 'react';
import './MobileNav.css';

const sections = [
  { id: 'specs', label: 'Specs' },
  { id: 'evolution', label: 'Evolution' },
  { id: 'signature-models', label: 'Models' },
  { id: 'innovations', label: 'Innovations' },
  { id: 'design', label: 'Design' },
  { id: 'cultural-impact', label: 'Impact' },
  { id: 'facts', label: 'Facts' },
  { id: 'gallery', label: 'Gallery' }
];

function MobileNav() {
  const [activeSection, setActiveSection] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -10% 0px', // Adjusted bottom margin to better detect bottom sections
        threshold: [0.1, 0.2] // Added multiple thresholds for better detection
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <nav className={`mobile-nav ${isVisible ? 'visible' : ''}`}>
      <div className="mobile-nav-scroller">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            className={`mobile-nav-item ${activeSection === id ? 'active' : ''}`}
            onClick={() => handleClick(id)}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default MobileNav;