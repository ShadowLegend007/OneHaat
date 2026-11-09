import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { PhoneMockup, PhoneScreenType } from '../ui/PhoneMockup';
import { WaterGlassButton } from '../ui/WaterGlassButton';
import {
  Compass,
  Sparkles,
  MapPin,
  Package,
  Users,
  Receipt,
  Leaf,
  Store,
  Smartphone,
  PhoneCall,
  ShieldCheck,
  Zap,
  RotateCw,
  Tag,
  Box,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface MicroFeature {
  icon: React.ElementType;
  text: string;
}

interface StepData {
  id: PhoneScreenType;
  stepNum: string;
  tabLabel: string;
  tabIcon: React.ElementType;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  microFeatures: MicroFeature[];
}

const steps: StepData[] = [
  {
    id: 'browse',
    stepNum: '01',
    tabLabel: 'Discovery',
    tabIcon: Compass,
    badge: 'Discovery',
    subtitle: 'Real shops right in your neighborhood',
    title: 'Browse Your Local Haats',
    description:
      'Open OneHaat to explore verified grocers, milkmen, and spice artisans within 2.5 km. Browse real shelf stock, daily morning haat specials, and generational family grocers.',
    microFeatures: [
      { icon: MapPin, text: 'GPS Store Radar' },
      { icon: Package, text: 'Live Shelf Stock' },
      { icon: Users, text: 'Direct Grocer Call' },
    ],
  },
  {
    id: 'cart',
    stepNum: '02',
    tabLabel: 'Fair Price',
    tabIcon: Tag,
    badge: 'Fair Price',
    subtitle: 'Zero middleman markup, guaranteed',
    title: 'Add to Cart at Counter Prices',
    description:
      'Unlike corporate quick-commerce apps that mark up item prices by 15-30% behind the scenes, you pay the exact same counter shelf price with an official itemized GST bill.',
    microFeatures: [
      { icon: Receipt, text: 'Itemized GST Bill' },
      { icon: Leaf, text: 'Custom Cut Notes' },
      { icon: Store, text: 'Zero Markup Parity' },
    ],
  },
  {
    id: 'packing',
    stepNum: '03',
    tabLabel: 'Hand-Packed',
    tabIcon: Box,
    badge: 'Hand-Packed',
    subtitle: 'Inspected by the merchant you know',
    title: 'The Grocer Hand-Packs It',
    description:
      'Your trusted grocer personally hand-picks each item, checks the seal on your provisions and essentials, and packs everything into eco-friendly OneHaat jute bags with tamper-evident seals.',
    microFeatures: [
      { icon: Smartphone, text: 'Live Pack Checklist' },
      { icon: PhoneCall, text: 'Direct Stock Call' },
      { icon: ShieldCheck, text: 'Tamper-Evident Seal' },
    ],
  },
  {
    id: 'delivered',
    stepNum: '04',
    tabLabel: '9m 59s Transit',
    tabIcon: Zap,
    badge: '9m 59s Transit',
    subtitle: 'Swift, eco-friendly neighbourhood transit',
    title: 'Doorstep in 9 Min 59 Sec',
    description:
      'Because the store is only a few blocks away, your order doesn’t sit in long transit. A dedicated neighbourhood rider brings it straight to your doorstep with an average delivery time of 9 minutes 59 seconds.',
    microFeatures: [
      { icon: MapPin, text: 'Live GPS Telemetry' },
      { icon: Zap, text: 'Zero Batching Delay' },
      { icon: RotateCw, text: '1-Tap Quick Reorder' },
    ],
  },
];

const cardVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    y: dir >= 0 ? 14 : -14,
    filter: 'blur(3px)',
    scale: 0.98,
  }),
  center: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.03,
      delayChildren: 0.02,
    },
  },
  exit: (dir: number) => ({
    opacity: 0,
    y: dir >= 0 ? -12 : 12,
    filter: 'blur(2px)',
    scale: 0.98,
    transition: {
      duration: 0.22,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const itemChildVariants: Variants = {
  enter: { opacity: 0, y: 6 },
  center: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: { opacity: 0, y: -4, transition: { duration: 0.15 } },
};

const SCROLL_PAUSE_MS = 1200;

export const PinnedJourney: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [[activeStepIndex, direction], setStepState] = useState<[number, number]>([0, 1]);
  const activeStepRef = useRef(0);
  const lastScrollTimeRef = useRef(0);
  const isLockedRef = useRef(false);
  const isUnlockedDownRef = useRef(false);
  const isUnlockedUpRef = useRef(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  useEffect(() => {
    activeStepRef.current = activeStepIndex;
  }, [activeStepIndex]);

  const updateStep = useCallback((newIndex: number) => {
    activeStepRef.current = newIndex;
    lastScrollTimeRef.current = Date.now();
    setStepState(([prevIndex]) => {
      if (prevIndex === newIndex) return [prevIndex, 1];
      return [newIndex, newIndex > prevIndex ? 1 : -1];
    });
  }, []);

  const getTargetTop = useCallback(() => {
    if (!sectionRef.current) return 0;
    return sectionRef.current.getBoundingClientRect().top + window.scrollY - 64;
  }, []);

  const lockSection = useCallback((targetStep?: number) => {
    const section = sectionRef.current;
    if (!section) return;
    isLockedRef.current = true;
    isUnlockedDownRef.current = false;
    isUnlockedUpRef.current = false;
    lastScrollTimeRef.current = Date.now();

    const targetTop = section.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top: targetTop, behavior: 'instant' });
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(targetTop, { immediate: true });
      lenis.stop();
    }

    if (typeof targetStep === 'number') {
      updateStep(targetStep);
    }
  }, [updateStep]);

  const unlockDown = useCallback(() => {
    isLockedRef.current = false;
    isUnlockedDownRef.current = true;
    lastScrollTimeRef.current = Date.now() + 600;

    const lenis = (window as any).__lenis;
    const storiesEl = document.getElementById('stories');
    if (lenis) {
      lenis.start();
      if (storiesEl) {
        lenis.scrollTo(storiesEl, { offset: -64, duration: 1.0 });
      }
    } else if (storiesEl) {
      storiesEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const unlockUp = useCallback(() => {
    isLockedRef.current = false;
    isUnlockedUpRef.current = true;
    lastScrollTimeRef.current = Date.now() + 600;

    const lenis = (window as any).__lenis;
    const featuresEl = document.getElementById('features');
    if (lenis) {
      lenis.start();
      if (featuresEl) {
        lenis.scrollTo(featuresEl, { offset: -64, duration: 1.0 });
      }
    } else if (featuresEl) {
      featuresEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Listen for unlock events from external nav anchor links
  useEffect(() => {
    const handleUnlockEvent = () => {
      isLockedRef.current = false;
      isUnlockedDownRef.current = true;
      isUnlockedUpRef.current = true;
      const lenis = (window as any).__lenis;
      if (lenis) lenis.start();
    };
    window.addEventListener('unlock-pinned-journey', handleUnlockEvent);
    return () => window.removeEventListener('unlock-pinned-journey', handleUnlockEvent);
  }, []);

  // Synchronize scroll interception: Locks screen on #how-it-works before it can scroll past
  useEffect(() => {
    const checkScrollAndLock = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const currentScroll = window.scrollY;
      const targetTop = section.offsetTop - 64;

      // When scrolling down into the section, lock before it can leave the screen
      if (!isLockedRef.current && !isUnlockedDownRef.current) {
        if (rect.top <= 75 && rect.bottom >= window.innerHeight * 0.5) {
          lockSection(0);
        }
      }

      // Reset unlock memory when scrolled far back up to the top of the site
      if (currentScroll < targetTop - 400) {
        isUnlockedDownRef.current = false;
        isUnlockedUpRef.current = false;
      }
      if (currentScroll > targetTop + window.innerHeight + 300) {
        isUnlockedUpRef.current = false;
      }
    };

    window.addEventListener('scroll', checkScrollAndLock, { passive: true });
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.on('scroll', checkScrollAndLock);
    }

    return () => {
      window.removeEventListener('scroll', checkScrollAndLock);
      if (lenis) {
        lenis.off('scroll', checkScrollAndLock);
      }
    };
  }, [lockSection]);

  // Non-passive wheel handler: Prevents page from moving until Step 4 is reached
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();

      // If unlocked to explore downwards, allow completely unrestricted scrolling
      if (isUnlockedDownRef.current) {
        return;
      }

      // If the section is in the primary view window and not yet locked, lock it immediately
      if (!isLockedRef.current) {
        if (!isUnlockedDownRef.current && rect.top <= 80 && rect.bottom >= window.innerHeight * 0.45) {
          lockSection(0);
          e.preventDefault();
          return;
        }
        return;
      }

      // While locked, ALWAYS prevent default page scrolling so the screen CANNOT move away
      e.preventDefault();

      const delta = e.deltaY;
      if (Math.abs(delta) < 15) return; // Micro-jitter filter

      const now = Date.now();
      if (now - lastScrollTimeRef.current < SCROLL_PAUSE_MS) {
        // Enforce the mandatory scroll pause: absorb input, do not advance
        return;
      }

      const currentStep = activeStepRef.current;

      if (delta > 0) {
        // Scrolling DOWN
        if (currentStep < steps.length - 1) {
          // Advance strictly 1 step (screen stays 100% frozen on How It Works)
          updateStep(currentStep + 1);
        } else {
          // On Step 4 (last step) and user intentionally scrolls down after pause
          unlockDown();
        }
      } else if (delta < 0) {
        // Scrolling UP
        if (currentStep > 0) {
          // Rewind strictly 1 step
          updateStep(currentStep - 1);
        } else {
          // On Step 1 (first step) and user scrolls up after pause
          unlockUp();
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [updateStep, lockSection, unlockDown, unlockUp]);

  // Keyboard navigation when locked (Arrow keys, Page Down/Up)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLockedRef.current) return;

      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        const now = Date.now();
        if (now - lastScrollTimeRef.current < 900) return;
        if (activeStepRef.current < steps.length - 1) {
          updateStep(activeStepRef.current + 1);
        } else {
          unlockDown();
        }
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        const now = Date.now();
        if (now - lastScrollTimeRef.current < 900) return;
        if (activeStepRef.current > 0) {
          updateStep(activeStepRef.current - 1);
        } else {
          unlockUp();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [updateStep, unlockDown, unlockUp]);

  // Touch gesture support: Prevents mobile swipe from moving the screen away before Step 4
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isLockedRef.current && !isUnlockedDownRef.current) {
      // Prevent mobile browser from scrolling the page away while locked
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null || touchStartY === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX;
    const diffY = e.changedTouches[0].clientY - touchStartY;
    setTouchStartX(null);
    setTouchStartY(null);

    if (!isLockedRef.current) return;

    const now = Date.now();
    if (now - lastScrollTimeRef.current < 850) return;

    const isHorizontal = Math.abs(diffX) > Math.abs(diffY);
    const diff = isHorizontal ? diffX : diffY;

    if (Math.abs(diff) < 30) return;

    const currentStep = activeStepRef.current;

    if (diff < 0) {
      // Swipe left or swipe up -> Next step
      if (currentStep < steps.length - 1) {
        updateStep(currentStep + 1);
      } else {
        unlockDown();
      }
    } else {
      // Swipe right or swipe down -> Prev step
      if (currentStep > 0) {
        updateStep(currentStep - 1);
      } else {
        unlockUp();
      }
    }
  };

  const handleStepClick = useCallback(
    (idx: number) => {
      updateStep(idx);
    },
    [updateStep]
  );

  const activeStep = steps[activeStepIndex] ?? steps[0];

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative bg-slate-50/70 h-[calc(100dvh-4rem)] max-h-[calc(100dvh-4rem)] w-full flex flex-col justify-between items-center py-2 sm:py-3 lg:py-4 px-3 sm:px-6 lg:px-8 overflow-hidden select-none scroll-mt-16"
    >
      {/* Subtle Ambient Blob Behind Stage */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full masked-pastel-blob opacity-35 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, #D1FAE5 0%, #FEF9C3 40%, rgba(255,255,255,0) 70%)',
        }}
      />

      {/* 1. Compact Header */}
      <div className="w-full max-w-4xl text-center shrink-0 pt-0.5 sm:pt-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-[10px] sm:text-xs font-bold tracking-wide uppercase shadow-2xs mb-1 sm:mb-1.5">
          <Sparkles className="w-3 h-3 text-emerald-600" />
          <span>9-Minute Hyperlocal Loop</span>
        </div>

        <h2 className="font-display font-extrabold text-xl sm:text-2xl lg:text-3xl text-ink tracking-tight leading-tight">
          From shelf to doorstep in{' '}
          <span className="editorial-accent text-emerald-600 font-normal italic">
            4 simple steps.
          </span>{' '}
          <span className="inline-block text-amber-400 font-sans not-italic text-lg sm:text-xl lg:text-2xl ml-0.5 select-none">
            彡
          </span>
        </h2>
      </div>

      {/* 2. Connected Stepper Navigation Bar */}
      <div className="w-full max-w-lg shrink-0 my-1 sm:my-2 px-2">
        <div className="flex items-center justify-between relative">
          {steps.map((step, idx) => {
            const isPast = idx < activeStepIndex;
            const isActive = idx === activeStepIndex;

            return (
              <React.Fragment key={step.id}>
                {/* Step Node Button */}
                <button
                  type="button"
                  onClick={() => handleStepClick(idx)}
                  className="flex flex-col items-center group cursor-pointer focus:outline-none z-10"
                >
                  {/* Number Circle */}
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center font-bold text-[11px] sm:text-xs transition-all duration-300 select-none ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-2 sm:ring-3 ring-emerald-100 scale-105'
                        : isPast
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-white border-2 border-slate-300 text-slate-500 group-hover:border-slate-400 group-hover:text-slate-700'
                    }`}
                  >
                    {idx + 1}
                  </div>

                  {/* Step Label */}
                  <div className="mt-1 text-center">
                    <span
                      className={`inline-block whitespace-nowrap text-[9px] sm:text-[10px] lg:text-[11px] transition-all duration-300 select-none ${
                        isActive
                          ? 'font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-200/60 shadow-2xs'
                          : isPast
                          ? 'font-semibold text-slate-700'
                          : 'font-medium text-slate-400 group-hover:text-slate-600'
                      }`}
                    >
                      {step.tabLabel}
                    </span>
                  </div>
                </button>

                {/* Connecting Line Segment between nodes */}
                {idx < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-1.5 sm:mx-2.5 bg-slate-200/90 rounded-full relative overflow-hidden -mt-4 sm:-mt-5">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-emerald-500 rounded-full"
                      initial={false}
                      animate={{
                        width:
                          idx < activeStepIndex
                            ? '100%'
                            : idx === activeStepIndex
                            ? '50%'
                            : '0%',
                      }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 3. Main Stage Content: Fits 100% inside 1 Screen */}
      <div className="w-full max-w-6xl flex-1 flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-6 lg:gap-10 min-h-0 py-1">
        
        {/* Step Card Narrative */}
        <div className="w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1 min-h-0">
          <div className="relative w-full">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeStep.id}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="p-4 sm:p-5 lg:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-[0_8px_30px_rgba(15,23,42,0.05)]"
              >
                {/* Top Row: Icon + Step 0X on left, Badge on right */}
                <motion.div variants={itemChildVariants} className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <div className="flex items-center gap-2">
                    <motion.div
                      key={`icon-${activeStep.id}`}
                      initial={{ rotate: -15, scale: 0.8 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200/80 shrink-0"
                    >
                      <activeStep.tabIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-700" />
                    </motion.div>
                    <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
                      Step {activeStep.stepNum}
                    </span>
                  </div>
                  <motion.span
                    key={`badge-${activeStep.id}`}
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] sm:text-[11px] font-bold border border-emerald-200/80 shrink-0 select-none"
                  >
                    {activeStep.badge}
                  </motion.span>
                </motion.div>

                {/* Subtitle Eyebrow: Never truncated */}
                <motion.div variants={itemChildVariants} className="text-[11px] sm:text-xs font-semibold text-emerald-700 mb-1 leading-snug flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{activeStep.subtitle}</span>
                </motion.div>

                {/* Step Title */}
                <motion.h3 variants={itemChildVariants} className="font-display font-extrabold text-base sm:text-xl lg:text-2xl text-ink mb-1.5 leading-snug">
                  {activeStep.title}
                </motion.h3>

                {/* Step Description */}
                <motion.p variants={itemChildVariants} className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mb-3">
                  {activeStep.description}
                </motion.p>

                {/* 3 Micro-Features Row: Non-truncated high-contrast chips */}
                <motion.div variants={itemChildVariants} className="grid grid-cols-3 gap-2 pt-2.5 border-t border-slate-100">
                  {activeStep.microFeatures.map((feat, i) => {
                    const Icon = feat.icon;
                    return (
                      <div
                        key={i}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-1.5 px-2 py-1 rounded-lg bg-slate-50 border border-slate-200/70 text-left"
                      >
                        <Icon className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
                        <span className="text-[10px] sm:text-[11px] font-semibold text-slate-800 leading-tight">
                          {feat.text}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Pinned Phone with Mockup Visuals */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative order-1 md:order-2 shrink-0 max-h-[170px] sm:max-h-[220px] md:max-h-[320px] lg:max-h-[360px]">
          <PhoneMockup
            screen={activeStep.id}
            direction={direction}
            className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[310px] lg:max-w-[350px] origin-center"
          />
        </div>
      </div>

      {/* 4. Bottom Controls: Prev / Next buttons & Step Indicator */}
      <div className="w-full max-w-md flex items-center justify-between px-2 shrink-0 pb-1">
        <WaterGlassButton
          variant="clear"
          size="sm"
          type="button"
          onClick={() => {
            if (activeStepIndex > 0) {
              updateStep(activeStepIndex - 1);
            }
          }}
          disabled={activeStepIndex === 0}
          className="px-4 py-2 font-bold"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Prev</span>
        </WaterGlassButton>

        {/* Stepper Dots */}
        <div className="flex items-center gap-1.5">
          {steps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => updateStep(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeStepIndex ? 'w-5 bg-emerald-600' : 'w-1.5 bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        <WaterGlassButton
          variant="emerald"
          size="sm"
          type="button"
          onClick={() => {
            if (activeStepIndex < steps.length - 1) {
              updateStep(activeStepIndex + 1);
            } else {
              // On Step 4, clicking button unlocks and scrolls to Community Stories
              unlockDown();
            }
          }}
          className="px-4 py-2 font-bold"
        >
          <span>{activeStepIndex === steps.length - 1 ? 'Explore Stories' : 'Next'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </WaterGlassButton>
      </div>

    </section>
  );
});

PinnedJourney.displayName = 'PinnedJourney';
export default PinnedJourney;
