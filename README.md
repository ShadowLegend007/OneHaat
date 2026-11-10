# OneHaat Web Platform

> Autonomous Hyperlocal Commerce Platform — Fresh Groceries, Essentials, and Counter-Shelf Integrity.

OneHaat is a modern single-page web application engineered with React 18, TypeScript, Tailwind CSS, WebGL shader pipelines, GSAP ScrollTrigger, Lenis smooth scrolling, and a secure serverless reservation architecture.

---

## Architecture Overview

```
Client Browser (React 18 + Vite SPA)
│
├── WebGL Liquid Glass Shader Canvas (Custom GLSL Raymarching)
├── Lenis Smooth Scroll Engine (GSAP Ticker Synchronized)
├── GSAP ScrollTrigger Choreographed Sections
└── Framer Motion Micro-Interactions
       │
       ▼ [POST /api/reserve]
Vercel Serverless Function (Node.js 20)
       │
       ▼ [Direct SMTP SSL Port 465]
Google Mail Infrastructure (smtp.gmail.com)
       ├── Applicant: Glassmorphic VIP Pass Confirmation (with Inline CID Brand Logo)
       └── Operations Team: Real-Time Waitlist Lead Notification
```

---

## Core Technologies

- **UI Framework**: React 18 with Vite
- **Language**: TypeScript 5.7 (Strict Mode)
- **Styling Architecture**: Tailwind CSS with custom design tokens and dynamic CSS variables
- **Motion and Choreography**:
  - **GSAP 3 + ScrollTrigger**: Pinned scrubbed timelines, layered parallax, and progress tracking
  - **Framer Motion**: Spring physics, water-glass button specular effects, card tilt, and interactive accordions
  - **Lenis**: Momentum-based inertial scrolling integrated directly into the GSAP ticker
- **WebGL Shader Pipeline**: Custom fragment and vertex shaders delivering real-time glass refraction and chromatic dispersion
- **Icons**: Lucide Icons
- **Transactional Communication**: Direct Gmail SMTP Transport via Nodemailer (Port 465 SSL)

---

## Brand Design Tokens and Color Palette

The platform visual language uses a high-contrast ink foundation paired with vibrant emerald botanical tones and warm saffron market accents:

| Token Name | Hex Code | Visual Application |
| :--- | :--- | :--- |
| **Brand Emerald** | `#059669` | Primary CTA, verified badges, active brand highlights |
| **Brand Teal** | `#0D9488` | Atmospheric gradients, hero specular accents |
| **Brand Mint** | `#10B981` | Accent strokes, success states, subtle glows |
| **Market Saffron** | `#F59E0B` | Counter price comparison accents, delivery highlights |
| **Market Amber** | `#D97706` | Secondary warnings, active notification tags |
| **Ink Deep** | `#020617` | High-contrast dark backgrounds |
| **Ink Primary** | `#0F172A` | Core typography, headlines, primary borders |
| **Surface Subtle** | `#F8FAFC` | Background layers, card recesses |
| **Pastel Mint** | `#ECFDF5` | Frosted pill badges, glass table highlights |

---

## File System Structure

```
OneHaat/
├── api/
│   └── reserve.ts                    # Serverless endpoint for VIP Early Access reservations
├── public/
│   ├── Apple-Store.png               # Official App Store download badge
│   ├── Google-play.png               # Official Google Play store badge
│   ├── early-access-pass-render.svg  # Vector rendering of the VIP Early Access card
│   ├── favicon.svg                   # Vector brand favicon
│   ├── logo.png                      # High-resolution raster brand mark (CID email asset)
│   └── logo.svg                      # Master vector brand emblem
├── src/
│   ├── components/
│   │   ├── intro/
│   │   │   └── LiquidGlassIntro.tsx  # Initial loading screen with WebGL glass logo animation
│   │   ├── layout/
│   │   │   ├── Footer.tsx            # Global site footer, legal links, and haat directory
│   │   │   ├── Navbar.tsx            # Sticky frosted navbar with progressive section tracking
│   │   │   └── SmoothScroll.tsx      # Lenis smooth-scroll provider bound to GSAP ticker
│   │   ├── sections/
│   │   │   ├── Hero.tsx              # Viewport-height landing hero with 3D device showcase
│   │   │   ├── CommunityWall.tsx     # Real-world testimonials from grocers and residents
│   │   │   ├── PinnedJourney.tsx     # Full-viewport GSAP-pinned 10-minute delivery timeline
│   │   │   ├── PriceComparison.tsx   # Interactive counter-shelf vs. dark store price audit
│   │   │   ├── WhyOneHaat.tsx        # Four core pillars of neighborhood retail empowerment
│   │   │   ├── FAQSection.tsx        # Filterable, accessible accordion for customer queries
│   │   │   └── FinalCTA.tsx          # High-conversion reservation form with 3D glass card tilt
│   │   └── ui/
│   │       ├── Button.tsx            # Base button component with hover feedback
│   │       ├── WaterGlassButton.tsx  # Multi-layer specular glass button with shine animation
│   │       ├── ClickSpark.tsx        # Pointer interaction spark effect
│   │       ├── ParallaxWrapper.tsx   # Touch-aware scroll parallax container
│   │       ├── ScrollReveal.tsx      # Intersection-observer motion reveal wrapper
│   │       └── liquid-glass-logo-*   # GLSL shaders and WebGL renderer for refraction effects
│   ├── data/
│   │   ├── content.ts                # Centralized content repository for copy, metrics, and FAQs
│   │   └── content.js                # CommonJS compatibility re-export
│   ├── hooks/
│   │   ├── useReducedMotion.ts       # Detects OS accessibility motion preferences
│   │   ├── useMouseParallax.ts       # Mathematical 3D card tilt tracking normalized to viewport
│   │   └── useMediaQuery.ts          # Reactive CSS media query observer
│   ├── styles/
│   │   └── globals.css               # Design tokens, CSS variables, typography, and utility classes
│   ├── App.tsx                       # Main single-page application orchestrator
│   └── main.tsx                      # Application bootstrap and React DOM mount
├── .env                              # Local environment variables (gitignored)
├── .env.example                      # Template for required environment variables
├── package.json                      # Project dependencies, scripts, and engine specifications
├── tailwind.config.js                # Design token mapping and extended theme definitions
├── tsconfig.json                     # TypeScript compiler configuration
└── vite.config.ts                    # Vite build pipeline and local development middleware
```

