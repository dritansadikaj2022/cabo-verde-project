import { Product, Category, BlogPost } from '../types';

const RAW_CATEGORIES = [
  {
    id: 'sofa',
    name: 'Sofa & Sectionals',
    productCount: 20,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
    slug: 'sofas',
    woodSpecies: 'American Walnut',
    iconType: 'sofa',
    subcategories: ['Modular Sectional', '3-Seater Sofa', 'Daybed & Chaise', 'Curved Minimalist Sofa', 'Deep Lounge Sofa'],
  },
  {
    id: 'chair',
    name: 'Lounge & Accent Chairs',
    productCount: 14,
    image: 'https://images.unsplash.com/photo-1580481077194-43610996f874?auto=format&fit=crop&w=600&q=80',
    slug: 'chairs',
    woodSpecies: 'Natural White Oak',
    iconType: 'chair',
    subcategories: ['Sculptural Lounge Chair', 'Dining Chair', 'Club Armchair', 'Swivel Accent Chair', 'Occasional Chair'],
  },
  {
    id: 'stora-beds',
    name: 'Storage & Lift Beds',
    productCount: 8,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80',
    slug: 'bed',
    woodSpecies: 'Smoked Ash & Teak',
    iconType: 'bed',
    subcategories: ['Hydraulic Lift Bed', 'Floating Platform Bed', 'Upholstered Wingback Bed', 'Canopy Minimalist Bed'],
  },
  {
    id: 'tables',
    name: 'Tables & Desks',
    productCount: 16,
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=600&q=80',
    slug: 'tables',
    woodSpecies: 'Quarter-Sawn Teak',
    iconType: 'tables',
    subcategories: ['Solid Wood Dining Table', 'Monolithic Coffee Table', 'Fluted Console Table', 'Side Accent Table', 'Executive Desk'],
  },
  {
    id: 'storage',
    name: 'Storage & Credenzas',
    productCount: 14,
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80',
    slug: 'storage',
    woodSpecies: 'Carpathian Burl Elm',
    iconType: 'storage',
    subcategories: ['Credenza & Sideboard', 'Architectural Bookcase', 'Bar Cabinet', 'Low Horizon Dresser'],
  },
  {
    id: 'media-storage',
    name: 'Media & TV Consoles',
    productCount: 14,
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80',
    slug: 'media-storage',
    woodSpecies: 'Black Forest Walnut',
    iconType: 'tv',
    subcategories: ['Slatted Low TV Console', 'Floating Media Unit', 'Acoustic Sound Credenza'],
  },
  {
    id: 'lighting',
    name: 'Architectural Lighting',
    productCount: 8,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
    slug: 'lighting',
    woodSpecies: 'Turned Beech & Brass',
    iconType: 'lighting',
    subcategories: ['Turned Wood Floor Lamp', 'Sculptural Brass Chandelier', 'Ceramic Table Lamp', 'Linear Pendant'],
  }
];

