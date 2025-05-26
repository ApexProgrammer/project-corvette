import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generations } from '../data/generations';

export function useKeyboardNavigation(currentGeneration) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      const currentIndex = generations.findIndex(
        gen => gen.gen.toLowerCase() === currentGeneration.toLowerCase()
      );

      switch (e.key) {
        case 'ArrowLeft':
          if (currentIndex > 0) {
            navigate(`/generation/${generations[currentIndex - 1].gen.toLowerCase()}`);
          }
          break;
        case 'ArrowRight':
          if (currentIndex < generations.length - 1) {
            navigate(`/generation/${generations[currentIndex + 1].gen.toLowerCase()}`);
          }
          break;
        case 'Home':
          if (currentIndex !== 0) {
            navigate(`/generation/${generations[0].gen.toLowerCase()}`);
          }
          break;
        case 'End':
          if (currentIndex !== generations.length - 1) {
            navigate(`/generation/${generations[generations.length - 1].gen.toLowerCase()}`);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentGeneration, navigate]);
}