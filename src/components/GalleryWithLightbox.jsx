// src/components/GalleryWithLightbox.jsx
import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const images = ["/gallery/gym1.jpg", "/gallery/gym2.jpg"];

const GalleryWithLightbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <section id="gallery" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10 text-blue-600">
          Gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Gym ${index + 1}`}
              className="rounded-xl shadow hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => {
                setPhotoIndex(index);
                setIsOpen(true);
              }}
            />
          ))}
        </div>

        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex((photoIndex + images.length - 1) % images.length)
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % images.length)
            }
          />
        )}
      </div>
    </section>
  );
};

export default GalleryWithLightbox;