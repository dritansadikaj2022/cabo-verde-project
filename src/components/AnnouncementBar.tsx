import React from 'react';
import { StoreTemplate } from '../types';

interface AnnouncementBarProps {
  template?: StoreTemplate;
  adminEmail?: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ template, adminEmail = 'client@webmedia.al' }) => {
  return (
    <div 
      className="text-white text-xs font-medium py-2.5 px-4 overflow-hidden relative select-none border-b border-neutral-800 transition-colors duration-300"
      style={{ backgroundColor: template?.accentColor || '#0a0a0a' }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <div className="flex items-center gap-6 text-[11px] sm:text-xs tracking-wider overflow-x-auto no-scrollbar whitespace-nowrap">
          <span className="inline-flex items-center gap-2">
            <span className="text-amber-400 font-black">+</span>
            <span>{template?.tagline || 'Bespoke Architectural Furniture & Solid Hardwood Interiors - Cabo Verde'}</span>
          </span>
          <span className="hidden md:inline-flex items-center gap-2 text-neutral-300">
            <span className="text-amber-400 font-black">+</span>
            <span>White Glove Delivery &amp; Architectural In-Home Assembly</span>
          </span>
          <span className="hidden lg:inline-flex items-center gap-2 text-neutral-300">
            <span className="text-amber-400 font-black">+</span>
            <span>Inquiries: <strong className="text-white font-mono">{adminEmail}</strong></span>
          </span>
        </div>
      </div>
    </div>
  );
};

