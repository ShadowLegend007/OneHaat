import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart } from 'lucide-react';
import { AnimatedContent } from '../ui/AnimatedContent';

interface WordProps {
  children: string;
  range: [number, number];
  progress: any;
  isEditorial?: boolean;
}

const statementWords = [
  { text: 'Every', isEditorial: false },
  { text: 'neighbourhood', isEditorial: false },
  { text: 'already', isEditorial: false },
  { text: 'has', isEditorial: false },
  { text: 'a', isEditorial: false },
  { text: 'store', isEditorial: false },
  { text: 'it', isEditorial: false },
  { text: 'trusts.', isEditorial: true },
  { text: 'We', isEditorial: false },
  { text: 'didn’t', isEditorial: false },
  { text: 'replace', isEditorial: false },
  { text: 'them', isEditorial: false },
  { text: 'with', isEditorial: false },
  { text: 'cold', isEditorial: false },
  { text: 'dark', isEditorial: false },
  { text: 'warehouses.', isEditorial: false },
  { text: 'We', isEditorial: false },
  { text: 'just', isEditorial: false },
  { text: 'brought', isEditorial: false },
  { text: 'them', isEditorial: false },
  { text: 'online.', isEditorial: true },
];

const stats = [
  { metric: '1,420+', label: 'Local Haat Partners', sub: 'Verified family grocers' },
  { metric: '18 min', label: 'Average Delivery', sub: 'Faster than warehouse prep' },
  { metric: '₹0', label: 'Listing Commission', sub: 'Fair to honest shopkeepers' },
  { metric: '100%', label: 'Counter Shelf Stock', sub: 'Inspected by the shopkeeper' },
];

const Word: React.FC<WordProps> = React.memo(({ children, range, progress, isEditorial = false }) => {
  // Smooth unblur animation: starts blurred, progressively unblurs as scrolled,
  // and is 100% unblurred and sharp when section reaches the middle of the screen
  const opacity = useTransform(progress, range, [0.2, 1]);
  const blurValue = useTransform(progress, range, [8, 0]);
  const y = useTransform(progress, range, [12, 0]);

  return (
    <span className="relative inline-block mr-2 sm:mr-3 my-0.5">
      <motion.span
        style={{
          opacity,
          filter: useTransform(blurValue, (v) => `blur(${v}px)`),
          y,
        }}
        className={`inline-block will-change-transform ${
          isEditorial
            ? 'editorial-accent gradient-text-emerald font-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
            : ''
        }`}
      >
        {children}
      </motion.span>
    </span>
  );
});

export const ManifestoStatement: React.FC = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Offset ensures that as section scrolls from bottom of screen to middle of screen,
  // ALL words completely finish unblurring. When centered in view, blur is 100% GONE.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  });

  return (
    <section
      id="vision"
      ref={containerRef}
      className="relative py-20 sm:py-28 lg:py-36 bg-white flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Background Soft Pastel Glow */}
      <div
        className="absolute w-[65vw] max-w-[750px] h-[380px] rounded-full masked-pastel-blob opacity-40 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, #D1FAE5 0%, #FEF08A 35%, rgba(255, 255, 255, 0) 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtitle Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-bold tracking-wide uppercase mb-8 shadow-xs">
          <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
          <span>Our Core Conviction</span>
        </div>

        {/* Scroll-Triggered Unblur Statement Words */}
        <p className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-ink leading-[1.3] tracking-tight">
          {statementWords.map((wordObj, i) => {
            // Distribute across 0 to 0.72 so by center screen (1.0), all words are 100% unblurred
            const start = (i / statementWords.length) * 0.72;
            const end = start + 0.22;
            return (
              <Word
                key={i}
                range={[start, Math.min(end, 1)]}
                progress={scrollYProgress}
                isEditorial={wordObj.isEditorial}
              >
                {wordObj.text}
              </Word>
            );
          })}
        </p>

        {/* Supporting Metric Cards with Deterministic Synchronized Stagger */}
        <AnimatedContent
          distance={30}
          direction="vertical"
          duration={0.8}
          stagger={0.08}
          threshold={0.15}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-14 pt-4"
        >
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/95 border border-slate-200/70 shadow-xs flex flex-col items-center text-center group hover:bg-white hover:shadow-md hover:border-emerald-200/80 transition-[background-color,border-color,box-shadow] duration-200 transform-gpu"
            >
              <div className="font-display font-black text-3xl sm:text-4xl text-ink tracking-tight">
                {stat.metric}
              </div>
              <div className="font-bold text-xs sm:text-sm text-slate-900 mt-2">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {stat.sub}
              </div>
            </div>
          ))}
        </AnimatedContent>
      </div>
    </section>
  );
});

export default ManifestoStatement;