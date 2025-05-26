import React from 'react';
import PageBackground from '../../components/PageBackground/PageBackground';
import Header from '../../components/Header/Header';
import { useTheme } from '../../contexts/ThemeContext';
import { themeColors } from '../../data/themeColors';
import './UnderTheHood.css';

function UnderTheHood() {
  const { selectedTheme, showThemeSelector, setShowThemeSelector, applyTheme } = useTheme();

  return (
    <PageBackground overlay="linear-gradient(135deg, rgba(20, 20, 25, 0.95), rgba(30, 30, 35, 0.95))">
      <div className="under-hood-container">
        <Header 
          themeColors={themeColors}
          selectedTheme={selectedTheme}
          onThemeChange={applyTheme}
          showThemeSelector={showThemeSelector}
          onToggleSelector={setShowThemeSelector}
        />
        <div className="under-hood-content">
          <h1 className="page-title">Under the Hood</h1>
          <div className="content-section">
            <h2>From Passion to Project: The Story</h2>
            <p>
              Ever since I was a little kid, I've been fascinated by Corvettes. My passion for these incredible cars truly ignited when my dad bought a C3 Corvette. From that moment, I was hooked. As a Corvette enthusiast, I decided to create this website to share my love for these iconic vehicles with others.
            </p>
            <p>
              This project is a celebration of American automotive engineering and design. The Chevrolet Corvette represents over six decades of innovation, performance, and cultural impact. As both a developer and a Corvette nerd, I wanted to create an interactive timeline that captures the evolution of this legendary car. I hope this site helps fellow enthusiasts explore the rich history and various generations of Corvettes, and discover fascinating facts along the way.
            </p>
          </div>
          
          <div className="content-section">
            <h2>References & Attribution</h2>
            <p>
              All historical information presented on this website has been compiled from publicly available sources, 
              including published books, official GM/Chevrolet materials, and automotive publications. Each generation 
              page includes specific references that were consulted during research.
            </p>
            <p>
              This website is a non-commercial, educational project created by a Corvette enthusiast. All trademarks, 
              logos, and brand names are the property of their respective owners. All company, product, and service names 
              used on this website are for identification purposes only.
            </p>
            <h3>Fair Use Statement</h3>
            <p>
              This website may contain copyrighted material whose use has not been specifically authorized by the copyright owner. 
              This site is making such material available in an effort to advance understanding of the Chevrolet Corvette's 
              historical significance and cultural impact. The use of such materials constitutes a 'fair use' as provided for in 
              section 107 of the US Copyright Law.
            </p>
            <p>
              If you are the copyright owner of any content presented here and wish for it to be removed, 
              please contact me immediately and I will promptly address your concerns.
            </p>
          </div>
          
          <div className="content-section">
            <h2>Verification of Information</h2>
            <p>
              While every effort has been made to ensure the accuracy of the information presented, errors or 
              omissions may occur. I encourage readers to consult the referenced materials for comprehensive information.
              The references listed for each generation are excellent resources for deeper exploration of Corvette history.
            </p>
            <p>
              This website does not claim to be an official source of Chevrolet or General Motors information.
              For official specifications and details, please visit the official Chevrolet website or contact General Motors directly.
            </p>
          </div>
        </div>
      </div>
    </PageBackground>
  );
}

export default UnderTheHood;