import { useNavigate } from 'react-router-dom';
import { generations } from '../../data/generations';

function GenerationNav({ currentGeneration }) {
  const navigate = useNavigate();
  
  // Find current generation index
  generations.findIndex(
    gen => gen.gen.toLowerCase() === currentGeneration.toLowerCase()
  );

  // Component is currently not rendering any UI
  // Return null instead of an empty fragment
  return null;
}

export default GenerationNav;