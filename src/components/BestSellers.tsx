import React from 'react';
import { ZoomIn, Heart, Sparkles, MessageSquare } from 'lucide-react';
import { Product } from '../types';
import { useDevice } from '../context/DeviceContext';

interface BestSellersProps {
  products: Product[];
  onToggleWishlist: (p: Product) => void;
  isWishlisted: (id: string) => boolean;
  onOpenZoom: (p: Product) => void;
  onOpenContact?: (sku?: string) => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({
  products,
  onToggleWishlist,
  isWishlisted,
  onOpenZoom,
  onOpenContact,
}) => {
  const { isMobileView } = useDevice();
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-3.5 py-1 rounded-full mb-2 border border-red-100">
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span>Signature Highlights &bull; Large View</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 tracking-tight">
              Discover Our Best-Selling Designs
            </h2>
          </div>
          <p className="text-neutral-500 text-xs sm:text-sm mt-2 sm:mt-0 max-w-md text-left sm:text-right">
            Hand-selected by interior architects for timeless form and structural durability.
          </p>
        </div>

        {/* Grid with Large Images (NO PRICES, NO ADD TO CART) */}
        <div className={`grid gap-6 ${isMobileView ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`}>
          {bestSellers.map((product) => {
            const wish = isWishlisted(product.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-neutral-200/90 p-5 hover-3d hover-sheen flex flex-col justify-between group relative shadow-sm hover:shadow-xl transition-all"
              >
                {/* Wishlist Button */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`absolute top-7 right-7 z-20 w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm shadow-md flex items-center justify-center transition-colors cursor-pointer ${
                    wish ? 'text-red-600 scale-110' : 'text-neutral-400 hover:text-red-600'
                  }`}
                  aria-label="Save to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${wish ? 'fill-current' : ''}`} />
                </button>

                {/* LARGE Product Image Stage */}
                <div
                  onClick={() => onOpenZoom(product)}
                  className="relative w-full h-64 sm:h-72 lg:h-80 bg-gradient-to-b from-neutral-50 to-neutral-100/50 rounded-2xl overflow-hidden mb-4 cursor-pointer flex items-center justify-center p-2 border border-neutral-100 group-hover:border-red-200 transition-colors"
                >
                  <span className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded uppercase tracking-wider shadow-xs">
                    Bestseller
                  </span>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain filter drop-shadow group-hover:scale-110 group-hover:-translate-y-1.5 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />

                  {/* Zoom Overlay on Hover */}
                  <div className="absolute inset-x-0 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="bg-neutral-900/90 backdrop-blur-sm text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 hover:bg-red-600 transition-colors">
                      <ZoomIn className="w-4 h-4 text-amber-400" />
                      <span>Quick View &amp; Zoom</span>
                    </span>
                  </div>
                </div>

                {/* Product Info (NO PRICES) */}
                <div className="text-center flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 block mb-1">
                      SKU: {product.sku}
                    </span>
                    <h3
                      onClick={() => onOpenZoom(product)}
                      className="font-black text-neutral-900 text-base hover:text-red-600 transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-neutral-500 line-clamp-1 mt-1">
                      {product.material || 'Solid Hardwood & Architectural Joinery'}
                    </p>
                  </div>

                  {/* Request Quote Button (NO ADD TO CART, NO PRICE) */}
                  <div className="mt-5 flex gap-2">
                    <button
                      onClick={() => onOpenContact ? onOpenContact(product.sku) : onOpenZoom(product)}
                      className="flex-1 py-3 px-3 bg-neutral-900 hover:bg-red-600 rounded-xl text-xs font-bold text-white transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
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
            );
          })}
        </div>

      </div>
    </section>
  );
};
