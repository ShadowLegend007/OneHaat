import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CRITICAL_IMAGES = [
  '/favicon.svg',
  '/hero-character-mockup.svg',
  '/Apple-Store.svg?v=20261105',
  '/Google-play.png?v=20261105',
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
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('onehaat_intro_seen');
    }
    return true;
  });

  const isMountedRef = useRef(true);
  const finishTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finishedCountRef = useRef(0);

  useEffect(() => {
    isMountedRef.current = true;

    // If already seen in this session, trigger complete immediately
    if (typeof window !== 'undefined' && sessionStorage.getItem('onehaat_intro_seen')) {
      onComplete?.();
      return;
    }

    const startTime = Date.now();
    const minDuration = 450; // Brisk 450ms reveal so the page is never blocked
    const total = CRITICAL_IMAGES.length;

    const checkCompletion = () => {
      if (!isMountedRef.current) return;
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, minDuration - elapsed);

      finishTimerRef.current = setTimeout(() => {
        if (isMountedRef.current) {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('onehaat_intro_seen', '1');
          }
          setIsVisible(false);
          onComplete?.();
        }
      }, remaining);
    };

    const handleItemFinished = () => {
      finishedCountRef.current++;
      if (finishedCountRef.current >= total) {
        checkCompletion();
      }
    };

    CRITICAL_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;

      if (img.complete) {
        if ('decode' in img) {
          img.decode().then(handleItemFinished).catch(handleItemFinished);
        } else {
          handleItemFinished();
        }
      } else {
        img.onload = () => {
          if ('decode' in img) {
            img.decode().then(handleItemFinished).catch(handleItemFinished);
          } else {
            handleItemFinished();
          }
        };
        img.onerror = handleItemFinished;
      }
    });

    // Safety fallback: if anything stalls, dismiss after 1.2s
    const safetyTimer = setTimeout(() => {
      if (isMountedRef.current) {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('onehaat_intro_seen', '1');
        }
        setIsVisible(false);
        onComplete?.();
      }
    }, 1200);

    return () => {
      isMountedRef.current = false;
      clearTimeout(safetyTimer);
      if (finishTimerRef.current) clearTimeout(finishTimerRef.current);
    };
  }, [onComplete]);

  // Click-to-dismiss handler so the user is never stuck
  const handleDismiss = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('onehaat_intro_seen', '1');
    }
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
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          }}
          onClick={handleDismiss}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/95 backdrop-blur-2xl select-none cursor-pointer"
        >
          {/* Subtle Ambient Pastel Blobs */}
          <div
            className="absolute w-[500px] h-[500px] rounded-full masked-pastel-blob opacity-40 pointer-events-none -z-10"
            style={{
              background: 'radial-gradient(circle, #D1FAE5 0%, #FEF9C3 40%, rgba(255,255,255,0) 70%)',
            }}
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <div className="relative h-16 sm:h-20 aspect-[688.5/459] flex items-center">
              <img
                src="/favicon.svg"
                alt="OneHaat"
                width={120}
                height={80}
                className="h-16 sm:h-20 w-auto object-contain drop-shadow-md"
              />
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase">
                Loading Experience
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

LiquidGlassIntro.displayName = 'LiquidGlassIntro';