const RAW_PRODUCTS = [
  {
    id: 'elegant-illumination-lamp',
    name: 'Elegant Illumination Lamp',
    sku: '006',
    category: 'lighting',
    room: 'living-room',
    price: 85.00,
    originalPrice: 110.00,
    rating: 5.0,
    reviewsCount: 12,
    badge: 'NEW',
    description: "I'm a product description. I'm a great place to add more details about your product such as sizing, material, care instructions and cleaning instructions.",
    details: "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.",
    returnPolicy: "I'm a Return and Refund policy. I'm a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.",
    shippingInfo: "I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.",
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Warm Copper', hex: '#b87333' },
      { name: 'Brushed Brass', hex: '#d4af37' },
      { name: 'Matte Charcoal', hex: '#2b2d42' }
    ],
    inStock: true,
    dimensions: 'Height: 45cm | Diameter: 38cm',
    material: 'Spun Copper & Powder-Coated Aluminum',
    isPopular: true,
    isTrending: true
  },
  {
    id: 'urban-oasis-carpet',
    name: 'Urban Oasis Carpet',
    sku: '001',
    category: 'sofas',
    room: 'living-room',
    price: 85.00,
    originalPrice: 120.00,
    rating: 4.8,
    reviewsCount: 18,
    badge: 'Bestseller',
    description: 'A luxurious plush seating accent crafted with organic wool textures and durable backing.',
    details: 'Hand-woven with premium fibers to provide supreme underfoot comfort and sound dampening.',
    returnPolicy: '30-day hassle-free returns on all standard catalog items.',
    shippingInfo: 'Complimentary white-glove shipping on orders over $500.',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Emerald Velvet', hex: '#2d6a4f' },
      { name: 'Cognac Leather', hex: '#9c5123' },
      { name: 'Charcoal Linen', hex: '#343a40' }
    ],
    inStock: true,
    isPopular: true,
    isBestSeller: true
  },
  {
    id: 'luxe-lounge-sofa',
    name: 'Luxe Lounge Sofa',
    sku: '002',
    category: 'sofas',
    room: 'living-room',
    price: 2467.00,
    rating: 4.9,
    reviewsCount: 32,
    badge: 'NEW',
    description: 'Deep cushioned architectural sofa upholstered in refined bouclé fabric.',
    details: 'Kiln-dried hardwood frame reinforced with mortise-and-tenon joinery and high-resiliency foam cushions.',
    returnPolicy: '30-day money-back guarantee with free pickup for unopened returns.',
    shippingInfo: 'Delivered and assembled in room of choice within 3-7 business days.',
    images: [
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Oatmeal Tweed', hex: '#d8cfc4' },
      { name: 'Slate Gray', hex: '#495057' }
    ],
    inStock: true,
    isPopular: true
  },
  {
    id: 'modern-comfort-sofa',
    name: 'Modern Comfort Sofa',
    sku: '003',
    category: 'sofas',
    room: 'living-room',
    price: 1200.00,
    rating: 4.7,
    reviewsCount: 15,
    badge: 'NEW',
    description: 'Contemporary low-profile silhouette with feather-blend down cushions.',
    details: 'Designed for everyday family lounging with stain-resistant performance weave upholstery.',
    returnPolicy: '30-day trial period.',
    shippingInfo: 'Flat-rate freight delivery nationwide.',
    images: [
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Cloud Gray', hex: '#e2e8f0' },
      { name: 'Graphite', hex: '#1e293b' }
    ],
    inStock: true,
    isPopular: true
  },
  {
    id: 'elegant-haven-sofa',
    name: 'Elegant Haven Sofa',
    sku: '004',
    category: 'sofas',
    room: 'living-room',
    price: 1200.00,
    originalPrice: 1450.00,
    rating: 5.0,
    reviewsCount: 24,
    badge: 'SALE',
    description: 'Timeless Italian full-grain caramel leather sofa with slim steel legs.',
    details: 'Hand-dyed top-grain aniline leather that patinas gracefully over years of enjoyment.',
    returnPolicy: 'Guaranteed 30-day satisfaction policy.',
    shippingInfo: 'Standard insulated freight delivery included.',
    images: [
      'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Caramel Tan', hex: '#b45309' },
      { name: 'Midnight Black', hex: '#09090b' }
    ],
    inStock: true,
    isPopular: true
  },
  {
    id: 'classic-chic-sofa',
    name: 'Classic Chic Sofa',
    sku: '005',
    category: 'sofas',
    room: 'living-room',
    price: 2563.00,
    rating: 4.9,
    reviewsCount: 19,
    badge: 'NEW',
    description: 'Chesterfield-inspired button-tufted statement sofa with solid walnut accents.',
    details: 'Handcrafted by master artisans with high-gauge sinuous steel spring suspension.',
    returnPolicy: 'Full refund within 30 days of arrival.',
    shippingInfo: 'Scheduled doorstep delivery.',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Espresso Leather', hex: '#451a03' },
      { name: 'Cognac', hex: '#9a3412' }
    ],
    inStock: true,
    isPopular: true
  },
  {
    id: 'modern-comfort-lounge-chair',
    name: 'Modern Comfort Lounge Chair',
    sku: '010',
    category: 'lounge-chairs',
    room: 'living-room',
    price: 500.00,
    originalPrice: 575.00,
    rating: 4.8,
    reviewsCount: 11,
    badge: 'SALE',
    description: 'Sculptural swivel lounge chair with ergonomic contours and dense cushioning.',
    details: 'Engineered 360-degree silent swivel base with brushed metal finish.',
    returnPolicy: '30-day returns accepted.',
    shippingInfo: 'Fast courier dispatch in 2 business days.',
    images: [
      'https://images.unsplash.com/photo-1580481077194-43610996f874?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Heather Gray', hex: '#6b7280' },
      { name: 'Terra Cotta', hex: '#c2410c' }
    ],
    inStock: true,
    isPopular: true
  },
  {
    id: 'elegant-relaxation-lounge-chair',
    name: 'Elegant Relaxation Lounge Chair',
    sku: '011',
    category: 'lounge-chairs',
    room: 'living-room',
    price: 575.00,
    rating: 5.0,
    reviewsCount: 28,
    description: 'Mid-century Danish reinterpretation with supple cognac leather and solid oak frame.',
    details: 'Ergonomic lumbar curvature designed for reading nooks and living rooms alike.',
    returnPolicy: '30-day money back guarantee.',
    shippingInfo: 'Ships safely packaged with edge protectors.',
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Cognac', hex: '#9a3412' },
      { name: 'Natural Oak', hex: '#d97706' }
    ],
    inStock: true,
    isPopular: true
  },
  {
    id: 'luxe-leisure-lounge-chair',
    name: 'Luxe Leisure Lounge Chair',
    sku: '012',
    category: 'lounge-chairs',
    room: 'bedroom',
    price: 500.00,
    originalPrice: 575.00,
    rating: 4.6,
    reviewsCount: 9,
    description: 'Chic rounded occasional chair wrapped in plush cream boucle.',
    details: 'Compact footprint perfect for master bedrooms and bright sitting corners.',
    returnPolicy: 'Standard return policy.',
    shippingInfo: 'Delivered in custom reinforced carton.',
    images: [
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Boucle Cream', hex: '#fef3c7' }
    ],
    inStock: true,
    isPopular: true
  },
  {
    id: 'urban-retreat-lounge-chair',
    name: 'Urban Retreat Lounge Chair',
    sku: '013',
    category: 'lounge-chairs',
    room: 'living-room',
    price: 540.00,
    originalPrice: 600.00,
    rating: 4.9,
    reviewsCount: 31,
    badge: 'SALE',
    description: 'Bold cubist armchair featuring plush seating and structured armrests.',
    details: 'Solid kiln-dried inner structure with premium textile upholstery.',
    returnPolicy: '30 days returns.',
    shippingInfo: 'Express delivery available.',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Caramel', hex: '#b45309' },
      { name: 'Forest', hex: '#14532d' }
    ],
    inStock: true,
    isPopular: true,
    isBestSeller: true
  },
  {
    id: 'orion-comfort-lounge-chair',
    name: 'Orion Comfort Lounge Chair',
    sku: '014',
    category: 'lounge-chairs',
    room: 'living-room',
    price: 600.00,
    rating: 5.0,
    reviewsCount: 14,
    badge: 'NEW',
    description: 'Curved sculptural tub chair with warm mustard velvet upholstery.',
    details: 'A bold conversational piece combining artistic geometry with soft comfort.',
    returnPolicy: 'Full refund guarantee.',
    shippingInfo: 'Free curbside delivery.',
    images: [
      'https://images.unsplash.com/photo-1580481077194-43610996f874?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Ochre Yellow', hex: '#ca8a04' },
      { name: 'Navy Blue', hex: '#1e3a8a' }
    ],
    inStock: true,
    isPopular: true
  },
  {
    id: 'timeless-twist-chain',
    name: 'Timeless Twist Chain',
    sku: '020',
    category: 'tables',
    room: 'dining-room',
    price: 85.00,
    rating: 4.7,
    reviewsCount: 17,
    badge: 'Bestseller',
    description: 'Sculptural organic coffee table base inspired by interlocking links.',
    details: 'Cast aluminum with hand-applied antique patina and tempered glass surface.',
    returnPolicy: '30-day return policy.',
    shippingInfo: 'Special glass crating for damage-free transit.',
    images: [
      'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Frosted White', hex: '#f8fafc' },
      { name: 'Champagne Gold', hex: '#eab308' }
    ],
    inStock: true,
    isPopular: true
  },
  {
    id: 'modern-workspace-table',
    name: 'Modern Workspace Table',
    sku: '021',
    category: 'tables',
    room: 'home-office',
    price: 175.00,
    rating: 4.8,
    reviewsCount: 22,
    description: 'Bent tempered glass minimalist desk offering transparent floating aesthetics.',
    details: '12mm monolithic curved tempered glass with beveled polished safety edges.',
    returnPolicy: '30-day return warranty.',
    shippingInfo: 'White glove delivery recommended.',
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Crystal Clear', hex: '#e0f2fe' }
    ],
    inStock: true,
    isPopular: true
  },
  {
    id: 'sophisticated-console-table',
    name: 'Sophisticated Console Table',
    sku: '022',
    category: 'tables',
    room: 'living-room',
    price: 175.00,
    rating: 4.9,
    reviewsCount: 8,
    description: 'Tinted blue-gray architectural glass console table with sculptural understructure.',
    details: 'Perfect for entryway display or behind modern sofa setups.',
    returnPolicy: 'Standard return policy.',
    shippingInfo: 'Insured express shipping.',
    images: [
      'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Ocean Tint', hex: '#0284c7' }
    ],
    inStock: true,
    isPopular: true
  },
  {
    id: 'timeless-side-table',
    name: 'Timeless Side Table',
    sku: '023',
    category: 'tables',
    room: 'living-room',
    price: 200.00,
    rating: 5.0,
    reviewsCount: 16,
    badge: 'Bestseller',
    description: 'Organic round solid oak side table with tapered tripod legs.',
    details: 'Solid white oak treated with durable matte polyurethane coating.',
    returnPolicy: '30-day return policy.',
    shippingInfo: 'Ships flat-packed with easy 5-minute tool-free assembly.',
    images: [
      'https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Natural Oak', hex: '#d97706' },
      { name: 'Walnut', hex: '#78350f' }
    ],
    inStock: true,
    isPopular: true
  },
  {
    id: 'luxe-accent-table',
    name: 'Luxe Accent Table',
    sku: '024',
    category: 'tables',
    room: 'living-room',
    price: 200.00,
    rating: 4.7,
    reviewsCount: 14,
    description: 'Slim matte black steel frame holding a polished marble or quartz top.',
    details: 'Minimalist proportion ideal for holding drinks beside low lounge seating.',
    returnPolicy: '30-day return policy.',
    shippingInfo: 'Dispatches within 24 hours.',
    images: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Matte Black', hex: '#18181b' }
    ],
    inStock: true,
    isPopular: true
  },
  {
    id: 'elegant-comfort-chair',
    name: 'Elegant Comfort Chair',
    sku: '030',
    category: 'chairs',
    room: 'dining-room',
    price: 130.00,
    rating: 4.7,
    reviewsCount: 19,
    description: 'Molded modern dining chair with gently curved arms and ergonomic seat pan.',
    details: 'Commercial-grade polypropylene shell on powder-coated tubular steel legs.',
    returnPolicy: '30-day satisfaction guarantee.',
    shippingInfo: 'Sold individually or in sets of 2/4/6.',
    images: [
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Muted Slate', hex: '#64748b' },
      { name: 'Dusty Rose', hex: '#fda4af' }
    ],
    inStock: true,
    isPopular: true
  },
  {
    id: 'modern-luxe-chair',
    name: 'Modern Luxe Chair',
    sku: '031',
    category: 'chairs',
    room: 'dining-room',
    price: 130.00,
    rating: 4.9,
    reviewsCount: 26,
    description: 'Warm natural beech wood dining chair with curved floating backrest.',
    details: 'Reinforced joint construction suitable for daily family dining and banquet gatherings.',
    returnPolicy: '30-day returns.',
    shippingInfo: 'Pre-assembled delivery.',
    images: [
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Natural Beech', hex: '#f59e0b' },
      { name: 'Warm Walnut', hex: '#7c2d12' }
    ],
    inStock: true,
    isPopular: true,
    isBestSeller: true
  },
  {
    id: 'classic-serenity-chair',
    name: 'Classic Serenity Chair',
    sku: '032',
    category: 'chairs',
    room: 'dining-room',
    price: 130.00,
    rating: 4.8,
    reviewsCount: 15,
    description: 'Bertoia-inspired wireframe accent chair with detachable leatherette seat pad.',
    details: 'Welded steel rod lattice with electroplated weather-resistant finish.',
    returnPolicy: '30-day return policy.',
    shippingInfo: 'Fast dispatch from warehouse.',
    images: [
      'https://images.unsplash.com/photo-1519947486513-ce62b9f0b162?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Chrome Steel', hex: '#94a3b8' },
      { name: 'Matte Black', hex: '#09090b' }
    ],
    inStock: true,
    isPopular: true
  },
  {
    id: 'urban-style-chair',
    name: 'Urban Style Chair',
    sku: '033',
    category: 'chairs',
    room: 'dining-room',
    price: 130.00,
    rating: 4.6,
    reviewsCount: 12,
    description: 'Minimalist bistro chair with slender profile and stackable convenience.',
    details: 'Heavy-duty steel construction with non-scratch rubber foot caps.',
    returnPolicy: '30-day returns.',
    shippingInfo: 'Ships in 48 hours.',
    images: [
      'https://images.unsplash.com/photo-1580481077194-43610996f874?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Deep Sage', hex: '#334155' }
    ],
    inStock: true,
    isPopular: true
  },
  {
    id: 'sophisticated-charm-chair',
    name: 'Sophisticated Charm Chair',
    sku: '034',
    category: 'chairs',
    room: 'dining-room',
    price: 130.00,
    rating: 5.0,
    reviewsCount: 30,
    badge: 'Bestseller',
    description: 'Soft olive green molded resin chair with gently angled legs.',
    details: 'UV-stabilized resin designed for versatile indoor and covered patio living.',
    returnPolicy: 'Full refund within 30 days.',
    shippingInfo: 'Safe standard transit.',
    images: [
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Olive Green', hex: '#4d7c0f' }
    ],
    inStock: true,
    isPopular: true
  },
  {
    id: 'timeless-grace-chair',
    name: 'Timeless Grace Chair',
    sku: '035',
    category: 'chairs',
    room: 'dining-room',
    price: 130.00,
    rating: 4.8,
    reviewsCount: 14,
    description: 'Scandinavian schoolhouse chair combining natural birch ply with red frame accents.',
    details: 'Ergonomic waterfall seat edge to relieve thigh pressure during long dinners.',
    returnPolicy: '30-day return guarantee.',
    shippingInfo: 'Direct to door delivery.',
    images: [
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Cherry Accent', hex: '#dc2626' }
    ],
    inStock: true,
    isPopular: true
  },
  {
    id: 'marcel-drawer-storage-bed',
    name: 'Marcel Drawer Storage Bed',
    sku: '040',
    category: 'bed',
    room: 'bedroom',
    price: 1399.00,
    rating: 4.9,
    reviewsCount: 21,
    badge: 'NEW',
    description: 'Solid walnut platform bed with integrated seamless push-to-open underbed drawers.',
    details: 'Engineered solid hardwood slat system eliminates the need for box springs.',
    returnPolicy: '30-day risk-free in-home sleep trial.',
    shippingInfo: 'Complimentary freight delivery with scheduling.',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Warm Walnut', hex: '#5c3a21' }
    ],
    inStock: true,
    isPopular: true
  },
  {
    id: 'cello-storage-bed',
    name: 'Cello Storage Bed',
    sku: '041',
    category: 'bed',
    room: 'bedroom',
    price: 3399.00,
    rating: 5.0,
    reviewsCount: 18,
    badge: 'NEW',
    description: 'Upholstered linen acoustic headboard bed with hydraulic gas-lift under-mattress storage.',
    details: 'Heavy-duty German gas-piston struts make lifting the full mattress effortless.',
    returnPolicy: '30-day satisfaction guarantee.',
    shippingInfo: 'Delivered in three reinforced cartons.',
    images: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef0?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Ecru Linen', hex: '#e5e5e5' }
    ],
    inStock: true,
    isPopular: true
  },
  {
    id: 'nara-bed',
    name: 'Nara Bed',
    sku: '042',
    category: 'bed',
    room: 'bedroom',
    price: 2299.00,
    rating: 4.9,
    reviewsCount: 25,
    badge: 'NEW',
    description: 'Blush velvet low Japanese platform bed with wide perimeter ledges.',
    details: 'Low center of gravity with serene clean lines inspired by Kyoto minimalist sanctuaries.',
    returnPolicy: '30-day return policy.',
    shippingInfo: 'Handled by specialty furniture carriers.',
    images: [
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Blush Velvet', hex: '#f43f5e' },
      { name: 'Sand Taupe', hex: '#d6d3d1' }
    ],
    inStock: true,
    isPopular: true
  },
  {
    id: 'orri-lift-bed-with-drawers',
    name: 'Orri Lift Bed With Drawers',
    sku: '043',
    category: 'bed',
    room: 'bedroom',
    price: 4299.00,
    rating: 5.0,
    reviewsCount: 38,
    badge: 'NEW',
    description: 'Flagship luxury bed with deep button-tufted winged headboard and motorized lift system.',
    details: 'Whisper-quiet dual motor system, integrated USB-C ports and hidden security storage vault.',
    returnPolicy: '30-day satisfaction warranty.',
    shippingInfo: 'White glove assembly included free of charge.',
    images: [
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Midnight Navy Velvet', hex: '#0f172a' },
      { name: 'Pebble Gray', hex: '#9ca3af' }
    ],
    inStock: true,
    isPopular: true,
    isBestSeller: true
  },
  {
    id: 'marcel-open-shelf-nightstand',
    name: 'Marcel Open Shelf Nightstand',
    sku: '050',
    category: 'storage',
    room: 'bedroom',
    price: 399.00,
    rating: 4.8,
    reviewsCount: 27,
    badge: 'NEW',
    description: 'Mid-century nightstand with single soft-close drawer and open book cubby.',
    details: 'Crafted from sustainably harvested American walnut with brass drawer pull.',
    returnPolicy: '30-day return policy.',
    shippingInfo: 'Fast dispatch in 1-2 business days.',
    images: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Solid Walnut', hex: '#451a03' }
    ],
    inStock: true,
    isBestSeller: true
  },
  {
    id: 'cozy-warmth-lamp',
    name: 'Cozy Warmth Lamp',
    sku: '060',
    category: 'lighting',
    room: 'living-room',
    price: 85.00,
    rating: 4.8,
    reviewsCount: 16,
    description: 'Slender architectural tripod floor lamp with matte black conical shade.',
    details: 'Adjustable gooseneck mechanism directs warm focused ambient reading light.',
    returnPolicy: '30-day return window.',
    shippingInfo: 'Compact safe packaging.',
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Matte Black', hex: '#18181b' }
    ],
    inStock: true,
    isTrending: true
  },
  {
    id: 'modern-ambience-lamp',
    name: 'Modern Ambience Lamp',
    sku: '061',
    category: 'lighting',
    room: 'living-room',
    price: 59.50,
    originalPrice: 85.00,
    rating: 4.9,
    reviewsCount: 20,
    badge: 'SALE',
    description: 'Ribbed amber glass pendant lantern with rose-gold metallic accents.',
    details: 'Dimmable E26 socket compatible with smart home lighting setups.',
    returnPolicy: '30-day hassle free return.',
    shippingInfo: 'Ships within 24 hours.',
    images: [
      'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Rose Gold / Amber', hex: '#e11d48' }
    ],
    inStock: true,
    isTrending: true
  },
  {
    id: 'classic-comfort-carpet',
    name: 'Classic Comfort Carpet',
    sku: '070',
    category: 'accessories',
    room: 'living-room',
    price: 85.00,
    rating: 4.9,
    reviewsCount: 34,
    badge: 'Bestseller',
    description: 'Vintage distressed Persian-inspired area rug with neutral geometric medallion pattern.',
    details: 'Low-pile stain-resistant polypropylene ideal for busy homes and pet-friendly spaces.',
    returnPolicy: '30-day returns.',
    shippingInfo: 'Rolled and sealed in heavy protective tubing.',
    images: [
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1200&q=85'
    ],
    inStock: true,
    isTrending: true
  },
  {
    id: 'urban-style-lamp',
    name: 'Urban Style Lamp',
    sku: '071',
    category: 'lighting',
    room: 'living-room',
    price: 85.00,
    rating: 4.7,
    reviewsCount: 14,
    description: 'Brass arc floor lamp balancing an opal glass sphere diffuser.',
    details: 'Weighted natural marble round base ensures stability and modern prestige.',
    returnPolicy: '30-day return policy.',
    shippingInfo: 'Dual protective crate packaging.',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85'
    ],
    inStock: true,
    isTrending: true
  },
  {
    id: 'sophisticated-loop-chain',
    name: 'Sophisticated Loop Chain',
    sku: '080',
    category: 'storage',
    room: 'living-room',
    price: 85.00,
    rating: 4.8,
    reviewsCount: 9,
    badge: 'NEW',
    description: 'Sage green pastel accent credenza with curved fluted tambour doors.',
    details: 'Internal adjustable shelving and hidden cord management pass-throughs.',
    returnPolicy: '30-day return.',
    shippingInfo: 'White glove delivery.',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85'
    ],
    inStock: true,
    isTrending: true
  }
];

