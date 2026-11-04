import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
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
import { useMediaQuery } from '../../hooks/useMediaQuery';

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
      'Open OneHaat and explore authentic grocers, milkmen, and spice artisans within 2.5 km. See real store inventories, seasonal haat specials, and family grocers who have served your colony for decades.',
    microFeatures: [
      { icon: MapPin, text: 'Instant GPS-based discovery' },
      { icon: Package, text: 'Real shelf inventory live' },
      { icon: Users, text: 'Direct contact with the shopkeeper' },
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
      'Unlike corporate quick-commerce apps that bump up item prices by 15-30% behind the scenes, you pay the exact same counter price you would at the store shelf.',
    microFeatures: [
      { icon: Receipt, text: 'Transparent itemized pricing with GST bill' },
      { icon: Leaf, text: 'Custom cut & ripeness instructions for veggies' },
      { icon: Store, text: "Support your local shopkeeper's livelihood" },
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
      'Your trusted grocer personally hand-picks each tomato, checks the seal on your milk bottles, and packs everything into eco-friendly OneHaat jute bags with tamper-evident tags.',
    microFeatures: [
      { icon: Smartphone, text: 'Live packing checklist on your phone' },
      { icon: PhoneCall, text: 'Direct replacement call if an item is out of stock' },
      { icon: ShieldCheck, text: 'Tamper-evident hygiene seal # verified' },
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
      { icon: MapPin, text: 'Live GPS rider telemetry map' },
      { icon: Zap, text: 'Zero multiple-order batching delays' },
      { icon: RotateCw, text: '1-tap effortless repeat reorders' },
    ],
  },
];

