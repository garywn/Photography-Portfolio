import React from 'react';
import './Lightbox.css';

const Lightbox = ({ image, onClose, onNext, onPrev }) => {
  if (!image) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}>×</button>
      
      <button className="lightbox-prev" onClick={(e) => {
        e.stopPropagation();
        onPrev();
      }}>‹</button>
      
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img src={image.url} alt={`Photography ${image.id}`} />
      </div>
      
      <button className="lightbox-next" onClick={(e) => {
        e.stopPropagation();
        onNext();
      }}>›</button>
    </div>
  );
};

export default Lightbox;