const RAW_BLOG_POSTS = [
  {
    id: '1',
    title: 'Expert Tips on Decorating Your Home Like a Pro',
    excerpt: 'Transforming your home into a stylish and inviting space doesn’t require a professional interior designer. With the right tips and...',
    author: 'Steve Hoang Anh',
    date: 'Jan 15, 2026',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    tags: ['Interior Design', 'Living Room']
  },
  {
    id: '2',
    title: 'How to Design a Stylish and Functional Home Office',
    excerpt: 'In today’s world, having a comfortable and efficient home office is essential. Whether you’re working from home full-time, part...',
    author: 'Steve Hoang Anh',
    date: 'Jan 15, 2026',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
    tags: ['Workplace', 'Minimalism']
  },
  {
    id: '3',
    title: 'Creating a Cozy and Functional Home & Dining Space',
    excerpt: 'The dining table is the heart of your home, a place where stories are shared, conversations flow, and memories are made. Choosing...',
    author: 'Steve Hoang Anh',
    date: 'Jan 15, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
    tags: ['Dining', 'Home Comfort']
  }
];

export const CATEGORIES: Category[] = RAW_CATEGORIES.map((c) => ({
  ...c,
  itemCount: c.productCount,
}));

export const PRODUCTS: Product[] = RAW_PRODUCTS.map((p) => ({
  ...p,
  image: p.images && p.images.length > 0 ? p.images[0] : 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
}));

export const BLOG_POSTS: BlogPost[] = RAW_BLOG_POSTS.map((b) => ({
  ...b,
  tag: b.tags[0] || 'Design',
}));

