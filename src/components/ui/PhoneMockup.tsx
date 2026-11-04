import React, { useState } from 'react';
import { motion } from 'framer-motion';

export type PhoneScreenType = 'hero' | 'browse' | 'cart' | 'packing' | 'delivered';

interface PhoneMockupProps {
  screen?: PhoneScreenType;
  className?: string;
  onScreenChange?: (screen: PhoneScreenType) => void;
}

const SCREENS = [
  {
    id: 'browse' as PhoneScreenType,
    src: '/step-1-mockup.svg',
    alt: 'Step 01 - Hyperlocal Store Radar',
    width: 733,
    height: 767,
    glow: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(254, 240, 138, 0.25) 50%, transparent 75%)',
  },
  {
    id: 'cart' as PhoneScreenType,
    src: '/step-2-mockup.svg',
    alt: 'Step 02 - Zero Markup Protocol',
    width: 638,
    height: 746,
    glow: 'radial-gradient(circle, rgba(245, 158, 11, 0.35) 0%, rgba(16, 185, 129, 0.25) 50%, transparent 75%)',
  },
  {
    id: 'packing' as PhoneScreenType,
    src: '/step-3-mockup.svg',
    alt: 'Step 03 - Grocer Hand-Packed',
    width: 658,
    height: 804,
    glow: 'radial-gradient(circle, rgba(13, 148, 136, 0.35) 0%, rgba(254, 215, 170, 0.3) 50%, transparent 75%)',
  },
  {
    id: 'delivered' as PhoneScreenType,
    src: '/step-4-mockup.svg',
    alt: 'Step 04 - Doorstep in Under 20 Mins',
    width: 658,
    height: 805,
    glow: 'radial-gradient(circle, rgba(5, 150, 105, 0.4) 0%, rgba(56, 189, 248, 0.3) 50%, transparent 75%)',
  },
];

export const PhoneMockup: React.FC<PhoneMockupProps> = React.memo(({
  screen = 'browse',
  className = '',
}) => {
  const activeScreenId = screen === 'hero' ? 'browse' : screen;
  const currentIndex = SCREENS.findIndex((s) => s.id === activeScreenId);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  };

  const isCurrentLoaded = loadedImages[activeScreenId];
  const currentScreen = SCREENS[currentIndex >= 0 ? currentIndex : 0];

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* 1. Dynamic Ambient Pastel Aura morphing color with active step */}
      <motion.div
        key={`glow-${activeScreenId}`}
        initial={{ opacity: 0.25 }}
        animate={{ opacity: 0.38 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="absolute w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none -z-10"
        style={{
          background: currentScreen.glow,
        }}
      />

      {/* 2. Permanently Sized Phone Container (Zero CLS guarantee) */}
      <div className="relative w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[440px] xl:max-w-[470px] aspect-[480/540] max-h-[min(480px,calc(100vh-7.5rem))] flex items-center justify-center">
        
        {/* Soft Frosted Phone Silhouette Skeleton Placeholder while current screen loads */}
        <div
          className={`absolute inset-3 sm:inset-4 rounded-[40px] border border-slate-200/70 bg-gradient-to-b from-slate-50/80 to-slate-100/50 backdrop-blur-xs flex items-center justify-center transition-opacity duration-700 pointer-events-none ${
            isCurrentLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          aria-hidden="true"
        >
          <div className="w-2/3 h-2/3 rounded-full bg-emerald-100/40 blur-2xl animate-pulse" />
          <div className="absolute inset-0 rounded-[40px] overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>
        </div>

        {/* 3. Smooth Shell Container on Step Change */}
        <motion.div
          key={`shell-${activeScreenId}`}
          initial={{ scale: 0.994 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative w-full h-full flex items-center justify-center transform-gpu"
        >
          {/* Stacked CSS Grid Container for Directional Slide & Parallax Crossfade */}
          <div className="grid grid-cols-1 grid-rows-1 items-center justify-center w-full h-full relative z-10">
            {SCREENS.map((item, idx) => {
              const isActive = activeScreenId === item.id;
              const isPast = idx < currentIndex;

              return (
                <motion.div
                  key={item.id}
                  initial={false}
                  animate={
                    isActive
                      ? {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          zIndex: 10,
                        }
                      : {
                          opacity: 0,
                          y: isPast ? -10 : 10,
                          scale: 0.985,
                          zIndex: 0,
                        }
                  }
                  transition={{
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="col-start-1 row-start-1 w-full h-full flex items-center justify-center will-change-transform transform-gpu"
                  style={{
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    className="w-full h-full object-contain pointer-events-none drop-shadow-md select-none"
                    loading="eager"
                    decoding="async"
                    onLoad={() => handleImageLoad(item.id)}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* 4. Glossy Light Sweep across the Screen on Step Transition */}
          <motion.div
            key={`sheen-${activeScreenId}`}
            initial={{ x: '-120%', opacity: 0.3 }}
            animate={{ x: '120%', opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-4 rounded-[40px] overflow-hidden pointer-events-none z-20"
          >
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
});

export default PhoneMockup;