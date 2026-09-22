import React from 'react';
import { ArrowRight, CheckCircle2, Award } from 'lucide-react';
import { useDevice } from '../context/DeviceContext';

interface AboutSectionProps {
  onOpenContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContact }) => {
  const { isMobileView } = useDevice();

  return (
    <section id="about-section" className="py-16 sm:py-24 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid gap-10 lg:gap-12 items-center ${isMobileView ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'}`}>
          
          {/* Left: Content */}
          <div className={`${isMobileView ? 'w-full' : 'lg:col-span-6'} space-y-6`}>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
              <Award className="w-3.5 h-3.5" />
              <span>Our Architectural Philosophy</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
              Welcome to Cabo Verde Store
            </h2>

            <p className="text-neutral-600 leading-relaxed text-sm sm:text-base font-light">
              Your destination for modern living. We craft premium furniture that blends style, comfort, and durability, transforming every room into a masterpiece. With a passion for design and quality, we're here to elevate your home.
            </p>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-neutral-700 font-medium">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                <span>Ethically sourced hardwoods and certified low-VOC finishes</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                <span>Engineered in California, precision-crafted by European artisans</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                <span>Direct client concierge support via <span className="text-red-600 font-bold">client@webmedia.al</span></span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-lg shadow-red-600/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>About Us &amp; Inquiries</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Showroom image & Stats */}
          <div className={`${isMobileView ? 'w-full' : 'lg:col-span-6'} space-y-6`}>
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-200 hover-3d">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80"
                alt="Cabo Verde Showroom"
                className="w-full h-64 sm:h-80 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-[11px] font-semibold bg-neutral-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full inline-block w-fit">
                San Francisco Design Studio &bull; Flagship Showroom
              </div>
            </div>

            {/* 3 Metric Cards matching video */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center stats-grid">
              <div className="bg-neutral-50 rounded-2xl p-3 sm:p-5 border border-neutral-200 hover:border-red-200 transition-colors">
                <div className="text-xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                  30K
                </div>
                <div className="text-[10px] sm:text-xs text-neutral-500 font-semibold mt-1">
                  Happy Customers
                </div>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-3 sm:p-5 border border-neutral-200 hover:border-red-200 transition-colors">
                <div className="text-xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                  +27%
                </div>
                <div className="text-[10px] sm:text-xs text-neutral-500 font-semibold mt-1">
                  Growth in Style
                </div>
              </div>

              <div className="bg-neutral-50 rounded-2xl p-3 sm:p-5 border border-neutral-200 hover:border-red-200 transition-colors">
                <div className="text-xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                  3M
                </div>
                <div className="text-[10px] sm:text-xs text-neutral-500 font-semibold mt-1">
                  Products Sold
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
