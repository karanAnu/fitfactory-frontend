import React from 'react';

const GalleryWithLightbox = () => {
  const images = [
    '/gallery/gym1.jpg',
    '/gallery/gym2.jpg',
    '/gallery/gym1.jpg',
    '/gallery/gym2.jpg'
  ];

  return (
    <div className="py-12 px-4 md:px-16 bg-gray-100" id="gallery">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">🏋️‍♂️ Gym Gallery</h2>

      <p className="text-center text-gray-500 mb-4">
        Lightbox feature temporarily removed for deployment
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Gym Image ${index + 1}`}
            className="rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryWithLightbox;