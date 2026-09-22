import React, { useState, useEffect, useRef, MouseEvent, TouchEvent } from 'react';
import { 
  X, Heart, Star, ShieldCheck, Truck, RotateCcw, ZoomIn, Maximize2, 
  Mail, Check, Share2, Sparkles, MessageSquare, FileText, Download, 
  Clock, Sparkle, Wrench, ShieldAlert
} from 'lucide-react';
import { Product } from '../types';
import { useDevice } from '../context/DeviceContext';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: Product, quantity: number, options?: Record<string, string>) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onOpenContact: (sku?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onOpenContact,
}) => {
  const { isMobileView } = useDevice();
  if (!isOpen || !product) return null;

  // Selected Options
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : 'Natural Solid Walnut'
  );
  const [selectedMaterial, setSelectedMaterial] = useState<string>('Top-Grain Italian Fabric');
  const [activeAccordion, setActiveAccordion] = useState<string | null>('info');
  const [isCopied, setIsCopied] = useState(false);

  // Sync image when product changes
  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
    }
  }, [product]);

  // Zoom Loupe State
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(2.5);
  const [zoomPos, setZoomPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [fullscreenZoom, setFullscreenZoom] = useState<boolean>(false);
  const [fullscreenScale, setFullscreenScale] = useState<number>(2);

  const imageStageRef = useRef<HTMLDivElement>(null);

  // High-Resolution Gallery Views (dynamically derived from product)
  const gallery = React.useMemo(() => {
    const list: string[] = [];
    if (product.image) list.push(product.image);
    if (product.images && product.images.length > 0) {
      product.images.forEach((img) => {
        if (!list.includes(img)) list.push(img);
      });
    }
    // If fewer than 2, provide luxury angle presets
    if (list.length < 2) {
      list.push('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1400&q=85');
      list.push('https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1400&q=85');
    }
    return list;
  }, [product]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageStageRef.current) return;
    const { left, top, width, height } = imageStageRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setZoomPos({ x, y });
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!imageStageRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const { left, top, width, height } = imageStageRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((touch.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((touch.clientY - top) / height) * 100));
    setZoomPos({ x, y });
    setIsHovering(true);
  };

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200">
        
        {/* Main Modal Dialog */}
        <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl overflow-hidden my-auto relative max-h-[94vh] flex flex-col border border-neutral-100">
          
          {/* Top Bar with SKU & Close */}
          <div className="px-5 sm:px-6 py-3.5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/80">
            <div className="flex items-center gap-2 text-xs text-neutral-500 flex-wrap">
              <span className="font-black text-neutral-900">CABO VERDE</span>
              <span>/</span>
              <span className="capitalize font-medium">{product.category}</span>
              <span>/</span>
              <span className="font-mono text-neutral-800 bg-white px-2 py-0.5 rounded border border-neutral-200 font-bold">
                SKU: {product.sku}
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 transition-colors cursor-pointer"
                title="Share link"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Content Scrollable Area */}
          <div className="overflow-y-auto p-4 sm:p-8 flex-1">
            <div className={`grid gap-8 ${isMobileView ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'}`}>
              
              {/* Left: Images & Interactive Product Zoom Stage */}
              <div className={`${isMobileView ? 'w-full' : 'lg:col-span-7'} flex flex-col sm:flex-row-reverse gap-4`}>
                
                {/* Main Zoom Loupe Stage */}
                <div className="flex-1 flex flex-col">
                  
                  {/* Zoom Controls Bar above Image */}
                  <div className="flex items-center justify-between mb-2 px-1 text-xs">
                    <span className="inline-flex items-center gap-1 font-bold text-neutral-800">
                      <ZoomIn className="w-3.5 h-3.5 text-red-600" />
                      <span>Optical Loupe: {zoomLevel}x</span>
                    </span>

                    <div className="flex items-center gap-1 bg-neutral-100 p-0.5 rounded-lg border border-neutral-200">
                      {[1.5, 2.5, 3.5].map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() => setZoomLevel(lvl)}
                          className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                            zoomLevel === lvl ? 'bg-red-600 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                          }`}
                        >
                          {lvl}x
                        </button>
                      ))}
                      <button
                        onClick={() => setFullscreenZoom(true)}
                        className="p-1 rounded text-neutral-600 hover:text-red-600 ml-1"
                        title="Fullscreen Lightbox"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Interactive Zoom Canvas with EXPANDED LARGE VIEW */}
                  <div
                    ref={imageStageRef}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onMouseMove={handleMouseMove}
                    onTouchStart={() => setIsHovering(true)}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={() => setIsHovering(false)}
                    className="relative w-full min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] aspect-square bg-gradient-to-b from-neutral-50 via-white to-neutral-100/70 rounded-2xl overflow-hidden border border-neutral-200 cursor-crosshair group/zoom select-none flex items-center justify-center p-1 sm:p-2 shadow-inner"
                  >
                    {/* Primary Image with Dynamic Loupe Scale and Transform Origin */}
                    <img
                      src={selectedImage}
                      alt={product.name}
                      style={{
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                        transform: isHovering ? `scale(${zoomLevel})` : 'scale(1)',
                      }}
                      className="w-full h-full object-contain pointer-events-none transition-transform duration-75 ease-out"
                    />

                    {/* Cursor Loupe Follower Lens */}
                    {isHovering && (
                      <div
                        style={{
                          left: `${zoomPos.x}%`,
                          top: `${zoomPos.y}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                        className="absolute w-32 h-32 border-2 border-red-600 bg-red-600/10 rounded-2xl pointer-events-none shadow-2xl backdrop-contrast-125"
                      >
                        <div className="absolute top-1 left-1.5 text-[9px] font-mono font-bold text-red-700 bg-white/90 px-1 rounded shadow-xs">
                          {Math.round(zoomPos.x)}%:{Math.round(zoomPos.y)}%
                        </div>
                      </div>
                    )}

                    {/* Zoom Status Badge */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <span className="bg-neutral-900/80 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Hover or touch to inspect texture</span>
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFullscreenZoom(true);
                        }}
                        className="pointer-events-auto bg-white hover:bg-neutral-900 hover:text-white text-neutral-800 p-2 rounded-full shadow-lg hover:scale-105 transition-all cursor-pointer"
                        title="Fullscreen Zoom"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-neutral-500 text-center mt-2.5">
                    Move cursor across image to inspect wood grain, precision dovetail joinery, and premium upholstery fabric.
                  </p>
                </div>

                {/* Gallery Thumbnails */}
                <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-y-auto no-scrollbar sm:w-20">
                  {gallery.map((img, idx) => {
                    const isSelected = selectedImage === img;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden p-1 bg-neutral-50 flex-shrink-0 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-2 border-red-600 ring-2 ring-red-100 scale-102'
                            : 'border border-neutral-200 hover:border-neutral-400 opacity-80 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-contain" />
                      </button>
                    );
                  })}
                </div>

              </div>

              {/* Right: Details & Order Controls */}
              <div className={`${isMobileView ? 'w-full' : 'lg:col-span-5'} flex flex-col justify-between`}>
                <div>
                  
                  {/* Reviews & Rating */}
                  <div className="flex items-center gap-2 mb-2 text-xs">
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="font-extrabold text-neutral-900">{product.rating || 4.9}</span>
                    <span className="text-neutral-400">({product.reviewsCount || 42} reviews)</span>
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight leading-snug mb-3">
                    {product.name}
                  </h1>

                  {/* Architectural Badge & Stock Status (NO PRICES) */}
                  <div className="flex flex-wrap items-center gap-2.5 mb-4">
                    <span className="text-xs font-mono font-bold text-neutral-800 bg-neutral-100 px-3 py-1 rounded-lg border border-neutral-200">
                      SKU: {product.sku}
                    </span>
                    <span className="text-[11px] font-bold text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                      Bespoke Architectural Build
                    </span>
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      Solid Hardwood Certified
                    </span>
                  </div>

                  {/* PDF Brochure Document Card (if uploaded) */}
                  {product.pdfBrochureUrl && (
                    <div className="mb-5 bg-gradient-to-r from-red-50/80 via-white to-amber-50/60 border border-red-200/90 rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-xs">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                              Architectural PDF
                            </span>
                            <span className="text-[10px] text-neutral-500 font-mono">CAD &amp; Material Specs</span>
                          </div>
                          <p className="text-xs font-bold text-neutral-900 mt-0.5 truncate">
                            {product.pdfBrochureName || `${product.name} - Architectural Spec Sheet.pdf`}
                          </p>
                        </div>
                      </div>

                      <a
                        href={product.pdfBrochureUrl}
                        download={product.pdfBrochureName || `${product.sku}-Architectural-Brochure.pdf`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-neutral-900 hover:bg-red-600 text-white text-xs font-bold rounded-xl transition-all shadow-sm active:scale-95 flex-shrink-0 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </a>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6 font-normal">
                    {product.description}
                  </p>

                  {/* Color / Wood Finish Swatches */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between text-xs font-bold text-neutral-800 mb-2">
                      <span>Wood &amp; Finish: <span className="font-semibold text-red-600">{selectedColor}</span></span>
                    </div>
                    <div className="flex items-center gap-3">
                      {(product.colors && product.colors.length > 0
                        ? product.colors
                        : [
                            { name: 'Warm American Walnut', hex: '#5c3a21' },
                            { name: 'Solid Natural Oak', hex: '#b5926b' },
                            { name: 'Smoked Charcoal Ash', hex: '#2b2d42' },
                            { name: 'Brushed Brass Accent', hex: '#d4af37' },
                          ]
                      ).map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c.name)}
                          style={{ backgroundColor: c.hex }}
                          className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer shadow-sm ${
                            selectedColor === c.name
                              ? 'border-red-600 scale-110 ring-2 ring-red-200'
                              : 'border-white hover:scale-105'
                          }`}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Material Option */}
                  <div className="mb-5">
                    <label className="block text-xs font-bold text-neutral-800 mb-2">
                      Upholstery Material
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {['Top-Grain Italian Fabric', 'Belgian Natural Linen', 'Full-Aniline Leather'].map((mat) => (
                        <button
                          key={mat}
                          onClick={() => setSelectedMaterial(mat)}
                          className={`py-2 px-3 rounded-xl border text-left transition-all cursor-pointer ${
                            selectedMaterial === mat
                              ? 'border-red-600 bg-red-50/50 text-red-900 font-bold'
                              : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                          }`}
                        >
                          {mat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Direct Architectural Inquiries & Bespoke Actions (NO ADD TO CART, NO PRICES) */}
                  <div className="space-y-3 mb-6 mt-4">
                    <button
                      onClick={() => {
                        if (onOpenContact) {
                          onOpenContact(product.sku);
                        }
                      }}
                      className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-black py-4 px-6 rounded-2xl shadow-lg shadow-red-600/25 transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Request Architectural Quote &bull; SKU: {product.sku}</span>
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => onToggleWishlist(product)}
                        className={`py-3 px-4 border rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isWishlisted
                            ? 'border-red-600 bg-red-50 text-red-600'
                            : 'border-neutral-300 hover:border-neutral-900 text-neutral-800'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                        <span>{isWishlisted ? 'Saved in Collection' : 'Save to Collection'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenContact && onOpenContact(product.sku)}
                        className="py-3 px-4 border border-neutral-300 hover:border-neutral-900 rounded-xl text-xs font-bold text-neutral-800 hover:text-neutral-900 transition-colors flex items-center justify-center gap-2 cursor-pointer text-center"
                      >
                        <Mail className="w-4 h-4 text-amber-600" />
                        <span>Email Concierge</span>
                      </button>
                    </div>
                  </div>

                  {/* Guarantees */}
                  <div className="grid grid-cols-3 gap-2 py-4 border-y border-neutral-100 text-[11px] text-neutral-600 text-center mb-6">
                    <div className="flex flex-col items-center gap-1">
                      <Truck className="w-4 h-4 text-red-600" />
                      <span>Free White Glove</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-red-600" />
                      <span>10-Year Warranty</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <RotateCcw className="w-4 h-4 text-red-600" />
                      <span>30-Day Trial</span>
                    </div>
                  </div>

                  {/* Accordions */}
                  <div className="border-t border-neutral-100 divide-y divide-neutral-100 text-xs">
                    {/* 1. Product Info & Joinery */}
                    <div>
                      <button
                        onClick={() => toggleAccordion('info')}
                        className="w-full py-3 flex items-center justify-between font-bold text-neutral-800 text-left hover:text-red-600 cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">
                          <Wrench className="w-3.5 h-3.5 text-neutral-500" />
                          <span>PRODUCT INFO &amp; JOINERY</span>
                        </span>
                        <span className="text-base font-normal">{activeAccordion === 'info' ? '−' : '+'}</span>
                      </button>
                      {activeAccordion === 'info' && (
                        <div className="pb-3 text-neutral-500 leading-relaxed animate-in fade-in duration-150 space-y-1.5">
                          <p>{product.architecturalSpecs || product.details || 'Hand-built structural core using kiln-dried solid beech and oak framing.'}</p>
                          <p><strong className="text-neutral-700">Material:</strong> {product.material || 'Solid Hardwood & Premium Architectural Fabric'}</p>
                          <p><strong className="text-neutral-700">Dimensions:</strong> {product.dimensions || 'Custom architectural sizing available via client@webmedia.al'}</p>
                        </div>
                      )}
                    </div>

                    {/* 2. Shipping & Lead Time */}
                    <div>
                      <button
                        onClick={() => toggleAccordion('shipping')}
                        className="w-full py-3 flex items-center justify-between font-bold text-neutral-800 text-left hover:text-red-600 cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-neutral-500" />
                          <span>SHIPPING, FREIGHT &amp; LEAD TIME</span>
                        </span>
                        <span className="text-base font-normal">{activeAccordion === 'shipping' ? '−' : '+'}</span>
                      </button>
                      {activeAccordion === 'shipping' && (
                        <div className="pb-3 text-neutral-500 leading-relaxed animate-in fade-in duration-150 space-y-1.5">
                          <p><strong className="text-neutral-700">White Glove Delivery:</strong> {product.shippingInfo || 'Complimentary inside delivery and room placement in 5-7 business days.'}</p>
                          <p><strong className="text-neutral-700">Production Lead Time:</strong> {product.leadTime || 'Handcrafted to order in 2-3 weeks; expedited architectural dispatch available upon request.'}</p>
                          <p>All crating is climate-controlled and reinforced for overseas or inter-island maritime transit.</p>
                        </div>
                      )}
                    </div>

                    {/* 3. 10-Year Warranty */}
                    <div>
                      <button
                        onClick={() => toggleAccordion('warranty')}
                        className="w-full py-3 flex items-center justify-between font-bold text-neutral-800 text-left hover:text-red-600 cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
                          <span>10-YEAR STRUCTURAL WARRANTY</span>
                        </span>
                        <span className="text-base font-normal">{activeAccordion === 'warranty' ? '−' : '+'}</span>
                      </button>
                      {activeAccordion === 'warranty' && (
                        <div className="pb-3 text-neutral-500 leading-relaxed animate-in fade-in duration-150 space-y-1">
                          <p>{product.warrantyInfo || '10-Year Master Joinery & Solid Hardwood Structural Guarantee covering internal frames, dovetail joinery, and hydraulic components.'}</p>
                          <p>Backed by official Cabo Verde certificate of origin.</p>
                        </div>
                      )}
                    </div>

                    {/* 4. Care & Maintenance */}
                    <div>
                      <button
                        onClick={() => toggleAccordion('care')}
                        className="w-full py-3 flex items-center justify-between font-bold text-neutral-800 text-left hover:text-red-600 cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-neutral-500" />
                          <span>CARE &amp; MAINTENANCE</span>
                        </span>
                        <span className="text-base font-normal">{activeAccordion === 'care' ? '−' : '+'}</span>
                      </button>
                      {activeAccordion === 'care' && (
                        <div className="pb-3 text-neutral-500 leading-relaxed animate-in fade-in duration-150 space-y-1">
                          <p>{product.careInstructions || 'Dust regularly with soft microfiber cloth. Nourish solid wood annually with organic beeswax. Protect from direct persistent sunlight.'}</p>
                          <p>For upholstery, blot spills immediately with an undyed absorbent cloth.</p>
                        </div>
                      )}
                    </div>

                    {/* 5. Return Policy */}
                    <div>
                      <button
                        onClick={() => toggleAccordion('return')}
                        className="w-full py-3 flex items-center justify-between font-bold text-neutral-800 text-left hover:text-red-600 cursor-pointer"
                      >
                        <span className="flex items-center gap-1.5">
                          <RotateCcw className="w-3.5 h-3.5 text-neutral-500" />
                          <span>RETURN &amp; REFUND POLICY</span>
                        </span>
                        <span className="text-base font-normal">{activeAccordion === 'return' ? '−' : '+'}</span>
                      </button>
                      {activeAccordion === 'return' && (
                        <div className="pb-3 text-neutral-500 leading-relaxed animate-in fade-in duration-150">
                          {product.returnPolicy || 'We offer a hassle-free 30-day trial. If this design does not perfectly complement your interior, Cabo Verde will arrange complimentary pickup and issue a complete refund.'}
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Fullscreen High-Resolution Lightbox Zoom */}
      {fullscreenZoom && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200 select-none">
          
          <div className="flex items-center justify-between text-white border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-3">
              <span className="font-black text-sm">{product.name}</span>
              <span className="text-xs text-neutral-400">Ultra High-Res Inspection Canvas</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-neutral-800 rounded-lg p-1 text-xs">
                <button
                  onClick={() => setFullscreenScale(1)}
                  className={`px-2 py-1 rounded font-bold ${fullscreenScale === 1 ? 'bg-red-600 text-white' : 'text-neutral-400'}`}
                >
                  1x
                </button>
                <button
                  onClick={() => setFullscreenScale(2)}
                  className={`px-2 py-1 rounded font-bold ${fullscreenScale === 2 ? 'bg-red-600 text-white' : 'text-neutral-400'}`}
                >
                  2x
                </button>
                <button
                  onClick={() => setFullscreenScale(3.5)}
                  className={`px-2 py-1 rounded font-bold ${fullscreenScale === 3.5 ? 'bg-red-600 text-white' : 'text-neutral-400'}`}
                >
                  3.5x
                </button>
              </div>

              <button
                onClick={() => setFullscreenZoom(false)}
                className="p-2 rounded-full bg-neutral-800 hover:bg-red-600 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center overflow-auto p-4">
            <img
              src={selectedImage}
              alt={product.name}
              style={{ transform: `scale(${fullscreenScale})` }}
              className="max-h-[80vh] object-contain transition-transform duration-200"
            />
          </div>

          <div className="text-center text-xs text-neutral-400 pt-2">
            Click scale toggles to examine seams, grain, and joinery up to 3.5x magnification.
          </div>

        </div>
      )}
    </>
  );
};
