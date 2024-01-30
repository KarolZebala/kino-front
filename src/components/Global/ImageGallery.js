import React, { useState } from 'react';
import './ImageGallery.css'

const ImageGallery = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handlePrevClick = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextClick = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="image-gallery">
      <div className="main-image">
        <button className="arrow-button prev" onClick={handlePrevClick}>
          &lt;
        </button>
        <img src={images[currentImage].url} alt={`${currentImage + 1}`} />
        <button className="arrow-button next" onClick={handleNextClick}>
          &gt;
        </button>
      </div>
      <div className="thumbnail-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Thumbnail ${index + 1}`}
            className={currentImage === index ? 'thumbnail active' : 'thumbnail'}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;