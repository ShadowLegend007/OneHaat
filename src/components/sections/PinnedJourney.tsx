import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PhoneMockup, PhoneScreenType } from '../ui/PhoneMockup';

gsap.registerPlugin(ScrollTrigger);
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
import { Reveal } from '../ui/Reveal';
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

export const PinnedJourney: React.FC = React.memo(() => {
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const desktopStageRef = useRef<HTMLDivElement>(null);
  const mobilePillsRef = useRef<HTMLDivElement>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const stepScrollTargets = [0.12, 0.38, 0.64, 0.90];

  useEffect(() => {
    if (!isDesktop || !desktopTrackRef.current || !desktopStageRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: desktopTrackRef.current,
        start: 'top top+=64px',
        end: 'bottom bottom',
        onUpdate: (self) => {
          // Clean hysteresis thresholds with generous entry/exit buffers:
          // Step 0 (Discovery): 0.00 to 0.26
          // Step 1 (Fair Price): 0.26 to 0.52
          // Step 2 (Hand-Packed): 0.52 to 0.76
          // Step 3 (20-Min Transit): 0.76 to 1.00
          const progress = self.progress;
          let safeIndex = 0;
          if (progress >= 0.76) {
            safeIndex = 3;
          } else if (progress >= 0.52) {
            safeIndex = 2;
          } else if (progress >= 0.26) {
            safeIndex = 1;
          } else {
            safeIndex = 0;
          }
          setActiveStepIndex((prev) => (prev !== safeIndex ? safeIndex : prev));
        },
      });
    });

    return () => ctx.revert();
  }, [isDesktop]);

  // Center active pill in mobile view
  useEffect(() => {
    if (!isDesktop && mobilePillsRef.current && mobilePillsRef.current.children[activeStepIndex]) {
      const activeBtn = mobilePillsRef.current.children[activeStepIndex] as HTMLElement;
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeStepIndex, isDesktop]);

  // Click handler that smoothly synchronizes scroll position on desktop
  const handleStepClick = (idx: number) => {
    setActiveStepIndex(idx);
    if (isDesktop && desktopTrackRef.current) {
      const trackRect = desktopTrackRef.current.getBoundingClientRect();
      const currentScrollY = window.scrollY || window.pageYOffset;
      const trackTop = trackRect.top + currentScrollY - 64;
      const trackHeight = desktopTrackRef.current.offsetHeight - window.innerHeight;
      if (trackHeight > 0) {
        const targetScroll = trackTop + (stepScrollTargets[idx] * trackHeight);
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }
  };

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
        // Swiped left -> advance to next step
        setActiveStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
      } else {
        // Swiped right -> return to previous step
        setActiveStepIndex((prev) => Math.max(0, prev - 1));
      }
    }
  };

  const activeStep = steps[activeStepIndex];

  return (
    <section id="how-it-works" className="relative bg-slate-50/70 overflow-visible">
      {/* Mobile view (< lg) with native swipeable touch controls and zero scroll hijacking */}
      <div className="lg:hidden py-14 px-4 sm:px-6">
        <Reveal>
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
        </Reveal>

        {/* Connected Stepper Navigation for Mobile matching User Screenshot */}
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
                              ? '40%'
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
          <PhoneMockup screen={activeStep.id} className="scale-95 origin-center" />

          {/* Active Step Card */}
          <motion.div
            key={activeStep.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md p-6 rounded-3xl bg-white border border-slate-200/90 shadow-md space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Step {activeStep.stepNum} • {activeStep.subtitle}
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

            <div className="grid grid-cols-1 gap-2.5 pt-3 border-t border-slate-100">
              {activeStep.microFeatures.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <div key={i} className="flex items-center gap-2.5 text-xs font-medium text-slate-700">
                    <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span>{feat.text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Prev / Next Buttons for Mobile */}
          <div className="flex items-center justify-between w-full max-w-md px-2">
            <button
              onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
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
              onClick={() => setActiveStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
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

            {/* Desktop Pinned Scroll View (>= lg) with 420vh track and native sticky stage */}
      <div ref={desktopTrackRef} className="hidden lg:block relative min-h-[420vh]">
        {/* Pinned Stage: 1-screen viewport below navbar (top-16) with zero overflow */}
        <div className="sticky top-16 h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden py-2 xl:py-4 px-4 sm:px-6 lg:px-8">
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
              <Reveal>
                <div className="mb-2 xl:mb-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-[11px] font-bold tracking-wide uppercase w-fit shadow-2xs mb-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>The 20-Minute Hyperlocal Loop</span>
                  </div>

                  <h2 className="font-display font-extrabold text-2xl xl:text-3xl text-ink tracking-tight leading-[1.15]">
                    From shelf to doorstep in<br />
                    <span className="editorial-accent text-emerald-600 font-normal italic">
                      4 simple steps.
                    </span>{' '}
                    <span className="inline-block text-amber-400 font-sans not-italic text-xl xl:text-2xl ml-1 select-none">
                      彡
                    </span>
                  </h2>
                </div>
              </Reveal>

              {/* Connected Stepper Navigation Bar matching User Screenshot */}
              <div className="w-full max-w-xl my-2 xl:my-3">
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
                            className={`w-8 h-8 xl:w-9 xl:h-9 rounded-full flex items-center justify-center font-bold text-xs xl:text-sm transition-all duration-300 select-none ${
                              isActive
                                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-4 ring-emerald-100 scale-105'
                                : isPast
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-white border-2 border-slate-300 text-slate-500 group-hover:border-slate-400 group-hover:text-slate-700'
                            }`}
                          >
                            {idx + 1}
                          </div>

                          {/* Step Label (Mint pill when active matching screenshot) */}
                          <div className="mt-1.5 text-center">
                            <span
                              className={`inline-block whitespace-nowrap text-[11px] xl:text-xs transition-all duration-300 select-none ${
                                isActive
                                  ? 'font-bold text-emerald-800 bg-emerald-100/90 px-3 py-0.5 rounded-full border border-emerald-200/60 shadow-2xs'
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
                                    ? '40%'
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

              {/* Active Step Card */}
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="p-5 xl:p-6 rounded-3xl bg-white/95 border border-slate-200/90 shadow-[0_12px_36px_rgba(15,23,42,0.06)] backdrop-blur-xl"
              >
                {/* Top Row matching Image 1: Icon + Step 0X + Subtitle on left, Badge on right */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100/80 shrink-0">
                      <activeStep.tabIcon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                        Step {activeStep.stepNum}
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        {activeStep.subtitle}
                      </span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200/80">
                    {activeStep.badge}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-xl xl:text-2xl text-ink my-1.5">
                  {activeStep.title}
                </h3>

                <p className="text-slate-600 text-xs xl:text-sm leading-relaxed mb-3">
                  {activeStep.description}
                </p>

                {/* 3-Column Micro-Features Row */}
                <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-slate-100">
                  {activeStep.microFeatures.map((feat, i) => {
                    const Icon = feat.icon;
                    return (
                      <div key={i} className="flex flex-col gap-1 text-left">
                        <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                          <Icon className="w-3 h-3" />
                        </div>
                        <span className="text-[11px] font-semibold text-slate-700 leading-snug">
                          {feat.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Right 6 Cols: Pinned Phone with Mockup Visuals */}
            <div className="col-span-6 flex items-center justify-center relative">
              <PhoneMockup
                screen={activeStep.id}
                className="w-full max-w-[340px] lg:max-w-[380px] xl:max-w-[420px] origin-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

PinnedJourney.displayName = 'PinnedJourney';
