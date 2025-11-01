import React from 'react';
import './ImageItem.css';

const ImageItem = ({ image, onSelect, isSelected }) => {
  return (
    <div className={`image-item ${isSelected ? 'selected' : ''}`} onClick={() => onSelect(image.id)}>
      <img src={image.urls.small} alt={image.alt_description} />
      <div className="overlay">
        <input
          type="checkbox"
          checked={isSelected}
          readOnly // The div's onClick handles the logic
        />
      </div>
    </div>
  );
};

export default ImageItem;