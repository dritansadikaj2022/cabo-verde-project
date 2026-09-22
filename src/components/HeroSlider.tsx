import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface HeroSliderProps {
  onShopNow: () => void;
}

const slides = [
  {
    id: 1,
    tagline: 'ELEGANT MODERN MINIMALISM',
    title: 'Designed To Work With You',
    desc: 'Discover hand-crafted architectural furniture built for comfort, endurance, and unmatched elegance.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 2,
    tagline: 'CURATED LUXURY LIVING 2026',
    title: 'Transform Your Home Sanctuary',
    desc: 'Bespoke lounge seating and Scandinavian-inspired silhouettes engineered to inspire everyday tranquility.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1920&q=80',
  }
];

export const HeroSlider: React.FC<HeroSliderProps> = ({ onShopNow }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const active = slides[currentSlide];

  return (
    <section id="home" className="relative bg-neutral-900 text-white overflow-hidden min-h-[500px] lg:min-h-[600px] flex items-center select-none">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={active.image}
          alt={active.title}
          className="w-full h-full object-cover object-center opacity-40 transition-opacity duration-700 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
      </div>

      {/* Slide Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl animate-in fade-in slide-in-from-left duration-500 key={active.id}">
          
          <div className="inline-flex items-center gap-2 mb-4 border-b border-red-600/80 pb-1">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-300 font-bold">
              {active.tagline}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
            {active.title}
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 mb-8 max-w-xl font-light leading-relaxed">
            {active.desc}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onShopNow}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-red-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#shop-by-room"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3.5 rounded-full backdrop-blur-md transition-colors text-sm"
            >
              <span>Explore Rooms</span>
            </a>
          </div>

        </div>
      </div>

      {/* Slider Controls (Left & Right Arrows) */}
      <div className="absolute bottom-8 right-8 z-20 hidden sm:flex items-center gap-2">
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-black/40 hover:bg-red-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-105"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-black/40 hover:bg-red-600 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all hover:scale-105"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all ${
              currentSlide === idx ? 'w-8 bg-red-600' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

    </section>
  );
};
