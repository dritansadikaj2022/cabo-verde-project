import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Eye, Upload, Check, Sparkles, LogOut, ArrowLeft, 
  Layers, Search, Tag, Shield, FileText, Download, Edit3, Palette, 
  Globe, User, Mail, KeyRound, RefreshCw, Copy, Lock, FolderPlus, 
  CheckCircle2, XCircle, X, ChevronRight, Armchair, Bed, Lamp, 
  Box, Tv, Sofa, Briefcase, Landmark, Crown, Sun, Shapes, Truck, 
  Clock, Wrench, ShieldAlert, AlertCircle, FileCheck
} from 'lucide-react';
import { Product, AdminUser, Category, StoreTemplate, DomainVendorMapping } from '../types';

interface AdminPortalProps {
  admin: AdminUser;
  products: Product[];
  categories: Category[];
  activeTemplate: StoreTemplate;
  templates: StoreTemplate[];
  domainMappings: DomainVendorMapping[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateCategories: (categories: Category[]) => void;
  onSelectTemplate: (templateId: string) => void;
  onUpdateTemplate: (template: StoreTemplate) => void;
  onUpdateDomainMappings: (mappings: DomainVendorMapping[]) => void;
  onUpdateAdminUser: (admin: AdminUser) => void;
  onLogout: () => void;
  onClose: () => void;
  onPreviewProduct: (product: Product) => void;
}

// Available icon options for category manager
const AVAILABLE_ICONS = [
  { id: 'sofa', label: 'Sectional & Sofa', icon: Sofa },
  { id: 'chair', label: 'Lounge & Accent Chair', icon: Armchair },
  { id: 'bed', label: 'Beds & Platform', icon: Bed },
  { id: 'tables', label: 'Tables & Desks', icon: Layers },
  { id: 'storage', label: 'Storage & Credenza', icon: Box },
  { id: 'tv', label: 'Media & TV Console', icon: Tv },
  { id: 'lighting', label: 'Lighting & Lamp', icon: Lamp },
  { id: 'office', label: 'Executive Office', icon: Briefcase },
  { id: 'architectural', label: 'Architectural Module', icon: Landmark },
  { id: 'decor', label: 'Royal Decor', icon: Crown },
  { id: 'outdoor', label: 'Outdoor Living', icon: Sun },
  { id: 'custom', label: 'Bespoke Custom', icon: Shapes },
];

export const AdminPortal: React.FC<AdminPortalProps> = ({
  admin,
  products,
  categories,
  activeTemplate,
  templates,
  domainMappings,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateCategories,
  onSelectTemplate,
  onUpdateTemplate,
  onUpdateDomainMappings,
  onUpdateAdminUser,
  onLogout,
  onClose,
  onPreviewProduct,
}) => {
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'upload' | 'catalog' | 'categories' | 'templates' | 'domains' | 'account'>('upload');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showLocalToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // ==========================================
  // 1. PRODUCT FORM (Create & Edit Mode)
  // ==========================================
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productName, setProductName] = useState<string>('');
  const [sku, setSku] = useState<string>(`CV-${Math.floor(1000 + Math.random() * 9000)}`);
  const [category, setCategory] = useState<string>(categories[0]?.id || 'sofas');
  const [subcategory, setSubcategory] = useState<string>(categories[0]?.subcategories?.[0] || 'Modular Sectional');
  const [room, setRoom] = useState<string>('living-room');
  const [badge, setBadge] = useState<string>('Bespoke Edition');
  const [material, setMaterial] = useState<string>('Solid Hardwood & Top-Grain Bouclé');
  const [dimensions, setDimensions] = useState<string>('W: 240cm × D: 105cm × H: 76cm');

  // Descriptions & Product Details (with customizable defaults)
  const [description, setDescription] = useState<string>(
    'Exquisite hand-finished architectural piece designed with solid hardwood dovetail joinery, organic contours, and bespoke upholstery.'
  );
  const [shippingInfo, setShippingInfo] = useState<string>(
    'Complimentary White Glove Inside Delivery & In-Home Assembly in 5-7 business days.'
  );
  const [leadTime, setLeadTime] = useState<string>(
    'Handcrafted to order in 2-3 weeks; expedited architectural dispatch available upon request.'
  );
  const [warrantyInfo, setWarrantyInfo] = useState<string>(
    '10-Year Master Joinery & Solid Hardwood Structural Guarantee.'
  );
  const [careInstructions, setCareInstructions] = useState<string>(
    'Dust regularly with soft microfiber cloth. Nourish solid wood annually with organic beeswax. Protect from direct persistent sunlight.'
  );
  const [architecturalSpecs, setArchitecturalSpecs] = useState<string>(
    'Kiln-dried solid American beech/oak framing, mortise-and-tenon architectural joints, high-resilience foam core.'
  );
  const [returnPolicy, setReturnPolicy] = useState<string>(
    '30-Day White Glove Return Policy with full curation inspection guarantee.'
  );

