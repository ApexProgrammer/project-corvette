import React, { useEffect } from 'react';
import './ImageModal.css';

function ImageModal({ image, caption, year, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <img src={image} alt={caption} />
        <div className="modal-caption">
          <p>{caption}</p>
          <span className="modal-year">{year}</span>
        </div>
      </div>
    </div>
  );
}

export default ImageModal;