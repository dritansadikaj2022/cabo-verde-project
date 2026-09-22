/**
 * Cabo Verde - Luxury Furniture & Decor Web Application
 * Business: Cabo Verde
 * Inquiries: client@webmedia.al
 * Includes 5-part HTML integration, PHP mailer, responsive desktop/mobile view modes,
 * 3-second autoplay carousel, interactive Product Zoom Loupe, 30s OTP Admin Authentication,
 * and Product Upload & Placement Management Portal.
 */

import React, { useState, useEffect } from 'react';
import { DeviceProvider, useDevice } from './context/DeviceContext';
import { DeviceViewBar } from './components/DeviceViewBar';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { MobileDrawer } from './components/MobileDrawer';
import { HeroSlider } from './components/HeroSlider';
import { CategorySlider } from './components/CategorySlider';
import { PromoBanners } from './components/PromoBanners';
import { PopularPicks } from './components/PopularPicks';
import { ShopByRoom } from './components/ShopByRoom';
import { BestSellers } from './components/BestSellers';
import { HolidaySaleBanner } from './components/HolidaySaleBanner';
import { TrendingProducts } from './components/TrendingProducts';
import { HomeOfficeAccessories } from './components/HomeOfficeAccessories';
import { AboutSection } from './components/AboutSection';
import { FAQSection } from './components/FAQSection';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ContactModal } from './components/ContactModal';
import { CodeExportModal } from './components/CodeExportModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { AdminPortal } from './components/AdminPortal';
import { PRODUCTS, CATEGORIES as DEFAULT_CATEGORIES } from './data/products';
import { STORE_TEMPLATES, DEFAULT_DOMAIN_MAPPINGS } from './data/templates';
import { Product, AdminUser, Category, StoreTemplate, DomainVendorMapping } from './types';
import { Check, Heart, ArrowUp, Home, Grid, ZoomIn, ShieldCheck, Mail } from 'lucide-react';

