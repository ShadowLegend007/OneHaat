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
  Boxes,
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
  metricShortLabel: string;
  metricIcon: React.ElementType;
  tags: string[];
  gradient: string;
}

const pillars: PillarCard[] = [
  {
    id: 'pillar-1',
    badge: 'Direct Wholesale Rates',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    icon: Boxes,
    title: 'Direct Wholesale & Bulk Supply',
    subtitle: 'Mandi & bulk rates without corporate middleman markups',
    description:
      'Skip inflated retail distributor chains and expensive dark-store commissions. OneHaat connects you straight to wholesale merchants and bulk depots, unlocking genuine wholesale counter pricing on daily kitchen staples, household supplies, and bulk provisions.',
    metric: 'Wholesale Rates',
    metricLabel: 'Direct counter procurement at authentic wholesale pricing',
    metricShortLabel: 'Wholesale Counter Rates',
    metricIcon: TrendingDown,
    tags: ['Wholesale Counter', 'Zero Middlemen', 'Bulk & Daily Savings'],
    gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent'
  },
  {
    id: 'pillar-2',
    badge: '100% Counter Price Parity',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200/80',
    icon: Tag,
    title: 'Counter-Shelf Honest Pricing',
    subtitle: 'No silent 25% inflation or shadow cart markups',
    description:
      'Corporate quick-commerce apps quietly inflate base prices by ₹15 to ₹50 on essential groceries to fund their warehouse rents. At OneHaat, you pay the exact shelf retail price with an authentic printed GST bill in every bag.',
    metric: '₹2,400',
    metricLabel: 'Average monthly household savings on staples',
    metricShortLabel: 'Avg. Household Savings',
    metricIcon: TrendingDown,
    tags: ['Zero Markups', 'Printed GST Bill', 'Fair Margins'],
    gradient: 'from-amber-500/10 via-orange-500/5 to-transparent'
  },
  {
    id: 'pillar-3',
    badge: 'Shopkeeper Hand-Checked',
    badgeColor: 'bg-sky-50 text-sky-800 border-sky-200/80',
    icon: ShieldCheck,
    title: 'Inspected by the Merchant You Know',
    subtitle: 'No robotic barcode sorting or bruised tomatoes',
    description:
      "Your colony's trusted grocer personally inspects every vegetable, tests the firmness of produce, and hand-packs your order into eco-friendly OneHaat jute bags sealed with tamper-evident hygiene tags.",
    metric: '99.4%',
    metricLabel: 'First-time produce quality satisfaction score',
    metricShortLabel: 'Quality Satisfaction',
    metricIcon: CheckCircle2,
    tags: ['Personal Selection', 'WhatsApp Check-in', 'Eco Jute Bags'],
    gradient: 'from-sky-500/10 via-blue-500/5 to-transparent'
  },
  {
    id: 'pillar-4',
    badge: 'Dedicated 2.5km Radius',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200/80',
    icon: Zap,
    title: '9 Min 59 Sec Average Delivery',
    subtitle: 'Colony-based riders who know your building and lane',
    description:
      'Because orders never cross chaotic ring roads or heavy bridges, your delivery arrives in an average of 9 minutes 59 seconds before your tea cools down. Dedicated local riders earn fair, respectful wages without highway burnout.',
    metric: '9m 59s',
    metricLabel: 'Average colony dispatch to doorstep delivery time',
    metricShortLabel: 'Avg. Delivery Time',
    metricIcon: Clock,
    tags: ['2.5 km Radius', 'Colony Eco-Riders', 'Zero Highway Traffic'],
    gradient: 'from-indigo-500/10 via-purple-500/5 to-transparent'
  },
  {
    id: 'pillar-5',
    badge: 'Empowering Small Business',
    badgeColor: 'bg-rose-50 text-rose-800 border-rose-200/80',
    icon: Store,
    title: '0% Listing Commission Guarantee',
    subtitle: "Supporting the heartbeat of India's retail economy",
    description:
      'We believe tech should empower local entrepreneurs, not extract from them. OneHaat charges ₹0 listing commission to family-run stores, settling UPI payments instantly the moment your delivery is handed over.',
    metric: '₹0 Cut',
    metricLabel: '100% margin retention for neighborhood grocers',
    metricShortLabel: '100% Margin Retention',
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
              itemClassName={`rounded-3xl bg-gradient-to-br ${pillar.gradient} bg-white border border-slate-200/90 shadow-[0_18px_45px_rgba(15,23,42,0.08)] p-5 sm:p-7 flex flex-col justify-between`}
            >
              <div>
                {/* Top Header Row: Icon + Pillar Pill on Left, Badge on Right */}
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white shadow-2xs border border-slate-200/80 flex items-center justify-center text-emerald-700 shrink-0">
                      <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-extrabold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/70">
                      Pillar 0{index + 1}
                    </span>
                  </div>

                  <span className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold border tracking-wide uppercase shrink-0 shadow-2xs ${pillar.badgeColor}`}>
                    {pillar.badge}
                  </span>
                </div>

                {/* Title & Subtitle: Full Width, No Awkward Word Breaks */}
                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-ink leading-tight mt-2.5 mb-1">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-emerald-800/90 mb-2">
                  {pillar.subtitle}
                </p>

                {/* Description: Natural 2-Sentence Flow (No Truncation) */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                  {pillar.description}
                </p>
              </div>

              {/* Bottom Metadata & Metric Row: Responsive Flex */}
              <div className="pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-auto">
                {/* Horizontal Feature Tags with Green Indicator Dots */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  {pillar.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg bg-slate-100/90 text-slate-700 text-[11px] sm:text-xs font-semibold border border-slate-200/60"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Highlight Metric Pill with Compact Label */}
                <div className="inline-flex items-center gap-2.5 bg-white/95 px-3.5 py-1.5 sm:py-2 rounded-xl border border-slate-200/90 shadow-2xs shrink-0 self-start sm:self-auto">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100/80">
                    <MetricIcon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs sm:text-sm font-extrabold text-ink block leading-none">
                      {pillar.metric}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium leading-none block mt-1">
                      {pillar.metricShortLabel}
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
