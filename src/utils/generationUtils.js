// Utility functions for working with generation data
import { generations } from '../data/generations';

/**
 * Find a specific generation by its ID
 * @param {string} genId - The generation ID (e.g., 'C1', 'C2')
 * @returns {Object} The generation object or undefined if not found
 */
export function getGeneration(genId) {
  return generations.find(gen => gen.gen.toLowerCase() === genId.toLowerCase());
}
