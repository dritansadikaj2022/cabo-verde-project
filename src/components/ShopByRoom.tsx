import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useDevice } from '../context/DeviceContext';

interface ShopByRoomProps {
  onSelectRoom: (category: string) => void;
}

export const ShopByRoom: React.FC<ShopByRoomProps> = ({ onSelectRoom }) => {
  const { isMobileView } = useDevice();

  return (
    <section id="shop-by-room" className="py-16 sm:py-24 bg-neutral-50/70 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full mb-2 border border-red-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Living Spaces</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 tracking-tight">
            Shop by Room
          </h2>
          <p className="text-neutral-500 text-xs sm:text-sm mt-1">
            Find architect-designed furniture tailored to every corner of your home.
          </p>
        </div>

        {/* Bento Grid */}
        <div className={`grid gap-6 ${isMobileView ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-12'}`}>
          
          {/* Large Column: Living Room */}
          <div 
            onClick={() => onSelectRoom('sofas')}
            className={`${isMobileView ? 'w-full' : 'md:col-span-5'} relative rounded-3xl overflow-hidden shadow-md group min-h-[340px] md:min-h-[500px] cursor-pointer hover-3d hover-sheen`}
          >
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80"
              alt="Living Room"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <span className="inline-flex items-center gap-2 bg-white/95 hover:bg-white text-neutral-900 font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-full shadow-lg transition-transform group-hover:translate-x-1">
                <span>Living Room</span>
                <ArrowRight className="w-3.5 h-3.5 text-red-600" />
              </span>
            </div>
          </div>

          {/* Right Column Grid: Bedroom, Bathroom, Dining Room */}
          <div className={`${isMobileView ? 'w-full' : 'md:col-span-7'} grid gap-6 ${isMobileView ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
            
            {/* Bedroom */}
            <div 
              onClick={() => onSelectRoom('bed')}
              className="relative rounded-3xl overflow-hidden shadow-md group min-h-[220px] cursor-pointer hover-3d hover-sheen"
            >
              <img
                src="https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=800&q=80"
                alt="Bed Room"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 z-10">
                <span className="inline-flex items-center gap-1.5 bg-white/95 text-neutral-900 font-extrabold text-xs px-4 py-2.5 rounded-full shadow transition-transform group-hover:translate-x-1">
                  <span>Bed Room</span>
                  <ArrowRight className="w-3 h-3 text-red-600" />
                </span>
              </div>
            </div>

            {/* Bathroom / Dressing */}
            <div 
              onClick={() => onSelectRoom('chairs')}
              className="relative rounded-3xl overflow-hidden shadow-md group min-h-[220px] cursor-pointer hover-3d hover-sheen"
            >
              <img
                src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
                alt="Bathroom"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 z-10">
                <span className="inline-flex items-center gap-1.5 bg-white/95 text-neutral-900 font-extrabold text-xs px-4 py-2.5 rounded-full shadow transition-transform group-hover:translate-x-1">
                  <span>Bathroom</span>
                  <ArrowRight className="w-3 h-3 text-red-600" />
                </span>
              </div>
            </div>

            {/* Wide Dining Room */}
            <div 
              onClick={() => onSelectRoom('tables')}
              className={`${isMobileView ? '' : 'sm:col-span-2'} relative rounded-3xl overflow-hidden shadow-md group min-h-[240px] cursor-pointer hover-3d hover-sheen`}
            >
              <img
                src="https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80"
                alt="Dining Room"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 z-10">
                <span className="inline-flex items-center gap-1.5 bg-white/95 text-neutral-900 font-extrabold text-xs px-5 py-3 rounded-full shadow transition-transform group-hover:translate-x-1">
                  <span>Dining Room</span>
                  <ArrowRight className="w-3 h-3 text-red-600" />
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
