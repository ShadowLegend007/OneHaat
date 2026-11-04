import React, { useState } from 'react';
import {
  Heart,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { AnimatedContent } from '../ui/AnimatedContent';

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
        <div className="pb-12 border-b border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Live Operational Status Indicator */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-bold text-emerald-800">
                Launch Preparation Underway
              </span>
            </div>
            <span className="text-xs text-slate-400">
              1,420+ local shops connecting across Bengaluru
            </span>
          </div>

          {/* Neighborhood Newsletter */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row items-center justify-end gap-3">
            {subscribed ? (
              <div className="p-2.5 px-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Subscribed! We’ll send you seasonal bazaar harvest alerts.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex w-full sm:w-auto gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email for launch updates"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-ink placeholder-slate-400 focus:outline-none focus:border-emerald-500 w-full sm:w-72"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shrink-0"
                >
                  Join
                </button>
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
          className="py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8"
        >
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
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
              The hyperlocal grocery platform dedicated to preserving generational neighborhood grocers,
              spice mills, and farm cooperatives with 20-minute rapid delivery.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>FSSAI Certified • Zero Synthetic Dark Stores</span>
            </div>
          </div>

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
          <div className="space-y-3">
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
