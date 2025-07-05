// src/components/TrainerSlider.jsx

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import arvindImg from '../assets/arvind.jpeg';
import ratneshImg from '../assets/ratnesh.jpeg';
import sanjayImg from '../assets/sanjay.jpeg';

const trainers = [
  {
    name: 'Arvind',
    role: 'Functional Movement Specialist',
    image: arvindImg,
  },
  {
    name: 'Ratnesh',
    role: 'Mindfulness & Core Stability Coach',
    image: ratneshImg,
  },
  {
    name: 'Sanjay',
    role: 'Mobility & Flexibility Coach',
    image: sanjayImg,
  },
];

export default function TrainerSlider() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* <h2 className="text-3xl font-bold text-center text-yellow-400 mb-10">
        Meet Our Trainers
      </h2> */}

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3500 }}
        spaceBetween={30}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {trainers.map((trainer, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg hover:shadow-yellow-400 transition-all text-center">
              <div className="w-full h-64 flex items-center justify-center overflow-hidden rounded-lg mb-4 bg-gray-800">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-yellow-400 mb-1">{trainer.name}</h3>
              <p className="text-gray-300 text-sm">{trainer.role}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}