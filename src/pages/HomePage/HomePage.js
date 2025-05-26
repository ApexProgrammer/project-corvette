import React from 'react';
import Header from '../../components/Header/Header';
import HeroSection from '../../components/HeroSection/HeroSection';
import Timeline from '../../components/Timeline/Timeline';
import PageBackground from '../../components/PageBackground/PageBackground';
import { generations } from '../../data/generations';
import { themeColors } from '../../data/themeColors';
import { useTheme } from '../../contexts/ThemeContext';
import './HomePage.css';

function HomePage() {
  const { selectedTheme, showThemeSelector, setShowThemeSelector, applyTheme } = useTheme();

  return (
    <PageBackground>
      <div className="home-container">
        <Header 
          themeColors={themeColors}
          selectedTheme={selectedTheme}
          onThemeChange={applyTheme}
          showThemeSelector={showThemeSelector}
          onToggleSelector={setShowThemeSelector}
        />
        <div className="header-spacer"></div>
        <div className="main-content">
          <HeroSection />
        </div>
        <div className="footer-timeline">
          <Timeline generations={generations} />
        </div>
      </div>
    </PageBackground>
  );
}

export default HomePage;