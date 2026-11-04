/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0F172A',
          deep: '#020617',
          light: '#334155',
          muted: '#64748B',
          faint: '#94A3B8',
        },
        pastel: {
          mint: '#D1FAE5',
          'mint-subtle': '#ECFDF5',
          peach: '#FFEDD5',
          'peach-subtle': '#FFF7ED',
          lilac: '#F3E8FF',
          'lilac-subtle': '#FAF5FF',
          sky: '#E0F2FE',
          'sky-subtle': '#F0F9FF',
          butter: '#FEF9C3',
          'butter-subtle': '#FEFCE8',
        },
        brand: {
          teal: '#0D9488',
          emerald: '#059669',
          mint: '#10B981',
          saffron: '#F59E0B',
          amber: '#D97706',
          orange: '#EA580C',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          alt: '#FCFCFD',
          elevated: '#FFFFFF',
          subtle: '#F8FAFC',
          glass: 'rgba(255, 255, 255, 0.72)',
          'glass-strong': 'rgba(255, 255, 255, 0.88)',
        },
      },
      fontFamily: {
        display: ['"Cabinet Grotesk"', '"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        heading: ['"Cabinet Grotesk"', '"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Satoshi"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        body: ['"Satoshi"', '"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(15, 23, 42, 0.04)',
        'soft': '0 8px 24px -6px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
        'soft-lg': '0 20px 40px -12px rgba(15, 23, 42, 0.07), 0 4px 12px -2px rgba(15, 23, 42, 0.03)',
        'soft-xl': '0 30px 60px -15px rgba(15, 23, 42, 0.09), 0 8px 24px -4px rgba(15, 23, 42, 0.04)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
        'glow-teal': '0 0 35px -5px rgba(13, 148, 136, 0.28)',
        'glow-emerald': '0 0 35px -5px rgba(16, 185, 129, 0.28)',
        'glow-saffron': '0 0 35px -5px rgba(245, 158, 11, 0.25)',
      },
      animation: {
        'blob-pulse': 'blob-pulse 12s ease-in-out infinite alternate',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
      },
      keyframes: {
        'blob-pulse': {
          '0%': { transform: 'scale(1) translate(0px, 0px)' },
          '50%': { transform: 'scale(1.1) translate(20px, -20px)' },
          '100%': { transform: 'scale(0.95) translate(-15px, 15px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
