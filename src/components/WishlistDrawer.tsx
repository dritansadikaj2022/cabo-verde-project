import React from 'react';
import { X, Heart, Trash2, ZoomIn, MessageSquare, Mail } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveWishlist: (id: string) => void;
  onOpenZoom: (p: Product) => void;
  onOpenContact?: (sku?: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveWishlist,
  onOpenZoom,
  onOpenContact,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/60">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-600 fill-current" />
            <h2 className="font-bold text-lg text-neutral-900">Curated Collection</h2>
            <span className="text-xs bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">
              {wishlist.length} designs
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List (NO PRICES, NO MOVE TO CART) */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                <Heart className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-neutral-800 text-base">Your collection is empty</h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                  Click the heart icon on any design to bookmark it for architectural consultation with our studio.
                </p>
              </div>
            </div>
          ) : (
            wishlist.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 bg-neutral-50/70 rounded-xl border border-neutral-100">
                <div 
                  onClick={() => { onClose(); onOpenZoom(item); }}
                  className="w-20 h-20 bg-white rounded-lg p-1 border border-neutral-200 flex-shrink-0 flex items-center justify-center cursor-pointer hover:border-red-600 transition-colors"
                >
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono text-neutral-400 block">
                        SKU: {item.sku}
                      </span>
                      <h4 
                        onClick={() => { onClose(); onOpenZoom(item); }}
                        className="font-bold text-sm text-neutral-900 cursor-pointer hover:text-red-600 transition-colors line-clamp-1"
                      >
                        {item.name}
                      </h4>
                    </div>
                    <button
                      onClick={() => onRemoveWishlist(item.id)}
                      className="text-neutral-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                      title="Remove from saved collection"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 gap-2">
                    <button
                      onClick={() => {
                        onClose();
                        if (onOpenContact) {
                          onOpenContact(item.sku);
                        }
                      }}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-neutral-900 hover:bg-red-600 text-white text-xs font-bold py-1.5 px-3 rounded-lg transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                      <span>Request Quote</span>
                    </button>

                    <button
                      onClick={() => { onClose(); onOpenZoom(item); }}
                      className="p-1.5 border border-neutral-200 hover:border-neutral-900 rounded-lg text-neutral-700 transition-colors cursor-pointer"
                      title="Inspect with zoom loupe"
                    >
                      <ZoomIn className="w-3.5 h-3.5 text-neutral-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Concierge Email to client@webmedia.al */}
        {wishlist.length > 0 && (
          <div className="p-4 bg-neutral-50 border-t border-neutral-200 space-y-2">
            <button
              onClick={() => {
                onClose();
                if (onOpenContact) {
                  const allSkus = wishlist.map((i) => i.sku).join(', ');
                  onOpenContact(`Multiple: ${allSkus}`);
                }
              }}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Inquire All Saved Items ({wishlist.length})</span>
            </button>
            <p className="text-[10px] text-center text-neutral-400">
              Inquiries dispatched directly to client@webmedia.al
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
