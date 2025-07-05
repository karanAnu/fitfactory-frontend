// src/components/GalleryWithLightbox.jsx
import { useState } from "react";
import gym1 from "../assets/gymPhoto2.jpeg";
import gym2 from "../assets/gymPhoto1.jpeg";
import gym3 from "../assets/gymPhoto3.jpeg";

const images = [gym1, gym2, gym3]; // ✅ imported images used here

export default function GalleryWithLightbox() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Gallery ${idx + 1}`}
            className="rounded-lg shadow-lg border border-gray-700 hover:scale-105 transition duration-300 cursor-pointer"
            onClick={() => setSelectedImg(img)}
          />
        ))}
      </div>

      {selectedImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setSelectedImg(null)}
        >
          <img
            src={selectedImg}
            alt="Zoom"
            className="max-w-full max-h-full rounded-lg shadow-xl"
          />
        </div>
      )}
    </div>
  );
}