import React from 'react';
import { Store } from 'lucide-react';

const marqueeCategories = [
  '9 MIN 59 SEC AVERAGE DELIVERY',
  'DIRECT FROM VERIFIED LOCAL SHOPS',
  'ESSENTIAL MEDICAL & PHARMA',
  'ZERO WAREHOUSE MARKUP',
  'DIRECT WHOLESALE BAZAAR',
  'STONE-GROUND SPICES',
  'BULK WHOLESALE COUNTER SAVINGS',
  'INSTANT UPI SETTLEMENTS',
];

const partnerShops = [
  { name: 'Gupta Brothers Provisions', est: '1982', category: 'Spices & Staples', badge: 'Corner Gem' },
  { name: 'Sanjivani Medical & Healthcare', est: '1996', category: 'Medical & Pharma', badge: '100% Genuine' },
  { name: 'National Wholesale & Provisions', est: '1984', category: 'Bulk Wholesale', badge: 'Direct Counter Rate' },
  { name: 'Royal Baker & Flour Mills', est: '1976', category: 'Woodfired Sourdough', badge: 'Artisanal' },
  { name: 'Sri Laxmi Dry Fruits & Spices', est: '1989', category: 'Whole Spices', badge: 'Cold Pressed' },
  { name: 'Apollo Corner Medical & Chemist', est: '2001', category: 'Essential Medical', badge: 'Trusted Chemist' },
];

export const VelocityMarquee: React.FC = React.memo(() => {
  return (
    <section className="relative py-8 sm:py-10 bg-slate-50/70 overflow-hidden">
      {/* Subtle edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-14 bg-gradient-to-r from-slate-50 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-14 bg-gradient-to-l from-slate-50 to-transparent z-10" />

      {/* Row 1: Continuous Smooth Infinite Marquee (never stops on mouse hover) */}
      <div className="flex overflow-hidden whitespace-nowrap select-none pb-4">
        <div className="flex animate-marquee whitespace-nowrap items-center will-change-transform">
          {[...marqueeCategories, ...marqueeCategories, ...marqueeCategories].map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-3 font-display font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight px-6"
            >
              <span>{item}</span>
              <span className="text-emerald-500 font-bold">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Row 2: Partner Shops Continuous Loop (never stops on mouse hover) */}
      <div className="pt-2 flex overflow-hidden whitespace-nowrap select-none">
        <div className="flex animate-marquee-reverse whitespace-nowrap gap-4 items-center will-change-transform">
          {[...partnerShops, ...partnerShops, ...partnerShops].map((shop, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-emerald-300 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                <Store className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-xs sm:text-sm text-ink group-hover:text-emerald-700 transition-colors">
                    {shop.name}
                  </span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100/70 text-emerald-800">
                    Est. {shop.est}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span>{shop.category}</span>
                  <span>•</span>
                  <span className="text-amber-600 font-semibold">{shop.badge}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default VelocityMarquee;