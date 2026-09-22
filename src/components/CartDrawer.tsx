import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isOpen) return null;

  const rawSubtotal = cart.reduce((acc, item) => acc + (item.product.price || 0) * item.quantity, 0);
  const discountAmount = discountApplied ? rawSubtotal * 0.15 : 0;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'CABOVERDE15') {
      setDiscountApplied(true);
    } else {
      alert('Invalid code. Try CABOVERDE15 for 15% off!');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      setTimeout(() => {
        onClearCart();
        setCheckoutSuccess(false);
        onClose();
      }, 2500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/60">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-red-600" />
            <h2 className="font-bold text-lg text-neutral-900">Your Cart</h2>
            <span className="text-xs bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">
              {cart.reduce((acc, i) => acc + i.quantity, 0)} items
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-neutral-100 px-5 py-2.5 text-xs text-neutral-600 flex items-center justify-between border-b border-neutral-200">
          <span>White Glove Delivery</span>
          <span className="font-bold text-emerald-600">FREE on orders over $500</span>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-neutral-800 text-base">Your cart is empty</h3>
                <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
                  Explore our modern furniture collections and discover the perfect piece for your home.
                </p>
              </div>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-6 py-3 rounded-full transition-colors"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 bg-neutral-50/70 rounded-xl border border-neutral-100">
                <div className="w-20 h-20 bg-white rounded-lg p-1 border border-neutral-200 flex-shrink-0 flex items-center justify-center">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900 leading-snug">{item.product.name}</h4>
                      {item.selectedOptions && (
                        <p className="text-[11px] text-neutral-500">
                          {Object.values(item.selectedOptions).join(' &bull; ')}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="inline-flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-neutral-500 hover:bg-neutral-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 py-1 text-xs font-bold text-neutral-800">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-neutral-500 hover:bg-neutral-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-extrabold text-sm text-neutral-900">
                      ${((item.product.price || 0) * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Calculations and Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-neutral-100 bg-neutral-50/70 space-y-4">
            
            {/* Promo code box */}
            <form onSubmit={applyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Discount code (try CABOVERDE15)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-3 py-2 text-xs border border-neutral-300 rounded-lg bg-white uppercase placeholder-neutral-400 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-neutral-900 text-white rounded-lg text-xs font-bold hover:bg-neutral-800"
              >
                Apply
              </button>
            </form>

            <div className="space-y-1.5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-900">
                  ${rawSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Holiday Discount (15%)</span>
                  <span>-${discountAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>White Glove Shipping</span>
                <span className="font-semibold text-emerald-600">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-neutral-900 pt-2 border-t border-neutral-200">
                <span>Estimated Total</span>
                <span className="text-red-600 text-base">
                  ${finalTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {checkoutSuccess ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs text-emerald-800 font-bold flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Order placed! Dispatched notice to client@webmedia.al</span>
              </div>
            ) : (
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold text-xs py-3.5 px-4 rounded-xl shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isCheckingOut ? 'Processing Checkout...' : 'Secure Checkout'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <p className="text-[10px] text-neutral-400 text-center">
              Transactions encrypted with 256-bit SSL &bull; Contact: client@webmedia.al
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
