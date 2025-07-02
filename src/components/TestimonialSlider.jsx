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
    <section id="testimonials" className="py-20 bg-gray-50">
      <h2 className="text-4xl font-bold text-center text-blue-600 mb-10">
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
              <div className="bg-white p-8 shadow-md rounded-xl text-center">
                <p className="text-lg italic text-gray-700 mb-6">“{t.quote}”</p>
                <h4 className="text-blue-600 font-semibold">— {t.name}</h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}