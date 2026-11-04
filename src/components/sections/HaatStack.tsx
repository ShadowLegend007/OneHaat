import React from 'react';
import { ScrollStack, ScrollStackItem } from '../ui/ScrollStack';
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
  return (
    <section id="pillars" className="relative bg-slate-50/60 py-12 sm:py-16 scroll-mt-16 overflow-visible">
      {/* Ambient background glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[750px] rounded-full masked-pastel-blob opacity-25 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, #D1FAE5 0%, #FEF9C3 35%, #E0F2FE 70%, transparent 85%)'
        }}
      />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-[11px] font-bold tracking-wide uppercase mb-2 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>The Hyperlocal Architecture</span>
        </div>

        <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-ink tracking-tight leading-tight">
          The 5 Pillars of the{' '}
          <span className="editorial-accent gradient-text-emerald">OneHaat Stack.</span>
        </h2>

        <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
          Scroll through our foundational principles. Every layer is built to protect local grocers,
          deliver peak farm freshness, and eliminate predatory dark-store markups.
        </p>
      </div>

      {/* React Bits ScrollStack with Scrambled Cards animation */}
      <ScrollStack
        useWindowScroll={true}
        stackPosition="210px"
        itemDistance={150}
        itemStackDistance={18}
        itemScale={0.035}
        baseScale={0.88}
        rotationAmount={4}
        tiltAmount={3.5}
        dimAmount={0.16}
        holdDistance={240}
        smoothScroll={false}
        className="w-full max-w-4xl mx-auto"
      >
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          const MetricIcon = pillar.metricIcon;

          return (
            <ScrollStackItem
              key={pillar.id}
              itemClassName={`rounded-3xl bg-gradient-to-br ${pillar.gradient} bg-white border border-slate-200/90 shadow-[0_16px_40px_rgba(15,23,42,0.08)] p-5 sm:p-6 flex flex-col justify-between`}
            >
              <div>
                {/* Top Header Row */}
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white shadow-2xs border border-slate-200/80 flex items-center justify-center text-emerald-700 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                        Pillar 0{index + 1}
                      </span>
                      <h3 className="font-display font-extrabold text-lg sm:text-xl xl:text-2xl text-ink leading-tight">
                        {pillar.title}
                      </h3>
                    </div>
                  </div>

                  <span className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold border tracking-wide uppercase shrink-0 ${pillar.badgeColor}`}>
                    {pillar.badge}
                  </span>
                </div>

                {/* Subtitle & Description */}
                <p className="text-xs sm:text-sm font-semibold text-emerald-800/90 mb-1.5">
                  {pillar.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {pillar.description}
                </p>
              </div>

              {/* Bottom Metadata & Metric Row */}
              <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3 mt-3">
                {/* Tags */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {pillar.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] sm:text-[11px] font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Highlight Metric */}
                <div className="flex items-center gap-2 bg-white/90 px-3 py-1 rounded-xl border border-slate-200/80 shadow-2xs shrink-0">
                  <MetricIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <div className="text-left">
                    <span className="text-xs sm:text-sm font-bold text-ink block leading-none">
                      {pillar.metric}
                    </span>
                    <span className="text-[9px] text-slate-500 font-medium leading-none">
                      {pillar.metricLabel}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          );
        })}
      </ScrollStack>
    </section>
  );
});

export default HaatStack;
