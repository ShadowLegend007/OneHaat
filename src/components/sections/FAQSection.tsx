import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { WaterGlassLink } from '../ui/WaterGlassButton';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'customers' | 'merchants';
}

const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'customers',
    question: 'How does OneHaat deliver in 20 minutes without cold dark stores?',
    answer:
      'Unlike traditional quick-commerce apps that store produce in massive suburban warehouses and dispatch across long congested routes, OneHaat only connects you to verified neighborhood shops within a 2.5 km radius. The shopkeeper hand-packs your bag immediately, and a local rider reaches your doorstep in 15–20 minutes.',
  },
  {
    id: 'faq-2',
    category: 'customers',
    question: 'Are product prices marked up compared to the store counter?',
    answer:
      'Never. We enforce 100% price parity. You pay the exact same counter shelf price that you would if you walked into the shop yourself. In addition, you receive the shop’s authentic printed GST retail bill inside your tote bag.',
  },
  {
    id: 'faq-3',
    category: 'customers',
    question: 'How do you guarantee freshness and authenticity for groceries and essentials?',
    answer:
      'Local haat shopkeepers and wholesale merchants stock genuine goods directly on physical store shelves with daily turnover. Nothing sits in artificial refrigerated warehousing for weeks. Shopkeepers personally inspect each item before packing your order.',
  },
  {
    id: 'faq-4',
    category: 'merchants',
    question: 'I am a local grocery shop owner. What does OneHaat charge me?',
    answer:
      'OneHaat charges 0% listing commission on your counter sales. You keep 100% of your retail margin. Payouts are settled automatically via direct UPI transfer the moment the customer accepts delivery. There is zero hardware purchase needed—our merchant app works on your existing Android or iPhone.',
  },
  {
    id: 'faq-5',
    category: 'customers',
    question: 'What if an item is out of stock or I am unhappy with produce ripeness?',
    answer:
      'If an item runs low, the shopkeeper calls or WhatsApps you directly to suggest an authentic alternative or adjustment. Furthermore, OneHaat offers a 100% instant refund guarantee on any produce that does not meet your household expectations, with zero questions asked.',
  },
  {
    id: 'faq-6',
    category: 'merchants',
    question: 'How long does it take for a new grocery store to go live?',
    answer:
      'Our neighborhood field onboarding partner visits your shop, provides a free QR scanner kit, and helps you digitize your top 200 items in less than 30 minutes. You can begin receiving neighborhood customer orders the exact same afternoon.',
  },
];

export const FAQSection: React.FC = React.memo(() => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<'all' | 'customers' | 'merchants'>('all');

  const filteredFaqs = useMemo(() => {
    if (activeCategory === 'all') return faqs;
    return faqs.filter((f) => f.category === activeCategory);
  }, [activeCategory]);

  const toggleFaq = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section
      id="faq"
      className="relative h-[calc(100dvh-4rem)] max-h-[calc(100dvh-4rem)] min-h-[560px] flex flex-col justify-center py-3 sm:py-5 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden scroll-mt-16 select-none"
    >
      {/* Background Soft Pastel Blob */}
      <div
        className="absolute top-1/3 -left-20 w-[500px] h-[500px] rounded-full masked-pastel-blob opacity-30 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, #D1FAE5 0%, #FEF08A 40%, rgba(255,255,255,0) 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center">
        
        {/* Desktop 2-Column Layout (>= lg) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 xl:gap-10 items-center">
          
          {/* Left Column (5 cols): Header, Filters & Support Card */}
          <div className="col-span-5 flex flex-col justify-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-[10px] xl:text-xs font-bold tracking-wide uppercase w-fit shadow-2xs">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Got Questions?</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl xl:text-4xl text-ink tracking-tight leading-tight">
              Frequently asked<br />
              <span className="editorial-accent gradient-text-emerald italic font-normal">questions.</span>
            </h2>

            <p className="text-slate-600 text-xs xl:text-sm leading-relaxed max-w-sm">
              Everything you need to know about the hyperlocal haat ecosystem, whether you're a household or a generational merchant.
            </p>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              {[
                { id: 'all', label: 'All Questions' },
                { id: 'customers', label: 'For Shoppers' },
                { id: 'merchants', label: 'For Shopkeepers' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    activeCategory === tab.id
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Support Callout Card */}
            <div className="pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-ink">Still have questions?</div>
                    <div className="text-[11px] text-slate-500">Chat with our community team.</div>
                  </div>
                </div>
                <WaterGlassLink
                  href="mailto:support@onehaat.com"
                  variant="clear"
                  size="sm"
                  className="rounded-xl shrink-0"
                >
                  Contact →
                </WaterGlassLink>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Scrollable Accordions */}
          <div className="col-span-7 max-h-[calc(100dvh-8rem)] overflow-y-auto pr-2 space-y-2.5">
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-slate-200/80 bg-white transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-emerald-300 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-bold text-sm xl:text-base text-ink">
                      {faq.question}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? 'bg-emerald-600 text-white rotate-180'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-4 pb-4 pt-1 text-slate-600 text-xs xl:text-sm leading-relaxed border-t border-slate-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet View (< lg): Compact 1-Screen Header + Scrollable Accordions */}
        <div className="lg:hidden flex flex-col justify-between h-full">
          {/* Mobile Header */}
          <div className="text-center shrink-0 pt-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-[10px] font-bold tracking-wide uppercase mb-1 shadow-2xs">
              <HelpCircle className="w-3 h-3 text-emerald-600" />
              <span>Got Questions?</span>
            </div>

            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-ink tracking-tight">
              Frequently asked <span className="editorial-accent gradient-text-emerald italic font-normal">questions.</span>
            </h2>

            {/* Mobile Category Tabs */}
            <div className="flex items-center justify-center gap-1.5 mt-2 flex-wrap">
              {[
                { id: 'all', label: 'All Questions' },
                { id: 'customers', label: 'For Shoppers' },
                { id: 'merchants', label: 'For Shopkeepers' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
                    activeCategory === tab.id
                      ? 'bg-emerald-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Scrollable Accordion Container */}
          <div className="flex-1 max-h-[calc(100dvh-13rem)] overflow-y-auto pr-1 my-2 space-y-2">
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className="rounded-xl border border-slate-200/80 bg-white transition-all shadow-2xs overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-3 text-left flex items-center justify-between gap-2.5 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-bold text-xs sm:text-sm text-ink">
                      {faq.question}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? 'bg-emerald-600 text-white rotate-180'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <ChevronDown className="w-3 h-3" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-3 pb-3 pt-1 text-slate-600 text-[11px] leading-relaxed border-t border-slate-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Mobile Bottom Contact Pill */}
          <div className="shrink-0 flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs">
            <span className="text-[11px] text-slate-600 font-medium">Have questions?</span>
            <a
              href="mailto:support@onehaat.com"
              className="text-[11px] font-bold text-emerald-700 hover:underline"
            >
              Contact Team →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
});

export default FAQSection;
