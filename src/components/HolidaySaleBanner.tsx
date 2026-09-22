import React from 'react';
import { ArrowRight, Tag } from 'lucide-react';

interface HolidaySaleBannerProps {
  onGrabDeal: () => void;
}

export const HolidaySaleBanner: React.FC<HolidaySaleBannerProps> = ({ onGrabDeal }) => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-neutral-900 text-white p-8 sm:p-14 text-center shadow-2xl flex flex-col items-center justify-center min-h-[360px]">
          
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80"
              alt="Sale Background"
              className="w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          </div>

          {/* Foreground Glass Card matching video */}
          <div className="relative z-10 max-w-xl bg-white/95 backdrop-blur-md rounded-2xl p-8 sm:p-10 text-neutral-900 shadow-2xl border border-white/40">
            <div className="inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-700 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
              <Tag className="w-3 h-3 text-red-600" />
              <span>Limited Time Online</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 mb-2">
              15% Off Everything
            </h2>

            <p className="text-sm sm:text-base text-neutral-600 mb-6 font-medium">
              Holiday Furniture Sale &bull; Use code <span className="font-bold text-red-600">CABOVERDE15</span> at checkout
            </p>

            <button
              onClick={onGrabDeal}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-red-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Grab Your Deal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
