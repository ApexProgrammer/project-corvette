import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Timeline.css';

function Timeline({ generations }) {
  const [isVertical, setIsVertical] = useState(false);
  const timelineRef = useRef(null);
  const navigate = useNavigate();

  const checkOverflow = useCallback(() => {
    if (timelineRef.current) {
      const container = timelineRef.current;
      const containerWidth = container.clientWidth;
      const buttonCount = generations.length;
      const minWidthPerButton = 120;
      const estimatedTotalWidth = buttonCount * minWidthPerButton;
      
      setIsVertical(estimatedTotalWidth > containerWidth - 40);
    }
  }, [generations.length]);

  useEffect(() => {
    checkOverflow();
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        checkOverflow();
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, [checkOverflow]);

  const totalGenerations = generations.length;

  const handleGenerationClick = (generation) => {
    navigate(`/generation/${generation.gen.toLowerCase().replace(/ /g, '-')}`);
  };

  return (
    <div 
      ref={timelineRef}
      className={`timeline-container ${isVertical ? 'vertical' : 'horizontal'}`} 
      data-component-name="Timeline"
    >
      <div className="timeline-line">
        <div className="progress-bar"></div>
      </div>
      {generations.map((gen, index) => (
        <div 
          key={gen.gen} 
          className="generation-item"
          style={{
            '--position': (index / (totalGenerations - 1)) * 100 + '%'
          }}
        >
          <button 
            className="generation-button"
            onClick={() => handleGenerationClick(gen)}
          >
            <span className="generation-name">{gen.gen}</span>
            <span className="generation-years">{gen.years}</span>
          </button>
        </div>
      ))}
    </div>
  );
}

export default Timeline;