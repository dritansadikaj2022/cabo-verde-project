import React, { useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, Armchair, Bed, Lamp, Box, Tv, Sparkles, 
  Layers, Sofa, Crown, Landmark, Gem, Briefcase, Shapes, Sun
} from 'lucide-react';
import { CATEGORIES as DEFAULT_CATEGORIES } from '../data/products';
import { Category } from '../types';

interface CategorySliderProps {
  onSelectCategory: (id: string) => void;
  categories?: Category[];
}

// Custom 3D Carved Wood Furniture Icon Definitions
interface CategoryMetaItem {
  icon: React.FC<{ className?: string }>;
  woodTone: string;
  woodSpecies: string;
  label: string;
}

const CATEGORY_META: Record<string, CategoryMetaItem> = {
  sofa: {
    icon: Sofa,
    woodTone: 'from-[#5c371d] via-[#6d4325] to-[#452712]',
    woodSpecies: 'American Walnut',
    label: 'Sectionals & Sofas',
  },
  chair: {
    icon: Armchair,
    woodTone: 'from-[#6e4627] via-[#85552f] to-[#54331a]',
    woodSpecies: 'Natural White Oak',
    label: 'Lounge & Accent Chairs',
  },
  'stora-beds': {
    icon: Bed,
    woodTone: 'from-[#4a2e1b] via-[#5c3922] to-[#3a2213]',
    woodSpecies: 'Smoked Ash & Teak',
    label: 'Hydraulic Storage Beds',
  },
  tables: {
    icon: Layers,
    woodTone: 'from-[#734726] via-[#8b5932] to-[#59351a]',
    woodSpecies: 'Quarter-Sawn Teak',
    label: 'Coffee & Dining Tables',
  },
  storage: {
    icon: Box,
    woodTone: 'from-[#51311c] via-[#643f25] to-[#3d2312]',
    woodSpecies: 'Carpathian Burl Elm',
    label: 'Credenzas & Sideboards',
  },
  'media-storage': {
    icon: Tv,
    woodTone: 'from-[#442817] via-[#57351f] to-[#331c0e]',
    woodSpecies: 'Black Forest Walnut',
    label: 'Media Consoles & TV',
  },
  lighting: {
    icon: Lamp,
    woodTone: 'from-[#784c29] via-[#915e35] to-[#5c371d]',
    woodSpecies: 'Turned Beech & Brass',
    label: 'Pendant & Table Lamps',
  },
  office: {
    icon: Briefcase,
    woodTone: 'from-[#543d2b] via-[#6d513a] to-[#3d2a1b]',
    woodSpecies: 'Executive Ebony Oak',
    label: 'Executive Office',
  },
  architectural: {
    icon: Landmark,
    woodTone: 'from-[#6b4724] via-[#7d532b] to-[#543517]',
    woodSpecies: 'Architectural Teak',
    label: 'Architectural Modules',
  },
  decor: {
    icon: Crown,
    woodTone: 'from-[#704822] via-[#855729] to-[#523315]',
    woodSpecies: 'Rosewood & Gold',
    label: 'Artisan Decor',
  },
  outdoor: {
    icon: Sun,
    woodTone: 'from-[#5e3e20] via-[#78512b] to-[#422912]',
    woodSpecies: 'Weathered Ipe',
    label: 'Outdoor & Patio',
  },
  custom: {
    icon: Shapes,
    woodTone: 'from-[#5c371d] via-[#704523] to-[#422611]',
    woodSpecies: 'Master Artisan Wood',
    label: 'Custom Creations',
  },
};

