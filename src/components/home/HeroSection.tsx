// src/components/home/HeroSection.tsx
import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Circle, CircleDot } from 'lucide-react';
import { Link } from 'react-router-dom';
import slider1 from '../../assets/images/slider/1.png';
import slider2 from '../../assets/images/slider/2.png';
import slider3 from '../../assets/images/slider/3.png';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [slider1, slider2, slider3];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-brand-blue-500 text-white overflow-hidden">
      {/* Significantly reduced height for laptop screens */}
      <div className="relative h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px] xl:h-[480px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500
              ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={slide}
              alt={`Hero slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 z-10">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            {/* Reduced text sizes and spacing */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 md:mb-4">
              Quality Auto Parts for Every Vehicle
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-4 max-w-2xl">
              Find the perfect parts for your car with our extensive collection 
              of genuine and aftermarket components.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Link
                to="/catalog"
                className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 
                  bg-brand-green-500 hover:bg-brand-green-600 text-white rounded-lg 
                  font-medium transition-colors text-sm sm:text-base"
              >
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                to="/brands"
                className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 
                  bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium 
                  transition-colors text-sm sm:text-base"
              >
                Browse Brands
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Compact navigation controls */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full 
          bg-black/20 hover:bg-black/40 transition-colors text-white"
        aria-label="Previous slide"
      >
        <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full 
          bg-black/20 hover:bg-black/40 transition-colors text-white"
        aria-label="Next slide"
      >
        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>

      {/* Compact indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex space-x-1.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="p-0.5 transition-colors"
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === currentSlide ? (
              <CircleDot className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            ) : (
              <Circle className="h-3 w-3 sm:h-4 sm:w-4 text-white/60" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;