function CaboVerdeApp() {
  const { deviceMode, setDeviceMode, isMobileView, scrollY } = useDevice();

  // Products & Custom Uploaded Products State with LocalStorage Persistence
  const [customProducts, setCustomProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('cabo_verde_uploaded_products');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Categories State with LocalStorage Persistence
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem('cabo_verde_categories');
      return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
    } catch {
      return DEFAULT_CATEGORIES;
    }
  });

  // Store Templates State with LocalStorage Persistence
  const [templates, setTemplates] = useState<StoreTemplate[]>(() => {
    try {
      const saved = localStorage.getItem('cabo_verde_templates');
      return saved ? JSON.parse(saved) : STORE_TEMPLATES;
    } catch {
      return STORE_TEMPLATES;
    }
  });

  // Active Template ID with LocalStorage Persistence
  const [activeTemplateId, setActiveTemplateId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('cabo_verde_active_template_id');
      return saved || STORE_TEMPLATES[0].id;
    } catch {
      return STORE_TEMPLATES[0].id;
    }
  });

  // Domain Mappings with LocalStorage Persistence
  const [domainMappings, setDomainMappings] = useState<DomainVendorMapping[]>(() => {
    try {
      const saved = localStorage.getItem('cabo_verde_domain_mappings');
      return saved ? JSON.parse(saved) : DEFAULT_DOMAIN_MAPPINGS;
    } catch {
      return DEFAULT_DOMAIN_MAPPINGS;
    }
  });

  const activeTemplate: StoreTemplate = React.useMemo(() => {
    return templates.find((t) => t.id === activeTemplateId) || templates[0] || STORE_TEMPLATES[0];
  }, [templates, activeTemplateId]);

  // Combined product catalog: base PRODUCTS + uploaded customProducts
  const allProducts: Product[] = React.useMemo(() => {
    return [...customProducts, ...PRODUCTS];
  }, [customProducts]);

  // Selected Category & Product Zoom Modal
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeZoomProduct, setActiveZoomProduct] = useState<Product | null>(null);
  const [contactSku, setContactSku] = useState<string | undefined>(undefined);

  // Curated Collection (Wishlist)
  const [wishlist, setWishlist] = useState<Product[]>([PRODUCTS[0], PRODUCTS[4]]);

  // Admin User & Auth State with LocalStorage Persistence
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem('cabo_verde_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState<boolean>(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState<boolean>(false);

  // Other Modals & Drawers state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCodeExportOpen, setIsCodeExportOpen] = useState(false);

  // Toast Notification state
  const [toast, setToast] = useState<{ message: string; icon?: 'wishlist' | 'info' | 'admin' } | null>(null);

  const showToast = (message: string, icon: 'wishlist' | 'info' | 'admin' = 'info') => {
    setToast({ message, icon });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  // Persist custom uploaded products
  const handleAddProduct = (newProduct: Product) => {
    const updated = [newProduct, ...customProducts];
    setCustomProducts(updated);
    try {
      localStorage.setItem('cabo_verde_uploaded_products', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast(`"${newProduct.name}" added to catalog`, 'admin');
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    const updated = customProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
    setCustomProducts(updated);
    try {
      localStorage.setItem('cabo_verde_uploaded_products', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast(`Updated display settings for "${updatedProduct.name}"`, 'admin');
  };

  const handleDeleteProduct = (productId: string) => {
    const updated = customProducts.filter((p) => p.id !== productId);
    setCustomProducts(updated);
    try {
      localStorage.setItem('cabo_verde_uploaded_products', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast('Product removed from catalog', 'admin');
  };

  // Category, Template, Domain & Account handlers
  const handleUpdateCategories = (updatedCategories: Category[]) => {
    setCategories(updatedCategories);
    try {
      localStorage.setItem('cabo_verde_categories', JSON.stringify(updatedCategories));
    } catch (e) {
      console.error(e);
    }
    showToast('Categories and icon mappings updated', 'admin');
  };

  const handleSelectTemplate = (templateId: string) => {
    setActiveTemplateId(templateId);
    try {
      localStorage.setItem('cabo_verde_active_template_id', templateId);
    } catch (e) {
      console.error(e);
    }
    const target = templates.find((t) => t.id === templateId);
    showToast(`Applied theme: ${target?.name || templateId}`, 'admin');
  };

  const handleUpdateTemplate = (updatedTemplate: StoreTemplate) => {
    const updated = templates.map((t) => (t.id === updatedTemplate.id ? updatedTemplate : t));
    setTemplates(updated);
    try {
      localStorage.setItem('cabo_verde_templates', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast(`Template "${updatedTemplate.name}" customized`, 'admin');
  };

  const handleUpdateDomainMappings = (updatedMappings: DomainVendorMapping[]) => {
    setDomainMappings(updatedMappings);
    try {
      localStorage.setItem('cabo_verde_domain_mappings', JSON.stringify(updatedMappings));
    } catch (e) {
      console.error(e);
    }
    showToast('Domain vendor routing updated', 'admin');
  };

  const handleUpdateAdminUser = (updatedAdmin: AdminUser) => {
    setAdminUser(updatedAdmin);
    try {
      localStorage.setItem('cabo_verde_admin_user', JSON.stringify(updatedAdmin));
    } catch (e) {
      console.error(e);
    }
    showToast('Admin profile & credentials updated', 'admin');
  };

  // Admin Auth Handlers
  const handleAdminAuthenticated = (admin: AdminUser) => {
    setAdminUser(admin);
    try {
      localStorage.setItem('cabo_verde_admin_user', JSON.stringify(admin));
    } catch (e) {
      console.error(e);
    }
    setIsAdminAuthOpen(false);
    setIsAdminPortalOpen(true);
    showToast(`Authenticated as ${admin.email}`, 'admin');
  };

  const handleAdminLogout = () => {
    setAdminUser(null);
    try {
      localStorage.removeItem('cabo_verde_admin_user');
    } catch (e) {
      console.error(e);
    }
    setIsAdminPortalOpen(false);
    showToast('Signed out of Admin Portal');
  };

  const handleOpenAdmin = () => {
    if (adminUser) {
      setIsAdminPortalOpen(true);
    } else {
      setIsAdminAuthOpen(true);
    }
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    if (wishlist.some((p) => p.id === product.id)) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
      showToast(`Removed "${product.name}" from collection`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved "${product.name}" to curated collection`, 'wishlist');
    }
  };

  const isWishlisted = (id: string) => wishlist.some((p) => p.id === id);

  const handleOpenContactWithSku = (sku?: string) => {
    setContactSku(sku);
    setIsContactOpen(true);
  };

  const handleOpenDemoZoom = () => {
    const sample = allProducts[0];
    setActiveZoomProduct(sample);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 flex flex-col selection:bg-red-600 selection:text-white font-sans relative">
      
      {/* Top Device Switcher & Code Export Toolbar */}
      <DeviceViewBar
        deviceMode={deviceMode}
        setDeviceMode={setDeviceMode}
        onOpenCodeExport={() => setIsCodeExportOpen(true)}
        onOpenDemoZoom={handleOpenDemoZoom}
        onOpenContact={() => handleOpenContactWithSku()}
        onOpenAdmin={handleOpenAdmin}
        adminUser={adminUser}
      />

      {/* Main App Container (Responsive vs Simulated Desktop vs Simulated Mobile) */}
      <div className={`flex-1 flex justify-center ${deviceMode === 'responsive' ? 'w-full' : 'py-6 px-2 sm:px-4'}`}>
        <div
          className={`bg-white text-neutral-900 transition-all duration-300 relative ${
            deviceMode === 'mobile'
              ? 'w-[390px] min-h-[844px] rounded-[44px] shadow-2xl border-[10px] border-neutral-900 overflow-hidden my-2 simulated-mobile'
              : deviceMode === 'desktop'
              ? 'w-[1280px] max-w-full rounded-2xl shadow-2xl border border-neutral-300 overflow-hidden'
              : 'w-full'
          }`}
        >
          
          {/* Top Announcement Bar with Active Template & Admin Inquiries */}
          <AnnouncementBar template={activeTemplate} adminEmail={adminUser?.email || 'client@webmedia.al'} />

          {/* Primary Navigation Bar (Cart removed, Admin Portal added) */}
          <Navbar
            wishlistCount={wishlist.length}
            onOpenWishlist={() => setIsWishlistOpen(true)}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
            onOpenZoomDemo={handleOpenDemoZoom}
            onOpenAdmin={handleOpenAdmin}
            adminUser={adminUser}
            onOpenContact={() => handleOpenContactWithSku()}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              scrollToSection('popular-picks');
            }}
            onSearch={(query) => {
              setSelectedCategory('all');
              scrollToSection('popular-picks');
              showToast(`Filtering catalog: ${query}`);
            }}
          />

          {/* Mobile Drawer (matching video) */}
          <MobileDrawer
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              scrollToSection('popular-picks');
            }}
            onOpenWishlist={() => setIsWishlistOpen(true)}
            onOpenContact={() => handleOpenContactWithSku()}
            onOpenAdmin={handleOpenAdmin}
            adminUser={adminUser}
          />

          <main id="main-content">
            {/* 1. Hero Section Slider with autoplay & transitions */}
            <HeroSlider onShopNow={() => scrollToSection('popular-picks')} />

            {/* 2. Shop By Category with BIGGER 3D WOOD-TEXTURED ICONS */}
            <CategorySlider
              categories={categories}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                scrollToSection('popular-picks');
              }}
            />

            {/* 3. Three Promo Banners with 3D hover effects */}
            <PromoBanners
              onShopCategory={(cat) => {
                setSelectedCategory(cat);
                scrollToSection('popular-picks');
              }}
            />

            {/* 4. Today's Popular Picks with 3-SECOND AUTOPLAY CAROUSEL (NO PRICES, NO ADD TO CART) */}
            <PopularPicks
              products={allProducts}
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => setSelectedCategory(cat)}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={isWishlisted}
              onOpenZoom={(p) => setActiveZoomProduct(p)}
              onOpenContact={(sku) => handleOpenContactWithSku(sku)}
            />

            {/* 5. Shop by Room Bento Grid */}
            <ShopByRoom
              onSelectRoom={(cat) => {
                setSelectedCategory(cat);
                scrollToSection('popular-picks');
              }}
            />

            {/* 6. Best Sellers Section with 3D Hover & Large View (NO PRICES, NO ADD TO CART) */}
            <BestSellers
              products={allProducts}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={isWishlisted}
              onOpenZoom={(p) => setActiveZoomProduct(p)}
              onOpenContact={(sku) => handleOpenContactWithSku(sku)}
            />

            {/* 7. Holiday Sale Banner */}
            <HolidaySaleBanner onGrabDeal={() => scrollToSection('popular-picks')} />

            {/* 8. Trending Products with 3D Hover & Zoom (NO PRICES, NO ADD TO CART) */}
            <TrendingProducts
              products={allProducts}
              onToggleWishlist={handleToggleWishlist}
              isWishlisted={isWishlisted}
              onOpenZoom={(p) => setActiveZoomProduct(p)}
              onOpenContact={(sku) => handleOpenContactWithSku(sku)}
            />

            {/* 9. Home Office & Accessories Banners */}
            <HomeOfficeAccessories
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                scrollToSection('popular-picks');
              }}
            />

            {/* 10. About Cabo Verde with Real Responsive Metrics */}
            <AboutSection onOpenContact={() => handleOpenContactWithSku()} />

            {/* 11. FAQ Section with Clean Mobile Wrap & client@webmedia.al routing */}
            <FAQSection />

            {/* 12. Blog & Design Trends Articles */}
            <BlogSection />
          </main>

          {/* 13. Dark Luxury Footer with Newsletter & client@webmedia.al */}
          <Footer
            onOpenContact={() => handleOpenContactWithSku()}
            onSelectCategory={(cat) => {
              setSelectedCategory(cat);
              scrollToSection('popular-picks');
            }}
          />

          {/* Mobile Bottom Sticky Navigation Quick Bar (Only visible in mobile view) */}
          {isMobileView && (
            <div className="sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 py-2 px-4 flex items-center justify-around shadow-lg">
              <button
                onClick={() => scrollToSection('home')}
                className="flex flex-col items-center gap-0.5 text-neutral-600 hover:text-red-600 transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span className="text-[10px] font-bold">Home</span>
              </button>

              <button
                onClick={() => scrollToSection('popular-picks')}
                className="flex flex-col items-center gap-0.5 text-neutral-600 hover:text-red-600 transition-colors cursor-pointer"
              >
                <Grid className="w-4 h-4" />
                <span className="text-[10px] font-bold">Catalog</span>
              </button>

              <button
                onClick={handleOpenDemoZoom}
                className="flex flex-col items-center gap-0.5 text-amber-600 hover:text-amber-700 transition-colors cursor-pointer"
              >
                <ZoomIn className="w-4 h-4" />
                <span className="text-[10px] font-bold">Zoom</span>
              </button>

              <button
                onClick={() => setIsWishlistOpen(true)}
                className="flex flex-col items-center gap-0.5 text-neutral-600 hover:text-red-600 transition-colors relative cursor-pointer"
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 right-2 bg-red-600 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
                <span className="text-[10px] font-bold">Saved</span>
              </button>

              <button
                onClick={handleOpenAdmin}
                className={`flex flex-col items-center gap-0.5 transition-colors cursor-pointer ${
                  adminUser ? 'text-emerald-700 font-black' : 'text-neutral-600 hover:text-red-600'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] font-bold">{adminUser ? 'Portal' : 'Admin'}</span>
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Floating Back To Top Button */}
      {scrollY > 300 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-neutral-900/90 hover:bg-red-600 text-white shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-sm group border border-neutral-700/50"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      {/* Product Detail & Zoom Modal (Interactive Loupe Lens - NO PRICE, NO ADD TO CART) */}
      <ProductDetailModal
        product={activeZoomProduct}
        isOpen={Boolean(activeZoomProduct)}
        onClose={() => setActiveZoomProduct(null)}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={activeZoomProduct ? isWishlisted(activeZoomProduct.id) : false}
        onOpenContact={(sku) => handleOpenContactWithSku(sku)}
      />

      {/* Curated Collection (Wishlist) Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveWishlist={(id) => {
          setWishlist((prev) => prev.filter((p) => p.id !== id));
          showToast('Removed from collection');
        }}
        onOpenZoom={(p) => setActiveZoomProduct(p)}
        onOpenContact={(sku) => handleOpenContactWithSku(sku)}
      />

      {/* Contact & Custom Quote Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultSku={contactSku}
      />

      {/* 5-Part HTML & PHP Code Export Modal */}
      <CodeExportModal
        isOpen={isCodeExportOpen}
        onClose={() => setIsCodeExportOpen(false)}
      />

      {/* Admin 2FA Authentication Modal with 30-Second OTP requirement */}
      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
        onAuthenticated={handleAdminAuthenticated}
      />

      {/* Admin Product Management & Upload Portal */}
      {adminUser && isAdminPortalOpen && (
        <AdminPortal
          admin={adminUser}
          products={allProducts}
          categories={categories}
          activeTemplate={activeTemplate}
          templates={templates}
          domainMappings={domainMappings}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onUpdateCategories={handleUpdateCategories}
          onSelectTemplate={handleSelectTemplate}
          onUpdateTemplate={handleUpdateTemplate}
          onUpdateDomainMappings={handleUpdateDomainMappings}
          onUpdateAdminUser={handleUpdateAdminUser}
          onLogout={handleAdminLogout}
          onClose={() => setIsAdminPortalOpen(false)}
          onPreviewProduct={(p) => setActiveZoomProduct(p)}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 left-6 z-50 bg-neutral-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 border border-neutral-700 animate-in slide-in-from-bottom duration-200">
          {toast.icon === 'wishlist' ? (
            <Heart className="w-4 h-4 text-red-500 fill-current" />
          ) : toast.icon === 'admin' ? (
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          ) : (
            <Check className="w-4 h-4 text-emerald-400" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

    </div>
  );
}

export default function App() {
  return (
    <DeviceProvider>
      <CaboVerdeApp />
    </DeviceProvider>
  );
}
