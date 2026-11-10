import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiquidGlassLogo } from '../ui/liquid-glass-logo';

const CRITICAL_IMAGES = [
  '/logo.svg',
  '/favicon.svg',
  '/hero-character-mockup.svg',
  '/Apple-Store.svg',
  '/Google-play.png',
  '/step-1-mockup.svg',
  '/step-2-mockup.svg',
  '/step-3-mockup.svg',
  '/step-4-mockup.svg',
  '/early-access-pass-render.svg',
];

interface LiquidGlassIntroProps {
  onComplete?: () => void;
}

export const LiquidGlassIntro: React.FC<LiquidGlassIntroProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const isMountedRef = useRef(true);
  const finishTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    isMountedRef.current = true;

    // Preload critical images in parallel
    CRITICAL_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Allow the complete sphere-to-tile entrance, fluid refraction, chromatic streaks,
    // and settlement on the full-colour logo to unfold gracefully (~4.5s), then reveal page.
    finishTimerRef.current = setTimeout(() => {
      if (isMountedRef.current) {
        setIsVisible(false);
        onComplete?.();
      }
    }, 4500);

    return () => {
      isMountedRef.current = false;
      if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
    };
  }, [onComplete]);

  const handleDismiss = () => {
    setIsVisible(false);
    onComplete?.();
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          key="liquid-glass-intro"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          }}
          onClick={handleDismiss}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white select-none cursor-pointer overflow-hidden"
        >
          <div className="w-full max-w-4xl flex items-center justify-center p-4">
            <LiquidGlassLogo
              logo="/logo.svg"
              ending="logo"
              theme="light"
              background="#ffffff"
              tileColor="#ffffff"
              logoColor="original"
              speed={0.65}
              depth={1.3}
              dispersion={1.2}
              style={{ height: 480, width: '100%', maxWidth: '100vw' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

LiquidGlassIntro.displayName = 'LiquidGlassIntro';
