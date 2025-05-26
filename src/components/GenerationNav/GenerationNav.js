import React from 'react';
import { useNavigate } from 'react-router-dom';
import { generations } from '../../data/generations';

function GenerationNav({ currentGeneration }) {
  const navigate = useNavigate();
  const currentIndex = generations.findIndex(
    gen => gen.gen.toLowerCase() === currentGeneration.toLowerCase()
  );

  // Keep these references for keyboard navigation
  const prevGeneration = currentIndex > 0 ? generations[currentIndex - 1] : null;
  const nextGeneration = currentIndex < generations.length - 1 ? generations[currentIndex + 1] : null;

  const handleNavigation = (generation) => {
    if (generation) {
      const pageFadeOut = document.querySelector('.generation-detail-container');
      if (pageFadeOut) {
        pageFadeOut.style.opacity = '0';
        pageFadeOut.style.transition = 'opacity 0.3s ease';
      }
      
      setTimeout(() => {
        navigate(`/generation/${generation.gen.toLowerCase()}`);
        if (pageFadeOut) {
          pageFadeOut.style.opacity = '1';
        }
      }, 300);
    }
  };

  // Return an empty fragment since we don't need visual buttons
  return null;
}

export default GenerationNav;