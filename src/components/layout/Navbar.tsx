import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Bell } from 'lucide-react';

interface NavLinkItem {
  label: string;
  href: string;
  badge?: string;
}

const navLinks: NavLinkItem[] = [
  { label: 'The Vision', href: '#vision' },
  { label: 'Pillars', href: '#pillars' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Community', href: '#stories' },
  { label: 'FAQ', href: '#faq' },
];

export const Navbar: React.FC = React.memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);

          if (window.scrollY < 100) {
            setActiveSection('');
            ticking = false;
            return;
          }

          const sections = ['vision', 'pillars', 'how-it-works', 'stories', 'faq'];
          const current = sections.find((id) => {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              return rect.top <= 200 && rect.bottom >= 200;
            }
            return false;
          });
          if (current) setActiveSection(`#${current}`);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? 'bg-white/85 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
            : 'bg-white/60 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand Logo & Wordmark with Permanent Aspect Ratio (Zero CLS) */}
          <a
            href="#"
            className="flex items-center group outline-none focus:outline-none focus:ring-0 focus-visible:outline-none select-none py-1"
            aria-label="OneHaat Home"
          >
            <div className="relative h-11 sm:h-12 aspect-[688.5/459] flex items-center">
              <img
                src="/favicon.svg"
                alt="OneHaat — One Market. Every Need."
                width={72}
                height={48}
                className="h-11 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform"
                loading="eager"
              />
            </div>
          </a>

          {/* Desktop Navigation Links (Teaser Mode) */}
          <nav className="hidden md:flex items-center gap-2" aria-label="Desktop Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-emerald-800 bg-emerald-50 font-bold'
                      : 'text-slate-600 hover:text-ink hover:bg-slate-100/70'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="hidden md:flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/80">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Launching Soon</span>
            </div>
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Get Early Access</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:text-ink hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xl md:hidden px-6 py-6"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 text-sm font-semibold text-slate-700 hover:text-emerald-600"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                <a
                  href="#waitlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-center text-xs font-bold shadow-sm"
                >
                  Get Early Access
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

Navbar.displayName = 'Navbar';
