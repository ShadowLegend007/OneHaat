import React, { useState, useCallback } from 'react';
import { SmoothScroll } from './components/layout/SmoothScroll';
import { AmbientBackground } from './components/ui/AmbientBackground';
import { LiquidGlassIntro } from './components/intro/LiquidGlassIntro';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { AnimatedContent } from './components/ui/AnimatedContent';
import { ClickSpark } from './components/ui/ClickSpark';

// Critical Above-the-Fold Teaser Sections
import { Hero } from './components/sections/Hero';
import { VelocityMarquee } from './components/sections/VelocityMarquee';
import { ManifestoStatement } from './components/sections/ManifestoStatement';
import { HaatStack } from './components/sections/HaatStack';
import { PinnedJourney } from './components/sections/PinnedJourney';
import CommunityWall from './components/sections/CommunityWall';
import FAQSection from './components/sections/FAQSection';
import FinalCTA from './components/sections/FinalCTA';

export const App: React.FC = () => {
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => setIsIntroComplete(true), []);

  // Ensure every reload starts at the very top of the site
  React.useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <ClickSpark
      sparkColor={['#10B981', '#059669', '#34D399', '#F59E0B', '#3B82F6']}
      shape="line"
      sparkCount={9}
      sparkSize={15}
      sparkRadius={32}
      duration={550}
      easing="ease-out"
      glow={0.2}
      className="w-full min-h-screen"
    >
      <SmoothScroll>
        <div className="relative min-h-screen bg-white text-ink flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
          
          {/* Skip to main content accessibility link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl shadow-lg focus:outline-none"
          >
            Skip to main content
          </a>

          {/* Section 0: ReactDrops Liquid Glass Intro Reveal & Asset Preloader */}
          <LiquidGlassIntro onComplete={handleIntroComplete} />

          {/* Ambient Pastel Mesh & 3.5% Film Grain Overlay */}
          <AmbientBackground />

          {/* Section 1: Sleek Teaser Navbar */}
          <Navbar />

          {/* Main Content Flow: Teaser Site */}
          <main id="main-content" className="flex-1">
            {/* Section 2: Immersive 1-Screen Teaser Hero with Loaded Reveal Animation */}
            <ErrorBoundary>
              <Hero isLoaded={isIntroComplete} />
            </ErrorBoundary>

            {/* Section 3: Clean Scroll Velocity Marquee & Logo Loop with AnimatedContent */}
            <AnimatedContent distance={30} direction="vertical" duration={0.8} threshold={0.08}>
              <ErrorBoundary><VelocityMarquee /></ErrorBoundary>
            </AnimatedContent>

            {/* Section 4: The Vision Manifesto with Scroll Reveal Blur */}
            <AnimatedContent distance={40} direction="vertical" duration={0.85} threshold={0.08}>
              <ErrorBoundary>
                <ManifestoStatement />
              </ErrorBoundary>
            </AnimatedContent>

            {/* Section 5: The Hyperlocal Stack (ScrollStack 5 Pillars) */}
            <ErrorBoundary>
              <HaatStack />
            </ErrorBoundary>

            {/* Section 6: The 4-Step Conceptual Journey (Single Line Pills) */}
            <ErrorBoundary>
              <PinnedJourney />
            </ErrorBoundary>

            {/* Section 7: Community Voices & Trust Wall */}
            <AnimatedContent distance={40} direction="vertical" duration={0.85} threshold={0.08}>
              <ErrorBoundary><CommunityWall /></ErrorBoundary>
            </AnimatedContent>

            {/* Section 8: Frequently Asked Questions */}
            <AnimatedContent distance={40} direction="vertical" duration={0.85} threshold={0.08}>
              <ErrorBoundary><FAQSection /></ErrorBoundary>
            </AnimatedContent>

            {/* Section 9: VIP Early Access Pass & Launch Reservation Hub */}
            <AnimatedContent distance={40} direction="vertical" duration={0.85} threshold={0.08}>
              <ErrorBoundary><FinalCTA /></ErrorBoundary>
            </AnimatedContent>
          </main>

          {/* Editorial Teaser Footer with AnimatedContent */}
          <AnimatedContent distance={30} direction="vertical" duration={0.8} threshold={0.05}>
            <Footer />
          </AnimatedContent>
        </div>
      </SmoothScroll>
    </ClickSpark>
  );
};

export default App;
