import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { AnimatedContent } from '../ui/AnimatedContent';

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
    question: 'How do you guarantee freshness for vegetables and farm dairy?',
    answer:
      'Local haat shopkeepers receive morning consignments directly from peri-urban farm mandis every single day at 5:30 AM. Because inventory turns over on physical store shelves throughout the day, nothing sits in artificial refrigerated warehousing for weeks. Shopkeepers personally inspect each tomato and seal your glass milk bottles.',
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
    <section id="faq" className="relative py-24 sm:py-32 bg-white overflow-hidden scroll-mt-16">
      {/* Background Soft Pastel Blob */}
      <div
        className="absolute top-1/3 -left-20 w-[550px] h-[550px] rounded-full masked-pastel-blob opacity-30 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, #D1FAE5 0%, #FEF08A 40%, rgba(255,255,255,0) 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-bold tracking-wide uppercase mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Got Questions?</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink tracking-tight">
            Frequently asked{' '}
            <span className="editorial-accent gradient-text-emerald">questions</span>
          </h2>

          <p className="mt-4 text-slate-600 text-sm sm:text-base">
            Everything you need to know about the hyperlocal haat ecosystem, whether you're a household
            or a generational merchant.
          </p>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'customers', label: 'For Shoppers' },
              { id: 'merchants', label: 'For Shopkeepers' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCategory === tab.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        </Reveal>

        {/* Accordions */}
        <AnimatedContent
          distance={30}
          direction="vertical"
          duration={0.7}
          stagger={0.05}
          threshold={0.1}
          className="space-y-3.5"
        >
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
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-base sm:text-lg text-ink">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-emerald-600 text-white rotate-180'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </AnimatedContent>

        {/* Support callout */}
        <div className="mt-12 p-6 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-ink">Still have questions?</div>
              <div className="text-xs text-slate-500">
                Chat with our neighborhood haat community team anytime.
              </div>
            </div>
          </div>
          <a
            href="mailto:support@onehaat.com"
            className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-ink hover:text-emerald-700 hover:border-emerald-300 transition-colors shadow-xs"
          >
            Contact Team →
          </a>
        </div>

      </div>
    </section>
  );
});
export default FAQSection;