export const CategorySlider: React.FC<CategorySliderProps> = ({ 
  onSelectCategory,
  categories = DEFAULT_CATEGORIES 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getIconForCategory = (cat: Category) => {
    if (cat.iconType && CATEGORY_META[cat.iconType]) {
      return CATEGORY_META[cat.iconType].icon;
    }
    if (CATEGORY_META[cat.id]) {
      return CATEGORY_META[cat.id].icon;
    }
    // Search by key fragments
    const nameLower = cat.name.toLowerCase();
    if (nameLower.includes('sofa') || nameLower.includes('couch')) return Sofa;
    if (nameLower.includes('chair') || nameLower.includes('lounge')) return Armchair;
    if (nameLower.includes('bed')) return Bed;
    if (nameLower.includes('table') || nameLower.includes('desk')) return Layers;
    if (nameLower.includes('storage') || nameLower.includes('credenza')) return Box;
    if (nameLower.includes('tv') || nameLower.includes('media')) return Tv;
    if (nameLower.includes('light') || nameLower.includes('lamp')) return Lamp;
    if (nameLower.includes('office')) return Briefcase;
    return Gem;
  };

  return (
    <section id="category-slider" className="py-14 sm:py-20 bg-neutral-50/70 border-b border-neutral-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Heading, Badges, and Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100/90 px-3.5 py-1 rounded-full mb-2 border border-amber-300/60 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>100% Solid Hardwood Architectural Icons</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 tracking-tight">
              Shop By Category
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm mt-1">
              Select an architectural furniture category carved from sustainably harvested solid hardwoods.
            </p>
          </div>

          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-neutral-300 bg-white hover:bg-neutral-900 hover:text-white hover:border-neutral-900 flex items-center justify-center text-neutral-700 transition-all shadow-sm active:scale-95 cursor-pointer"
              aria-label="Scroll categories left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-neutral-300 bg-white hover:bg-neutral-900 hover:text-white hover:border-neutral-900 flex items-center justify-center text-neutral-700 transition-all shadow-sm active:scale-95 cursor-pointer"
              aria-label="Scroll categories right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Category Row: ONLY 3D WOOD-TEXTURED ICONS (NO PHOTOS) */}
        <div
          ref={scrollRef}
          className="flex gap-6 sm:gap-8 overflow-x-auto pb-6 pt-3 px-2 scroll-smooth no-scrollbar"
        >
          {categories.map((cat) => {
            const meta = CATEGORY_META[cat.iconType || cat.id] || {
              icon: getIconForCategory(cat),
              woodTone: 'from-[#5c371d] via-[#6d4325] to-[#452712]',
              woodSpecies: cat.woodSpecies || 'Natural Solid Hardwood',
              label: cat.name,
            };
            const IconComponent = getIconForCategory(cat);

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="flex-none w-32 sm:w-40 text-center group cursor-pointer select-none transition-transform"
              >
                {/* 3D WOOD-TEXTURED PEDESTAL WITH ONLY 3D ICON */}
                <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 mb-3 flex items-center justify-center">
                  
                  {/* Outer 3D Hardwood Medallion with Deep Wood Grain & Beveled Rim */}
                  <div className="w-full h-full rounded-3xl wood-texture-3d flex items-center justify-center p-2.5 relative shadow-xl">
                    
                    {/* Concentric Tree Growth Rings & Inner Bevel */}
                    <div className="w-full h-full rounded-2xl wood-rings border border-amber-300/40 flex items-center justify-center relative shadow-inner overflow-hidden">
                      
                      {/* ONLY THE 3D WOOD-TEXTURED CARVED ICON (NO PHOTOS) */}
                      <div className="relative z-10 flex flex-col items-center justify-center">
                        <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 text-amber-100 wood-carved-icon" />
                      </div>

                      {/* Tactile Wood Sheen Angle Reflection */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-100/15 to-transparent pointer-events-none" />
                      <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/50 pointer-events-none" />
                    </div>

                  </div>

                  {/* 3D Depth Shadow on Floor */}
                  <div className="absolute -bottom-2 inset-x-2 h-3.5 bg-black/30 blur-md rounded-full transform group-hover:scale-115 group-hover:opacity-90 transition-all pointer-events-none" />
                </div>

                {/* Category Title & Count */}
                <h3 className="font-extrabold text-neutral-900 text-sm sm:text-base group-hover:text-red-600 transition-colors mt-2 tracking-tight">
                  {cat.name}
                </h3>
                <span className="inline-block text-[11px] font-semibold text-neutral-500 bg-white px-2.5 py-0.5 rounded-full border border-neutral-200 mt-1 shadow-xs group-hover:border-red-200 group-hover:text-red-600 transition-colors">
                  {cat.itemCount} items
                </span>
                <span className="block text-[10px] text-amber-800/80 font-medium mt-0.5 tracking-tight">
                  {meta.woodSpecies}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
