import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeSelector from '../ThemeSelector/ThemeSelector';
import './Header.css';

function Header({ themeColors, selectedTheme, onThemeChange, showThemeSelector, onToggleSelector, transparent = false }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);

  // Handle scroll events for header effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Set scrolled state when scrolled past a threshold
      if (currentScrollY > 50) {
        setIsScrolled(true);
        
        // Hide header on scroll down, show on scroll up
        if (currentScrollY > lastScrollY.current + 10 && !mobileMenuOpen) {
          setHideHeader(true);
        } else if (currentScrollY < lastScrollY.current - 10 || currentScrollY <= 50) {
          setHideHeader(false);
        }
      } else {
        setIsScrolled(false);
        setHideHeader(false);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [mobileMenuOpen, setIsScrolled, setHideHeader, lastScrollY]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  // Consistent font style for all title elements
  const commonFontStyle = {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300,
    fontSize: '1.8rem',
    textTransform: 'uppercase', 
    letterSpacing: '1px' 
  };

  // Remove style from buttons to use CSS
  const buttonStyle = {
    fontFamily: "'Inter', sans-serif"
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''} ${hideHeader ? 'hidden' : ''} ${transparent ? 'transparent' : ''}`}>
      <Link to="/" className="site-title">
        <span style={commonFontStyle}>CORVETTE</span>
        <span style={{...commonFontStyle, margin: '0 10px', color: 'var(--theme-color)'}}>|</span>
        <span style={commonFontStyle}>A TIMELESS LEGACY</span>
      </Link>
      
      <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      
      <div className={`header-controls ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <ThemeSelector
          themeColors={themeColors}
          selectedTheme={selectedTheme}
          onThemeChange={onThemeChange}
          showThemeSelector={showThemeSelector}
          onToggleSelector={onToggleSelector}
        />
        <button 
          style={buttonStyle}
          className="nav-button"
          onClick={() => handleNavigation('/under-the-hood')}
        >
          Under The Hood
        </button>
      </div>
    </header>
  );
}

export default Header;