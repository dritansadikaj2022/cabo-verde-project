import React, { useState } from 'react';
import { X, ChevronDown, ChevronRight, Mail, Phone, MapPin, Heart, ShieldCheck, Search, Sparkles, LogIn } from 'lucide-react';
import { AdminUser } from '../types';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (cat: string) => void;
  onOpenCart?: () => void;
  onOpenWishlist: () => void;
  onOpenContact?: () => void;
  onOpenAdmin: () => void;
  adminUser: AdminUser | null;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  onOpenWishlist,
  onOpenContact,
  onOpenAdmin,
  adminUser,
}) => {
  const [openSection, setOpenSection] = useState<string | null>('living');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSection = (sec: string) => {
    setOpenSection(openSection === sec ? null : sec);
  };

  const handleCategoryClick = (cat: string) => {
    onSelectCategory(cat);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over Drawer Panel */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
        
        {/* Header */}
        <div className="p-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-neutral-900 flex items-center justify-center text-white font-black text-xs shadow-sm">
              CV
            </div>
            <div>
              <span className="font-black text-base tracking-tight text-neutral-900">CABO VERDE</span>
              <p className="text-[9px] text-neutral-400 uppercase tracking-widest font-bold">Living &amp; Design</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/60 transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search input in mobile menu */}
        <div className="p-3 border-b border-neutral-100">
          <div className="flex items-center bg-neutral-100 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-neutral-400 mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search catalog &amp; collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs w-full focus:outline-none text-neutral-800 placeholder-neutral-400"
            />
          </div>
        </div>

        {/* Quick action bar: Admin Portal & Curated Wishlist (NO CART) */}
        <div className="grid grid-cols-2 gap-2 p-3 bg-neutral-50 border-b border-neutral-100 text-xs font-bold">
          <button
            onClick={() => { onClose(); onOpenAdmin(); }}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl border transition-colors shadow-xs cursor-pointer ${
              adminUser
                ? 'bg-emerald-900 text-emerald-200 border-emerald-800'
                : 'bg-neutral-900 text-white border-neutral-900 hover:bg-red-600'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>{adminUser ? 'Admin Portal' : 'Admin Login'}</span>
          </button>
          
          <button
            onClick={() => { onClose(); onOpenWishlist(); }}
            className="flex items-center justify-center gap-2 py-2.5 bg-white rounded-xl border border-neutral-200 text-neutral-800 hover:bg-neutral-50 shadow-xs cursor-pointer"
          >
            <Heart className="w-4 h-4 text-red-600" />
            <span>Curated List</span>
          </button>
        </div>

        {/* Nav list with smooth expandable accordions */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1 text-sm font-semibold text-neutral-800 divide-y divide-neutral-100">
          
          {/* Living Section */}
          <div className="py-1">
            <button
              onClick={() => toggleSection('living')}
              className="w-full flex items-center justify-between py-2 px-3 hover:bg-neutral-50 rounded-xl transition-colors cursor-pointer"
            >
              <span className="font-bold">Living Room</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openSection === 'living' ? 'rotate-180 text-red-600' : 'text-neutral-400'}`} />
            </button>
            {openSection === 'living' && (
              <div className="pl-5 pr-2 py-1.5 space-y-1 text-xs text-neutral-600 font-normal animate-in fade-in duration-150">
                <button onClick={() => handleCategoryClick('sofas')} className="w-full text-left py-1.5 px-2 hover:text-red-600 hover:bg-neutral-50 rounded-lg flex items-center justify-between">
                  <span>Sofas &amp; Sectionals</span>
                  <ChevronRight className="w-3 h-3 text-neutral-400" />
                </button>
                <button onClick={() => handleCategoryClick('lounge')} className="w-full text-left py-1.5 px-2 hover:text-red-600 hover:bg-neutral-50 rounded-lg flex items-center justify-between">
                  <span>Lounge Chairs</span>
                  <ChevronRight className="w-3 h-3 text-neutral-400" />
                </button>
                <button onClick={() => handleCategoryClick('tables')} className="w-full text-left py-1.5 px-2 hover:text-red-600 hover:bg-neutral-50 rounded-lg flex items-center justify-between">
                  <span>Coffee Tables</span>
                  <ChevronRight className="w-3 h-3 text-neutral-400" />
                </button>
              </div>
            )}
          </div>

          {/* Dining Section */}
          <div className="py-1">
            <button
              onClick={() => toggleSection('dining')}
              className="w-full flex items-center justify-between py-2 px-3 hover:bg-neutral-50 rounded-xl transition-colors cursor-pointer"
            >
              <span className="font-bold">Dining Room</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openSection === 'dining' ? 'rotate-180 text-red-600' : 'text-neutral-400'}`} />
            </button>
            {openSection === 'dining' && (
              <div className="pl-5 pr-2 py-1.5 space-y-1 text-xs text-neutral-600 font-normal animate-in fade-in duration-150">
                <button onClick={() => handleCategoryClick('chairs')} className="w-full text-left py-1.5 px-2 hover:text-red-600 hover:bg-neutral-50 rounded-lg flex items-center justify-between">
                  <span>Dining Chairs</span>
                  <ChevronRight className="w-3 h-3 text-neutral-400" />
                </button>
                <button onClick={() => handleCategoryClick('tables')} className="w-full text-left py-1.5 px-2 hover:text-red-600 hover:bg-neutral-50 rounded-lg flex items-center justify-between">
                  <span>Dining Tables</span>
                  <ChevronRight className="w-3 h-3 text-neutral-400" />
                </button>
              </div>
            )}
          </div>

          {/* Bedroom Section */}
          <div className="py-1">
            <button
              onClick={() => toggleSection('bedroom')}
              className="w-full flex items-center justify-between py-2 px-3 hover:bg-neutral-50 rounded-xl transition-colors cursor-pointer"
            >
              <span className="font-bold">Bedroom</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openSection === 'bedroom' ? 'rotate-180 text-red-600' : 'text-neutral-400'}`} />
            </button>
            {openSection === 'bedroom' && (
              <div className="pl-5 pr-2 py-1.5 space-y-1 text-xs text-neutral-600 font-normal animate-in fade-in duration-150">
                <button onClick={() => handleCategoryClick('bed')} className="w-full text-left py-1.5 px-2 hover:text-red-600 hover:bg-neutral-50 rounded-lg flex items-center justify-between">
                  <span>Hydraulic Storage Beds</span>
                  <ChevronRight className="w-3 h-3 text-neutral-400" />
                </button>
              </div>
            )}
          </div>

          {/* Storage Section */}
          <div className="py-1">
            <button
              onClick={() => handleCategoryClick('storage')}
              className="w-full flex items-center justify-between py-2 px-3 text-left hover:text-red-600 hover:bg-neutral-50 rounded-xl transition-colors cursor-pointer"
            >
              <span>Storage &amp; Credenzas</span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>
          </div>

          {/* Lighting */}
          <div className="py-1">
            <button
              onClick={() => handleCategoryClick('lighting')}
              className="w-full flex items-center justify-between py-2 px-3 text-left hover:text-red-600 hover:bg-neutral-50 rounded-xl transition-colors cursor-pointer"
            >
              <span>Lighting &amp; Lamps</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            </button>
          </div>

          <div className="py-1">
            <button 
              onClick={() => { onClose(); onOpenContact && onOpenContact(); }}
              className="w-full flex items-center justify-between py-2 px-3 text-left hover:text-red-600 hover:bg-neutral-50 rounded-xl transition-colors cursor-pointer font-bold text-red-600"
            >
              <span>Concierge Quote Inquiries</span>
              <Mail className="w-4 h-4 text-red-600" />
            </button>
          </div>

        </div>

        {/* Footer info & Direct Email routing to client@webmedia.al */}
        <div className="p-4 border-t border-neutral-100 bg-neutral-50 text-xs text-neutral-600 space-y-2">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-red-600 flex-shrink-0" />
            <a 
              href="mailto:client@webmedia.al" 
              className="text-red-600 font-bold hover:underline"
            >
              client@webmedia.al
            </a>
          </div>
          <div className="flex items-center gap-2 text-neutral-500">
            <Phone className="w-3.5 h-3.5 text-neutral-400" />
            <span>Customer Desk: 123-456-7890</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-500">
            <MapPin className="w-3.5 h-3.5 text-neutral-400" />
            <span>San Francisco Flagship Studio</span>
          </div>
        </div>

      </div>
    </div>
  );
};
