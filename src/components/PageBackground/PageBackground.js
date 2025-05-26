import React from 'react';
import backgroundImage from '../../images/corvettebackground-markus-spiske-fkEUEsX0KsM-unsplash.jpg';
import './PageBackground.css';

function PageBackground({ children, overlay }) {
  return (
    <div 
      className="page-background" 
      style={{ 
        backgroundImage: `
          ${overlay || 'linear-gradient(180deg, rgba(50, 50, 55, 0.8) 0%, rgba(60, 60, 70, 0.6) 25%, rgba(60, 60, 70, 0.6) 75%, rgba(50, 50, 55, 0.8) 100%)'},
          url(${backgroundImage})
        `
      }}
    >
      {children}
    </div>
  );
}

export default PageBackground;