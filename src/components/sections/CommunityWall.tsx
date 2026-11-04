import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  neighborhood: string;
  category: 'customer' | 'grocer' | 'rider';
  rating: number;
  highlight: string;
  quote: string;
  avatarBg: string;
  avatarText: string;
}

const testimonials: Testimonial[] = [
  {
    id: 't-1',
    name: 'Pooja Venkatesh',
    role: 'Resident & Mother of Two',
    neighborhood: 'Indiranagar 12th Main',
    category: 'customer',
    rating: 5,
    highlight: 'Purest A2 milk and vine tomatoes',
    quote:
      'I was tired of soggy refrigerated greens from dark stores. With OneHaat, Ramesh ji personally selects the firmest tomatoes and sends glass bottle milk harvested that morning. Delivered in 16 minutes!',
    avatarBg: '#D1FAE5',
    avatarText: 'PV',
  },
  {
    id: 't-2',
    name: 'Ramesh Gupta',
    role: 'Store Owner, Gupta Provisions',
    neighborhood: 'Serving community since 1982',
    category: 'grocer',
    rating: 5,
    highlight: 'Zero commission saved my family store',
    quote:
      'When dark stores opened nearby, our counter footfall dropped 30%. OneHaat brought our neighborhood families right back to our counter with 0% listing cuts and instant direct settlements.',
    avatarBg: '#FFEDD5',
    avatarText: 'RG',
  },
  {
    id: 't-3',
    name: 'Dr. Arindam Sen',
    role: 'Cardiologist & Home Cook',
    neighborhood: 'Koramangala 4th Block',
    category: 'customer',
    rating: 5,
    highlight: 'Direct spice counter aroma',
    quote:
      'The aroma of stone-ground spices from Annapurna Mills is night and day compared to generic warehouse bags. OneHaat preserves the soul of local bazaars without compromising speed.',
    avatarBg: '#E0F2FE',
    avatarText: 'AS',
  },
  {
    id: 't-4',
    name: 'Suresh Kumar',
    role: 'Hyperlocal Eco-Rider',
    neighborhood: '2.5 km Local Radius',
    category: 'rider',
    rating: 5,
    highlight: 'Respectful trips & no highway fatigue',
    quote:
      'Other delivery apps send us 12 km across heavy ring roads. At OneHaat, I deliver within my own colony. Shopkeepers offer chai, and customers know my name. Safe and honorable work.',
    avatarBg: '#FEF9C3',
    avatarText: 'SK',
  },
  {
    id: 't-5',
    name: 'Meenakshi Sundaram',
    role: 'Artisan Baker & Confectioner',
    neighborhood: 'Malleshwaram 7th Cross',
    category: 'grocer',
    rating: 5,
    highlight: 'Fresh morning bake sold out in 45 mins',
    quote:
      'We bake small batches of country sourdough every morning at 6 AM. Through OneHaat, our neighborhood regulars reserve their loaves before they even come out of the oven. No third-party cuts.',
    avatarBg: '#F3E8FF',
    avatarText: 'MS',
  },
  {
    id: 't-6',
    name: 'Karan & Shruti Mehta',
    role: 'Tech Founders & Weekend Cooks',
    neighborhood: 'HSR Layout Sector 2',
    category: 'customer',
    rating: 5,
    highlight: 'Save ₹2,000+ every single month',
    quote:
      'Dark store quick commerce quietly inflates item prices by ₹15 to ₹40 on every staple. OneHaat bills at exact retail counter prices with no sneaky markups. Transparent, honest, and fast.',
    avatarBg: '#FED7AA',
    avatarText: 'KM',
  },
];

