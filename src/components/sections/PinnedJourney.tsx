import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Variants, useScroll, useMotionValueEvent } from 'framer-motion';
import { PhoneMockup, PhoneScreenType } from '../ui/PhoneMockup';
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
      'Your trusted grocer personally hand-picks each tomato, checks the seal on your milk bottles, and packs everything into eco-friendly OneHaat jute bags with tamper-evident seals.',
    microFeatures: [
      { icon: Smartphone, text: 'Live Pack Checklist' },
      { icon: PhoneCall, text: 'Direct Stock Call' },
      { icon: ShieldCheck, text: 'Tamper-Evident Seal' },
    ],
  },
  {
    id: 'delivered',
    stepNum: '04',
    tabLabel: '20-Min Transit',
    tabIcon: Zap,
    badge: '20-Min Transit',
    subtitle: 'Swift, eco-friendly neighbourhood transit',
    title: 'Doorstep in Under 20 Mins',
    description:
      'Because the store is only a few blocks away, your order doesn’t sit in long transit. A dedicated neighbourhood rider brings it straight to your doorstep before your tea is cold.',
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
    y: dir >= 0 ? 16 : -16,
    filter: 'blur(4px)',
    scale: 0.98,
  }),
  center: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 0.38,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.04,
      delayChildren: 0.02,
    },
  },
  exit: (dir: number) => ({
    opacity: 0,
    y: dir >= 0 ? -14 : 14,
    filter: 'blur(3px)',
    scale: 0.98,
    transition: {
      duration: 0.24,
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
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: { opacity: 0, y: -4, transition: { duration: 0.15 } },
};

export const PinnedJourney: React.FC = React.memo(() => {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [[activeStepIndex, direction], setStepState] = useState<[number, number]>([0, 1]);
  const activeStepRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const animTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    activeStepRef.current = activeStepIndex;
  }, [activeStepIndex]);

  const updateStep = useCallback((newIndex: number) => {
    setStepState(([prevIndex]) => {
      if (prevIndex === newIndex) return [prevIndex, 1];
      activeStepRef.current = newIndex;
      return [newIndex, newIndex > prevIndex ? 1 : -1];
    });
  }, []);

  const handleStepClick = useCallback(
    (idx: number) => {
      if (isAnimatingRef.current && idx === activeStepRef.current) return;
      isAnimatingRef.current = true;
      updateStep(idx);
      if (animTimerRef.current) clearTimeout(animTimerRef.current);
      animTimerRef.current = setTimeout(() => {
        isAnimatingRef.current = false;
      }, 450);
    },
    [updateStep]
  );

  // Framer Motion useScroll: drives step progression smoothly on touch & mouse scroll
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const stepCount = steps.length;
    // Map progress 0..1 into 4 discrete step segments
    const rawIdx = Math.min(stepCount - 1, Math.max(0, Math.floor(progress * stepCount)));
    if (rawIdx !== activeStepRef.current) {
      updateStep(rawIdx);
    }
  });

  // Mobile swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    setTouchStartX(null);
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        updateStep(Math.min(steps.length - 1, activeStepIndex + 1));
      } else {
        updateStep(Math.max(0, activeStepIndex - 1));
      }
    }
  };

  const activeStep = steps[activeStepIndex] ?? steps[0];

  return (
    <section id="how-it-works" className="relative bg-slate-50/70 overflow-visible scroll-mt-16">
      {/* Unified Pinned Scroll Track for all breakpoints: min-h-[300vh] provides smooth runway */}
      <div ref={trackRef} className="relative min-h-[300vh]">
        {/* Pinned Stage: 1-screen viewport below navbar (top-16) with zero overflow */}
        <div
          ref={stageRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="sticky top-16 h-[calc(100dvh-4rem)] max-h-[calc(100dvh-4rem)] flex flex-col justify-between items-center py-2 sm:py-3 lg:py-4 px-3 sm:px-6 lg:px-8 overflow-hidden select-none"
        >
          {/* Subtle Ambient Blob Behind Pinned Stage */}
          <div
            className="absolute w-[600px] h-[600px] rounded-full masked-pastel-blob opacity-35 pointer-events-none -z-10"
            style={{
              background: 'radial-gradient(circle, #D1FAE5 0%, #FEF9C3 40%, rgba(255,255,255,0) 70%)',
            }}
          />

          {/* 1. Compact Header (Fits in 1 screen on all viewports) */}
          <div className="w-full max-w-4xl text-center shrink-0 pt-0.5 sm:pt-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-[10px] sm:text-xs font-bold tracking-wide uppercase shadow-2xs mb-1 sm:mb-1.5">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>The 20-Minute Hyperlocal Loop</span>
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

          {/* 2. Connected Stepper Navigation Bar (Clickable & reactive) */}
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

                      {/* Step Label (Mint pill when active) */}
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
            
            {/* Step Card Narrative (Left on Desktop, Bottom on Mobile) */}
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
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100/80 shrink-0"
                        >
                          <activeStep.tabIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </motion.div>
                        <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-wider">
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

                    {/* Subtitle Eyebrow: Full width, never cut off */}
                    <motion.div variants={itemChildVariants} className="text-[11px] sm:text-xs font-semibold text-emerald-600/90 mb-1 leading-snug">
                      {activeStep.subtitle}
                    </motion.div>

                    {/* Step Title */}
                    <motion.h3 variants={itemChildVariants} className="font-display font-extrabold text-base sm:text-xl lg:text-2xl text-ink mb-1.5 leading-snug">
                      {activeStep.title}
                    </motion.h3>

                    {/* Step Description: Full text without truncation */}
                    <motion.p variants={itemChildVariants} className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mb-3">
                      {activeStep.description}
                    </motion.p>

                    {/* 3 Micro-Features Row: Never truncated, cleanly wrapped */}
                    <motion.div variants={itemChildVariants} className="grid grid-cols-3 gap-2 pt-2.5 border-t border-slate-100">
                      {activeStep.microFeatures.map((feat, i) => {
                        const Icon = feat.icon;
                        return (
                          <div
                            key={i}
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-1.5 text-left"
                          >
                            <Icon className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
                            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-700 leading-tight">
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

            {/* Pinned Phone with Mockup Visuals (Right on Desktop, Top on Mobile) */}
            <div className="w-full md:w-1/2 flex items-center justify-center relative order-1 md:order-2 shrink-0 max-h-[170px] sm:max-h-[220px] md:max-h-[320px] lg:max-h-[360px]">
              <PhoneMockup
                screen={activeStep.id}
                direction={direction}
                className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[310px] lg:max-w-[350px] origin-center"
              />
            </div>
          </div>

          {/* 4. Bottom Controls: Prev / Next buttons & Step Indicator */}
          <div className="w-full max-w-md flex items-center justify-between px-2 shrink-0 pb-0.5 sm:pb-1">
            <button
              type="button"
              onClick={() => handleStepClick(Math.max(0, activeStepIndex - 1))}
              disabled={activeStepIndex === 0}
              className={`flex items-center gap-1 text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full border transition-all ${
                activeStepIndex === 0
                  ? 'opacity-30 cursor-not-allowed border-slate-200 text-slate-400'
                  : 'border-slate-300 text-slate-700 hover:bg-white active:scale-95'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>

            {/* Stepper Dots */}
            <div className="flex items-center gap-1.5">
              {steps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleStepClick(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeStepIndex ? 'w-5 bg-emerald-600' : 'w-1.5 bg-slate-300'
                  }`}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleStepClick(Math.min(steps.length - 1, activeStepIndex + 1))}
              disabled={activeStepIndex === steps.length - 1}
              className={`flex items-center gap-1 text-[11px] sm:text-xs font-bold px-3.5 py-1 rounded-full border transition-all ${
                activeStepIndex === steps.length - 1
                  ? 'opacity-30 cursor-not-allowed border-slate-200 text-slate-400'
                  : 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-2xs'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
});

export default PinnedJourney;
