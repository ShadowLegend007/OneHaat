import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Sparkles,
  CheckCircle2,
  Bell,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { AppStoreBadge, GooglePlayBadge } from '../ui/StoreBadges';
import { Reveal } from '../ui/Reveal';
import { ImageReveal } from '../ui/ImageReveal';
import { AnimatedContent } from '../ui/AnimatedContent';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export const FinalCTA: React.FC = React.memo(() => {
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [reserved, setReserved] = useState(false);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const cardRotateX = useTransform(smoothMouseY, [0, 1], [10, -10]);
  const cardRotateY = useTransform(smoothMouseX, [0, 1], [-12, 12]);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || !cardContainerRef.current) return;
    const rect = cardContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleCardMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneOrEmail.trim()) {
      setReserved(true);
    }
  };

  return (
    <section id="waitlist" className="relative py-24 sm:py-32 overflow-hidden bg-white">
      {/* Background Soft Atmospheric Radiance */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full masked-pastel-blob opacity-35 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, #D1FAE5 0%, #FEF9C3 50%, rgba(255,255,255,0) 75%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Frosted VIP Early Access Capsule */}
        <div className="relative rounded-[36px] bg-gradient-to-br from-white via-slate-50/90 to-emerald-50/30 border border-slate-200/80 shadow-[0_20px_50px_-15px_rgba(5,150,105,0.06)] p-8 sm:p-12 lg:p-16 backdrop-blur-xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left 7 Columns: Teaser Value & Waitlist Form matching Image 1 */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold tracking-wide uppercase shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>VIP Early Access Pass</span>
              </div>

              <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] text-ink tracking-tight leading-[1.12]">
                Be first in line when<br className="hidden sm:inline" />
                OneHaat <span className="editorial-accent text-emerald-600 font-normal italic">unlocks your<br className="hidden sm:inline" />colony.</span>{' '}
                <span className="inline-block text-amber-400 font-sans not-italic text-2xl sm:text-3xl ml-1 select-none">
                  彡
                </span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed">
                We are launching in select neighborhood clusters first. Reserve your free early access
                spot now to receive an exclusive ₹200 launch basket credit and zero delivery charges
                for your first 90 days.
              </p>
              </Reveal>

              {/* Waitlist Signup Form */}
              <div className="pt-2 max-w-md mx-auto lg:mx-0">
                {reserved ? (
                  <div className="p-4 rounded-2xl bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-start gap-3 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-display font-extrabold text-emerald-900">
                        VIP Early Access Pass Reserved!
                      </div>
                      <div className="text-emerald-800 font-medium mt-0.5">
                        You're on the priority list. We will send your invite code and app download link via SMS & email 48 hours before launch in your area.
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleReserve} className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Enter mobile number or email"
                        value={phoneOrEmail}
                        onChange={(e) => setPhoneOrEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-ink placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-xs"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <Bell className="w-4 h-4" />
                      <span>Reserve Access</span>
                    </button>
                  </form>
                )}

                <div className="mt-3 flex items-center justify-center lg:justify-start gap-2 text-xs font-medium text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>No spam. One-click unsubscribe at any time.</span>
                </div>
              </div>

              {/* Store Badges */}
              <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4">
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
            </div>

            {/* Right 5 Columns: Glossy 3D VIP Early Access Pass Render */}
            <AnimatedContent
              distance={40}
              direction="horizontal"
              reverse={true}
              duration={0.9}
              threshold={0.1}
              className="lg:col-span-5 relative flex items-center justify-center select-none"
            >
              <div
                ref={cardContainerRef}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="w-full flex items-center justify-center"
              >
                <motion.div
                  style={{
                    rotateX: cardRotateX,
                    rotateY: cardRotateY,
                    willChange: 'transform',
                  }}
                  className="relative perspective-1000 w-full max-w-[460px] flex items-center justify-center transform-gpu"
                >
                  {/* Ambient Soft Glow underneath */}
                  <div
                    className="absolute -inset-4 rounded-full blur-2xl opacity-40 -z-10 pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.4) 0%, rgba(254, 240, 138, 0.25) 50%, transparent 75%)',
                    }}
                  />

                  {/* Container for the 3D Render Image with Guaranteed Reserved Geometry */}
                  <div className="relative rounded-3xl overflow-hidden drop-shadow-2xl w-full aspect-[622.5/560.25] min-h-[290px] sm:min-h-[360px] lg:min-h-[390px] flex items-center justify-center">
                    <ImageReveal
                      src="/early-access-pass-render.svg"
                      alt="OneHaat Early Access Pass"
                      aspectRatio="622.5 / 560.25"
                      width={830}
                      height={747}
                      priority={false}
                      containerClassName="w-full h-full"
                      imageClassName="object-contain"
                    >
                      {/* Glossy Sheen Overlay 1 */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay z-20"
                        style={{
                          background: 'radial-gradient(circle at 60% 40%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 70%)',
                        }}
                      />

                      {/* Glossy Sheen Overlay 2: Diagonal glass reflection sheen */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-40 z-20"
                        style={{
                          background:
                            'linear-gradient(130deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.15) 35%, rgba(255,255,255,0) 65%)',
                        }}
                      />
                    </ImageReveal>
                  </div>
                </motion.div>
              </div>
            </AnimatedContent>

          </div>
        </div>
      </div>
    </section>
  );
});

FinalCTA.displayName = 'FinalCTA';
export default FinalCTA;
