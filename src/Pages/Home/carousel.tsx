import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import banner1 from '../../assets/dami_4.jpg';
import banner2 from '../../assets/br2.jpg';
import banner3 from '../../assets/dami_1.jpg';
import banner4 from '../../assets/hon.jpg';

const slides = [
  {
    id: 1,
    title: "Own the Street with Rocspace",
    subtitle: "Step out in bold, premium-quality branded shirts that define urban edge and confidence.",
    buttonText: "SHOP NOW",
    image: banner1,
  },
  {
    id: 2,
    title: "Signature Looks, Maximum Impact",
    subtitle: "Discover our statement shirts—crafted for those who lead, not follow.",
    buttonText: "SHOP NOW",
    image: banner2,
  },
  {
    id: 3,
    title: "Wear Your Identity with Pride",
    subtitle: "From casual to bold, Rocspace shirts speak your style loud and clear.",
    buttonText: "SHOP NOW",
    image: banner3,
  },
  {
    id: 4,
    title: "More Than Just a Shirt",
    subtitle: "Every Rocspace piece is a symbol of creativity, culture, and authenticity.",
    buttonText: "SHOP NOW",
    image: banner4,
  },
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Left Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>

          {/* Text Content */}
          <div className="relative z-20 flex items-center h-full px-8 md:px-24">
            <div className="max-w-xl text-black space-y-6">
             <h1 className="text-3xl md:text-6xl font-graffiti font-semibold leading-tight">
  <span className="text-red-600">{slide.title.split(' ')[0]}</span>{' '}
  {slide.title.split(' ').slice(1).join(' ')}
</h1>

<p className="text-base md:text-lg font-graffiti font-bold">
  <span className="text-red-600">{slide.subtitle.split(' ')[0]}</span>{' '}
  {slide.subtitle.split(' ').slice(1).join(' ')}
</p>
         <Link
                to="/shop"
                className="inline-block bg-black text-white  text-sm font-semibold px-6 py-3 mt-4 rounded hover:border-2 hover:border-black hover:text-black hover:bg-white transition"
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
