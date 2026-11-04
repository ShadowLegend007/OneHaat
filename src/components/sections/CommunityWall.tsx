import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { AnimatedContent } from '../ui/AnimatedContent';

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
      'I was so tired of receiving soggy, refrigerated spinach from dark store delivery apps. With OneHaat, Ramesh ji from Gupta Provisions literally selects the firmest tomatoes and sends glass bottle milk that was harvested this morning. Delivered in 16 minutes!',
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
      'When 10-minute dark stores opened nearby, our counter footfall dropped 30%. OneHaat brought all our neighborhood families back to our counter. 0% listing commission, money comes direct to my bank account instantly.',
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
      'The difference between generic corporate warehouse cardamom and stone-ground spices from Annapurna Mills is night and day. OneHaat preserves the soul of local bazaars without compromising modern speed.',
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
    highlight: 'Respectful trips & no long highway fatigue',
    quote:
      'Other delivery apps send us 12 km across heavy ring road traffic with 4 stacked orders. At OneHaat, I deliver within my own colony. Shopkeepers offer me chai, and customers know my name. Safe and honorable work.',
    avatarBg: '#FEF9C3',
    avatarText: 'SK',
  },
  {
    id: 't-5',
    name: 'Meenakshi Sundaram',
    role: 'Artisan Baker & Home Confectioner',
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

  const filteredTestimonials = useMemo(() => {
    if (activeFilter === 'all') return testimonials;
    return testimonials.filter((t) => t.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="stories" className="relative py-24 sm:py-32 bg-slate-50/50 overflow-hidden scroll-mt-16">
      {/* Background Soft Pastel Blob */}
      <div
        className="absolute top-1/2 -right-24 w-[600px] h-[600px] rounded-full masked-pastel-blob opacity-30 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, #D1FAE5 0%, #E0F2FE 40%, rgba(255,255,255,0) 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <Reveal>
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-bold tracking-wide uppercase mb-4">
            <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
            <span>Community Stories</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink tracking-tight">
            Loved by families, grocers, and riders.{' '}
            <span className="editorial-accent gradient-text-emerald">Real voices.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600">
            A sustainable hyperlocal ecosystem where customers save, shopkeepers thrive, and riders
            are respected.
          </p>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All Community Stories' },
              { id: 'customer', label: 'Neighborhood Families' },
              { id: 'grocer', label: 'Local Shopkeepers' },
              { id: 'rider', label: 'Eco-Riders' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeFilter === tab.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        </Reveal>

        {/* Masonry-Style Testimonial Cards Grid */}
        <AnimatedContent
          distance={30}
          direction="vertical"
          duration={0.8}
          stagger={0.06}
          threshold={0.1}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredTestimonials.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-emerald-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars & Category Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
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
                  <h3 className="font-display font-extrabold text-lg text-ink mb-3 leading-snug">
                    "{item.highlight}"
                  </h3>

                  {/* Body quote */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {item.quote}
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-slate-800 shadow-xs"
                    style={{ backgroundColor: item.avatarBg }}
                  >
                    {item.avatarText}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-ink">{item.name}</div>
                    <div className="text-xs text-slate-500">
                      {item.role} • {item.neighborhood}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </AnimatedContent>

      </div>
    </section>
  );
});
export default CommunityWall;
