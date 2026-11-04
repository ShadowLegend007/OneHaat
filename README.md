# OneHaat 🌾

> **Hyperlocal Haats & Neighborhood Shops Delivered in 20 Minutes**

A modern, high-performance, single-page React 18 + Vite web application built with TypeScript, Tailwind CSS design tokens, GSAP + ScrollTrigger, Framer Motion, Lenis smooth scrolling, and Lucide icons.

---

## ⚡ Tech Stack

- **Framework**: React 18 + Vite (TypeScript)
- **Styling**: Tailwind CSS with design tokens defined once in `tailwind.config.js` and as CSS variables in `src/styles/globals.css` (with full Dark Mode support).
- **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis) driven from `gsap.ticker` and synchronized with `ScrollTrigger.update`.
- **Advanced Animations**:
  - **GSAP + ScrollTrigger** via `@gsap/react` `useGSAP` for scrubbed timelines, pinned sections, and parallax layers. Scoped with automatic cleanup under React StrictMode.
  - **Framer Motion (`motion`)** for magnetic button pull, component entrances, interactive cards, FAQ accordion, and testimonial carousel.
- **Icons**: `lucide-react`
- **Typography**: Self-hosted `@fontsource/plus-jakarta-sans`
- **Accessibility & Performance**:
  - Full `prefers-reduced-motion` detection and graceful degradation across all components.
  - Touch-device awareness (reduced parallax depth, disabled mouse follow).
  - Code-split below-the-fold sections with `React.lazy` and Rollup `manualChunks`.
  - WCAG AA contrast, keyboard navigation, and semantic HTML landmarks.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173/`.

### 3. Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 📂 Code Structure

```
src/
  ├── components/
  │   ├── layout/
  │   │   ├── Navbar.tsx         # Sticky glassmorphic navbar with dark mode toggle & mobile drawer
  │   │   ├── Footer.tsx         # Comprehensive footer with haat directory & newsletter
  │   │   └── SmoothScroll.tsx   # Lenis provider synced with GSAP ticker & ScrollTrigger
  │   ├── sections/
  │   │   ├── Hero.tsx            # Main hero with phone mockup, floating badges, ratings
  │   │   ├── Stats.tsx           # Platform impact counters (animated on scroll)
  │   │   ├── HowItWorks.tsx      # 3-step bazaar delivery journey
  │   │   ├── ForCustomers.tsx    # Customer value props & comparison with dark stores
  │   │   ├── ForShops.tsx        # Merchant empowerment & interactive revenue simulator
  │   │   ├── DeliveryJourney.tsx # 20-min scrubbed/interactive timeline (GSAP ScrollTrigger)
  │   │   ├── Testimonials.tsx    # Filterable customer/artisan/merchant carousel
  │   │   ├── FAQ.tsx             # Accessible accordion with category filters
  │   │   └── FinalCTA.tsx        # High-conversion download & merchant onboarding CTA
  │   └── ui/
  │       ├── Button.tsx          # Magnetic button with spring physics & touch fallbacks
  │       ├── Card.tsx            # Token-based cards with hover lift & glow
  │       ├── Counter.tsx         # Animated numerical count-up on scroll view
  │       ├── Accordion.tsx       # Accessible expandable FAQ panels (ARIA compliant)
  │       ├── PhoneMockup.tsx     # Realistic smartphone UI with interactive tabs
  │       ├── ParallaxLayer.tsx   # Reusable GSAP ScrollTrigger parallax component
  │       └── Reveal.tsx          # Reusable scroll-reveal motion wrapper
  ├── hooks/
  │   ├── useReducedMotion.ts     # Detects user/OS reduced motion preference
  │   ├── useMouseParallax.ts     # Normalized cursor tracking with touch dampening
  │   └── useMediaQuery.ts        # Dynamic reactive CSS media query matcher
  ├── data/
  │   ├── content.ts              # Single source of truth for all copy, metrics, FAQs
  │   └── content.js              # Re-export for flexible JS/TS imports
  ├── styles/
  │   └── globals.css             # Design tokens, CSS variables, dark mode, typography
  ├── App.tsx                     # Main page orchestrator with code-splitting
  └── main.tsx                    # React 18 root mounting
