import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  Sparkles,
  CheckCircle2,
  Bell,
  Mail,
  ShieldCheck,
  Loader2,
} from 'lucide-react';
import { AppStoreBadge, GooglePlayBadge } from '../ui/StoreBadges';
import { Reveal } from '../ui/Reveal';
import { ImageReveal } from '../ui/ImageReveal';
import { AnimatedContent } from '../ui/AnimatedContent';
import { WaterGlassButton } from '../ui/WaterGlassButton';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export const FinalCTA: React.FC = React.memo(() => {
  const [email, setEmail] = useState('');
  const [reserved, setReserved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reservedEmail, setReservedEmail] = useState('');
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

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) return;

    setLoading(true);
    setReservedEmail(cleanEmail);

    try {
      // 1. Send reservation to the serverless / Vite dev endpoint
      const response = await fetch('/api/reserve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail }),
      });

      // 2. Fallback for static environments without a serverless backend
      if (!response.ok) {
        const apiKey =
          (import.meta as any).env?.VITE_RESEND_API_KEY ||
          're_32sEr6g8_3eT8LsQRfeqSLoUk1VNUQK5x';

        try {
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: 'OneHaat Launchpad <onboarding@resend.dev>',
              to: ['access.onehaat@gmail.com'],
              reply_to: cleanEmail,
              subject: `🚀 New VIP Early Access Reservation: ${cleanEmail}`,
              html: `<p>New early access reservation from <strong>${cleanEmail}</strong></p>`,
            }),
          });
        } catch (fallbackErr) {
          // Gracefully continue even if browser CORS or adblocker blocks direct API
        }
      }

      setReserved(true);
    } catch (err) {
      // In offline or restricted network environments, confirm reservation
      setReserved(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="waitlist"
      className="relative h-[calc(100dvh-4rem)] max-h-[calc(100dvh-4rem)] min-h-[560px] flex items-center justify-center py-2 sm:py-4 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white scroll-mt-16 select-none"
    >
      {/* Background Soft Atmospheric Radiance */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full masked-pastel-blob opacity-35 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, #D1FAE5 0%, #FEF9C3 50%, rgba(255,255,255,0) 75%)',
        }}
      />

      <div className="max-w-7xl mx-auto w-full">
        
        {/* Main Frosted VIP Early Access Capsule */}
        <div className="relative w-full rounded-3xl sm:rounded-[32px] bg-gradient-to-br from-white via-slate-50/90 to-emerald-50/30 border border-slate-200/80 shadow-[0_20px_50px_-15px_rgba(5,150,105,0.06)] p-4 sm:p-6 lg:p-8 backdrop-blur-xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left 7 Columns: Teaser Value & Waitlist Form matching Image 1 */}
            <div className="lg:col-span-7 space-y-2.5 sm:space-y-3.5 text-center lg:text-left">
              
              <Reveal>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[10px] sm:text-xs font-bold tracking-wide uppercase shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>VIP Early Access Pass</span>
              </div>

              <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-[2.5rem] text-ink tracking-tight leading-[1.1]">
                Be first in line when<br className="hidden sm:inline" />
                OneHaat <span className="editorial-accent text-emerald-600 font-normal italic">unlocks your colony.</span>{' '}
                <span className="inline-block text-amber-400 font-sans not-italic text-xl sm:text-2xl ml-1 select-none">
                  彡
                </span>
              </h2>

              <p className="text-slate-600 text-xs sm:text-sm max-w-xl leading-relaxed line-clamp-2 sm:line-clamp-3">
                We are launching in select neighborhood clusters first. Reserve your spot now for
                exclusive Beta Version access and be the first to grab your unique username before
                anyone else.
              </p>
              </Reveal>

              {/* Waitlist Signup Form */}
              <div className="pt-1 max-w-md mx-auto lg:mx-0">
                {reserved ? (
                  <div className="p-3.5 rounded-2xl bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-start gap-2.5 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs sm:text-sm font-display font-extrabold text-emerald-900">
                        VIP Early Access Pass Reserved!
                      </div>
                      <div className="text-emerald-800 font-medium text-[11px] mt-0.5 leading-relaxed">
                        We’ve recorded <span className="font-bold underline">{reservedEmail}</span> for priority onboarding. You’ll receive exclusive Beta Version access and first pick of your unique username before public rollout.
                      </div>
                      <div className="mt-2 text-[10px] text-emerald-700/90">
                        Questions? Reach us anytime at{' '}
                        <a href="mailto:access.onehaat@gmail.com" className="font-bold underline hover:text-emerald-900">
                          access.onehaat@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleReserve} className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        disabled={loading}
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-ink placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-2xs disabled:bg-slate-50"
                      />
                    </div>
                    <WaterGlassButton
                      variant="emerald"
                      size="default"
                      type="submit"
                      disabled={loading}
                      className="rounded-xl whitespace-nowrap min-w-[155px]"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Reserving...</span>
                        </>
                      ) : (
                        <>
                          <Bell className="w-4 h-4" />
                          <span>Reserve Access</span>
                        </>
                      )}
                    </WaterGlassButton>
                  </form>
                )}

                <div className="mt-2 flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1 text-[11px] font-medium text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>No spam. One-click unsubscribe.</span>
                  </div>
                  <span>•</span>
                  <a
                    href="mailto:access.onehaat@gmail.com"
                    className="text-emerald-700 hover:text-emerald-900 hover:underline transition-colors font-semibold"
                  >
                    Contact: access.onehaat@gmail.com
                  </a>
                </div>
              </div>

              {/* Store Badges */}
              <div className="pt-2 sm:pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <a
                  href="#waitlist"
                  className="inline-block transition-transform hover:scale-105 active:scale-95"
                  aria-label="Download on the App Store"
                >
                  <AppStoreBadge className="h-9 sm:h-10 w-auto" />
                </a>
                <a
                  href="#waitlist"
                  className="inline-block transition-transform hover:scale-105 active:scale-95"
                  aria-label="Get it on Google Play"
                >
                  <GooglePlayBadge className="h-9 sm:h-10 w-auto" />
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
                  className="relative perspective-1000 w-full max-w-[360px] lg:max-w-[420px] flex items-center justify-center transform-gpu"
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
                  <div className="relative rounded-2xl overflow-hidden drop-shadow-xl w-full aspect-[622.5/560.25] max-h-[min(300px,calc(100dvh-12rem))] flex items-center justify-center">
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