const cardVariants: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    y: dir >= 0 ? 22 : -22,
    filter: 'blur(5px)',
    scale: 0.98,
  }),
  center: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 0.42,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.05,
      delayChildren: 0.03,
    },
  },
  exit: (dir: number) => ({
    opacity: 0,
    y: dir >= 0 ? -18 : 18,
    filter: 'blur(4px)',
    scale: 0.98,
    transition: {
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const itemChildVariants: Variants = {
  enter: { opacity: 0, y: 8 },
  center: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: { opacity: 0, y: -6, transition: { duration: 0.2 } },
};

export const PinnedJourney: React.FC = React.memo(() => {
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const desktopStageRef = useRef<HTMLDivElement>(null);
  const mobilePillsRef = useRef<HTMLDivElement>(null);
  const [[activeStepIndex, direction], setStepState] = useState<[number, number]>([0, 1]);
  const activeStepRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const animTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
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

  // Click handler that smoothly switches step
  const handleStepClick = useCallback(
    (idx: number) => {
      if (isAnimatingRef.current && idx === activeStepRef.current) return;
      isAnimatingRef.current = true;
      updateStep(idx);
      if (animTimerRef.current) clearTimeout(animTimerRef.current);
      animTimerRef.current = setTimeout(() => {
        isAnimatingRef.current = false;
      }, 600);
    },
    [updateStep]
  );

  // Helper for smooth section exit transition
  const navigateToSection = (id: string) => {
    const lenis = (window as any).__lenis;
    const target = document.getElementById(id);
    if (!target) return;
    if (lenis?.scrollTo) {
      lenis.scrollTo(target, { offset: -64, duration: 1.0 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Discrete single-scroll step controller with animation gating
  useEffect(() => {
    if (!isDesktop) return;

    const onWheel = (e: WheelEvent) => {
      if (!desktopTrackRef.current || !desktopStageRef.current) return;

      const trackRect = desktopTrackRef.current.getBoundingClientRect();

      // Check if stage is pinned under navbar (top: ~64px) with track active
      const isPinned = trackRect.top <= 75 && trackRect.bottom >= window.innerHeight + 50;
      if (!isPinned) return;

      const delta = e.deltaY;
      if (Math.abs(delta) < 12) return;

      const currentStep = activeStepRef.current;

      if (delta > 0) {
        // Scrolling DOWN
        if (currentStep < steps.length - 1) {
          e.preventDefault();
          e.stopPropagation();

          if (isAnimatingRef.current) return;

          isAnimatingRef.current = true;
          const nextStep = currentStep + 1;
          updateStep(nextStep);

          if (animTimerRef.current) clearTimeout(animTimerRef.current);
          animTimerRef.current = setTimeout(() => {
            isAnimatingRef.current = false;
          }, 600);
        } else {
          // On Step 4 (last step): scrolling down smoothly advances to Community stories
          e.preventDefault();
          navigateToSection('stories');
        }
      } else {
        // Scrolling UP
        if (currentStep > 0) {
          e.preventDefault();
          e.stopPropagation();

          if (isAnimatingRef.current) return;

          isAnimatingRef.current = true;
          const prevStep = currentStep - 1;
          updateStep(prevStep);

          if (animTimerRef.current) clearTimeout(animTimerRef.current);
          animTimerRef.current = setTimeout(() => {
            isAnimatingRef.current = false;
          }, 600);
        } else {
          // On Step 1 (first step): scrolling up smoothly advances back to Pillars
          e.preventDefault();
          navigateToSection('pillars');
        }
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!desktopTrackRef.current || !desktopStageRef.current) return;
      const trackRect = desktopTrackRef.current.getBoundingClientRect();
      const isPinned = trackRect.top <= 75 && trackRect.bottom >= window.innerHeight + 50;
      if (!isPinned) return;

      const currentStep = activeStepRef.current;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentStep < steps.length - 1) {
          e.preventDefault();
          if (isAnimatingRef.current) return;
          isAnimatingRef.current = true;
          const nextStep = currentStep + 1;
          updateStep(nextStep);
          if (animTimerRef.current) clearTimeout(animTimerRef.current);
          animTimerRef.current = setTimeout(() => {
            isAnimatingRef.current = false;
          }, 600);
        } else {
          e.preventDefault();
          navigateToSection('stories');
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentStep > 0) {
          e.preventDefault();
          if (isAnimatingRef.current) return;
          isAnimatingRef.current = true;
          const prevStep = currentStep - 1;
          updateStep(prevStep);
          if (animTimerRef.current) clearTimeout(animTimerRef.current);
          animTimerRef.current = setTimeout(() => {
            isAnimatingRef.current = false;
          }, 600);
        } else {
          e.preventDefault();
          navigateToSection('pillars');
        }
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      if (animTimerRef.current) clearTimeout(animTimerRef.current);
    };
  }, [isDesktop, updateStep]);

  // Center active pill in mobile view
  useEffect(() => {
    if (!isDesktop && mobilePillsRef.current) {
      const container = mobilePillsRef.current.firstElementChild;
      if (container && container.children[activeStepIndex]) {
        const activeBtn = container.children[activeStepIndex] as HTMLElement;
        activeBtn.scrollIntoView?.({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeStepIndex, isDesktop]);

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
      {/* Mobile view (< lg) */}
      <div className="lg:hidden py-14 px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>The 20-Minute Hyperlocal Loop</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-ink tracking-tight">
            From shelf to doorstep in{' '}
            <span className="editorial-accent text-emerald-600 font-normal italic">
              4 simple steps.
            </span>{' '}
            <span className="inline-block text-amber-400 font-sans not-italic text-2xl ml-1">彡</span>
          </h2>
        </div>

        {/* Connected Stepper Navigation for Mobile */}
        <div ref={mobilePillsRef} className="w-full max-w-md mx-auto mb-6 px-1">
          <div className="flex items-center justify-between relative">
            {steps.map((step, idx) => {
              const isPast = idx < activeStepIndex;
              const isActive = idx === activeStepIndex;

              return (
                <React.Fragment key={step.id}>
                  <button
                    type="button"
                    onClick={() => handleStepClick(idx)}
                    className="flex flex-col items-center group cursor-pointer focus:outline-none z-10"
                  >
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 select-none ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-3 ring-emerald-100 scale-105'
                          : isPast
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white border-2 border-slate-300 text-slate-500'
                      }`}
                    >
                      {idx + 1}
                    </div>

                    <div className="mt-1.5 text-center">
                      <span
                        className={`inline-block whitespace-nowrap text-[11px] sm:text-xs transition-all duration-300 select-none ${
                          isActive
                            ? 'font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-200/60 shadow-2xs'
                            : isPast
                            ? 'font-semibold text-slate-700'
                            : 'font-medium text-slate-500'
                        }`}
                      >
                        {step.tabLabel}
                      </span>
                    </div>
                  </button>

                  {idx < steps.length - 1 && (
                    <div className="flex-1 h-1 mx-1.5 sm:mx-2 bg-slate-200/90 rounded-full relative overflow-hidden -mt-5 sm:-mt-6">
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
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Mobile Swipe Container */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="flex flex-col items-center gap-6"
        >
          <PhoneMockup screen={activeStep.id} direction={direction} className="scale-95 origin-center" />

          {/* Active Step Card with Changing Transition */}
          <div className="w-full max-w-md min-h-[290px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeStep.id}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full p-6 rounded-3xl bg-white border border-slate-200/90 shadow-md space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <motion.div
                      key={`m-icon-${activeStep.id}`}
                      initial={{ scale: 0.8, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0"
                    >
                      <activeStep.tabIcon className="w-3.5 h-3.5" />
                    </motion.div>
                    <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                      Step {activeStep.stepNum} • {activeStep.subtitle}
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                    {activeStep.badge}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-2xl text-ink">
                  {activeStep.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {activeStep.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3 border-t border-slate-100">
                  {activeStep.microFeatures.map((feat, i) => {
                    const Icon = feat.icon;
                    return (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                        <Icon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="text-[11px] font-semibold text-slate-700 leading-tight">{feat.text}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quick Prev / Next Buttons for Mobile */}
          <div className="flex items-center justify-between w-full max-w-md px-2">
            <button
              onClick={() => updateStep(Math.max(0, activeStepIndex - 1))}
              disabled={activeStepIndex === 0}
              className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                activeStepIndex === 0
                  ? 'opacity-35 cursor-not-allowed border-slate-200 text-slate-400'
                  : 'border-slate-300 text-slate-700 hover:bg-white active:scale-95'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <span className="text-xs font-semibold text-slate-400">
              Step {activeStepIndex + 1} of {steps.length}
            </span>

            <button
              onClick={() => updateStep(Math.min(steps.length - 1, activeStepIndex + 1))}
              disabled={activeStepIndex === steps.length - 1}
              className={`flex items-center gap-1 text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all ${
                activeStepIndex === steps.length - 1
                  ? 'opacity-35 cursor-not-allowed border-slate-200 text-slate-400'
                  : 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-sm'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Pinned Scroll View (>= lg): Fits 100% in 1 screen height */}
      <div ref={desktopTrackRef} className="hidden lg:block relative min-h-[300vh]">
        {/* Pinned Stage: 1-screen viewport below navbar (top-16) with zero overflow */}
        <div
          ref={desktopStageRef}
          className="sticky top-16 h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] flex flex-col justify-center items-center py-3 xl:py-5 px-4 sm:px-6 lg:px-8 overflow-hidden"
        >
          {/* Subtle Ambient Blob Behind Pinned Stage */}
          <div
            className="absolute w-[650px] h-[650px] rounded-full masked-pastel-blob opacity-35 pointer-events-none -z-10"
            style={{
              background: 'radial-gradient(circle, #D1FAE5 0%, #FEF9C3 40%, rgba(255,255,255,0) 70%)',
            }}
          />

          <div className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-8 xl:gap-12 items-center">
            {/* Left 6 Cols: Step Cards Narrative */}
            <div className="col-span-6 flex flex-col justify-center">
              {/* Clean Section Header (No opacity: 0 wrapper) */}
              <div className="mb-2 xl:mb-2.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-[10px] xl:text-[11px] font-bold tracking-wide uppercase w-fit shadow-2xs mb-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>The 20-Minute Hyperlocal Loop</span>
                </div>

                <h2 className="font-display font-extrabold text-2xl xl:text-3xl text-ink tracking-tight leading-tight">
                  From shelf to doorstep in<br />
                  <span className="editorial-accent text-emerald-600 font-normal italic">
                    4 simple steps.
                  </span>{' '}
                  <span className="inline-block text-amber-400 font-sans not-italic text-xl xl:text-2xl ml-1 select-none">
                    彡
                  </span>
                </h2>
              </div>

              {/* Connected Stepper Navigation Bar matching Reference */}
              <div className="w-full max-w-xl my-2 xl:my-2.5">
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
                            className={`w-7 h-7 xl:w-8 xl:h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 select-none ${
                              isActive
                                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-3 ring-emerald-100 scale-105'
                                : isPast
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-white border-2 border-slate-300 text-slate-500 group-hover:border-slate-400 group-hover:text-slate-700'
                            }`}
                          >
                            {idx + 1}
                          </div>

                          {/* Step Label (Mint pill when active matching reference screenshot) */}
                          <div className="mt-1 text-center">
                            <span
                              className={`inline-block whitespace-nowrap text-[10px] xl:text-[11px] transition-all duration-300 select-none ${
                                isActive
                                  ? 'font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-200/60 shadow-2xs'
                                  : isPast
                                  ? 'font-semibold text-slate-700'
                                  : 'font-medium text-slate-500 group-hover:text-slate-700'
                              }`}
                            >
                              {step.tabLabel}
                            </span>
                          </div>
                        </button>

                        {/* Connecting Line Segment between nodes */}
                        {idx < steps.length - 1 && (
                          <div className="flex-1 h-1 mx-2 sm:mx-3 bg-slate-200/90 rounded-full relative overflow-hidden -mt-5 xl:-mt-6">
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
                              transition={{ duration: 0.35, ease: 'easeOut' }}
                            />
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Active Step Card with Changing Transition */}
              <div className="relative min-h-[250px] xl:min-h-[260px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeStep.id}
                    custom={direction}
                    variants={cardVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="p-5 xl:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_12px_36px_rgba(15,23,42,0.06)]"
                  >
                    {/* Top Row: Icon + Step 0X + Subtitle on left, Badge on right */}
                    <motion.div variants={itemChildVariants} className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <motion.div
                          key={`icon-${activeStep.id}`}
                          initial={{ rotate: -15, scale: 0.8 }}
                          animate={{ rotate: 0, scale: 1 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100/80 shrink-0"
                        >
                          <activeStep.tabIcon className="w-3.5 h-3.5" />
                        </motion.div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                            Step {activeStep.stepNum}
                          </span>
                          <span className="text-xs font-medium text-slate-500">
                            {activeStep.subtitle}
                          </span>
                        </div>
                      </div>
                      <motion.span
                        key={`badge-${activeStep.id}`}
                        initial={{ scale: 0.85, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.25 }}
                        className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200/80"
                      >
                        {activeStep.badge}
                      </motion.span>
                    </motion.div>

                    <motion.h3 variants={itemChildVariants} className="font-display font-extrabold text-xl xl:text-2xl text-ink my-1.5">
                      {activeStep.title}
                    </motion.h3>

                    <motion.p variants={itemChildVariants} className="text-slate-600 text-xs xl:text-sm leading-relaxed mb-3 line-clamp-3">
                      {activeStep.description}
                    </motion.p>

                    {/* 3-Column Micro-Features Row matching Reference Design (Image 2 & 3) */}
                    <motion.div variants={itemChildVariants} className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100">
                      {activeStep.microFeatures.map((feat, i) => {
                        const Icon = feat.icon;
                        return (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.12 + i * 0.05, duration: 0.3, ease: 'easeOut' }}
                            className="flex flex-col items-start text-left"
                          >
                            <Icon className="w-4 h-4 text-emerald-600 mb-1 shrink-0" />
                            <span className="text-[10px] xl:text-[11px] font-semibold text-slate-700 leading-tight">
                              {feat.text}
                            </span>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right 6 Cols: Pinned Phone with Mockup Visuals & Changing Transition */}
            <div className="col-span-6 flex items-center justify-center relative">
              <PhoneMockup
                screen={activeStep.id}
                direction={direction}
                className="w-full max-w-[320px] lg:max-w-[350px] xl:max-w-[390px] origin-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default PinnedJourney;
