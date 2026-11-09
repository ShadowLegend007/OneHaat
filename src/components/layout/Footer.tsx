import React, { useState } from 'react';
import {
  Heart,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { AnimatedContent } from '../ui/AnimatedContent';
import { WaterGlassButton } from '../ui/WaterGlassButton';

export const Footer: React.FC = React.memo(() => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="relative bg-white border-t border-slate-200/80 pt-16 pb-12 overflow-hidden text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Status & Newsletter Row */}
        <div className="pb-8 sm:pb-12 border-b border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 lg:gap-8">
          
          {/* Live Operational Status Indicator */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 shadow-2xs shrink-0 select-none">
              <span className="flex h-2 w-2 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-bold text-emerald-800 whitespace-nowrap">
                Launch Preparation Underway
              </span>
            </div>
            <span className="text-xs text-slate-400">
              1,420+ local shops connecting across Bengaluru
            </span>
          </div>

          {/* Neighborhood Newsletter */}
          <div className="w-full md:w-auto flex items-center justify-start md:justify-end">
            {subscribed ? (
              <div className="p-2.5 px-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Subscribed! We’ll send you seasonal bazaar and store updates.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex w-full sm:w-auto gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email for launch updates"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-ink placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-2xs w-full sm:w-72"
                />
                <WaterGlassButton
                  variant="dark"
                  size="sm"
                  type="submit"
                  className="rounded-xl shrink-0 px-4 py-2 font-bold"
                >
                  Join
                </WaterGlassButton>
              </form>
            )}
          </div>
        </div>

        {/* Links Navigation Matrix (Teaser Aligned) */}
        <AnimatedContent
          distance={30}
          direction="vertical"
          duration={0.8}
          stagger={0.06}
          threshold={0.1}
          className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
        >
          
          {/* Brand Info (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4">
            <a
              href="#"
              className="inline-flex items-center group outline-none focus:outline-none focus:ring-0 focus-visible:outline-none select-none"
              aria-label="OneHaat Home"
            >
              <div className="relative h-10 aspect-[688.5/459] flex items-center">
                <img
                  src="/favicon.svg"
                  alt="OneHaat — One Market. Every Need."
                  width={60}
                  height={40}
                  className="h-10 w-auto object-contain group-hover:scale-105 transition-transform"
                  loading="lazy"
                />
              </div>
            </a>

            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              The hyperlocal marketplace dedicated to empowering generational neighborhood grocers,
              pharmacy essentials, and wholesale suppliers with 9 min 59 sec average delivery.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>FSSAI Certified • Zero Synthetic Dark Stores</span>
            </div>
          </div>

          {/* 3 Link Columns Group (7 cols on lg, 3 columns on tablet/desktop) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            {/* Column 1: The Launch */}
            <div className="space-y-3">
              <div className="font-display font-bold text-xs uppercase tracking-wider text-ink">
                The Launch
              </div>
              <ul className="space-y-2 text-xs">
                <li><a href="#vision" className="hover:text-emerald-700 transition-colors">Our Vision & Manifesto</a></li>
                <li><a href="#pillars" className="hover:text-emerald-700 transition-colors">The 5 Pillars</a></li>
                <li><a href="#how-it-works" className="hover:text-emerald-700 transition-colors">4-Step Journey</a></li>
                <li><a href="#stories" className="hover:text-emerald-700 transition-colors">Community Stories</a></li>
              </ul>
            </div>

            {/* Column 2: For Partners */}
            <div className="space-y-3">
              <div className="font-display font-bold text-xs uppercase tracking-wider text-ink">
                For Partners
              </div>
              <ul className="space-y-2 text-xs">
                <li><a href="#waitlist" className="hover:text-emerald-700 transition-colors">Join as Grocer</a></li>
                <li><a href="#waitlist" className="hover:text-emerald-700 transition-colors">Partner Mandis</a></li>
                <li><a href="#waitlist" className="hover:text-emerald-700 transition-colors">Delivery Fleet</a></li>
                <li><a href="#waitlist" className="hover:text-emerald-700 transition-colors">0% Commission Promise</a></li>
              </ul>
            </div>

            {/* Column 3: Legal & Trust */}
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <div className="font-display font-bold text-xs uppercase tracking-wider text-ink">
                Legal & Trust
              </div>
              <ul className="space-y-2 text-xs">
                <li><a href="#faq" className="hover:text-emerald-700 transition-colors">Price Parity Guarantee</a></li>
                <li><a href="#faq" className="hover:text-emerald-700 transition-colors">Privacy & Data Security</a></li>
                <li><a href="#faq" className="hover:text-emerald-700 transition-colors">Merchant Code of Ethics</a></li>
                <li><a href="#faq" className="hover:text-emerald-700 transition-colors">FSSAI Compliance</a></li>
              </ul>
            </div>
          </div>

        </AnimatedContent>

        {/* Bottom Bar: Copyright & Ethics */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} OneHaat Technologies Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for local neighborhood communities</span>
          </div>
        </div>

      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
