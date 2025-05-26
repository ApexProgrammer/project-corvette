/**
 * Convert a hex color code to RGB values
 * @param {string} hex - The hex color code
 * @returns {object|null} RGB values or null if invalid hex
 */
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

/**
 * Create a translucent version of a color
 * @param {string} hex - The hex color code
 * @param {number} opacity - Opacity value between 0 and 1
 * @returns {string} CSS rgba color string
 */
export const createTranslucentColor = (hex, opacity = 0.3) => {
  const rgb = hexToRgb(hex);
  return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})` : hex;
};

/**
 * Create a darker version of a color
 * @param {string} hex - The hex color code
 * @param {number} factor - Darkening factor between 0 and 1
 * @returns {string} CSS rgba color string
 */
export const createDarkerColor = (hex, factor = 0.6) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const r = Math.max(0, Math.floor(rgb.r * factor));
  const g = Math.max(0, Math.floor(rgb.g * factor));
  const b = Math.max(0, Math.floor(rgb.b * factor));
  
  return `rgba(${r}, ${g}, ${b}, 0.8)`;
};

/**
 * Create a gradient using the provided color
 * @param {string} hex - The hex color code
 * @returns {string} CSS gradient string
 */
export const createGradient = (hex) => {
  const darkColor = createDarkerColor(hex);
  return `linear-gradient(45deg, ${darkColor}, ${hex})`;
};