export const CommunityWall: React.FC = React.memo(() => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'customer' | 'grocer' | 'rider'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);

  const filteredTestimonials = useMemo(() => {
    if (activeFilter === 'all') return testimonials;
    return testimonials.filter((t) => t.category === activeFilter);
  }, [activeFilter]);

  // Reset index when filter changes
  const handleFilterChange = (filter: 'all' | 'customer' | 'grocer' | 'rider') => {
    setActiveFilter(filter);
    setCurrentIndex(0);
  };

  const handlePrev = useCallback(() => {
    setSlideDirection(-1);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredTestimonials.length - 1));
  }, [filteredTestimonials.length]);

  const handleNext = useCallback(() => {
    setSlideDirection(1);
    setCurrentIndex((prev) => (prev < filteredTestimonials.length - 1 ? prev + 1 : 0));
  }, [filteredTestimonials.length]);

  // For desktop/tablet, take 3 items in a single row
  const desktopCards = useMemo(() => {
    const list = filteredTestimonials;
    if (list.length === 0) return [];
    if (list.length <= 3) return list;
    const cards = [];
    for (let i = 0; i < 3; i++) {
      cards.push(list[(currentIndex + i) % list.length]);
    }
    return cards;
  }, [filteredTestimonials, currentIndex]);

  const activeMobileCard = filteredTestimonials[currentIndex % Math.max(1, filteredTestimonials.length)];

  return (
    <section
      id="stories"
      className="relative min-h-[calc(100dvh-4rem)] lg:h-[calc(100dvh-4rem)] lg:max-h-[calc(100dvh-4rem)] flex flex-col justify-between py-6 sm:py-8 lg:py-5 px-4 sm:px-6 lg:px-8 bg-slate-50/50 overflow-hidden scroll-mt-16 select-none"
    >
      {/* Background Soft Pastel Blob */}
      <div
        className="absolute top-1/2 -right-24 w-[500px] h-[500px] rounded-full masked-pastel-blob opacity-30 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, #D1FAE5 0%, #E0F2FE 40%, rgba(255,255,255,0) 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between">
        
        {/* 1. Header */}
        <div className="text-center max-w-3xl mx-auto shrink-0 pt-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-[10px] sm:text-xs font-bold tracking-wide uppercase mb-1.5 sm:mb-2 shadow-2xs">
            <Heart className="w-3 h-3 text-emerald-600 fill-emerald-600" />
            <span>Community Stories</span>
          </div>

          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-ink tracking-tight leading-tight">
            Loved by families, grocers, and riders.{' '}
            <span className="editorial-accent gradient-text-emerald italic font-normal">Real voices.</span>
          </h2>

          <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
            A sustainable hyperlocal ecosystem where customers save, shopkeepers thrive, and riders are respected.
          </p>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3 flex-wrap">
            {[
              { id: 'all', label: 'All Community Stories' },
              { id: 'customer', label: 'Neighborhood Families' },
              { id: 'grocer', label: 'Local Shopkeepers' },
              { id: 'rider', label: 'Eco-Riders' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleFilterChange(tab.id as any)}
                className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold transition-all ${
                  activeFilter === tab.id
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Responsive Showcase: 3 Cards in 1 Row on Desktop/Tablet, 1 on Mobile */}
        <div className="flex-1 flex items-center justify-center min-h-0 my-3 sm:my-4">
          {/* Desktop & Tablet View (>= md): Single Row of 3 Cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-3.5 lg:gap-5 w-full items-stretch">
            <AnimatePresence mode="popLayout" custom={slideDirection}>
              {desktopCards.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="p-4 sm:p-5 lg:p-6 rounded-2xl lg:rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-emerald-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Rating Stars & Category Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 capitalize">
                        {item.category === 'customer'
                          ? 'Verified Buyer'
                          : item.category === 'grocer'
                          ? 'Partner Shop'
                          : 'Local Rider'}
                      </span>
                    </div>

                    {/* Headline quote highlight */}
                    <h3 className="font-display font-extrabold text-sm lg:text-base text-ink mb-1.5 leading-snug">
                      "{item.highlight}"
                    </h3>

                    {/* Body quote (No truncation) */}
                    <p className="text-slate-600 text-xs lg:text-[13px] leading-relaxed mb-3">
                      {item.quote}
                    </p>
                  </div>

                  {/* Author Info (Full text, no cutoffs) */}
                  <div className="pt-2.5 border-t border-slate-100 flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center font-bold text-xs text-slate-800 shadow-2xs shrink-0"
                      style={{ backgroundColor: item.avatarBg }}
                    >
                      {item.avatarText}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs sm:text-sm text-ink leading-tight">{item.name}</div>
                      <div className="text-[10px] lg:text-[11px] text-slate-500 leading-tight mt-0.5">
                        {item.role}
                      </div>
                      <div className="text-[10px] text-emerald-700 font-semibold leading-tight">
                        {item.neighborhood}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile View (< md): 1 Active Card Carousel */}
          <div className="md:hidden w-full max-w-sm">
            {activeMobileCard && (
              <AnimatePresence mode="wait" custom={slideDirection}>
                <motion.div
                  key={activeMobileCard.id}
                  custom={slideDirection}
                  initial={{ opacity: 0, x: slideDirection * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -slideDirection * 40 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    {/* Stars & Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(activeMobileCard.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 capitalize">
                        {activeMobileCard.category === 'customer'
                          ? 'Verified Buyer'
                          : activeMobileCard.category === 'grocer'
                          ? 'Partner Shop'
                          : 'Local Rider'}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="font-display font-extrabold text-base text-ink mb-1.5 leading-snug">
                      "{activeMobileCard.highlight}"
                    </h3>

                    {/* Quote (Full text, no truncation) */}
                    <p className="text-slate-600 text-xs leading-relaxed mb-3">
                      {activeMobileCard.quote}
                    </p>
                  </div>

                  {/* Author */}
                  <div className="pt-2.5 border-t border-slate-100 flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-slate-800 shadow-2xs shrink-0"
                      style={{ backgroundColor: activeMobileCard.avatarBg }}
                    >
                      {activeMobileCard.avatarText}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-xs text-ink leading-tight">{activeMobileCard.name}</div>
                      <div className="text-[10px] text-slate-500 leading-tight mt-0.5">
                        {activeMobileCard.role}
                      </div>
                      <div className="text-[10px] text-emerald-700 font-semibold leading-tight">
                        {activeMobileCard.neighborhood}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* 3. Carousel Navigation & Pagination */}
        <div className="flex items-center justify-between max-w-sm mx-auto w-full shrink-0 pb-1 px-4">
          <button
            type="button"
            onClick={handlePrev}
            className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-all active:scale-95 shadow-2xs"
            aria-label="Previous story"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {filteredTestimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setSlideDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex % filteredTestimonials.length
                    ? 'w-5 bg-emerald-600'
                    : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="w-8 h-8 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-all active:scale-95 shadow-2xs"
            aria-label="Next story"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
});

export default CommunityWall;
