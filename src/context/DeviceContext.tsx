import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type DeviceMode = 'responsive' | 'desktop' | 'mobile';

interface DeviceContextType {
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  isMobileView: boolean;
  scrollDirection: 'up' | 'down';
  scrollProgress: number;
  scrollY: number;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('responsive');
  const [isScreenMobile, setIsScreenMobile] = useState<boolean>(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [scrollY, setScrollY] = useState<number>(0);

  // Monitor screen width
  useEffect(() => {
    const checkWidth = () => {
      setIsScreenMobile(window.innerWidth < 768);
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // Monitor scroll direction and progress
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScrollable > 0 ? (currentScrollY / totalScrollable) * 100 : 0;
      
      setScrollProgress(Math.min(100, Math.max(0, progress)));
      setScrollY(currentScrollY);

      if (Math.abs(currentScrollY - lastScrollY) > 8) {
        if (currentScrollY > lastScrollY && currentScrollY > 70) {
          setScrollDirection('down');
        } else if (currentScrollY < lastScrollY) {
          setScrollDirection('up');
        }
        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isMobileView = deviceMode === 'mobile' || (deviceMode === 'responsive' && isScreenMobile);

  return (
    <DeviceContext.Provider
      value={{
        deviceMode,
        setDeviceMode,
        isMobileView,
        scrollDirection,
        scrollProgress,
        scrollY,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
};