  // Images: Main Image + Gallery of Additional Images
  const [mainImage, setMainImage] = useState<string>(
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'
  );
  const [galleryImages, setGalleryImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1580481077194-43610996f874?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=1200&q=80',
  ]);
  const [newGalleryInput, setNewGalleryInput] = useState<string>('');

  // PDF Brochure
  const [pdfBrochureUrl, setPdfBrochureUrl] = useState<string>('');
  const [pdfBrochureName, setPdfBrochureName] = useState<string>('');

  // Placement Toggles requested by user
  const [isPopular, setIsPopular] = useState<boolean>(true);
  const [isFeatured, setIsFeatured] = useState<boolean>(true);
  const [isNewArrival, setIsNewArrival] = useState<boolean>(false);
  const [isBestSeller, setIsBestSeller] = useState<boolean>(false);
  const [isHero, setIsHero] = useState<boolean>(false);

  // Handle category selection update
  const handleCategorySelect = (catId: string) => {
    setCategory(catId);
    const selected = categories.find((c) => c.id === catId || c.slug === catId);
    if (selected && selected.subcategories && selected.subcategories.length > 0) {
      setSubcategory(selected.subcategories[0]);
    } else {
      setSubcategory('General');
    }
  };

  // Upload main image
  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setMainImage(reader.result);
          showLocalToast('Main product image uploaded');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload multiple gallery images
  const handleGalleryUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setGalleryImages((prev) => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
      showLocalToast(`${files.length} gallery image(s) added`);
    }
  };

  // Upload PDF Brochure
  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        showLocalToast('Please select a valid .pdf brochure file');
        return;
      }
      setPdfBrochureName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPdfBrochureUrl(reader.result);
          showLocalToast(`PDF Brochure "${file.name}" linked successfully`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset form to default blank
  const resetProductForm = () => {
    setEditingProductId(null);
    setProductName('');
    setSku(`CV-${Math.floor(1000 + Math.random() * 9000)}`);
    setMainImage('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80');
    setGalleryImages([]);
    setPdfBrochureUrl('');
    setPdfBrochureName('');
    setDescription('Exquisite hand-finished architectural piece designed with solid hardwood dovetail joinery, organic contours, and bespoke upholstery.');
    setShippingInfo('Complimentary White Glove Inside Delivery & In-Home Assembly in 5-7 business days.');
    setLeadTime('Handcrafted to order in 2-3 weeks; expedited architectural dispatch available upon request.');
    setWarrantyInfo('10-Year Master Joinery & Solid Hardwood Structural Guarantee.');
    setCareInstructions('Dust regularly with soft microfiber cloth. Nourish solid wood annually with organic beeswax. Protect from direct persistent sunlight.');
    setArchitecturalSpecs('Kiln-dried solid American beech/oak framing, mortise-and-tenon architectural joints, high-resilience foam core.');
    setReturnPolicy('30-Day White Glove Return Policy with full curation inspection guarantee.');
    setIsPopular(true);
    setIsFeatured(true);
    setIsNewArrival(false);
    setIsBestSeller(false);
    setIsHero(false);
  };

  // Load product into form for editing
  const handleEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setProductName(p.name);
    setSku(p.sku);
    setCategory(p.category);
    setSubcategory(p.subcategory || 'Modular');
    setRoom(p.room || 'living-room');
    setBadge(p.badge || 'Bespoke Edition');
    setMaterial(p.material || 'Solid Hardwood & Premium Fabric');
    setDimensions(p.dimensions || 'W: 240cm × D: 105cm × H: 76cm');
    setDescription(p.description || '');
    setShippingInfo(p.shippingInfo || 'Complimentary White Glove Inside Delivery');
    setLeadTime(p.leadTime || 'Handcrafted to order in 2-3 weeks');
    setWarrantyInfo(p.warrantyInfo || '10-Year Master Joinery Guarantee');
    setCareInstructions(p.careInstructions || 'Dust regularly with microfiber cloth');
    setArchitecturalSpecs(p.architecturalSpecs || p.details || '');
    setReturnPolicy(p.returnPolicy || '30-Day White Glove Return Policy');
    setMainImage(p.image);
    setGalleryImages(p.images || []);
    setPdfBrochureUrl(p.pdfBrochureUrl || '');
    setPdfBrochureName(p.pdfBrochureName || '');
    setIsPopular(p.isPopular ?? true);
    setIsFeatured(p.isFeatured ?? false);
    setIsNewArrival(p.isNewArrival ?? false);
    setIsBestSeller(p.isBestSeller ?? false);
    setIsHero(p.isHero ?? false);
    setActiveTab('upload');
    showLocalToast(`Editing "${p.name}"`);
  };

  // Submit product create or update
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) {
      showLocalToast('Please enter a product title');
      return;
    }

    const displayLocations: ('popular' | 'bestsellers' | 'trending' | 'rooms' | 'hero' | 'featured' | 'new-arrival')[] = [];
    if (isPopular) displayLocations.push('popular');
    if (isFeatured) displayLocations.push('featured');
    if (isNewArrival) displayLocations.push('new-arrival');
    if (isBestSeller) displayLocations.push('bestsellers');
    if (isHero) displayLocations.push('hero');

    const productPayload: Product = {
      id: editingProductId || `custom-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: productName.trim(),
      sku: sku.trim(),
      category,
      subcategory,
      room,
      badge: badge.trim() || undefined,
      description: description.trim(),
      details: architecturalSpecs.trim() || description.trim(),
      returnPolicy: returnPolicy.trim(),
      shippingInfo: shippingInfo.trim(),
      warrantyInfo: warrantyInfo.trim(),
      leadTime: leadTime.trim(),
      careInstructions: careInstructions.trim(),
      architecturalSpecs: architecturalSpecs.trim(),
      pdfBrochureUrl: pdfBrochureUrl || undefined,
      pdfBrochureName: pdfBrochureName || undefined,
      image: mainImage,
      images: galleryImages.length > 0 ? galleryImages : [mainImage],
      material: material.trim(),
      dimensions: dimensions.trim(),
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      isPopular,
      isFeatured,
      isNewArrival,
      isBestSeller,
      isHero,
      displayLocations,
    };

    if (editingProductId) {
      onUpdateProduct(productPayload);
      showLocalToast(`Updated "${productPayload.name}" successfully`);
    } else {
      onAddProduct(productPayload);
      showLocalToast(`Added "${productPayload.name}" to architectural catalog`);
    }

    resetProductForm();
  };

  // Quick Preset Sample Fill
  const handleFillSample = () => {
    setProductName('Cabo Verde Monolithic Walnut Credenza');
    setSku(`CV-${Math.floor(1000 + Math.random() * 9000)}`);
    setCategory('storage');
    setSubcategory('Credenza & Sideboard');
    setRoom('living-room');
    setMaterial('Kiln-Dried American Black Walnut & Brushed Brass Hardware');
    setDimensions('W: 220cm × D: 50cm × H: 78cm');
    setDescription('Curated architectural credenza featuring continuous grain flow across solid walnut doors and integrated soft-close Blum joinery.');
    setMainImage('https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80');
    setGalleryImages([
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
    ]);
    setPdfBrochureUrl('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');
    setPdfBrochureName('CV-Credenza-Architectural-SpecSheet.pdf');
    setIsPopular(true);
    setIsFeatured(true);
    setIsNewArrival(true);
    showLocalToast('Sample luxury product preset loaded');
  };

  // ==========================================
  // 2. CATALOG SEARCH & FILTER
  // ==========================================
  const [catalogSearch, setCatalogSearch] = useState<string>('');
  const [catalogFilter, setCatalogFilter] = useState<string>('all');

  const filteredCatalog = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(catalogSearch.toLowerCase()) || 
                          p.sku.toLowerCase().includes(catalogSearch.toLowerCase()) ||
                          p.category.toLowerCase().includes(catalogSearch.toLowerCase());
    const matchesCategory = catalogFilter === 'all' || p.category === catalogFilter;
    return matchesSearch && matchesCategory;
  });

  // ==========================================
  // 3. CATEGORY & SUBCATEGORY MANAGER
  // ==========================================
  const [selectedCatForEdit, setSelectedCatForEdit] = useState<Category>(categories[0]);
  const [catNameInput, setCatNameInput] = useState<string>(categories[0]?.name || '');
  const [catWoodInput, setCatWoodInput] = useState<string>(categories[0]?.woodSpecies || 'Solid Hardwood');
  const [catIconInput, setCatIconInput] = useState<string>(categories[0]?.iconType || 'sofa');
  const [newSubcatInput, setNewSubcatInput] = useState<string>('');
  const [subcatList, setSubcatList] = useState<string[]>(categories[0]?.subcategories || []);

  // Sync edit form when selected category changes
  useEffect(() => {
    if (selectedCatForEdit) {
      setCatNameInput(selectedCatForEdit.name);
      setCatWoodInput(selectedCatForEdit.woodSpecies || 'Solid Hardwood');
      setCatIconInput(selectedCatForEdit.iconType || selectedCatForEdit.id);
      setSubcatList(selectedCatForEdit.subcategories || []);
    }
  }, [selectedCatForEdit]);

  // Update currently selected category
  const handleSaveCategoryChanges = () => {
    if (!catNameInput.trim()) {
      showLocalToast('Category name cannot be empty');
      return;
    }
    const updated = categories.map((c) => {
      if (c.id === selectedCatForEdit.id) {
        return {
          ...c,
          name: catNameInput.trim(),
          woodSpecies: catWoodInput.trim(),
          iconType: catIconInput,
          subcategories: subcatList,
        };
      }
      return c;
    });
    onUpdateCategories(updated);
    showLocalToast(`Updated category "${catNameInput}"`);
  };

  // Add new subcategory to list
  const handleAddSubcategory = () => {
    if (!newSubcatInput.trim()) return;
    if (subcatList.includes(newSubcatInput.trim())) {
      showLocalToast('Subcategory already exists');
      return;
    }
    const updated = [...subcatList, newSubcatInput.trim()];
    setSubcatList(updated);
    setNewSubcatInput('');
  };

  // Remove subcategory
  const handleRemoveSubcategory = (sub: string) => {
    setSubcatList((prev) => prev.filter((s) => s !== sub));
  };

  // New Category Creation modal/state
  const [isCreatingNewCat, setIsCreatingNewCat] = useState<boolean>(false);
  const [newCatId, setNewCatId] = useState<string>('');
  const [newCatName, setNewCatName] = useState<string>('');
  const [newCatWood, setNewCatWood] = useState<string>('Sustainably Sourced Teak');
  const [newCatIcon, setNewCatIcon] = useState<string>('sofa');
  const [newCatSubcats, setNewCatSubcats] = useState<string>('Modular, Custom Build, Bespoke');

  const handleCreateCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) {
      showLocalToast('Please enter category name');
      return;
    }
    const slug = (newCatId.trim() || newCatName.trim().toLowerCase().replace(/[^a-z0-9]/g, '-')).toLowerCase();
    
    // Check duplicate
    if (categories.some((c) => c.id === slug || c.slug === slug)) {
      showLocalToast(`A category with slug "${slug}" already exists`);
      return;
    }

    const subcats = newCatSubcats.split(',').map((s) => s.trim()).filter(Boolean);
    const newCategoryObj: Category = {
      id: slug,
      slug,
      name: newCatName.trim(),
      woodSpecies: newCatWood.trim(),
      iconType: newCatIcon,
      productCount: 1,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
      subcategories: subcats.length > 0 ? subcats : ['General Curation'],
    };

    const updated = [...categories, newCategoryObj];
    onUpdateCategories(updated);
    setSelectedCatForEdit(newCategoryObj);
    setIsCreatingNewCat(false);
    setNewCatId('');
    setNewCatName('');
    showLocalToast(`New category "${newCategoryObj.name}" created and synced`);
  };

  // ==========================================
  // 4. TEMPLATE & THEME STUDIO
  // ==========================================
  const [editedTemplate, setEditedTemplate] = useState<StoreTemplate>(activeTemplate);

  useEffect(() => {
    setEditedTemplate(activeTemplate);
  }, [activeTemplate]);

  const handleSaveTemplateChanges = () => {
    onUpdateTemplate(editedTemplate);
    showLocalToast(`Custom styling for "${editedTemplate.name}" applied`);
  };

  // ==========================================
  // 5. MULTI-DOMAIN & VENDOR MANAGEMENT
  // ==========================================
  const [newDomainName, setNewDomainName] = useState<string>('');
  const [newDomainVendor, setNewDomainVendor] = useState<string>('');
  const [newDomainEmail, setNewDomainEmail] = useState<string>('client@webmedia.al');
  const [newDomainTemplateId, setNewDomainTemplateId] = useState<string>(activeTemplate.id);
  const [newDomainCountry, setNewDomainCountry] = useState<string>('Cabo Verde');

  const handleAddDomainMapping = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomainName.trim() || !newDomainVendor.trim()) {
      showLocalToast('Please fill in domain and vendor name');
      return;
    }
    const cleanDomain = newDomainName.trim().toLowerCase().replace(/^https?:\/\//, '');
    const newMapping: DomainVendorMapping = {
      id: `dom-${Date.now()}`,
      domain: cleanDomain,
      vendorName: newDomainVendor.trim(),
      vendorEmail: newDomainEmail.trim(),
      templateId: newDomainTemplateId,
      country: newDomainCountry.trim(),
      currency: 'EUR / CVE',
      isActive: true,
    };
    const updated = [...domainMappings, newMapping];
    onUpdateDomainMappings(updated);
    setNewDomainName('');
    setNewDomainVendor('');
    showLocalToast(`Mapped domain "${cleanDomain}" to template`);
  };

  const handleToggleDomainActive = (id: string) => {
    const updated = domainMappings.map((m) => m.id === id ? { ...m, isActive: !m.isActive } : m);
    onUpdateDomainMappings(updated);
    showLocalToast('Domain routing status updated');
  };

  const handleDeleteDomain = (id: string) => {
    const updated = domainMappings.filter((m) => m.id !== id);
    onUpdateDomainMappings(updated);
    showLocalToast('Domain mapping removed');
  };

  // ==========================================
  // 6. ADMIN PROFILE & OTP EMAIL CHANGE
  // ==========================================
  const [adminName, setAdminName] = useState<string>(admin.name || 'Master Curator & Lead Architect');
  const [adminTitle, setAdminTitle] = useState<string>(admin.title || 'Director of Architectural Design');
  const [adminPhone, setAdminPhone] = useState<string>(admin.phone || '+355 69 000 0000');
  const [adminCompany, setAdminCompany] = useState<string>(admin.companyName || 'WebMedia Luxury Living & Cabo Verde Atelier');
  const [adminBio, setAdminBio] = useState<string>(admin.bio || 'Curating bespoke architectural interiors and solid hardwood heirloom furniture across Cabo Verde and Europe.');

  const handleSaveProfileInfo = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedAdmin: AdminUser = {
      ...admin,
      name: adminName.trim(),
      title: adminTitle.trim(),
      phone: adminPhone.trim(),
      companyName: adminCompany.trim(),
      bio: adminBio.trim(),
    };
    onUpdateAdminUser(updatedAdmin);
    showLocalToast('Admin profile information updated');
  };

  // Email Change with 30s OTP Requirement
  const [newEmailTarget, setNewEmailTarget] = useState<string>('');
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [otpInputs, setOtpInputs] = useState<string[]>(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState<number>(30);
  const [otpError, setOtpError] = useState<string | null>(null);

  // OTP Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isOtpSent && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isOtpSent, otpTimer]);

  // Trigger OTP dispatch to new email
  const handleInitiateEmailChange = () => {
    if (!newEmailTarget.trim() || !newEmailTarget.includes('@')) {
      setOtpError('Please enter a valid new email address');
      return;
    }
    if (newEmailTarget.trim().toLowerCase() === admin.email.toLowerCase()) {
      setOtpError('New email must be different from current email');
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setIsOtpSent(true);
    setOtpTimer(30);
    setOtpInputs(['', '', '', '', '', '']);
    setOtpError(null);
    showLocalToast(`Verification code sent to ${newEmailTarget}`);
  };

  // Resend OTP
  const handleResendOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpTimer(30);
    setOtpError(null);
    showLocalToast(`New code dispatched to ${newEmailTarget}`);
  };

  // Handle OTP 6-digit input
  const handleOtpDigitChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...otpInputs];
    updated[index] = val;
    setOtpInputs(updated);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`email-otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Auto-fill OTP helper for testing
  const handleAutoFillOtp = () => {
    if (generatedOtp) {
      setOtpInputs(generatedOtp.split(''));
    }
  };

  // Confirm email change
  const handleVerifyOtpAndChangeEmail = () => {
    const entered = otpInputs.join('');
    if (entered.length < 6) {
      setOtpError('Please enter the complete 6-digit code');
      return;
    }
    if (entered !== generatedOtp) {
      setOtpError('Invalid OTP code. Please check code or request resend');
      return;
    }

    // Success! Update admin email
    const updatedAdmin: AdminUser = {
      ...admin,
      email: newEmailTarget.trim().toLowerCase(),
    };
    onUpdateAdminUser(updatedAdmin);
    setIsOtpSent(false);
    setNewEmailTarget('');
    setOtpInputs(['', '', '', '', '', '']);
    setOtpError(null);
    showLocalToast(`Admin email successfully updated to ${updatedAdmin.email}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/85 backdrop-blur-md overflow-y-auto p-2 sm:p-4 lg:p-6 flex justify-center animate-in fade-in duration-200">
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col my-auto min-h-[90vh]">
        
        {/* ========================================================
            TOP ADMIN HEADER BAR
        ======================================================== */}
        <div className="bg-neutral-950 text-white px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase font-black">
                  CABO VERDE ARCHITECTURAL ATELIER
                </span>
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>2FA SECURED</span>
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <span>Executive Management Portal</span>
                <span className="text-xs font-normal text-neutral-400 font-mono hidden sm:inline">v3.5 Professional</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="text-right hidden lg:block pr-3 border-r border-neutral-800">
              <span className="text-[11px] text-neutral-400 block font-medium">Logged in as</span>
              <span className="text-xs font-mono font-bold text-amber-300">{admin.email}</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span>Return to Showroom</span>
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* ========================================================
            TAB NAVIGATION BAR
        ======================================================== */}
        <div className="bg-neutral-100/90 px-6 py-2.5 border-b border-neutral-200 overflow-x-auto no-scrollbar flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveTab('upload')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'upload'
                  ? 'bg-neutral-900 text-white shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/70'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{editingProductId ? 'Edit Product' : 'Product & Media Upload'}</span>
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'catalog'
                  ? 'bg-neutral-900 text-white shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/70'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Catalog &amp; Placement</span>
              <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.2 rounded-full font-mono">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'categories'
                  ? 'bg-neutral-900 text-white shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/70'
              }`}
            >
              <FolderPlus className="w-3.5 h-3.5" />
              <span>Categories &amp; Icons</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full font-mono">
                {categories.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('templates')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'templates'
                  ? 'bg-neutral-900 text-white shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/70'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Template Editor</span>
              <span className="text-[10px] bg-purple-100 text-purple-800 px-1.5 py-0.2 rounded-full font-mono">
                {activeTemplate.name.split(' ')[0]}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('domains')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'domains'
                  ? 'bg-neutral-900 text-white shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/70'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Domains &amp; Multi-Vendor</span>
              <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded-full font-mono">
                {domainMappings.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('account')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'account'
                  ? 'bg-neutral-900 text-white shadow-md'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/70'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Account &amp; Security</span>
            </button>
          </div>

          {editingProductId && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 font-medium">
                Editing product
              </span>
              <button
                type="button"
                onClick={resetProductForm}
                className="text-xs text-neutral-500 hover:text-neutral-900 underline font-semibold cursor-pointer"
              >
                Cancel Edit
              </button>
            </div>
          )}
        </div>

        {/* Global Local Toast Notification */}
        {toastMessage && (
          <div className="bg-neutral-900 text-white text-xs px-6 py-2.5 flex items-center justify-between border-b border-neutral-800 animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-neutral-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ========================================================
            TAB 1: PRODUCT & MEDIA UPLOAD (MAIN IMAGE + GALLERY + PDF + OPTIONS)
        ======================================================== */}
        {activeTab === 'upload' && (
          <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-black text-neutral-900 tracking-tight">
                    {editingProductId ? `Edit Product: ${productName}` : 'Add New Architectural Product'}
                  </h2>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Upload high-resolution primary image, multi-angle gallery, architectural PDF spec sheet, and customize delivery &amp; placement.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleFillSample}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-300 hover:border-neutral-900 text-neutral-700 hover:text-neutral-900 text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Fill Sample Data</span>
                  </button>

                  {editingProductId && (
                    <button
                      type="button"
                      onClick={resetProductForm}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>New Blank Form</span>
                    </button>
                  )}
                </div>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-8">
                
                {/* 1.1 Core Details Grid */}
                <div className="bg-neutral-50/80 rounded-2xl p-5 border border-neutral-200/90 shadow-xs">
                  <h3 className="text-xs font-black text-neutral-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-red-600" />
                    <span>General Product Identity</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block font-bold text-neutral-800 mb-1">Product Title *</label>
                      <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="e.g. Cabo Verde Monolithic Walnut Credenza"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs text-neutral-900 outline-none bg-white font-medium shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">SKU Code</label>
                      <input
                        type="text"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs font-mono text-neutral-900 outline-none bg-white shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">Category *</label>
                      <select
                        value={category}
                        onChange={(e) => handleCategorySelect(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs text-neutral-900 outline-none bg-white shadow-xs"
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">Subcategory</label>
                      <select
                        value={subcategory}
                        onChange={(e) => setSubcategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs text-neutral-900 outline-none bg-white shadow-xs"
                      >
                        {(categories.find((c) => c.id === category || c.slug === category)?.subcategories || ['General']).map((sub) => (
                          <option key={sub} value={sub}>
                            {sub}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">Room Placement</label>
                      <select
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs text-neutral-900 outline-none bg-white shadow-xs"
                      >
                        <option value="living-room">Living Room</option>
                        <option value="dining-room">Dining Room</option>
                        <option value="bedroom">Bedroom</option>
                        <option value="home-office">Home Office</option>
                        <option value="outdoor">Outdoor / Terrace</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">Curator Badge</label>
                      <input
                        type="text"
                        value={badge}
                        onChange={(e) => setBadge(e.target.value)}
                        placeholder="e.g. Bespoke Edition, Bestseller, New"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs text-neutral-900 outline-none bg-white shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">Wood Species &amp; Material</label>
                      <input
                        type="text"
                        value={material}
                        onChange={(e) => setMaterial(e.target.value)}
                        placeholder="e.g. Solid American Walnut, Natural Oak"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs text-neutral-900 outline-none bg-white shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">Dimensions</label>
                      <input
                        type="text"
                        value={dimensions}
                        onChange={(e) => setDimensions(e.target.value)}
                        placeholder="e.g. W: 240cm × D: 105cm × H: 76cm"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-xs text-neutral-900 outline-none bg-white shadow-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* 1.2 MEDIA ASSETS: MAIN IMAGE + GALLERY OF OTHER IMAGES */}
                <div className="bg-neutral-50/80 rounded-2xl p-5 border border-neutral-200/90 shadow-xs space-y-6">
                  <div>
                    <h3 className="text-xs font-black text-neutral-900 uppercase tracking-wider mb-1 flex items-center gap-2">
                      <Upload className="w-4 h-4 text-red-600" />
                      <span>Product Images: Main Image &amp; Multi-Angle Gallery</span>
                    </h3>
                    <p className="text-[11px] text-neutral-500">
                      Upload the primary showcase photograph, plus secondary joinery, upholstery, and detail angles.
                    </p>
                  </div>

                  {/* Main Image Section */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-white p-4 rounded-xl border border-neutral-200">
                    <div className="md:col-span-2 space-y-2 text-xs">
                      <label className="block font-bold text-neutral-900">
                        Primary Showcase Image (Main Image) *
                      </label>
                      <input
                        type="text"
                        value={mainImage}
                        onChange={(e) => setMainImage(e.target.value)}
                        placeholder="Paste image URL..."
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 focus:border-red-600 text-xs outline-none"
                      />
                      <div className="flex items-center gap-2 pt-1">
                        <label className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-xs">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Local Main Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleMainImageUpload}
                            className="hidden"
                          />
                        </label>
                        <span className="text-[10px] text-neutral-400">PNG, JPG, WebP supported</span>
                      </div>
                    </div>

                    <div className="h-32 bg-neutral-100 rounded-xl overflow-hidden flex items-center justify-center border border-neutral-200 relative group">
                      {mainImage ? (
                        <img
                          src={mainImage}
                          alt="Main preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-neutral-400 text-xs">No main image</span>
                      )}
                      <span className="absolute bottom-2 left-2 bg-neutral-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                        Primary Cover
                      </span>
                    </div>
                  </div>

                  {/* Gallery of Additional Images */}
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <label className="block text-xs font-bold text-neutral-900">
                          Gallery: Additional Product Images ({galleryImages.length})
                        </label>
                        <span className="text-[11px] text-neutral-500">
                          Shows in interactive zoom loupe and detailed view thumbnails.
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold cursor-pointer border border-neutral-300 transition-colors shadow-xs">
                          <Upload className="w-3.5 h-3.5 text-neutral-600" />
                          <span>Upload Multiple Photos</span>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleGalleryUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    {/* URL Input for extra image */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newGalleryInput}
                        onChange={(e) => setNewGalleryInput(e.target.value)}
                        placeholder="Or paste additional image URL..."
                        className="flex-1 px-3.5 py-2 rounded-xl border border-neutral-300 focus:border-red-600 text-xs outline-none bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newGalleryInput.trim()) {
                            setGalleryImages((prev) => [...prev, newGalleryInput.trim()]);
                            setNewGalleryInput('');
                            showLocalToast('Added image to gallery');
                          }
                        }}
                        className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                      >
                        Add URL
                      </button>
                    </div>

                    {/* Gallery Thumbnails Grid */}
                    {galleryImages.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
                        {galleryImages.map((img, idx) => (
                          <div
                            key={idx}
                            className="relative h-24 bg-white rounded-xl border border-neutral-200 overflow-hidden group shadow-xs"
                          >
                            <img
                              src={img}
                              alt={`Gallery angle ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-neutral-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-1">
                              <button
                                type="button"
                                onClick={() => {
                                  // Set this as main
                                  const oldMain = mainImage;
                                  setMainImage(img);
                                  const updated = galleryImages.filter((_, i) => i !== idx);
                                  if (oldMain && !updated.includes(oldMain)) updated.push(oldMain);
                                  setGalleryImages(updated);
                                  showLocalToast('Set as main showcase image');
                                }}
                                className="text-[9px] bg-white text-neutral-900 px-1.5 py-0.5 rounded font-bold hover:bg-neutral-100 cursor-pointer"
                              >
                                Set Main
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setGalleryImages((prev) => prev.filter((_, i) => i !== idx));
                                  showLocalToast('Removed photo');
                                }}
                                className="text-[9px] bg-red-600 text-white px-1.5 py-0.5 rounded font-bold hover:bg-red-700 cursor-pointer"
                              >
                                Remove
                              </button>
                            </div>
                            <span className="absolute bottom-1 right-1 text-[9px] bg-black/70 text-white px-1 rounded font-mono">
                              #{idx + 1}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 1.3 PDF BROCHURE UPLOAD */}
                  <div className="border-t border-neutral-200 pt-5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <label className="block text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-red-600" />
                          <span>Architectural PDF Brochure &amp; Spec Sheet</span>
                        </label>
                        <span className="text-[11px] text-neutral-500">
                          When uploaded, a prominent Download &amp; View PDF Spec button is rendered on the product detail page.
                        </span>
                      </div>

                      <label className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-xs">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload PDF File</span>
                        <input
                          type="file"
                          accept=".pdf,application/pdf"
                          onChange={handlePdfUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={pdfBrochureUrl}
                        onChange={(e) => setPdfBrochureUrl(e.target.value)}
                        placeholder="Or paste external PDF URL (e.g. https://.../Brochure.pdf)..."
                        className="flex-1 px-3.5 py-2 rounded-xl border border-neutral-300 focus:border-red-600 text-xs outline-none bg-white"
                      />
                      <input
                        type="text"
                        value={pdfBrochureName}
                        onChange={(e) => setPdfBrochureName(e.target.value)}
                        placeholder="Document label (e.g. CaboVerde-SpecSheet.pdf)"
                        className="w-1/3 px-3.5 py-2 rounded-xl border border-neutral-300 focus:border-red-600 text-xs outline-none bg-white"
                      />
                    </div>

                    {pdfBrochureUrl && (
                      <div className="bg-red-50/70 border border-red-200 rounded-xl p-3 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold">
                            <FileCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-bold text-red-950 block">
                              {pdfBrochureName || 'Architectural Specification Sheet.pdf'}
                            </span>
                            <span className="text-[10px] text-red-600 font-mono">
                              PDF Document Attached &bull; Active on Product Page
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={pdfBrochureUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-neutral-100 text-neutral-800 rounded-lg font-bold text-[11px] border border-neutral-300"
                          >
                            <Download className="w-3 h-3 text-red-600" />
                            <span>Preview</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => {
                              setPdfBrochureUrl('');
                              setPdfBrochureName('');
                              showLocalToast('PDF Brochure detached');
                            }}
                            className="text-red-600 hover:text-red-800 text-[11px] font-bold underline cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 1.4 DETAILED OPTIONS & EDITABLE DEFAULT DESCRIPTIONS */}
                <div className="bg-neutral-50/80 rounded-2xl p-5 border border-neutral-200/90 shadow-xs space-y-4">
                  <div>
                    <h3 className="text-xs font-black text-neutral-900 uppercase tracking-wider mb-1 flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-red-600" />
                      <span>Product Specifications &amp; Delivery Terms (Editable Defaults)</span>
                    </h3>
                    <p className="text-[11px] text-neutral-500">
                      These values are pre-filled with atelier luxury defaults, but you can freely modify them for each unique product.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">
                        Product Description &amp; Design Narrative
                      </label>
                      <textarea
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-red-600 text-xs text-neutral-900 outline-none bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-800 mb-1 flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-neutral-600" />
                        <span>Shipping &amp; White Glove Delivery Policy</span>
                      </label>
                      <textarea
                        rows={3}
                        value={shippingInfo}
                        onChange={(e) => setShippingInfo(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-red-600 text-xs text-neutral-900 outline-none bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-800 mb-1 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-neutral-600" />
                        <span>Production Lead Time &amp; Dispatch</span>
                      </label>
                      <input
                        type="text"
                        value={leadTime}
                        onChange={(e) => setLeadTime(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 focus:border-red-600 text-xs text-neutral-900 outline-none bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-800 mb-1 flex items-center gap-1.5">
                        <ShieldAlert className="w-3.5 h-3.5 text-neutral-600" />
                        <span>Warranty &amp; Structural Joinery Guarantee</span>
                      </label>
                      <input
                        type="text"
                        value={warrantyInfo}
                        onChange={(e) => setWarrantyInfo(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 focus:border-red-600 text-xs text-neutral-900 outline-none bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">
                        Care &amp; Hardwood Maintenance Instructions
                      </label>
                      <textarea
                        rows={2}
                        value={careInstructions}
                        onChange={(e) => setCareInstructions(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 focus:border-red-600 text-xs text-neutral-900 outline-none bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">
                        Architectural Joinery &amp; CAD Framework
                      </label>
                      <textarea
                        rows={2}
                        value={architecturalSpecs}
                        onChange={(e) => setArchitecturalSpecs(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 focus:border-red-600 text-xs text-neutral-900 outline-none bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* 1.5 MAIN PAGE PLACEMENT TOGGLES (YES / NO BUTTONS) */}
                <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 text-white rounded-2xl p-5 shadow-lg space-y-4">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span>Main Showroom Placement &amp; Carousel Toggles</span>
                    </h3>
                    <p className="text-[11px] text-neutral-400 mt-0.5">
                      Precisely control which main page sections and carousels render this piece.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 pt-2 text-xs">
                    
                    {/* Add to Popular Picks [YES/NO] */}
                    <div className="bg-neutral-800/80 rounded-xl p-3 border border-neutral-700 flex flex-col justify-between gap-3">
                      <div>
                        <span className="font-bold text-white block">Add to Popular Picks</span>
                        <span className="text-[10px] text-neutral-400">Carousel on home page</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 bg-neutral-900 p-1 rounded-lg">
                        <button
                          type="button"
                          onClick={() => setIsPopular(true)}
                          className={`py-1 rounded font-black text-xs transition-colors cursor-pointer ${
                            isPopular ? 'bg-amber-500 text-neutral-950 shadow-xs' : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          YES
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsPopular(false)}
                          className={`py-1 rounded font-black text-xs transition-colors cursor-pointer ${
                            !isPopular ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          NO
                        </button>
                      </div>
                    </div>

                    {/* Add to Featured [YES/NO] */}
                    <div className="bg-neutral-800/80 rounded-xl p-3 border border-neutral-700 flex flex-col justify-between gap-3">
                      <div>
                        <span className="font-bold text-white block">Add to Featured</span>
                        <span className="text-[10px] text-neutral-400">Featured collection tab</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 bg-neutral-900 p-1 rounded-lg">
                        <button
                          type="button"
                          onClick={() => setIsFeatured(true)}
                          className={`py-1 rounded font-black text-xs transition-colors cursor-pointer ${
                            isFeatured ? 'bg-purple-500 text-white shadow-xs' : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          YES
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsFeatured(false)}
                          className={`py-1 rounded font-black text-xs transition-colors cursor-pointer ${
                            !isFeatured ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          NO
                        </button>
                      </div>
                    </div>

                    {/* Add to New Arrivals [YES/NO] */}
                    <div className="bg-neutral-800/80 rounded-xl p-3 border border-neutral-700 flex flex-col justify-between gap-3">
                      <div>
                        <span className="font-bold text-white block">Add to New Arrivals</span>
                        <span className="text-[10px] text-neutral-400">New arrivals carousel</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 bg-neutral-900 p-1 rounded-lg">
                        <button
                          type="button"
                          onClick={() => setIsNewArrival(true)}
                          className={`py-1 rounded font-black text-xs transition-colors cursor-pointer ${
                            isNewArrival ? 'bg-emerald-500 text-neutral-950 shadow-xs' : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          YES
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsNewArrival(false)}
                          className={`py-1 rounded font-black text-xs transition-colors cursor-pointer ${
                            !isNewArrival ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          NO
                        </button>
                      </div>
                    </div>

                    {/* Add to Best Sellers [YES/NO] */}
                    <div className="bg-neutral-800/80 rounded-xl p-3 border border-neutral-700 flex flex-col justify-between gap-3">
                      <div>
                        <span className="font-bold text-white block">Add to Best Sellers</span>
                        <span className="text-[10px] text-neutral-400">Top ranked pieces</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 bg-neutral-900 p-1 rounded-lg">
                        <button
                          type="button"
                          onClick={() => setIsBestSeller(true)}
                          className={`py-1 rounded font-black text-xs transition-colors cursor-pointer ${
                            isBestSeller ? 'bg-red-600 text-white shadow-xs' : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          YES
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsBestSeller(false)}
                          className={`py-1 rounded font-black text-xs transition-colors cursor-pointer ${
                            !isBestSeller ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          NO
                        </button>
                      </div>
                    </div>

                    {/* Add to Main Hero Slider [YES/NO] */}
                    <div className="bg-neutral-800/80 rounded-xl p-3 border border-neutral-700 flex flex-col justify-between gap-3">
                      <div>
                        <span className="font-bold text-white block">Main Hero Slider</span>
                        <span className="text-[10px] text-neutral-400">Featured banner</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 bg-neutral-900 p-1 rounded-lg">
                        <button
                          type="button"
                          onClick={() => setIsHero(true)}
                          className={`py-1 rounded font-black text-xs transition-colors cursor-pointer ${
                            isHero ? 'bg-blue-500 text-white shadow-xs' : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          YES
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsHero(false)}
                          className={`py-1 rounded font-black text-xs transition-colors cursor-pointer ${
                            !isHero ? 'bg-neutral-700 text-white' : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          NO
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Submit Action Bar */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t border-neutral-200">
                  <div className="flex items-center gap-2">
                    {editingProductId && (
                      <span className="text-xs text-neutral-500">
                        Editing SKU: <strong className="font-mono text-neutral-900">{sku}</strong>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={resetProductForm}
                      className="px-5 py-3 rounded-xl border border-neutral-300 hover:border-neutral-900 text-neutral-700 text-xs font-bold transition-all cursor-pointer"
                    >
                      Clear Fields
                    </button>

                    <button
                      type="submit"
                      className="px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black tracking-wide uppercase shadow-lg shadow-red-600/30 transition-all active:scale-98 cursor-pointer flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>{editingProductId ? 'Save Product Changes' : 'Publish Product to Catalog'}</span>
                    </button>
                  </div>
                </div>

              </form>

            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: INVENTORY & CATALOG (WITH PLACEMENT TOGGLES)
        ======================================================== */}
        {activeTab === 'catalog' && (
          <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto space-y-6">
              
              {/* Header and Search */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-neutral-900 tracking-tight">
                    Showroom Catalog &amp; Active Inventory
                  </h2>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Manage all products, modify placement tags, edit specifications, or remove discontinued lines.
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <div className="relative">
                    <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search title, SKU..."
                      value={catalogSearch}
                      onChange={(e) => setCatalogSearch(e.target.value)}
                      className="pl-9 pr-3.5 py-2 rounded-xl border border-neutral-300 focus:border-red-600 text-xs outline-none bg-white w-48 sm:w-64"
                    />
                  </div>

                  <select
                    value={catalogFilter}
                    onChange={(e) => setCatalogFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-neutral-300 text-xs outline-none bg-white"
                  >
                    <option value="all">All Categories</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => {
                      resetProductForm();
                      setActiveTab('upload');
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Upload New</span>
                  </button>
                </div>
              </div>

              {/* Table of Products */}
              <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-neutral-100/90 text-neutral-700 border-b border-neutral-200 font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-3 px-4">Product</th>
                        <th className="py-3 px-3">SKU</th>
                        <th className="py-3 px-3">Category</th>
                        <th className="py-3 px-3">Placement Flags</th>
                        <th className="py-3 px-3">Brochure</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {filteredCatalog.map((product) => (
                        <tr key={product.id} className="hover:bg-neutral-50/80 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-12 h-12 rounded-xl object-cover bg-neutral-100 border border-neutral-200 flex-shrink-0"
                              />
                              <div className="min-w-0">
                                <span className="font-bold text-neutral-900 block truncate max-w-xs">
                                  {product.name}
                                </span>
                                <span className="text-[11px] text-neutral-400 truncate block">
                                  {product.material || product.dimensions || 'Solid Hardwood Build'}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-3 font-mono font-bold text-neutral-700">
                            {product.sku}
                          </td>

                          <td className="py-3 px-3">
                            <span className="bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded text-[11px] font-medium">
                              {categories.find((c) => c.id === product.category || c.slug === product.category)?.name || product.category}
                            </span>
                          </td>

                          <td className="py-3 px-3">
                            <div className="flex items-center gap-1 flex-wrap">
                              {/* Popular Quick Toggle */}
                              <button
                                type="button"
                                onClick={() => {
                                  onUpdateProduct({ ...product, isPopular: !product.isPopular });
                                  showLocalToast(`Toggled Popular for "${product.name}"`);
                                }}
                                className={`text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer transition-colors ${
                                  product.isPopular
                                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                    : 'bg-neutral-100 text-neutral-400 hover:text-neutral-700'
                                }`}
                                title="Click to toggle Popular Picks"
                              >
                                Pop: {product.isPopular ? 'YES' : 'NO'}
                              </button>

                              {/* Featured Quick Toggle */}
                              <button
                                type="button"
                                onClick={() => {
                                  onUpdateProduct({ ...product, isFeatured: !product.isFeatured });
                                  showLocalToast(`Toggled Featured for "${product.name}"`);
                                }}
                                className={`text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer transition-colors ${
                                  product.isFeatured
                                    ? 'bg-purple-100 text-purple-800 border border-purple-300'
                                    : 'bg-neutral-100 text-neutral-400 hover:text-neutral-700'
                                }`}
                                title="Click to toggle Featured Collection"
                              >
                                Feat: {product.isFeatured ? 'YES' : 'NO'}
                              </button>

                              {/* New Arrival Quick Toggle */}
                              <button
                                type="button"
                                onClick={() => {
                                  onUpdateProduct({ ...product, isNewArrival: !product.isNewArrival });
                                  showLocalToast(`Toggled New Arrival for "${product.name}"`);
                                }}
                                className={`text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer transition-colors ${
                                  product.isNewArrival
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                    : 'bg-neutral-100 text-neutral-400 hover:text-neutral-700'
                                }`}
                                title="Click to toggle New Arrivals"
                              >
                                New: {product.isNewArrival ? 'YES' : 'NO'}
                              </button>
                            </div>
                          </td>

                          <td className="py-3 px-3">
                            {product.pdfBrochureUrl ? (
                              <a
                                href={product.pdfBrochureUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 hover:text-red-800 bg-red-50 px-2 py-0.5 rounded border border-red-200"
                              >
                                <FileText className="w-3 h-3" />
                                <span>PDF Spec</span>
                              </a>
                            ) : (
                              <span className="text-[10px] text-neutral-300 italic">No PDF</span>
                            )}
                          </td>

                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  onPreviewProduct(product);
                                  showLocalToast(`Opening zoom preview for "${product.name}"`);
                                }}
                                className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-600 hover:text-neutral-900 transition-colors"
                                title="Inspect Loupe & Product Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleEditProduct(product)}
                                className="p-1.5 hover:bg-blue-50 rounded-lg text-blue-600 hover:text-blue-800 transition-colors"
                                title="Edit Product Data"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Remove "${product.name}" from catalog?`)) {
                                    onDeleteProduct(product.id);
                                  }
                                }}
                                className="p-1.5 hover:bg-red-50 rounded-lg text-red-600 hover:text-red-800 transition-colors"
                                title="Delete Product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredCatalog.length === 0 && (
                  <div className="py-12 text-center text-neutral-400">
                    <p className="text-xs">No products found matching query.</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: CATEGORY & SUBCATEGORY MANAGER
        ======================================================== */}
        {activeTab === 'categories' && (
          <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-neutral-900 tracking-tight">
                    Architectural Category &amp; Icon Manager
                  </h2>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Customize category names, carved 3D wood icon assignments, hardwood species, and subcategories.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCreatingNewCat(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Create New Category</span>
                </button>
              </div>

              {/* Modal / Card for Creating a New Category */}
              {isCreatingNewCat && (
                <div className="bg-amber-50/70 border-2 border-amber-300 rounded-2xl p-5 shadow-md animate-in slide-in-from-top duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-black text-amber-950 flex items-center gap-2">
                      <FolderPlus className="w-4 h-4 text-amber-700" />
                      <span>Create New Category &amp; Subcategories</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsCreatingNewCat(false)}
                      className="text-neutral-500 hover:text-neutral-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateCategorySubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-bold text-neutral-800 mb-1">Category Name *</label>
                        <input
                          type="text"
                          required
                          value={newCatName}
                          onChange={(e) => setNewCatName(e.target.value)}
                          placeholder="e.g. Architectural Panels, Outdoor Kitchens"
                          className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:border-amber-600 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-neutral-800 mb-1">Wood Species &amp; Origin</label>
                        <input
                          type="text"
                          value={newCatWood}
                          onChange={(e) => setNewCatWood(e.target.value)}
                          placeholder="e.g. Quarter-Sawn Teak, French Oak"
                          className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:border-amber-600 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-neutral-800 mb-1">3D Furniture Icon</label>
                        <select
                          value={newCatIcon}
                          onChange={(e) => setNewCatIcon(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:border-amber-600 bg-white"
                        >
                          {AVAILABLE_ICONS.map((ico) => (
                            <option key={ico.id} value={ico.id}>
                              {ico.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block font-bold text-neutral-800 mb-1">
                          Initial Subcategories (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={newCatSubcats}
                          onChange={(e) => setNewCatSubcats(e.target.value)}
                          placeholder="e.g. Slatted Panels, Fluted Wood, Acoustic Ceilings"
                          className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:border-amber-600 bg-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsCreatingNewCat(false)}
                        className="px-4 py-2 rounded-xl border border-neutral-300 text-neutral-700 font-bold hover:bg-neutral-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black shadow-sm"
                      >
                        Create Category
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Category Grid & Editor */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Left: List of categories */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider block mb-2">
                    Active Categories ({categories.length})
                  </span>
                  <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
                    {categories.map((cat) => {
                      const isSelected = selectedCatForEdit.id === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCatForEdit(cat)}
                          className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-neutral-900 text-white border-neutral-900 shadow-md'
                              : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400'
                          }`}
                        >
                          <div>
                            <span className="font-bold text-xs block">{cat.name}</span>
                            <span className={`text-[10px] block ${isSelected ? 'text-amber-300' : 'text-neutral-400'}`}>
                              {cat.woodSpecies || 'Hardwood'} &bull; {cat.subcategories?.length || 0} subcats
                            </span>
                          </div>
                          <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-neutral-400'}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Selected Category Editor */}
                <div className="md:col-span-2 bg-neutral-50/90 rounded-2xl p-6 border border-neutral-200 space-y-5">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                    <div>
                      <h3 className="text-sm font-black text-neutral-900">
                        Edit Category: {selectedCatForEdit.name}
                      </h3>
                      <span className="text-[11px] text-neutral-500 font-mono">
                        Slug: {selectedCatForEdit.slug}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleSaveCategoryChanges}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-red-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">Category Display Name</label>
                      <input
                        type="text"
                        value={catNameInput}
                        onChange={(e) => setCatNameInput(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-red-600 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">Wood Species &amp; Finish</label>
                      <input
                        type="text"
                        value={catWoodInput}
                        onChange={(e) => setCatWoodInput(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-red-600 bg-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-neutral-800 mb-1">Icon Style Preset</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {AVAILABLE_ICONS.map((ico) => {
                          const IconComp = ico.icon;
                          const isPicked = catIconInput === ico.id;
                          return (
                            <button
                              key={ico.id}
                              type="button"
                              onClick={() => setCatIconInput(ico.id)}
                              className={`p-2.5 rounded-xl border flex items-center gap-2 text-left transition-all cursor-pointer ${
                                isPicked
                                  ? 'border-amber-600 bg-amber-50 text-amber-950 font-bold'
                                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                              }`}
                            >
                              <IconComp className="w-4 h-4 text-amber-700 flex-shrink-0" />
                              <span className="text-[11px] truncate">{ico.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Subcategories Management */}
                  <div className="border-t border-neutral-200 pt-4 space-y-3">
                    <label className="block text-xs font-bold text-neutral-900">
                      Subcategories in "{selectedCatForEdit.name}"
                    </label>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newSubcatInput}
                        onChange={(e) => setNewSubcatInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSubcategory();
                          }
                        }}
                        placeholder="Add subcategory name and press enter..."
                        className="flex-1 px-3.5 py-2 rounded-xl border border-neutral-300 focus:border-red-600 text-xs bg-white"
                      />
                      <button
                        type="button"
                        onClick={handleAddSubcategory}
                        className="px-4 py-2 bg-neutral-800 hover:bg-neutral-900 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                      >
                        Add Subcategory
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {subcatList.map((sub) => (
                        <span
                          key={sub}
                          className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-neutral-200 text-neutral-800 rounded-full text-xs font-medium shadow-2xs"
                        >
                          <span>{sub}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSubcategory(sub)}
                            className="text-neutral-400 hover:text-red-600 cursor-pointer"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: TEMPLATE & THEME STUDIO
        ======================================================== */}
        {activeTab === 'templates' && (
          <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto space-y-8">
              
              <div>
                <h2 className="text-xl font-black text-neutral-900 tracking-tight">
                  Atelier Template &amp; Theme Studio
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Select, customize, and preview brand design templates. Tailor palettes, typography, and mood presets.
                </p>
              </div>

              {/* Template Presets Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {templates.map((tpl) => {
                  const isActive = activeTemplate.id === tpl.id;
                  return (
                    <div
                      key={tpl.id}
                      onClick={() => onSelectTemplate(tpl.id)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between relative shadow-xs ${
                        isActive
                          ? 'border-red-600 bg-neutral-900 text-white shadow-lg'
                          : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-900'
                      }`}
                    >
                      {isActive && (
                        <span className="absolute top-2 right-2 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                          Active
                        </span>
                      )}

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className="w-4 h-4 rounded-full border border-white/40 shadow-xs"
                            style={{ backgroundColor: tpl.primaryColor }}
                          />
                          <span
                            className="w-4 h-4 rounded-full border border-white/40 shadow-xs"
                            style={{ backgroundColor: tpl.accentColor }}
                          />
                        </div>
                        <h4 className="font-bold text-xs">{tpl.name}</h4>
                        <p className={`text-[10px] mt-1 line-clamp-2 ${isActive ? 'text-neutral-300' : 'text-neutral-500'}`}>
                          {tpl.tagline}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-neutral-200/40 flex items-center justify-between text-[10px]">
                        <span className="font-mono">{tpl.styleMode}</span>
                        <span className="font-bold underline">{isActive ? 'Current' : 'Apply'}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Template Customizer & Live Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-neutral-50 rounded-3xl p-6 border border-neutral-200">
                
                {/* Editor Inputs */}
                <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-neutral-900">
                      Customize Active Template: {editedTemplate.name}
                    </h3>
                    <button
                      type="button"
                      onClick={handleSaveTemplateChanges}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-xs cursor-pointer"
                    >
                      Save Template
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">Primary Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={editedTemplate.primaryColor}
                          onChange={(e) => setEditedTemplate({ ...editedTemplate, primaryColor: e.target.value })}
                          className="w-8 h-8 rounded-lg cursor-pointer border border-neutral-300"
                        />
                        <input
                          type="text"
                          value={editedTemplate.primaryColor}
                          onChange={(e) => setEditedTemplate({ ...editedTemplate, primaryColor: e.target.value })}
                          className="flex-1 px-3 py-1.5 rounded-xl border border-neutral-300 font-mono text-xs bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">Accent Finish Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={editedTemplate.accentColor}
                          onChange={(e) => setEditedTemplate({ ...editedTemplate, accentColor: e.target.value })}
                          className="w-8 h-8 rounded-lg cursor-pointer border border-neutral-300"
                        />
                        <input
                          type="text"
                          value={editedTemplate.accentColor}
                          onChange={(e) => setEditedTemplate({ ...editedTemplate, accentColor: e.target.value })}
                          className="flex-1 px-3 py-1.5 rounded-xl border border-neutral-300 font-mono text-xs bg-white"
                        />
                      </div>
                    </div>

                    <div className="col-span-2">
                      <label className="block font-bold text-neutral-800 mb-1">Architectural Tagline</label>
                      <input
                        type="text"
                        value={editedTemplate.tagline}
                        onChange={(e) => setEditedTemplate({ ...editedTemplate, tagline: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 bg-white"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block font-bold text-neutral-800 mb-1">Vendor / Atelier Branding</label>
                      <input
                        type="text"
                        value={editedTemplate.vendorName}
                        onChange={(e) => setEditedTemplate({ ...editedTemplate, vendorName: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Live Preview Card */}
                <div
                  className="rounded-2xl p-6 border shadow-sm flex flex-col justify-between"
                  style={{
                    backgroundColor: editedTemplate.bgColor,
                    color: editedTemplate.textColor,
                  }}
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold block mb-1">
                      {editedTemplate.vendorName}
                    </span>
                    <h3 className="text-xl font-black tracking-tight" style={{ color: editedTemplate.primaryColor }}>
                      {editedTemplate.name}
                    </h3>
                    <p className="text-xs mt-2 opacity-80 leading-relaxed">
                      {editedTemplate.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-neutral-500/20 flex items-center justify-between">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs">
                      {editedTemplate.badgeText}
                    </span>
                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xs cursor-pointer"
                      style={{ backgroundColor: editedTemplate.primaryColor }}
                    >
                      Sample Button
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ========================================================
            TAB 5: DOMAINS & MULTI-VENDOR
        ======================================================== */}
        {activeTab === 'domains' && (
          <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto space-y-6">
              
              <div>
                <h2 className="text-xl font-black text-neutral-900 tracking-tight">
                  Domain Routing &amp; Multi-Vendor Management
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Configure multi-domain routing to automatically associate specific templates, vendor names, and inquiries with custom domains.
                </p>
              </div>

              {/* Add Domain Form */}
              <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-200">
                <h3 className="text-xs font-black text-neutral-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span>Map New Domain to Template</span>
                </h3>

                <form onSubmit={handleAddDomainMapping} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-neutral-800 mb-1">Domain Hostname *</label>
                    <input
                      type="text"
                      required
                      value={newDomainName}
                      onChange={(e) => setNewDomainName(e.target.value)}
                      placeholder="e.g. boutique.caboverde.cv"
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:border-blue-600 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-800 mb-1">Vendor / Atelier Name *</label>
                    <input
                      type="text"
                      required
                      value={newDomainVendor}
                      onChange={(e) => setNewDomainVendor(e.target.value)}
                      placeholder="e.g. Cabo Verde Living Studio"
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:border-blue-600 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-800 mb-1">Vendor Email (Inquiries)</label>
                    <input
                      type="email"
                      value={newDomainEmail}
                      onChange={(e) => setNewDomainEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:border-blue-600 bg-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-800 mb-1">Assigned Template</label>
                    <select
                      value={newDomainTemplateId}
                      onChange={(e) => setNewDomainTemplateId(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 bg-white"
                    >
                      {templates.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-800 mb-1">Country / Region</label>
                    <input
                      type="text"
                      value={newDomainCountry}
                      onChange={(e) => setNewDomainCountry(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 bg-white"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs cursor-pointer"
                    >
                      Add Domain Mapping
                    </button>
                  </div>
                </form>
              </div>

              {/* Table of Domain Mappings */}
              <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-neutral-100 text-neutral-700 uppercase tracking-wider text-[10px] font-bold border-b border-neutral-200">
                      <th className="py-3 px-4">Domain</th>
                      <th className="py-3 px-3">Vendor</th>
                      <th className="py-3 px-3">Assigned Template</th>
                      <th className="py-3 px-3">Inquiries</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {domainMappings.map((dm) => (
                      <tr key={dm.id} className="hover:bg-neutral-50">
                        <td className="py-3 px-4 font-mono font-bold text-neutral-900">
                          {dm.domain}
                        </td>
                        <td className="py-3 px-3 font-semibold text-neutral-800">
                          {dm.vendorName}
                        </td>
                        <td className="py-3 px-3">
                          <span className="bg-purple-50 text-purple-800 px-2 py-0.5 rounded text-[11px] font-medium border border-purple-200">
                            {templates.find((t) => t.id === dm.templateId)?.name || dm.templateId}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono text-[11px] text-neutral-600">
                          {dm.vendorEmail}
                        </td>
                        <td className="py-3 px-3">
                          <button
                            type="button"
                            onClick={() => handleToggleDomainActive(dm.id)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                              dm.isActive
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-neutral-100 text-neutral-400'
                            }`}
                          >
                            {dm.isActive ? 'Active' : 'Disabled'}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteDomain(dm.id)}
                            className="p-1 hover:bg-red-50 text-red-600 rounded cursor-pointer"
                            title="Remove mapping"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================
            TAB 6: ADMIN ACCOUNT & OTP EMAIL CONFIRMATION
        ======================================================== */}
        {activeTab === 'account' && (
          <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-8">
              
              <div>
                <h2 className="text-xl font-black text-neutral-900 tracking-tight">
                  Admin Account &amp; Security Profile
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Update your curator profile, title, company credentials, or securely change your admin email via mandatory OTP verification.
                </p>
              </div>

              {/* 6.1 Profile Details Form */}
              <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 space-y-4">
                <h3 className="text-xs font-black text-neutral-900 uppercase tracking-wider flex items-center gap-2">
                  <User className="w-4 h-4 text-neutral-700" />
                  <span>Curator Identity &amp; Profile Details</span>
                </h3>

                <form onSubmit={handleSaveProfileInfo} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={adminName}
                        onChange={(e) => setAdminName(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 focus:border-red-600 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">Professional Title</label>
                      <input
                        type="text"
                        value={adminTitle}
                        onChange={(e) => setAdminTitle(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 focus:border-red-600 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">Contact Phone</label>
                      <input
                        type="text"
                        value={adminPhone}
                        onChange={(e) => setAdminPhone(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 focus:border-red-600 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-neutral-800 mb-1">Organization / Atelier</label>
                      <input
                        type="text"
                        value={adminCompany}
                        onChange={(e) => setAdminCompany(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 focus:border-red-600 bg-white"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-neutral-800 mb-1">Curator Bio &amp; Architectural Focus</label>
                      <textarea
                        rows={2}
                        value={adminBio}
                        onChange={(e) => setAdminBio(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 focus:border-red-600 bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-xl shadow-xs cursor-pointer"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </form>
              </div>

              {/* 6.2 SECURE EMAIL CHANGE FLOW WITH OTP (MANDATORY VERIFICATION) */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300/80 rounded-2xl p-6 shadow-sm space-y-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full">
                      High Security Procedure
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono">Mandatory OTP Verification</span>
                  </div>
                  <h3 className="text-sm font-black text-neutral-900 flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-amber-700" />
                    <span>Change Admin Email Address</span>
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1">
                    Current active admin email: <strong className="font-mono text-neutral-900">{admin.email}</strong>.
                    As per security rules, the email address <strong>cannot be changed</strong> without confirming a 6-digit OTP code sent to the new email address.
                  </p>
                </div>

                {!isOtpSent ? (
                  <div className="space-y-3 max-w-md text-xs">
                    <label className="block font-bold text-neutral-800">
                      Enter New Admin Email Address
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={newEmailTarget}
                        onChange={(e) => setNewEmailTarget(e.target.value)}
                        placeholder="e.g. director@webmedia.al"
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:border-amber-600 bg-white text-xs outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleInitiateEmailChange}
                        className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Send OTP Code
                      </button>
                    </div>
                    {otpError && (
                      <p className="text-red-600 text-xs font-bold">{otpError}</p>
                    )}
                  </div>
                ) : (
                  /* Virtual Email Dispatch & OTP Verification Screen */
                  <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-md space-y-4 animate-in fade-in duration-200">
                    
                    <div className="bg-amber-100/60 rounded-xl p-3.5 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="text-[11px] text-amber-900 font-bold block">
                          Virtual Mail Server Dispatch Active
                        </span>
                        <span className="text-neutral-600 text-[11px]">
                          Verification code dispatched to: <strong className="font-mono text-neutral-900">{newEmailTarget}</strong>
                        </span>
                      </div>

                      {/* 30s Countdown timer */}
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-200/70 px-2.5 py-1 rounded-lg">
                          Valid for: {otpTimer}s
                        </span>
                        {otpTimer === 0 ? (
                          <button
                            type="button"
                            onClick={handleResendOtp}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 hover:text-amber-900 underline cursor-pointer"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>Resend Code</span>
                          </button>
                        ) : null}
                      </div>
                    </div>

                    {/* Simulated Preview Box for developer/preview ease */}
                    <div className="bg-neutral-900 text-white p-3.5 rounded-xl text-xs flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-neutral-400 font-mono block">
                          [VIRTUAL INBOX SIMULATION: {newEmailTarget}]
                        </span>
                        <span className="font-bold text-amber-300">
                          Subject: Your Cabo Verde Security OTP is: <span className="font-mono tracking-widest text-white text-sm">{generatedOtp}</span>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleAutoFillOtp}
                        className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-amber-400 hover:text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        Auto-Fill Code
                      </button>
                    </div>

                    {/* 6-Digit OTP Input Boxes */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-neutral-800">
                        Enter 6-Digit Verification Code
                      </label>
                      <div className="flex gap-2 justify-center sm:justify-start">
                        {otpInputs.map((digit, idx) => (
                          <input
                            key={idx}
                            id={`email-otp-input-${idx}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Backspace' && !digit && idx > 0) {
                                const prevInput = document.getElementById(`email-otp-input-${idx - 1}`);
                                if (prevInput) prevInput.focus();
                              }
                            }}
                            className="w-11 h-12 text-center text-lg font-black font-mono rounded-xl border border-neutral-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 outline-none bg-neutral-50 shadow-xs"
                          />
                        ))}
                      </div>
                      {otpError && (
                        <p className="text-red-600 text-xs font-bold">{otpError}</p>
                      )}
                    </div>

                    {/* Verification Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsOtpSent(false);
                          setOtpError(null);
                        }}
                        className="text-xs text-neutral-500 hover:text-neutral-900 underline font-semibold cursor-pointer"
                      >
                        Cancel &amp; Change Email Target
                      </button>

                      <button
                        type="button"
                        onClick={handleVerifyOtpAndChangeEmail}
                        className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                      >
                        <Check className="w-4 h-4" />
                        <span>Confirm &amp; Update Email</span>
                      </button>
                    </div>

                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
