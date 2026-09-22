import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useDevice } from '../context/DeviceContext';

interface PromoBannersProps {
  onShopCategory: (cat: string) => void;
}

export const PromoBanners: React.FC<PromoBannersProps> = ({ onShopCategory }) => {
  const { isMobileView } = useDevice();

  return (
    <section className="py-12 sm:py-16 bg-neutral-50/50 border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid gap-6 ${isMobileView ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
          
          {/* Banner 1: Sofa Collection */}
          <div className="relative bg-white rounded-3xl overflow-hidden p-6 sm:p-7 flex flex-col justify-between border border-neutral-200/80 shadow-sm hover-3d hover-sheen min-h-[250px] group">
            <div className="relative z-10 max-w-[65%]">
              <span className="text-[11px] font-bold text-red-600 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Design For You</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-neutral-900 mt-1 mb-4 leading-snug tracking-tight">
                Sofa Design Collection 2026
              </h3>
              <button
                onClick={() => onShopCategory('sofas')}
                className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="absolute right-0 bottom-0 w-1/2 h-48 overflow-hidden pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80"
                alt="Sofa Collection"
                className="w-full h-full object-contain object-bottom-right group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500 ease-out"
              />
            </div>
          </div>

          {/* Banner 2: Lamp Brand (Rich walnut/amber luxury matching video) */}
          <div className="relative bg-gradient-to-br from-[#3e2e28] via-[#4d3a33] to-[#291e1a] text-white rounded-3xl overflow-hidden p-6 sm:p-7 flex flex-col justify-between shadow-md hover-3d hover-sheen min-h-[250px] group border border-amber-900/40">
            <div className="relative z-10 max-w-[65%]">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Top Lamp Brand</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1 mb-4 leading-snug tracking-tight">
                Sale Up to 40% OFF
              </h3>
              <button
                onClick={() => onShopCategory('lighting')}
                className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-black px-5 py-2.5 rounded-full transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-950" />
              </button>
            </div>
            <div className="absolute right-0 bottom-0 w-1/2 h-48 overflow-hidden pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80"
                alt="Lighting"
                className="w-full h-full object-contain object-bottom-right group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500 ease-out"
              />
            </div>
          </div>

          {/* Banner 3: Chair Collection */}
          <div className="relative bg-white rounded-3xl overflow-hidden p-6 sm:p-7 flex flex-col justify-between border border-neutral-200/80 shadow-sm hover-3d hover-sheen min-h-[250px] group">
            <div className="relative z-10 max-w-[65%]">
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-neutral-400" />
                <span>New Products</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-neutral-900 mt-1 mb-4 leading-snug tracking-tight">
                Top Trendy Chairs Collection 2025
              </h3>
              <button
                onClick={() => onShopCategory('chairs')}
                className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="absolute right-0 bottom-0 w-1/2 h-48 overflow-hidden pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=400&q=80"
                alt="Chairs"
                className="w-full h-full object-contain object-bottom-right group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500 ease-out"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
