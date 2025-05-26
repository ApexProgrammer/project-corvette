import React from 'react';
import './GenerationHero.css';

function GenerationHero({ generation }) {
  const fallbackHeroImage = `https://placehold.co/1920x1080/1a1a1a/ffffff?text=Generation+${generation.gen}`;
  
  // Handle both string URLs and require() objects
  const getImageUrl = (imageSource) => {
    if (typeof imageSource === 'string') {
      return imageSource;
    } else if (imageSource && typeof imageSource === 'object' && imageSource.default) {
      return imageSource.default;
    } else if (imageSource && typeof imageSource === 'object') {
      return imageSource;
    }
    return fallbackHeroImage;
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.parentElement.style.backgroundImage = `url(${fallbackHeroImage})`;
  };

  const heroImageUrl = getImageUrl(generation.heroImage);

  return (
    <section className="generation-hero">
      <div 
        className="hero-image" 
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      >
        <img 
          src={heroImageUrl} 
          alt={`Generation ${generation.gen}`} 
          style={{ display: 'none' }} 
          onError={handleImageError}
        />
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="generation-name">Generation {generation.gen}</h1>
            <div className="production-years">{generation.years}</div>
            <p className="overview">{generation.overview}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GenerationHero;