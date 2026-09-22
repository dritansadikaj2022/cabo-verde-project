import React, { useState, useEffect, useRef } from 'react';
import { ZoomIn, Heart, Play, Pause, ChevronLeft, ChevronRight, Sparkles, LayoutGrid, SlidersHorizontal, Maximize, MessageSquare } from 'lucide-react';
import { Product } from '../types';

interface PopularPicksProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: (id: string) => boolean;
  onOpenZoom: (product: Product) => void;
  onOpenContact?: (sku?: string) => void;
}

const TABS = [
  { id: 'popular', label: 'Popular Picks' },
  { id: 'featured', label: 'Featured Editions' },
  { id: 'new-arrivals', label: 'New Arrivals' },
  { id: 'sofas', label: 'Sofas' },
  { id: 'lounge', label: 'Lounge Chairs' },
  { id: 'tables', label: 'Tables' },
  { id: 'chairs', label: 'Chairs' },
  { id: 'bed', label: 'Beds' },
];

export const PopularPicks: React.FC<PopularPicksProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onToggleWishlist,
  isWishlisted,
  onOpenZoom,
  onOpenContact,
}) => {
  const [activeTab, setActiveTab] = useState<string>(
    selectedCategory !== 'all' ? selectedCategory : 'popular'
  );
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [imageScaleMode, setImageScaleMode] = useState<'large' | 'compact'>('large'); // Large like video
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Filter products by tab & user placement toggles
  const displayedProducts = products.filter((p) => {
    if (activeTab === 'popular') {
      return p.isPopular === true || (p.displayLocations && p.displayLocations.includes('popular')) || (p.isPopular !== false && p.rating >= 4.8);
    }
    if (activeTab === 'featured') {
      return p.isFeatured === true || (p.displayLocations && p.displayLocations.includes('featured'));
    }
    if (activeTab === 'new-arrivals') {
      return p.isNewArrival === true || (p.displayLocations && p.displayLocations.includes('new-arrival'));
    }
    if (activeTab === 'all') return true;
    return p.category === activeTab || p.subcategory?.toLowerCase() === activeTab.toLowerCase();
  });

  const totalItems = displayedProducts.length;

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    onSelectCategory(id);
    setCurrentIndex(0);
    setProgress(0);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, totalItems));
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % Math.max(1, totalItems));
    setProgress(0);
  };

  // 3-second autoplay timer with progress bar
  useEffect(() => {
    if (viewMode !== 'carousel' || !isAutoplay || isHovered || totalItems === 0) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const stepMs = 50;
    const totalMs = 3000; // 3 seconds
    let currentMs = 0;

    progressIntervalRef.current = setInterval(() => {
      currentMs += stepMs;
      setProgress(Math.min(100, (currentMs / totalMs) * 100));
      if (currentMs >= totalMs) {
        currentMs = 0;
        nextSlide();
      }
    }, stepMs);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [viewMode, isAutoplay, isHovered, totalItems, activeTab]);

  return (
    <section id="popular-picks" className="py-16 sm:py-24 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full mb-2 border border-red-100">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span>3s Carousel &bull; High-Definition Large View</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 tracking-tight">
              Today's Popular Picks
            </h2>
            <p className="text-neutral-500 text-xs sm:text-sm mt-1">
              Architectural luxury pieces with 3D hover effects, large image view, and direct inquiry concierge.
            </p>
          </div>

          {/* Autoplay Controls & View Switcher */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            
            {/* 3s Autoplay Pause/Play Toggle Button */}
            {viewMode === 'carousel' && (
              <button
                onClick={() => setIsAutoplay(!isAutoplay)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer shadow-xs ${
                  isAutoplay
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-neutral-100 text-neutral-700 border-neutral-200 hover:bg-neutral-200'
                }`}
                title={isAutoplay ? 'Pause 3s Autoplay' : 'Resume 3s Autoplay'}
              >
                {isAutoplay ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-red-400" />
                    <span>Autoplay (3s)</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-emerald-500 fill-current" />
                    <span>Play (3s)</span>
                  </>
                )}
              </button>
            )}

            {/* Image Size Toggle (Large Video Mode vs Compact) */}
            <button
              onClick={() => setImageScaleMode(imageScaleMode === 'large' ? 'compact' : 'large')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer shadow-xs ${
                imageScaleMode === 'large'
                  ? 'bg-amber-100/90 text-amber-950 border-amber-300'
                  : 'bg-neutral-100 text-neutral-700 border-neutral-200'
              }`}
              title="Toggle Large Image View vs Compact"
            >
              <Maximize className="w-3.5 h-3.5 text-amber-700" />
              <span>{imageScaleMode === 'large' ? 'Large Images (Video Mode)' : 'Compact View'}</span>
            </button>

            {/* Carousel vs Grid View Toggle */}
            <div className="flex items-center bg-neutral-100 rounded-lg p-1 border border-neutral-200">
              <button
                onClick={() => setViewMode('carousel')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'carousel'
                    ? 'bg-white text-neutral-900 shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
                title="View as 3s Sliding Carousel"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Carousel</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-neutral-900 shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
                title="View all in Grid"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>

            {/* Navigation Arrows for Carousel */}
            {viewMode === 'carousel' && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={prevSlide}
                  className="w-9 h-9 rounded-full border border-neutral-300 bg-white hover:bg-neutral-900 hover:text-white flex items-center justify-center text-neutral-700 transition-colors shadow-xs active:scale-95 cursor-pointer"
                  aria-label="Previous product"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-9 h-9 rounded-full border border-neutral-300 bg-white hover:bg-neutral-900 hover:text-white flex items-center justify-center text-neutral-700 transition-colors shadow-xs active:scale-95 cursor-pointer"
                  aria-label="Next product"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 mb-6 overflow-x-auto no-scrollbar py-2">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer shadow-xs ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/25 scale-102'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 3-Second Visual Progress Indicator Bar */}
        {viewMode === 'carousel' && isAutoplay && (
          <div className="w-full bg-neutral-100 h-1.5 rounded-full mb-8 overflow-hidden">
            <div
              className="bg-red-600 h-full transition-all duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* CAROUSEL VIEW MODE: LARGE IMAGES (NO PRICES, NO ADD TO CART) */}
        {totalItems === 0 ? (
          <div className="py-16 text-center border-2 border-dashed border-neutral-200 rounded-3xl bg-neutral-50/50">
            <p className="text-neutral-700 font-bold text-sm">
              No products currently in {TABS.find((t) => t.id === activeTab)?.label || 'this view'}.
            </p>
            <p className="text-neutral-400 text-xs mt-1">
              Open the Admin Portal to assign products to Popular Picks, Featured, or New Arrivals.
            </p>
          </div>
        ) : viewMode === 'carousel' ? (
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out gap-6"
                style={{
                  transform: `translateX(-${
                    currentIndex * (100 / (imageScaleMode === 'large' ? Math.min(3, Math.max(1, totalItems)) : Math.min(4, Math.max(1, totalItems))))
                  }%)`,
                }}
              >
                {displayedProducts.map((product) => {
                  const wish = isWishlisted(product.id);
                  return (
                    <div
                      key={product.id}
                      className={`flex-none ${
                        imageScaleMode === 'large'
                          ? 'w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]'
                          : 'w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]'
                      }`}
                    >
                      <div className="bg-white rounded-3xl border border-neutral-200/90 p-4 sm:p-5 hover-3d hover-sheen flex flex-col justify-between group relative h-full shadow-sm hover:shadow-xl transition-all">
                        
                        {/* Wishlist Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleWishlist(product);
                          }}
                          className={`absolute top-7 right-7 z-20 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center transition-all cursor-pointer ${
                            wish ? 'text-red-600 scale-110' : 'text-neutral-400 hover:text-red-600'
                          }`}
                          aria-label="Save to Wishlist"
                        >
                          <Heart className={`w-4 h-4 ${wish ? 'fill-current' : ''}`} />
                        </button>

                        {/* LARGE PRODUCT IMAGE STAGE */}
                        <div
                          onClick={() => onOpenZoom(product)}
                          className={`relative w-full ${
                            imageScaleMode === 'large' ? 'h-72 sm:h-80 lg:h-88' : 'aspect-square'
                          } bg-gradient-to-b from-neutral-50 via-neutral-100/50 to-neutral-50 rounded-2xl overflow-hidden mb-5 cursor-pointer flex items-center justify-center p-2 border border-neutral-100 group-hover:border-red-200 transition-colors`}
                        >
                          {/* Badges Container */}
                          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
                            {product.isFeatured && (
                              <span className="text-[9px] font-black px-2.5 py-0.5 rounded-md tracking-wider uppercase bg-purple-700 text-white shadow-xs">
                                Featured
                              </span>
                            )}
                            {product.isNewArrival && (
                              <span className="text-[9px] font-black px-2.5 py-0.5 rounded-md tracking-wider uppercase bg-emerald-600 text-white shadow-xs">
                                New Arrival
                              </span>
                            )}
                            {product.isPopular && !product.isFeatured && (
                              <span className="text-[9px] font-black px-2.5 py-0.5 rounded-md tracking-wider uppercase bg-amber-600 text-white shadow-xs">
                                Popular
                              </span>
                            )}
                            {product.pdfBrochureUrl && (
                              <span className="text-[9px] font-black px-2 py-0.5 rounded-md tracking-wider uppercase bg-red-600 text-white shadow-xs">
                                PDF Spec
                              </span>
                            )}
                            {product.badge && !product.isFeatured && !product.isNewArrival && !product.isPopular && (
                              <span
                                className={`text-[10px] font-black px-3 py-1 rounded-md tracking-wider uppercase shadow-xs ${
                                  product.badge === 'Bestseller'
                                    ? 'bg-red-600 text-white'
                                    : product.badge === 'SALE'
                                    ? 'bg-amber-600 text-white'
                                    : 'bg-neutral-900 text-white'
                                }`}
                              >
                                {product.badge}
                              </span>
                            )}
                          </div>

                          {/* LARGE Product Image */}
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 group-hover:-translate-y-1.5 transition-transform duration-500 ease-out"
                            loading="lazy"
                          />

                          {/* Hover Zoom & Loupe Button */}
                          <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-20">
                            <span className="bg-neutral-900/90 backdrop-blur-md text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 hover:bg-red-600 transition-colors">
                              <ZoomIn className="w-4 h-4 text-amber-400" />
                              <span>Click for Zoom Loupe</span>
                            </span>
                          </div>
                        </div>

                        {/* Product Info (NO PRICES) */}
                        <div className="text-center flex flex-col flex-1 justify-between">
                          <div>
                            <div className="flex items-center justify-center gap-2 mb-1">
                              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                                SKU: {product.sku}
                              </span>
                              {product.subcategory && (
                                <span className="text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                                  {product.subcategory}
                                </span>
                              )}
                            </div>
                            <h3
                              onClick={() => onOpenZoom(product)}
                              className="font-black text-neutral-900 text-base sm:text-lg hover:text-red-600 transition-colors cursor-pointer line-clamp-1 tracking-tight"
                            >
                              {product.name}
                            </h3>
                            <p className="text-xs text-neutral-500 line-clamp-1 mt-1">
                              {product.material || 'Solid Hardwood & Architectural Joinery'}
                            </p>
                          </div>

                          {/* Action Buttons: BESPOKE QUOTE & ZOOM (NO ADD TO CART, NO PRICE) */}
                          <div className="mt-5 flex gap-2">
                            <button
                              onClick={() => onOpenContact ? onOpenContact(product.sku) : onOpenZoom(product)}
                              className="flex-1 py-3 px-4 bg-neutral-900 hover:bg-red-600 text-white rounded-xl text-xs font-extrabold transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                              <span>Request Quote</span>
                            </button>
                            <button
                              onClick={() => onOpenZoom(product)}
                              className="p-3 border border-neutral-200 hover:border-neutral-900 rounded-xl text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer"
                              title="Inspect Zoom Details"
                            >
                              <ZoomIn className="w-4 h-4 text-amber-600" />
                            </button>
                          </div>

                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center items-center gap-2 mt-8">
              {displayedProducts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setProgress(0);
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? 'w-8 bg-red-600' : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* GRID VIEW MODE (NO PRICES, NO ADD TO CART) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProducts.map((product) => {
              const wish = isWishlisted(product.id);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl border border-neutral-200 p-5 hover-3d hover-sheen flex flex-col justify-between group relative shadow-sm hover:shadow-xl transition-all"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    className={`absolute top-7 right-7 z-20 w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm shadow-md flex items-center justify-center transition-colors cursor-pointer ${
                      wish ? 'text-red-600' : 'text-neutral-400 hover:text-red-600'
                    }`}
                    aria-label="Save to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${wish ? 'fill-current' : ''}`} />
                  </button>

                  <div
                    onClick={() => onOpenZoom(product)}
                    className="relative w-full h-72 sm:h-80 bg-neutral-50 rounded-2xl overflow-hidden mb-5 cursor-pointer flex items-center justify-center p-2 border border-neutral-100"
                  >
                    {product.badge && (
                      <span className="absolute top-3 left-3 z-10 text-[10px] font-black px-3 py-1 rounded tracking-wide uppercase bg-neutral-900 text-white">
                        {product.badge}
                      </span>
                    )}

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain filter drop-shadow group-hover:scale-108 transition-transform duration-300"
                      loading="lazy"
                    />

                    <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <span className="bg-neutral-900/90 text-white text-xs font-bold px-5 py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-red-600">
                        <ZoomIn className="w-4 h-4 text-amber-400" />
                        <span>Quick Zoom</span>
                      </span>
                    </div>
                  </div>

                  <div className="text-center flex flex-col flex-1 justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 block mb-1">
                        SKU: {product.sku}
                      </span>
                      <h3
                        onClick={() => onOpenZoom(product)}
                        className="font-black text-neutral-900 text-base sm:text-lg hover:text-red-600 transition-colors cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-neutral-500 line-clamp-1 mt-1">
                        {product.material || 'Solid Hardwood & Architectural Joinery'}
                      </p>
                    </div>

                    <button
                      onClick={() => onOpenContact ? onOpenContact(product.sku) : onOpenZoom(product)}
                      className="mt-5 w-full py-3 px-4 bg-neutral-900 hover:bg-red-600 rounded-xl text-xs font-bold text-white transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                      <span>Request Bespoke Quote</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
