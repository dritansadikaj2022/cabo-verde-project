import React from 'react';
import { Monitor, Smartphone, Maximize2, FileCode, ZoomIn, Mail, ShieldCheck } from 'lucide-react';
import { AdminUser } from '../types';

interface DeviceViewBarProps {
  deviceMode: 'desktop' | 'mobile' | 'responsive';
  setDeviceMode: (mode: 'desktop' | 'mobile' | 'responsive') => void;
  onOpenCodeExport: () => void;
  onOpenDemoZoom: () => void;
  onOpenContact: () => void;
  onOpenAdmin?: () => void;
  adminUser?: AdminUser | null;
}

export const DeviceViewBar: React.FC<DeviceViewBarProps> = ({
  deviceMode,
  setDeviceMode,
  onOpenCodeExport,
  onOpenDemoZoom,
  onOpenContact,
  onOpenAdmin,
  adminUser,
}) => {
  return (
    <aside aria-label="Dev Toolbar" className="bg-neutral-900 text-neutral-200 border-b border-neutral-800 text-xs py-2 px-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Store ID & Contact */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-bold text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>CABO VERDE</span>
          </span>
          <span className="hidden sm:inline text-neutral-500">|</span>
          <button 
            onClick={onOpenContact}
            className="hidden sm:flex items-center gap-1.5 text-neutral-300 hover:text-red-400 transition-colors cursor-pointer"
            title="Inquiries routed to client@webmedia.al"
          >
            <Mail className="w-3.5 h-3.5 text-red-500" />
            <span className="font-mono text-[11px]">client@webmedia.al</span>
          </button>
        </div>

        {/* Center: Device Switcher (Responsive, Desktop, Mobile) */}
        <div className="flex items-center bg-neutral-800 rounded-lg p-0.5 border border-neutral-700">
          <button
            onClick={() => setDeviceMode('responsive')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
              deviceMode === 'responsive'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Auto-scaling responsive layout"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Auto</span>
          </button>

          <button
            onClick={() => setDeviceMode('desktop')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
              deviceMode === 'desktop'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Simulate 1280px Desktop view"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>

          <button
            onClick={() => setDeviceMode('mobile')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all ${
              deviceMode === 'mobile'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Simulate Mobile view (shown in video 02:40 - 04:00)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Right: Quick Action Modals (Admin Portal, Product Zoom & 5-Part HTML/PHP Code) */}
        <div className="flex items-center gap-2">
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer border ${
                adminUser
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                  : 'bg-neutral-800 hover:bg-neutral-700 text-white border-neutral-700'
              }`}
              title={adminUser ? 'Authenticated as client@webmedia.al' : 'Admin Login with 30s OTP'}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{adminUser ? 'Portal (Active)' : 'Admin Login'}</span>
            </button>
          )}

          <button
            onClick={onOpenDemoZoom}
            className="flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-white px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors border border-neutral-700 cursor-pointer"
            title="Test Interactive Product Zoom Loupe Lens"
          >
            <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Product Zoom</span>
          </button>

          <button
            onClick={onOpenCodeExport}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors shadow-sm cursor-pointer"
            title="View & Download 5-Part HTML and contact.php files"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>5 Parts + PHP</span>
          </button>
        </div>

      </div>
    </aside>
  );
};
