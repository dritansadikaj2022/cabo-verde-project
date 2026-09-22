import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useDevice } from '../context/DeviceContext';

interface HomeOfficeAccessoriesProps {
  onSelectCategory: (cat: string) => void;
}

export const HomeOfficeAccessories: React.FC<HomeOfficeAccessoriesProps> = ({ onSelectCategory }) => {
  const { isMobileView } = useDevice();

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className={`grid gap-6 sm:gap-8 ${isMobileView ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
          
          {/* Home Office Banner */}
          <div 
            onClick={() => onSelectCategory('chairs')}
            className="relative rounded-3xl overflow-hidden shadow-lg group min-h-[340px] sm:min-h-[420px] cursor-pointer hover-3d hover-sheen"
          >
            <img
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
              alt="Home Office Furniture"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 z-10">
              <span className="text-xs uppercase font-extrabold tracking-widest text-red-400 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Workplace Ergonomics</span>
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3 tracking-tight">
                Home Office
              </h3>
              <span className="inline-flex items-center gap-2 bg-white text-neutral-900 font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-xl group-hover:bg-red-600 group-hover:text-white transition-all transform group-hover:translate-x-1">
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Accessories & Lighting Banner */}
          <div 
            onClick={() => onSelectCategory('lighting')}
            className="relative rounded-3xl overflow-hidden shadow-lg group min-h-[340px] sm:min-h-[420px] cursor-pointer hover-3d hover-sheen"
          >
            <img
              src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80"
              alt="Accessories & Decor"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 z-10">
              <span className="text-xs uppercase font-extrabold tracking-widest text-red-400 mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Finishing Touches</span>
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3 tracking-tight">
                Accessories &amp; Lighting
              </h3>
              <span className="inline-flex items-center gap-2 bg-white text-neutral-900 font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-xl group-hover:bg-red-600 group-hover:text-white transition-all transform group-hover:translate-x-1">
                <span>Explore Accessories</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
