import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, Variants } from 'framer-motion';
import { ArrowRight, Zap, Store, ShieldCheck, Play } from 'lucide-react';
import { AppStoreBadge, GooglePlayBadge } from '../ui/StoreBadges';
import { ImageReveal } from '../ui/ImageReveal';
import { AnimatedContent } from '../ui/AnimatedContent';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export interface HeroProps {
  isLoaded?: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const Hero: React.FC<HeroProps> = React.memo(({ isLoaded = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoverDevice = useMediaQuery('(hover: hover) and (pointer: fine)');

  // High-performance GPU-bound motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { damping: 35, stiffness: 80 });
  const smoothMouseY = useSpring(mouseY, { damping: 35, stiffness: 80 });

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-4, 4]);

  const { scrollY } = useScroll();

  // Calm scroll parallax offsets
  const bgY = useTransform(scrollY, [0, 500], [0, 40]);
  const textY = useTransform(scrollY, [0, 500], [0, 20]);
  const phoneY = useTransform(scrollY, [0, 500], [0, -18]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHoverDevice || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-20 sm:pt-24 lg:pt-20 pb-12 sm:pb-16 min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Subtle Pastel Ambient Blob in background with calm breathing oscillation */}
      <motion.div
        style={{ y: bgY }}
        animate={{
          scale: [1, 1.04, 1],
          opacity: [0.35, 0.42, 0.35],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center overflow-hidden"
      >
        <div
          className="w-[85vw] max-w-[1100px] h-[520px] rounded-full masked-pastel-blob"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(167, 243, 208, 0.45) 0%, rgba(254, 240, 138, 0.25) 35%, rgba(243, 232, 255, 0.2) 60%, rgba(255, 255, 255, 0) 80%)',
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main 2-Column Hero Layout matching reference design */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Brand Typography, Value Props, CTAs & Store Badges (6 cols) */}
          <AnimatedContent
            distance={40}
            direction="vertical"
            duration={0.9}
            ease="power3.out"
            trigger="mount"
            delay={0.1}
            className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-5"
          >
            <motion.div
              style={{ y: textY }}
              variants={containerVariants}
              initial="hidden"
              animate={isLoaded ? 'visible' : 'hidden'}
              className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-5 w-full"
            >
            {/* Pill Tag with calm, stable live beacon (No rapid strobe blinking) */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                <span className="absolute inline-flex h-3.5 w-3.5 rounded-full bg-emerald-400/25" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
              </span>
              <span className="text-xs font-semibold text-slate-800 tracking-tight">
                A hyperlocal marketplace for everyday needs
              </span>
            </motion.div>

            {/* Display Headline with animated line reveal */}
            <motion.h1
              variants={itemVariants}
              className="font-display font-extrabold text-ink text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] leading-[1.08] tracking-tight"
            >
              Your Neighbourhood<br />
              Store, <span className="editorial-accent text-emerald-600 font-normal italic">at Your Doorstep.</span>{' '}
              <span className="inline-block text-amber-400 font-sans not-italic text-2xl sm:text-3xl lg:text-4xl tracking-tighter ml-1 select-none">
                //
              </span>
            </motion.h1>

            {/* Clean Subhead */}
            <motion.p
              variants={itemVariants}
              className="max-w-md text-sm sm:text-base text-slate-600 font-normal leading-relaxed"
            >
              Order fresh groceries and daily staples from local shops you trust — fast, simple, and reliable.
            </motion.p>

            {/* Primary CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-3 pt-1 w-full sm:w-auto"
            >
              {/* Primary Green Pill CTA */}
              <a
                href="#waitlist"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-sm shadow-md shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Get VIP Early Access</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Secondary White Pill CTA */}
              <a
                href="#how-it-works"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 active:scale-98 text-slate-800 font-bold text-sm border border-slate-200/90 shadow-2xs transition-all flex items-center justify-center gap-2.5"
              >
                <Play className="w-3.5 h-3.5 fill-slate-800 text-slate-800" />
                <span>See How It Works</span>
              </a>
            </motion.div>

            {/* Official Store Buttons from Assets */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center lg:items-start gap-2 pt-1"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Coming Soon To Mobile
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="#waitlist"
                  className="inline-block transition-transform hover:scale-105 active:scale-95"
                  aria-label="Download on the App Store"
                >
                  <AppStoreBadge className="h-10 sm:h-11 w-auto" />
                </a>
                <a
                  href="#waitlist"
                  className="inline-block transition-transform hover:scale-105 active:scale-95"
                  aria-label="Get it on Google Play"
                >
                  <GooglePlayBadge className="h-10 sm:h-11 w-auto" />
                </a>
              </div>
            </motion.div>

            {/* 3 Value Props Pills */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200/70 text-xs font-semibold text-slate-700 shadow-2xs">
                <Zap className="w-3.5 h-3.5 text-emerald-600" />
                <span>20-Min Delivery</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200/70 text-xs font-semibold text-slate-700 shadow-2xs">
                <Store className="w-3.5 h-3.5 text-emerald-600" />
                <span>Direct Store Shelves</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200/70 text-xs font-semibold text-slate-700 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Hidden Markup</span>
              </div>
            </motion.div>
          </motion.div>
        </AnimatedContent>

          {/* Right Column: 3D Character & Phone Mockup Illustration (6 cols) */}
          <AnimatedContent
            distance={50}
            direction="horizontal"
            reverse={true}
            duration={1.0}
            ease="power3.out"
            trigger="mount"
            delay={0.2}
            className="lg:col-span-6 relative flex items-center justify-center pt-4 lg:pt-0"
          >
            <div className="relative flex items-center justify-center w-full">
            {/* Ambient Aura Glow behind the illustration */}
            <div
              className="absolute w-[360px] sm:w-[440px] h-[360px] sm:h-[440px] rounded-full blur-3xl opacity-40 -z-10 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, rgba(254, 240, 138, 0.25) 50%, transparent 75%)',
              }}
            />

            {/* Outer Entrance Reveal Container with Fixed Reserved Space */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="relative flex items-center justify-center z-10 w-full max-w-[480px] sm:max-w-[520px] lg:max-w-[560px] xl:max-w-[600px]"
            >
              {/* Parallax & Mouse Tilt Layer with Permanent Fixed Aspect Ratio Container */}
              <motion.div
                style={{
                  y: phoneY,
                  rotateX: isHoverDevice ? rotateX : 0,
                  rotateY: isHoverDevice ? rotateY : 0,
                  transformPerspective: 1000,
                  willChange: 'transform',
                }}
                className="relative flex items-center justify-center w-full aspect-[600.75/586.5] min-h-[350px] sm:min-h-[460px] lg:min-h-[520px] transform-gpu"
              >
                {/* Floating Micro-badge 1: Delivery Speed */}
                <motion.div
                  animate={{
                    y: [-4, 5, -4],
                    rotate: [-0.5, 1, -0.5],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 6.8,
                    ease: 'easeInOut',
                  }}
                  className="absolute -top-3 left-0 sm:left-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-200/80 flex items-center gap-2.5 pointer-events-none select-none"
                >
                  <div className="w-7 h-7 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                    <Zap className="w-4 h-4 fill-emerald-500 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-900 leading-none">18 Mins</div>
                    <div className="text-[9px] text-slate-400 font-semibold leading-tight">Lightning Delivery</div>
                  </div>
                </motion.div>

                {/* Floating Micro-badge 2: Trusted Grocers */}
                <motion.div
                  animate={{
                    y: [5, -4, 5],
                    rotate: [1, -0.5, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 7.5,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                  className="absolute -bottom-2 right-0 sm:right-4 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-200/80 flex items-center gap-2.5 pointer-events-none select-none"
                >
                  <div className="w-7 h-7 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                    <Store className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-900 leading-none">1,400+</div>
                    <div className="text-[9px] text-slate-400 font-semibold leading-tight">Local Grocers</div>
                  </div>
                </motion.div>

                {/* Main 3D Hero Mockup Illustration with Dedicated ImageReveal (Zero CLS + Smooth Reveal Animation) */}
                <ImageReveal
                  src="/hero-character-mockup.svg"
                  alt="OneHaat App and Character"
                  aspectRatio="600.75 / 586.5"
                  width={801}
                  height={782}
                  priority={true}
                  containerClassName="rounded-3xl flex items-center justify-center"
                  imageClassName="drop-shadow-md"
                  continuousAnimate={isLoaded ? { opacity: 1, scale: [1, 1.015, 1] } : { opacity: 1, scale: 1 }}
                  continuousTransition={{
                    repeat: Infinity,
                    duration: 7.5,
                    ease: 'easeInOut',
                    delay: 0.3,
                  }}
                />
              </motion.div>
            </motion.div>
            </div>
          </AnimatedContent>

        </div>
      </div>
    </section>
  );
});

export default Hero;