```

---

## 🎨 How to Customize

### 1. Brand Colours & Design Tokens
All color tokens and radii are defined once as CSS variables in `src/styles/globals.css` and mapped to Tailwind in `tailwind.config.js`.

- **Light & Dark Mode Variables** (`src/styles/globals.css`):
  ```css
  :root {
    --primary: #EA580C;       /* Saffron orange */
    --secondary: #059669;     /* Fresh emerald */
    --accent: #D97706;        /* Warm amber */
    --bg-primary: #FDFBF7;    /* Warm rice paper tone */
    --radius-lg: 1rem;
  }

  .dark {
    --primary: #F97316;
    --secondary: #10B981;
    --bg-primary: #0F0D0C;
  }
  ```
- **Tailwind Palette** (`tailwind.config.js`):
  Modify or add custom color scales under `theme.extend.colors.haat`.

---

### 2. Typography & Fonts
The project uses self-hosted `@fontsource/plus-jakarta-sans`.
To change the font family:
1. Install your desired font package:
   ```bash
   npm install @fontsource/outfit
   ```
2. Replace imports in `src/styles/globals.css`:
   ```css
   @import '@fontsource/outfit/400.css';
   @import '@fontsource/outfit/600.css';
   @import '@fontsource/outfit/700.css';
   ```
3. Update `fontFamily.sans` in `tailwind.config.js`:
   ```javascript
   fontFamily: {
     sans: ['"Outfit"', 'system-ui', 'sans-serif'],
   }
   ```

---

### 3. Copy, Metrics & FAQs
All text is separated into `src/data/content.ts` (and `src/data/content.js`). You can edit headings, partner stories, FAQ items, or statistics without touching a single component:

- `siteContent.hero`: Main headline, subtitles, and CTA copy.
- `siteContent.stats`: Impact figures and descriptions.
- `siteContent.forShops`: Commission perks, merchant stories, and benefits.
- `siteContent.faq`: Question list and category tags.
- `siteContent.testimonials`: Community reviews and ratings.

---

### 4. Tuning Animation Speeds

#### A. Lenis Smooth Scroll
In `src/components/layout/SmoothScroll.tsx`:
```typescript
const lenis = new Lenis({
  duration: 1.15, // Increase for slower/smoother glide, decrease for snappier feel
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  wheelMultiplier: 1.0, // Wheel scroll multiplier
  touchMultiplier: 1.5,
});
```

#### B. GSAP Parallax (`ParallaxLayer`)
Use the `speed` prop (positive for downward lag, negative for upward lead) and `direction` prop:
```tsx
<ParallaxLayer speed={0.25} direction="up">
  <YourElement />
</ParallaxLayer>
```
On touch screens, `ParallaxLayer` automatically reduces travel distance by 60% to prevent scroll jitter.

#### C. Magnetic Button Pull
In `src/components/ui/Button.tsx`:
- Adjust the sensitivity factor `deltaX = (clientX - centerX) * 0.22` (lower = subtler pull).
- Modify the Framer Motion spring: `transition: { type: 'spring', damping: 15, stiffness: 220 }`.

#### D. Scroll Reveal Transitions
In `src/components/ui/Reveal.tsx`:
```tsx
<Reveal duration={0.6} delay={0.2} distance={32} direction="up">
  <Content />
</Reveal>
```

---

## ♿ Accessibility & Motion Compliance

- **`prefers-reduced-motion`**: Handled via `useReducedMotion()`. When enabled:
  - Lenis smooth scrolling is completely disabled; standard browser scrolling is used.
  - GSAP timelines and parallax layers are neutralized.
  - Framer Motion transitions render at 0ms.
- **Interactive Controls**: All buttons and accordion triggers have `:focus-visible` outline rings, ARIA roles (`role="region"`, `aria-expanded`, `aria-controls`), and keyboard enter/spacebar activation.
- **Screen Reader Support**: Includes a hidden "Skip to main content" skip-link at the top of the DOM.

---

## 📦 License
MIT © 2026 OneHaat Technologies.