---

## Animation Systems

### 1. WebGL Liquid Glass Shader
- Utilizes custom GLSL fragment shaders with screen-space refraction, chromatic aberration, and specular normal mapping.
- Automatically handles device pixel ratios and reduces canvas resolution on low-power mobile GPUs.

### 2. Lenis Momentum Scroll Engine
- Driven through `gsap.ticker` to eliminate frame competition between scroll calculation and CSS transforms.
- Intercepts scroll inputs with an exponential decay curve `(1 - Math.pow(2, -10 * t))` for fluid, inertial motion.
- Degrades gracefully to native scroll when `prefers-reduced-motion` is detected.

### 3. GSAP Pinned Delivery Journey
- Employs `ScrollTrigger.create({ pin: true, scrub: 0.5 })` to lock the viewport while scrubbed steps animate sequentially:
  - Step 1: Digital order routing to the verified neighborhood haat.
  - Step 2: Merchant picking and printed GST bill generation.
  - Step 3: Colony-radius dispatch within a 2.5 km boundary.
  - Step 4: Doorstep handover at an average time of 9 minutes and 59 seconds.

### 4. Water-Glass Specular Surface Interaction
- Elements using `WaterGlassButton` feature twin inset highlight shadows, a linear specular top-shine gradient, and a translation shimmer pass triggered on pointer hover.

---

## Early Access Reservation API (`/api/reserve`)

The reservation system operates as a zero-dependency serverless function deployed on Vercel, with local dev emulation inside Vite middleware.

### Endpoint Specification
- **Method**: `POST`
- **Path**: `/api/reserve`
- **Content-Type**: `application/json`

### Request Payload
```json
{
  "email": "applicant@example.com"
}
```

### Response Schema
```json
{
  "success": true,
  "message": "VIP early access pass reserved",
  "userName": "Applicant",
  "userHandle": "applicant",
  "userDeliveryStatus": "sent",
  "userDeliveryError": null
}
```

### Transactional Email Pipeline
1. **Applicant Confirmation**:
   - Sent from `"OneHaat" <access.onehaat@gmail.com>`.
   - Incorporates responsive glassmorphic HTML card styling, reservation tier details, and assigned vanity handle.
   - Includes official brand mark attached via Content-ID (`cid:onehaat-logo`) to guarantee immediate rendering without remote content blocks.
2. **Operations Team Alert**:
   - Dispatched immediately to `access.onehaat@gmail.com`.
   - Sets `replyTo` directly to the applicant's email address for one-click communication.

---

## Getting Started

### Prerequisites
- Node.js version 18 or higher
- npm package manager

### 1. Clone and Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the project root:
```env
# Gmail SMTP Credentials
GMAIL_USER=access.onehaat@gmail.com
GMAIL_APP_PASSWORD=your_16_char_app_password
EMAIL_FROM_NAME=OneHaat

# Administrative Alert Destination
CONTACT_EMAIL=access.onehaat@gmail.com
VITE_CONTACT_EMAIL=access.onehaat@gmail.com
```

### 3. Launch Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser. The Vite server includes the local `/api/reserve` middleware.

### 4. Production Build
```bash
npm run build
npm run preview
```

---

## Production Deployment (Vercel)

1. Push your repository to GitHub or GitLab.
2. Import the project in the [Vercel Dashboard](https://vercel.com).
3. Under **Project Settings -> Environment Variables**, configure:
   - `GMAIL_USER`: `access.onehaat@gmail.com`
   - `GMAIL_APP_PASSWORD`: Your 16-character Google App Password
   - `EMAIL_FROM_NAME`: `OneHaat`
   - `CONTACT_EMAIL`: `access.onehaat@gmail.com`
4. Deploy. Vercel automatically deploys the frontend assets to the edge network and hosts `/api/reserve` as a Node.js serverless function.

---

## License

Copyright 2026 OneHaat Technologies Pvt. Ltd. All rights reserved.
