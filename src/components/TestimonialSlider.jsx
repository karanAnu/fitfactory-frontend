// src/components/TestimonialSlider.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    quote: "Joining FitFactory has changed my life. The trainers are amazing!",
    name: "Ankit Sinha",
  },
  {
    quote: "I lost 10kg in 3 months! The personalized plans are amazing.",
    name: "Ritu Kumari",
  },
  {
    quote: "Steam room, cardio, weights — best gym in Ranchi!",
    name: "Rahul Verma",
  },
];

export default function TestimonialSlider() {
  return (
    <section id="testimonials" className="py-20 bg-black text-white">
      <h2 className="text-3xl font-bold text-center text-yellow-400 mb-10">
        What Our Members Say
      </h2>

      <div className="max-w-4xl mx-auto px-4">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
          className="rounded-xl"
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <div className="bg-gray-800 border-t-4 border-yellow-400 p-8 shadow-lg rounded-xl text-center transition-all">
                <p className="text-lg italic text-gray-300 mb-6">“{t.quote}”</p>
                <h4 className="text-yellow-400 font-semibold">— {t.name}</h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}