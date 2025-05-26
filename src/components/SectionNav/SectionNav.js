import React, { useState, useEffect, useRef } from 'react';
import './SectionNav.css';

const SectionNav = ({ sections, activeSection, onSectionChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const navRef = useRef(null);
  const scrollTimeout = useRef(null);

  // Handle window resize events
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false); // Always close menu when switching to desktop
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle scroll events for sticky nav effects
  useEffect(() => {
    const handleScroll = () => {
      // Set scrolled state when scrolled past a threshold
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Set scrolling state with debounce
      setIsScrolling(true);
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 200);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout.current);
    };
  }, []);

  const handleSectionClick = (id) => {
    onSectionChange(id);
    setIsMenuOpen(false);
    const sectionElement = document.getElementById(id);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleKeyDown = (event, id) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSectionClick(id);
    }
  };

  return (
    <div className="sticky-nav-container">
      <nav 
        ref={navRef}
        className={`section-nav ${isScrolled ? 'scrolled' : ''} ${isScrolling ? 'is-scrolling' : ''}`} 
        aria-label="Section Navigation"
      >
        <button 
          className="menu-toggle" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
        <ul className={`section-nav-list ${isMenuOpen ? 'open' : ''}`}>
          {sections.map((section) => (
            <li
              key={section.id}
              className={`section-nav-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => handleSectionClick(section.id)}
              onKeyDown={(e) => handleKeyDown(e, section.id)}
              tabIndex={0}
              role="button"
              aria-current={activeSection === section.id ? "page" : undefined}
            >
              {section.label}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SectionNav;
