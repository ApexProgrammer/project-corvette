import React from 'react';
import './ThemeSelector.css';

function ThemeSelector({ themeColors, selectedTheme, onThemeChange, showThemeSelector, onToggleSelector }) {
  return (
    <div className={`theme-control ${showThemeSelector ? 'expanded' : ''}`}>
      {!showThemeSelector && (
        <button 
          className="appearance-button"
          onClick={() => onToggleSelector(true)}
          aria-label="Open appearance settings"
        >
          <span className="button-text">Appearance</span>
        </button>
      )}
      
      <div className="theme-selector">
        <div className="theme-selector-header">
          <h4>Select Color Theme</h4>
          <button 
            className="close-theme-selector"
            onClick={() => onToggleSelector(false)}
            aria-label="Close appearance settings"
          >
            ×
          </button>
        </div>
        
        <div className="color-options-container">
          {themeColors.map((color) => (
            <div
              key={color.name}
              className="color-option"
              onClick={() => {
                onThemeChange(color);
                onToggleSelector(false);
              }}
              data-active={selectedTheme?.name === color.name}
              style={{ backgroundColor: color.hex }}
            >
              {selectedTheme?.name === color.name && (
                <span className="selected-indicator">✓</span>
              )}
            </div>
          ))}
        </div>
        
        {/* Footer with theme information removed */}
      </div>
    </div>
  );
}

export default ThemeSelector;