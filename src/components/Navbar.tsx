import React, { useState } from 'react';
import { Menu, Search, Heart, ChevronDown, X, ZoomIn, ShieldCheck, Mail } from 'lucide-react';
import { useDevice } from '../context/DeviceContext';
import { AdminUser } from '../types';

interface NavbarProps {
  cartCount?: number;
  wishlistCount: number;
  onOpenCart?: () => void;
  onOpenWishlist: () => void;
  onOpenMobileMenu: () => void;
  onSelectCategory: (cat: string) => void;
  onSearch: (query: string) => void;
  onOpenZoomDemo?: () => void;
  onOpenAdmin: () => void;
  adminUser: AdminUser | null;
  onOpenContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  wishlistCount,
  onOpenWishlist,
  onOpenMobileMenu,
  onSelectCategory,
  onSearch,
  onOpenZoomDemo,
  onOpenAdmin,
  adminUser,
  onOpenContact,
}) => {
  const { isMobileView, scrollDirection, scrollProgress, scrollY } = useDevice();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  // Scroll reaction: slim down or shift on scroll down vs up
  const isScrolled = scrollY > 60;
  const isScrollingDown = scrollDirection === 'down' && scrollY > 180;

  return (
    <>
      {/* Scroll Depth Progress Bar (0 to 100%) */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100 transition-all duration-300 ${
          isScrollingDown ? 'shadow-md py-1 -translate-y-1' : 'py-0'
        } ${isScrolled ? 'shadow-sm' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          
          {/* Left: Mobile Menu Trigger & Logo */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Mobile Hamburger Button */}
            {(isMobileView || true) && (
              <button
                onClick={onOpenMobileMenu}
                className={`${isMobileView ? 'flex' : 'md:hidden'} p-2 rounded-xl text-neutral-800 hover:text-red-600 hover:bg-neutral-100 focus:outline-none transition-colors cursor-pointer mobile-menu-btn`}
                aria-label="Open Mobile Navigation Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            )}

            <a href="#home" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-neutral-900 group-hover:bg-red-600 flex items-center justify-center text-white font-black text-sm tracking-tighter shadow-md transition-all group-hover:scale-105">
                CV
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg sm:text-xl tracking-tight text-neutral-900 group-hover:text-red-600 transition-colors">
                  CABO VERDE
                </span>
                <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold -mt-1">
                  Living &amp; Design
                </span>
              </div>
            </a>
          </div>

          {/* Center: Desktop Navigation */}
          {!isMobileView && (
            <nav className="desktop-nav hidden md:flex items-center gap-6 lg:gap-8 text-[14px] font-semibold text-neutral-700">
              <a href="#home" className="text-red-600 hover:text-red-700 transition-colors">
                Home
              </a>

              <a 
                href="#popular-picks" 
                onClick={() => onSelectCategory('all')} 
                className="hover:text-red-600 transition-colors"
              >
                Catalog
              </a>

              {/* Living Dropdown */}
              <div className="relative group py-2">
                <button className="flex items-center gap-1 hover:text-red-600 transition-colors focus:outline-none cursor-pointer">
                  <span>Living</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-red-600 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute left-0 top-full hidden group-hover:block w-48 bg-white border border-neutral-100 shadow-xl rounded-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <a href="#popular-picks" onClick={() => onSelectCategory('sofas')} className="block px-4 py-2 hover:bg-neutral-50 hover:text-red-600 text-sm">
                    Sofas &amp; Sectionals
                  </a>
                  <a href="#popular-picks" onClick={() => onSelectCategory('lounge')} className="block px-4 py-2 hover:bg-neutral-50 hover:text-red-600 text-sm">
                    Lounge Chairs
                  </a>
                  <a href="#popular-picks" onClick={() => onSelectCategory('chairs')} className="block px-4 py-2 hover:bg-neutral-50 hover:text-red-600 text-sm">
                    Accent Chairs
                  </a>
                  <a href="#popular-picks" onClick={() => onSelectCategory('tables')} className="block px-4 py-2 hover:bg-neutral-50 hover:text-red-600 text-sm">
                    Coffee Tables
                  </a>
                </div>
              </div>

              {/* Dining Dropdown */}
              <div className="relative group py-2">
                <button className="flex items-center gap-1 hover:text-red-600 transition-colors focus:outline-none cursor-pointer">
                  <span>Dining</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-red-600 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute left-0 top-full hidden group-hover:block w-48 bg-white border border-neutral-100 shadow-xl rounded-xl py-2 z-50">
                  <a href="#popular-picks" onClick={() => onSelectCategory('chairs')} className="block px-4 py-2 hover:bg-neutral-50 hover:text-red-600 text-sm">
                    Dining Chairs
                  </a>
                  <a href="#popular-picks" onClick={() => onSelectCategory('tables')} className="block px-4 py-2 hover:bg-neutral-50 hover:text-red-600 text-sm">
                    Dining Tables
                  </a>
                </div>
              </div>

              {/* Bedroom Dropdown */}
              <div className="relative group py-2">
                <button className="flex items-center gap-1 hover:text-red-600 transition-colors focus:outline-none cursor-pointer">
                  <span>Bedroom</span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-red-600 group-hover:rotate-180 transition-transform duration-200" />
                </button>
                <div className="absolute left-0 top-full hidden group-hover:block w-48 bg-white border border-neutral-100 shadow-xl rounded-xl py-2 z-50">
                  <a href="#popular-picks" onClick={() => onSelectCategory('bed')} className="block px-4 py-2 hover:bg-neutral-50 hover:text-red-600 text-sm">
                    Storage Beds
                  </a>
                  <a href="#popular-picks" onClick={() => onSelectCategory('all')} className="block px-4 py-2 hover:bg-neutral-50 hover:text-red-600 text-sm">
                    Nightstands
                  </a>
                </div>
              </div>

              <a href="#shop-by-room" className="hover:text-red-600 transition-colors">
                Rooms
              </a>

              <a href="#trending-section" onClick={() => onSelectCategory('lighting')} className="hover:text-red-600 transition-colors">
                Lighting
              </a>
              
              <button 
                onClick={onOpenContact} 
                className="hover:text-red-600 transition-colors cursor-pointer text-left"
              >
                Inquire (client@webmedia.al)
              </button>
            </nav>
          )}

          {/* Right: Search, Zoom Loupe, Wishlist, Admin Portal Button */}
          <div className="flex items-center gap-2 sm:gap-3 text-neutral-800">
            
            {/* Quick Zoom Trigger Pill */}
            {onOpenZoomDemo && (
              <button
                onClick={onOpenZoomDemo}
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                title="Open Product Zoom Loupe Demo"
              >
                <ZoomIn className="w-3.5 h-3.5 text-amber-600" />
                <span>Zoom Loupe</span>
              </button>
            )}

            {/* Search Trigger */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center bg-neutral-100 rounded-full pl-3 pr-2 py-1.5 animate-in fade-in duration-200">
                  <input
                    type="text"
                    placeholder="Search catalog..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-xs text-neutral-800 focus:outline-none w-28 sm:w-44 placeholder-neutral-400"
                    autoFocus
                  />
                  <button type="submit" className="p-1 text-neutral-600 hover:text-red-600">
                    <Search className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setSearchOpen(false)}
                    className="p-1 text-neutral-400 hover:text-neutral-700 ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-neutral-700 hover:text-red-600 transition-colors cursor-pointer rounded-full hover:bg-neutral-100"
                  aria-label="Open Search"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Wishlist / Curated Collection Button */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-neutral-700 hover:text-red-600 transition-colors relative cursor-pointer rounded-full hover:bg-neutral-100"
              aria-label="Saved Collection"
              title="Saved Collection"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Admin Portal / Sign In Button (REPLACED CART) */}
            <button
              onClick={onOpenAdmin}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
                adminUser
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700 hover:bg-emerald-900'
                  : 'bg-neutral-900 hover:bg-red-600 text-white'
              }`}
              title={adminUser ? 'Open Product Catalog Management' : 'Admin Sign In (client@webmedia.al)'}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs">
                {adminUser ? 'Admin Portal' : 'Admin Login'}
              </span>
            </button>

          </div>

        </div>
      </header>
    </>
  );
};
