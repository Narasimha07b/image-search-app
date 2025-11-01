import React from 'react';
import ImageItem from './ImageItem';
import './ImageGrid.css';

const ImageGrid = ({ images, onSelect, selectedImages }) => {
  return (
    <div className="image-grid">
      {images.map((image) => (
        <ImageItem
          key={image.id}
          image={image}
          onSelect={onSelect}
          isSelected={selectedImages.includes(image.id)}
        />
      ))}
    </div>
  );
};

export default ImageGrid;