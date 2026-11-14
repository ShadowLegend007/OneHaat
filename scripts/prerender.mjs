import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html not found. Run vite build first.');
  process.exit(1);
}

console.log('Starting build-time prerender and SEO artifact generation...');

// Full semantic HTML representation of the OneHaat public experience for search engines, AI Overviews, and non-JS crawlers
const prerenderedBody = `
<div class="relative min-h-screen bg-white text-ink flex flex-col font-sans">
  <!-- Accessibility skip link -->
  <a href="#main-content" class="sr-only">Skip to main content</a>

  <!-- Header & Navigation -->
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-xl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <a href="/" class="flex items-center" aria-label="OneHaat Home">
        <img src="/favicon.svg" alt="OneHaat — One Market. Every Need." width="72" height="48" class="h-11 w-auto" />
      </a>
      <nav aria-label="Desktop Navigation" class="hidden md:flex items-center gap-2">
        <a href="#vision" class="px-3 py-1.5 text-xs font-semibold text-slate-600">The Vision</a>
        <a href="#pillars" class="px-3 py-1.5 text-xs font-semibold text-slate-600">Pillars</a>
        <a href="#how-it-works" class="px-3 py-1.5 text-xs font-semibold text-slate-600">How It Works</a>
        <a href="#stories" class="px-3 py-1.5 text-xs font-semibold text-slate-600">Community</a>
        <a href="#faq" class="px-3 py-1.5 text-xs font-semibold text-slate-600">FAQ</a>
        <a href="#waitlist" class="px-4 py-2 text-xs font-bold bg-emerald-600 text-white rounded-xl">Get Early Access</a>
      </nav>
    </div>
  </header>

  <!-- Main Content Flow -->
  <main id="main-content" class="flex-1">
    
    <!-- Hero Section -->
    <section id="hero" class="relative pt-24 pb-12 flex flex-col items-center justify-center bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            One Step Ahead for Your Everyday Needs
          </div>
          <h1 class="font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-tight">
            Your Trusted Store, <span class="text-emerald-600 italic">Now at Your Doorstep.</span>
          </h1>
          <p class="text-slate-600 text-base sm:text-lg max-w-xl">
            OneHaat brings your generational neighborhood grocer, spice mill, and fresh haat online. Direct counter-shelf honest pricing, zero dark-store markups, and an average 9m 59s delivery radius.
          </p>
          <div class="flex flex-wrap items-center gap-3 pt-2">
            <a href="#waitlist" class="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-md">Get VIP Early Access</a>
            <a href="#how-it-works" class="px-6 py-3 border border-slate-300 text-slate-800 font-semibold rounded-xl">See How It Works</a>
          </div>
          <div class="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-700">
            <span class="px-3 py-1 rounded-full bg-slate-100">9 Min 59 Sec Avg. Delivery</span>
            <span class="px-3 py-1 rounded-full bg-slate-100">Direct Store Shelves</span>
            <span class="px-3 py-1 rounded-full bg-slate-100">Zero Hidden Markup</span>
          </div>
        </div>
        <div class="lg:col-span-6 flex items-center justify-center">
          <img src="/hero-character-mockup.svg" alt="OneHaat instant delivery mobile app with trusted local neighborhood grocery delivery in Bengaluru" width="801" height="782" class="w-full max-w-md h-auto" />
        </div>
      </div>
    </section>

    <!-- Vision Manifesto Section -->
    <section id="vision" class="py-20 bg-slate-50 text-center">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-xs uppercase tracking-widest text-emerald-800 font-bold mb-4">Our Core Conviction</h2>
        <blockquote class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-snug">
          "Every neighbourhood already has a store it trusts. We didn’t replace them with cold dark warehouses. We just brought them online."
        </blockquote>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12">
          <div>
            <div class="text-3xl font-extrabold text-emerald-600">1,420+</div>
            <div class="text-xs font-bold text-slate-800">Local Haat Partners</div>
            <div class="text-xs text-slate-500">Verified family grocers</div>
          </div>
          <div>
            <div class="text-3xl font-extrabold text-emerald-600">9m 59s</div>
            <div class="text-xs font-bold text-slate-800">Average Delivery</div>
            <div class="text-xs text-slate-500">Faster than warehouse prep</div>
          </div>
          <div>
            <div class="text-3xl font-extrabold text-emerald-600">₹0</div>
            <div class="text-xs font-bold text-slate-800">Listing Commission</div>
            <div class="text-xs text-slate-500">Fair to honest shopkeepers</div>
          </div>
          <div>
            <div class="text-3xl font-extrabold text-emerald-600">100%</div>
            <div class="text-xs font-bold text-slate-800">Counter Shelf Stock</div>
            <div class="text-xs text-slate-500">Inspected by the shopkeeper</div>
          </div>
        </div>
      </div>
    </section>

    <!-- The Hyperlocal Stack (Pillars) -->
    <section id="pillars" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <div class="text-xs uppercase tracking-widest text-emerald-800 font-bold mb-2">Our Operating Architecture</div>
          <h2 class="text-3xl font-extrabold text-slate-900">The 5 Pillars of OneHaat</h2>
          <p class="text-slate-600 text-sm sm:text-base mt-2">Built from the ground up to protect neighborhood retail while giving families lightning-fast convenience.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-6 rounded-2xl border border-slate-200 bg-slate-50">
            <h3 class="text-lg font-bold text-slate-900 mb-2">01. Hyperlocal Cluster Routing</h3>
            <p class="text-sm text-slate-600">Orders are routed strictly within a 2.5 km colony perimeter to eliminate transit bottlenecks.</p>
          </div>
          <div class="p-6 rounded-2xl border border-slate-200 bg-slate-50">
            <h3 class="text-lg font-bold text-slate-900 mb-2">02. Zero Dark-Store Markup</h3>
            <p class="text-sm text-slate-600">100% price parity with printed GST bills directly from local shopkeepers.</p>
          </div>
          <div class="p-6 rounded-2xl border border-slate-200 bg-slate-50">
            <h3 class="text-lg font-bold text-slate-900 mb-2">03. Direct Counter Selection</h3>
            <p class="text-sm text-slate-600">Produce and daily staples are hand-packed directly from authentic counter shelves with daily inventory turnover.</p>
          </div>
          <div class="p-6 rounded-2xl border border-slate-200 bg-slate-50">
            <h3 class="text-lg font-bold text-slate-900 mb-2">04. Colony-Radius Delivery Fleet</h3>
            <p class="text-sm text-slate-600">Dedicated local neighborhood riders deliver in an average of 9 minutes and 59 seconds.</p>
          </div>
          <div class="p-6 rounded-2xl border border-slate-200 bg-slate-50 md:col-span-2">
            <h3 class="text-lg font-bold text-slate-900 mb-2">05. Merchant Profit Sovereignty</h3>
            <p class="text-sm text-slate-600">0% listing commissions, instant UPI daily settlements, and total preservation of merchant-customer relationships.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4-Step Journey -->
    <section id="how-it-works" class="py-20 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <div class="text-xs uppercase tracking-widest text-emerald-800 font-bold mb-2">Simple Ordering Process</div>
          <h2 class="text-3xl font-extrabold text-slate-900">From shelf to doorstep in 4 simple steps.</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="p-6 rounded-2xl bg-white border border-slate-200">
            <div class="text-xs font-bold text-emerald-700 uppercase mb-1">Step 01</div>
            <h3 class="text-base font-bold text-slate-900 mb-2">Discover Local Haats</h3>
            <p class="text-xs text-slate-600">Browse live shelves from verified neighborhood family grocers and specialty mills in your locality.</p>
          </div>
          <div class="p-6 rounded-2xl bg-white border border-slate-200">
            <div class="text-xs font-bold text-emerald-700 uppercase mb-1">Step 02</div>
            <h3 class="text-base font-bold text-slate-900 mb-2">Counter-Shelf Packing</h3>
            <p class="text-xs text-slate-600">The trusted merchant personally inspects and packs your order in an eco-friendly tote bag.</p>
          </div>
          <div class="p-6 rounded-2xl bg-white border border-slate-200">
            <div class="text-xs font-bold text-emerald-700 uppercase mb-1">Step 03</div>
            <h3 class="text-base font-bold text-slate-900 mb-2">Colony Radius Dispatch</h3>
            <p class="text-xs text-slate-600">A local neighborhood rider picks up your bag with zero warehouse sorting delays.</p>
          </div>
          <div class="p-6 rounded-2xl bg-white border border-slate-200">
            <div class="text-xs font-bold text-emerald-700 uppercase mb-1">Step 04</div>
            <h3 class="text-base font-bold text-slate-900 mb-2">Doorstep in 9m 59s</h3>
            <p class="text-xs text-slate-600">Your groceries arrive fresh at counter-shelf pricing with an authentic printed GST receipt.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Community Wall -->
    <section id="stories" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <div class="text-xs uppercase tracking-widest text-emerald-800 font-bold mb-2">Community Stories</div>
          <h2 class="text-3xl font-extrabold text-slate-900">Built on the trust of our neighbourhood haats.</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div class="text-amber-500 text-sm mb-2">★★★★★</div>
            <p class="text-sm text-slate-700 italic mb-4">"Zero dark-store markups and 100% genuine counter bill. My family has shopped from Gupta Provisions for 15 years; now we get it in 10 minutes."</p>
            <div class="text-xs font-bold text-slate-900">Pooja Varma</div>
            <div class="text-[11px] text-slate-500">Resident, Indiranagar</div>
          </div>
          <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div class="text-amber-500 text-sm mb-2">★★★★★</div>
            <p class="text-sm text-slate-700 italic mb-4">"When dark stores opened, our walk-in footfall dropped. OneHaat brought our families back with 0% commission and instant UPI settlements."</p>
            <div class="text-xs font-bold text-slate-900">Ramesh Gupta</div>
            <div class="text-[11px] text-slate-500">Store Owner, Gupta Provisions</div>
          </div>
          <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div class="text-amber-500 text-sm mb-2">★★★★★</div>
            <p class="text-sm text-slate-700 italic mb-4">"The aroma of stone-ground spices from Annapurna Mills is night and day compared to generic warehouse bags. OneHaat preserves the soul of local bazaars."</p>
            <div class="text-xs font-bold text-slate-900">Dr. Arindam Sen</div>
            <div class="text-[11px] text-slate-500">Koramangala 4th Block</div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="py-20 bg-slate-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <div class="text-xs uppercase tracking-widest text-emerald-800 font-bold mb-2">Got Questions?</div>
          <h2 class="text-3xl font-extrabold text-slate-900">Frequently asked questions.</h2>
        </div>
        <div class="space-y-4">
          <div class="p-5 rounded-2xl bg-white border border-slate-200">
            <h3 class="text-base font-bold text-slate-900 mb-2">How does OneHaat deliver in 9 minutes 59 seconds without cold dark stores?</h3>
            <p class="text-sm text-slate-600">Unlike traditional quick-commerce apps that store produce in massive suburban warehouses and dispatch across long congested routes, OneHaat only connects you to verified neighborhood shops within a 2.5 km radius. The shopkeeper hand-packs your bag immediately, and a local rider reaches your doorstep in an average of 9 minutes 59 seconds.</p>
          </div>
          <div class="p-5 rounded-2xl bg-white border border-slate-200">
            <h3 class="text-base font-bold text-slate-900 mb-2">Are product prices marked up compared to the store counter?</h3>
            <p class="text-sm text-slate-600">Never. We enforce 100% price parity. You pay the exact same counter shelf price that you would if you walked into the shop yourself. In addition, you receive the shop’s authentic printed GST retail bill inside your tote bag.</p>
          </div>
          <div class="p-5 rounded-2xl bg-white border border-slate-200">
            <h3 class="text-base font-bold text-slate-900 mb-2">How do you guarantee freshness and authenticity for groceries and essentials?</h3>
            <p class="text-sm text-slate-600">Local haat shopkeepers and wholesale merchants stock genuine goods directly on physical store shelves with daily turnover. Nothing sits in artificial refrigerated warehousing for weeks. Shopkeepers personally inspect each item before packing your order.</p>
          </div>
          <div class="p-5 rounded-2xl bg-white border border-slate-200">
            <h3 class="text-base font-bold text-slate-900 mb-2">I am a local grocery shop owner. What does OneHaat charge me?</h3>
            <p class="text-sm text-slate-600">OneHaat charges 0% listing commission on your counter sales. You keep 100% of your retail margin. Payouts are settled automatically via direct UPI transfer the moment the customer accepts delivery. There is zero hardware purchase needed—our merchant app works on your existing Android or iPhone.</p>
          </div>
          <div class="p-5 rounded-2xl bg-white border border-slate-200">
            <h3 class="text-base font-bold text-slate-900 mb-2">What if an item is out of stock or I am unhappy with produce ripeness?</h3>
            <p class="text-sm text-slate-600">If an item runs low, the shopkeeper calls or WhatsApps you directly to suggest an authentic alternative or adjustment. Furthermore, OneHaat offers a 100% instant refund guarantee on any produce that does not meet your household expectations, with zero questions asked.</p>
          </div>
          <div class="p-5 rounded-2xl bg-white border border-slate-200">
            <h3 class="text-base font-bold text-slate-900 mb-2">How long does it take for a new grocery store to go live?</h3>
            <p class="text-sm text-slate-600">Our neighborhood field onboarding partner visits your shop, provides a free QR scanner kit, and helps you digitize your top 200 items in less than 30 minutes. You can begin receiving neighborhood customer orders the exact same afternoon.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Waitlist / VIP Reservation Section -->
    <section id="waitlist" class="py-20 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Claim Your VIP Early Access Pass.</h2>
        <p class="text-slate-600 text-base max-w-xl mx-auto mb-8">
          We are rolling out colony by colony across Bengaluru. Reserve your spot today for exclusive beta access and claim your unique username before public launch.
        </p>
        <form class="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <input type="email" placeholder="Enter your email address" required class="flex-1 px-4 py-3 border border-slate-300 rounded-xl" />
          <button type="submit" class="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-md">Reserve Access</button>
        </form>
        <p class="text-xs text-slate-400 mt-4">Zero spam. Contact: <a href="mailto:access.onehaat@gmail.com" class="text-emerald-700 underline font-semibold">access.onehaat@gmail.com</a></p>
      </div>
    </section>

  </main>

  <!-- Footer -->
  <footer class="bg-slate-900 text-slate-400 py-12 text-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <div class="text-white font-bold text-sm mb-1">OneHaat Technologies Pvt. Ltd.</div>
        <div>One Market. Every Need. | Contact: access.onehaat@gmail.com</div>
      </div>
      <div>© ${new Date().getFullYear()} OneHaat Technologies Pvt. Ltd. All rights reserved. FSSAI Certified.</div>
    </div>
  </footer>
</div>
`;

