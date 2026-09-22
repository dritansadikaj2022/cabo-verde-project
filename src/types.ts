export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string; // 'sofas' | 'lounge' | 'tables' | 'chairs' | 'bed' | 'lighting' | 'storage' | 'media-storage' or custom
  subcategory?: string; // 'Sectional' | 'Modular' | 'Lounge Chair' | 'Dining Table' | etc.
  room?: string; // 'living-room' | 'bedroom' | 'dining-room' | 'bathroom' | 'home-office'
  price?: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  description: string;
  details: string;
  returnPolicy: string;
  shippingInfo: string;
  warrantyInfo?: string;
  leadTime?: string;
  careInstructions?: string;
  architecturalSpecs?: string;
  pdfBrochureUrl?: string; // PDF file or link
  pdfBrochureName?: string; // e.g. "CaboVerde-SpecSheet.pdf"
  image: string; // Primary image
  images: string[]; // Gallery / secondary images
  colors?: { name: string; hex: string }[];
  inStock: boolean;
  dimensions?: string;
  material?: string;
  // Explicit Placement Toggles requested by user
  isPopular?: boolean; // add to popular picks [yes/no]
  isFeatured?: boolean; // add to featured [yes/no]
  isNewArrival?: boolean; // add to new arrivals [yes/no]
  isBestSeller?: boolean; // add to best sellers [yes/no]
  isHero?: boolean; // add to hero slider [yes/no]
  isTrending?: boolean; // add to trending [yes/no]
  displayLocations?: ('popular' | 'bestsellers' | 'trending' | 'rooms' | 'hero' | 'featured' | 'new-arrival')[];
}

export interface AdminUser {
  email: string;
  name?: string;
  role: 'admin';
  title?: string;
  phone?: string;
  companyName?: string;
  bio?: string;
  isAuthenticated: boolean;
  loginTime: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedOptions?: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  productCount: number;
  itemCount?: number;
  image: string;
  slug: string;
  subcategories?: string[];
  woodSpecies?: string;
  iconType?: string; // 'sofa' | 'chair' | 'bed' | 'tables' | 'storage' | 'tv' | 'lighting' | 'custom' | etc.
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tag?: string;
  tags: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface StoreTemplate {
  id: string;
  name: string;
  tagline: string;
  vendorName: string;
  primaryColor: string; // Tailwind hex or class
  accentColor: string;
  bgColor: string;
  cardBg: string;
  textColor: string;
  badgeBg: string;
  badgeText: string;
  fontHeading: string;
  fontBody: string;
  styleMode: 'obsidian' | 'travertine' | 'contemporary' | 'coastal-teak' | 'royal-emerald';
  description: string;
  features: string[];
}

export interface DomainVendorMapping {
  id: string;
  domain: string; // e.g. "caboverde-luxury.cv"
  vendorName: string; // e.g. "Cabo Verde Architectural Atelier"
  vendorEmail: string;
  templateId: string;
  country: string;
  currency: string;
  isActive: boolean;
}
