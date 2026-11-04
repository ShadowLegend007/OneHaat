import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMediaQuery } from '../../hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);
import {
  Sparkles,
  Leaf,
  Tag,
  ShieldCheck,
  Zap,
  Store,
  CheckCircle2,
  TrendingDown,
  Clock,
  HeartHandshake,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface PillarCard {
  id: string;
  badge: string;
  badgeColor: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  metricLabel: string;
  metricIcon: React.ElementType;
  tags: string[];
  gradient: string;
}

const pillars: PillarCard[] = [
  {
    id: 'pillar-1',
    badge: 'Mandi Fresh at 5:30 AM',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    icon: Leaf,
    title: 'Direct Local Mandi Sourcing',
    subtitle: 'Zero artificial cold-storage life support',
    description:
      'While corporate dark stores stock perishables in refrigerated warehouses for up to two weeks, OneHaat grocers pick up their daily produce directly from peri-urban mandis at the break of dawn. Plucked from fresh morning crates.',
    metric: '4.5 Hours',
    metricLabel: 'From farm harvest to your kitchen counter',
    metricIcon: Clock,
    tags: ['Fresh Morning Mandi', 'Zero Cold Rooms', 'Naturally Ripened'],
    gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent'
  },
  {
    id: 'pillar-2',
    badge: '100% Counter Price Parity',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    icon: Tag,
    title: 'Counter-Shelf Honest Pricing',
    subtitle: 'No silent 25% inflation or shadow cart markups',
    description:
      'Corporate quick-commerce apps quietly inflate base prices by ₹15 to ₹50 on essential groceries to fund their warehouse rents. At OneHaat, you pay the exact shelf retail price with an authentic printed GST bill in every bag.',
    metric: '₹2,400',
    metricLabel: 'Average monthly household savings on staples',
    metricIcon: TrendingDown,
    tags: ['Zero Markups', 'Printed GST Bill', 'Fair Margins'],
    gradient: 'from-amber-500/10 via-orange-500/5 to-transparent'
  },
  {
    id: 'pillar-3',
    badge: 'Shopkeeper Hand-Checked',
    badgeColor: 'bg-sky-50 text-sky-800 border-sky-200',
    icon: ShieldCheck,
    title: 'Inspected by the Merchant You Know',
    subtitle: 'No robotic barcode sorting or bruised tomatoes',
    description:
      "Your colony's trusted grocer personally inspects every vegetable, tests the firmness of produce, and hand-packs your order into eco-friendly OneHaat jute bags sealed with tamper-evident hygiene tags.",
    metric: '99.4%',
    metricLabel: 'First-time produce quality satisfaction score',
    metricIcon: CheckCircle2,
    tags: ['Personal Selection', 'WhatsApp Check-in', 'Eco Jute Bags'],
    gradient: 'from-sky-500/10 via-blue-500/5 to-transparent'
  },
  {
    id: 'pillar-4',
    badge: 'Dedicated 2.5km Radius',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    icon: Zap,
    title: '20-Minute Neighbourhood Transit',
    subtitle: 'Colony-based riders who know your building and lane',
    description:
      'Because orders never cross chaotic ring roads or heavy bridges, your delivery arrives in under 20 minutes before your morning tea cools down. Dedicated local riders earn fair, respectful wages without highway burnout.',
    metric: '18.2 Min',
    metricLabel: 'Average colony dispatch to doorstep time',
    metricIcon: Clock,
    tags: ['2.5 km Radius', 'Colony Eco-Riders', 'Zero Ring-Road Traffic'],
    gradient: 'from-indigo-500/10 via-purple-500/5 to-transparent'
  },
  {
    id: 'pillar-5',
    badge: 'Empowering Small Business',
    badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
    icon: Store,
    title: '0% Listing Commission Guarantee',
    subtitle: "Supporting the heartbeat of India's retail economy",
    description:
      'We believe tech should empower local entrepreneurs, not extract from them. OneHaat charges ₹0 listing commission to family-run stores, settling UPI payments instantly the moment your delivery is handed over.',
    metric: '₹0 Cut',
    metricLabel: '100% margin retention for neighborhood grocers',
    metricIcon: HeartHandshake,
    tags: ['Instant UPI Settled', '1,420+ Haat Partners', 'Zero Exploitation'],
    gradient: 'from-rose-500/10 via-emerald-500/5 to-transparent'
  }
];

export const HaatStack: React.FC = React.memo(() => {
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const { scrollYProgress } = useScroll({
    target: desktopTrackRef,
    offset: ['start start', 'end end'],
  });

  const stepScrollTargets = [0.06, 0.26, 0.46, 0.66, 0.86];

  useEffect(() => {
    if (!isDesktop) return;

    // Smooth scroll synchronization
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      let idx = 0;
      if (progress >= 0.80) idx = 4;
      else if (progress >= 0.60) idx = 3;
      else if (progress >= 0.40) idx = 2;
      else if (progress >= 0.20) idx = 1;
      else idx = 0;
      setActiveCardIndex((prev) => (prev !== idx ? idx : prev));
    });

    let ctx: gsap.Context | null = null;
    if (desktopTrackRef.current) {
      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: desktopTrackRef.current,
          start: 'top top+=64px',
          end: 'bottom bottom',
          onUpdate: (self) => {
            const progress = self.progress;
            let idx = 0;
            if (progress >= 0.80) idx = 4;
            else if (progress >= 0.60) idx = 3;
            else if (progress >= 0.40) idx = 2;
            else if (progress >= 0.20) idx = 1;
            else idx = 0;
            setActiveCardIndex((prev) => (prev !== idx ? idx : prev));
          },
        });
      });
    }

    return () => {
      unsubscribe();
      if (ctx) ctx.revert();
    };
  }, [scrollYProgress, isDesktop]);

  const handlePillarClick = (idx: number) => {
    setActiveCardIndex(idx);
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

  const activePillar = pillars[activeCardIndex];

  return (
    <section id="pillars" className="relative bg-slate-50/60 overflow-visible scroll-mt-16">
      {/* Ambient background glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[750px] rounded-full masked-pastel-blob opacity-25 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, #D1FAE5 0%, #FEF9C3 35%, #E0F2FE 70%, transparent 85%)'
        }}
      />

      {/* Mobile view (< lg): Responsive card switcher */}
      <div className="lg:hidden py-12 px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-[11px] font-bold tracking-wide uppercase mb-1.5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>The Hyperlocal Architecture</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-ink tracking-tight leading-tight">
            The 5 Pillars of the{' '}
            <span className="editorial-accent gradient-text-emerald">OneHaat Stack.</span>
          </h2>
        </div>

        {/* Pillar Switcher Pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar touch-pan-x">
          {pillars.map((pillar, idx) => {
            const isActive = activeCardIndex === idx;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActiveCardIndex(idx)}
                className={`whitespace-nowrap shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                Pillar 0{idx + 1}
              </button>
            );
          })}
        </div>

        {/* Mobile Active Card */}
        <motion.div
          key={activePillar.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`rounded-3xl bg-gradient-to-br ${activePillar.gradient} bg-white/95 border border-slate-200/90 shadow-md p-6 space-y-4`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-white shadow-2xs border border-slate-200/80 flex items-center justify-center text-emerald-700">
                <activePillar.icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Pillar 0{activeCardIndex + 1}
              </span>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border tracking-wide uppercase ${activePillar.badgeColor}`}>
              {activePillar.badge}
            </span>
          </div>

          <h3 className="font-display font-extrabold text-xl text-ink">
            {activePillar.title}
          </h3>

          <p className="text-xs font-semibold text-emerald-800">
            {activePillar.subtitle}
          </p>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {activePillar.description}
          </p>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {activePillar.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-emerald-50/80 px-3 py-1.5 rounded-xl border border-emerald-100">
              <activePillar.metricIcon className="w-4 h-4 text-emerald-700 shrink-0" />
              <div>
                <span className="text-xs font-bold text-emerald-900 block leading-none">
                  {activePillar.metric}
                </span>
                <span className="text-[10px] text-emerald-700 font-medium leading-none">
                  {activePillar.metricLabel}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Prev/Next navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={() => setActiveCardIndex((prev) => Math.max(0, prev - 1))}
            disabled={activeCardIndex === 0}
            className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
              activeCardIndex === 0
                ? 'opacity-35 cursor-not-allowed border-slate-200 text-slate-400'
                : 'border-slate-300 text-slate-700 hover:bg-white active:scale-95'
            }`}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev</span>
          </button>

          <span className="text-xs font-semibold text-slate-400">
            {activeCardIndex + 1} of {pillars.length}
          </span>

          <button
            type="button"
            onClick={() => setActiveCardIndex((prev) => Math.min(pillars.length - 1, prev + 1))}
            disabled={activeCardIndex === pillars.length - 1}
            className={`flex items-center gap-1 text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all ${
              activeCardIndex === pillars.length - 1
                ? 'opacity-35 cursor-not-allowed border-slate-200 text-slate-400'
                : 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 active:scale-95 shadow-sm'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Desktop (>= lg): Pinned 1-Screen Sticky-Scroll Stage */}
      <div ref={desktopTrackRef} className="hidden lg:block relative min-h-[250vh]">
        {/* Pinned Stage: Fits 100% in one screen height below navbar (top-16) with zero overflow */}
        <div className="sticky top-16 h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] flex flex-col justify-center items-center gap-4 xl:gap-5 px-4 sm:px-6 lg:px-8 py-3 xl:py-4 overflow-hidden">
          
          {/* 1. Header inside Pinned Stage */}
          <div className="text-center max-w-2xl mx-auto shrink-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-[11px] font-bold tracking-wide uppercase mb-1 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>The Hyperlocal Architecture</span>
            </div>

            <h2 className="font-display font-extrabold text-2xl xl:text-3xl text-ink tracking-tight leading-tight">
              The 5 Pillars of the{' '}
              <span className="editorial-accent gradient-text-emerald">OneHaat Stack.</span>
            </h2>

            <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
              Scroll through our foundational principles. Every layer is built to protect local grocers,
              deliver peak farm freshness, and eliminate predatory dark-store markups.
            </p>
          </div>

          {/* 2. Stacking Cards Deck in the Center (Fits in one screen) */}
          <div className="w-full max-w-3xl xl:max-w-4xl h-[260px] xl:h-[280px] relative flex items-center justify-center shrink-0">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              const MetricIcon = pillar.metricIcon;
              const isVisible = index <= activeCardIndex;
              const depth = activeCardIndex - index;

              return (
                <motion.div
                  key={pillar.id}
                  initial={false}
                  animate={{
                    y: !isVisible ? '140%' : `${depth * -6}px`,
                    scale: !isVisible ? 0.95 : Math.max(0.88, 1 - depth * 0.035),
                    opacity: !isVisible ? 0 : 1,
                    zIndex: 10 - depth,
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute inset-x-0 mx-auto w-full max-w-3xl xl:max-w-4xl rounded-3xl bg-gradient-to-br ${pillar.gradient} bg-white border border-slate-200/90 shadow-[0_16px_40px_rgba(15,23,42,0.08)] p-5 xl:p-6 flex flex-col justify-between`}
                  style={{
                    transformOrigin: 'top center',
                  }}
                >
                  {/* Subtle darkening tint on cards behind */}
                  <div
                    className="absolute inset-0 rounded-3xl bg-slate-900 pointer-events-none transition-opacity duration-300"
                    style={{ opacity: isVisible && depth > 0 ? Math.min(0.24, depth * 0.08) : 0 }}
                  />

                  <div>
                    {/* Top Header Row */}
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-2xl bg-white shadow-2xs border border-slate-200/80 flex items-center justify-center text-emerald-700">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            Pillar 0{index + 1}
                          </span>
                          <h3 className="font-display font-extrabold text-lg xl:text-xl text-ink leading-tight">
                            {pillar.title}
                          </h3>
                        </div>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border tracking-wide uppercase ${pillar.badgeColor}`}>
                        {pillar.badge}
                      </span>
                    </div>

                    {/* Subtitle & Description */}
                    <p className="text-xs sm:text-sm font-semibold text-emerald-800/90 mb-1">
                      {pillar.subtitle}
                    </p>
                    <p className="text-xs xl:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Bottom Metadata & Metric Row */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    {/* Tags */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {pillar.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Highlight Metric */}
                    <div className="flex items-center gap-2 bg-white/80 px-3 py-1 rounded-xl border border-slate-200/80 shadow-2xs">
                      <MetricIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <div className="text-left">
                        <span className="text-xs font-bold text-ink block leading-none">
                          {pillar.metric}
                        </span>
                        <span className="text-[9px] text-slate-500 font-medium leading-none">
                          {pillar.metricLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* 3. Pillar Stepper Indicators below Deck */}
          <div className="flex items-center gap-2 z-20 shrink-0">
            {pillars.map((p, idx) => {
              const isActive = idx === activeCardIndex;
              const isPast = idx < activeCardIndex;

              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handlePillarClick(idx)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer select-none ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 ring-2 ring-emerald-200 scale-105'
                      : isPast
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/60'
                      : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span>Pillar 0{idx + 1}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
});

export default HaatStack;