// Inject into dist/index.html
let indexHtml = fs.readFileSync(indexPath, 'utf8');
const rootMarker = '<div id="root"></div>';

if (indexHtml.includes(rootMarker)) {
  indexHtml = indexHtml.replace(rootMarker, `<div id="root">${prerenderedBody}</div>`);
  fs.writeFileSync(indexPath, indexHtml);
  console.log('Successfully injected prerendered semantic HTML into dist/index.html');
} else {
  console.log('Root div already populated or marker not found.');
}

// Generate dist/sitemap.xml with today's ISO date
const today = new Date().toISOString().split('T')[0];
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://[YOURDOMAIN.com]/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent);
if (fs.existsSync('public/sitemap.xml')) {
  fs.writeFileSync('public/sitemap.xml', sitemapContent);
}
console.log(`Generated sitemap.xml with lastmod: ${today}`);

// Ensure robots.txt in dist/
if (fs.existsSync('public/robots.txt')) {
  fs.copyFileSync('public/robots.txt', path.join(distDir, 'robots.txt'));
  console.log('Copied robots.txt to dist/');
}

// Ensure llms.txt in dist/
if (fs.existsSync('public/llms.txt')) {
  fs.copyFileSync('public/llms.txt', path.join(distDir, 'llms.txt'));
  console.log('Copied llms.txt to dist/');
}

// Ensure 404.html in dist/
if (fs.existsSync('public/404.html')) {
  fs.copyFileSync('public/404.html', path.join(distDir, '404.html'));
  console.log('Copied 404.html to dist/');
}

console.log('Build-time prerendering complete!');
