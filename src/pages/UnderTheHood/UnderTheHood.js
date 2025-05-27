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
              Ever since I was a little kid, I've been fascinated by Corvettes. My passion for these incredible cars started when my dad bought a C3 Corvette. From that moment, I was hooked. I decided to create this website to share my love for these iconic vehicles with others while providing a foundation for people to contribute to openly.
            </p>
            <p>
              This project is a celebration of American automotive engineering and design. The Chevrolet Corvette represents over six decades of innovation, performance, and cultural impact. As both a developer and Corvette nerd, I wanted to create an interactive timeline that captures the evolution of this legendary car. 
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
          
          <div className="content-section github-contribute-section">
            <h2>Contribute to Project Corvette</h2>
            <p>
              Project Corvette is an open-source project maintained by passionate Corvette enthusiasts. We believe that 
              collaborative efforts can create the most comprehensive and accurate Corvette resource on the web.
            </p>
            <p>
              Whether you're a developer, a Corvette expert, a historian, or just a fan, your contributions are welcome!
              You can help us by adding information, fixing errors, improving the design, or enhancing the codebase.
            </p>
            
            <div className="github-container">
              <a 
                href="https://github.com/ApexProgrammer/project-corvette" 
                target="_blank" 
                rel="noopener noreferrer"
                className="github-button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="github-icon">
                  <path fill="currentColor" d="M12 .5C5.37.5 0 5.78 0 12.292c0 5.211 3.438 9.63 8.205 11.188.6.111.82-.254.82-.567 0-.28-.01-1.022-.015-2.005-3.338.711-4.042-1.582-4.042-1.582-.546-1.361-1.335-1.725-1.335-1.725-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.803 2.809 1.282 3.495.981.108-.763.417-1.282.76-1.577-2.665-.295-5.466-1.309-5.466-5.827 0-1.287.465-2.339 1.235-3.164-.135-.298-.54-1.497.105-3.121 0 0 1.005-.316 3.3 1.209.96-.262 1.98-.392 3-.398 1.02.006 2.04.136 3 .398 2.28-1.525 3.285-1.209 3.285-1.209.645 1.624.24 2.823.12 3.121.765.825 1.23 1.877 1.23 3.164 0 4.53-2.805 5.527-5.475 5.817.42.354.81 1.077.81 2.182 0 1.578-.015 2.846-.015 3.229 0 .309.21.678.825.56C20.565 21.917 24 17.495 24 12.292 24 5.78 18.627.5 12 .5z"/>
                </svg>
                Contribute on GitHub
              </a>
              <p className="github-description">
                Visit our repository to explore the code, submit issues, or create pull requests.
              </p>
            </div>
            
            <h3>How You Can Help</h3>
            <ul className="contribution-list">
              <li>Add missing information about specific Corvette models or years</li>
              <li>Improve technical specifications and data accuracy</li>
              <li>Share high-quality Corvette photographs (with proper attribution)</li>
              <li>Enhance the website's performance and user experience</li>
              <li>Fix bugs or implement new features</li>
            </ul>
            
            <p>
              Together, we can build the most comprehensive and engaging Corvette resource on the web.
              Your passion and knowledge are invaluable to this community project!
            </p>
          </div>
        </div>
      </div>
    </PageBackground>
  );
}

export default UnderTheHood;