import React, { createContext, useState, useContext, useCallback } from 'react';
import { createTranslucentColor, createDarkerColor, createGradient } from '../utils/colorUtils';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  const applyTheme = useCallback((color) => {
    setSelectedTheme(color);
    
    // Set main theme color and text color
    document.documentElement.style.setProperty('--theme-color', color.hex);
    document.documentElement.style.setProperty('--text-on-theme', color.textColor);
    
    // Set theme variations using utility functions
    document.documentElement.style.setProperty(
      '--theme-color-light', 
      createTranslucentColor(color.hex)
    );
    
    document.documentElement.style.setProperty(
      '--theme-color-dark', 
      createDarkerColor(color.hex)
    );
    
    document.documentElement.style.setProperty(
      '--theme-gradient',
      createGradient(color.hex)
    );
  }, []);

  return (
    <ThemeContext.Provider 
      value={{
        selectedTheme,
        showThemeSelector,
        setShowThemeSelector,
        applyTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}