/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ألوان الوضع الفاتح والداكن عبر متغيرات CSS
        navy: {
          900: 'rgb(var(--color-navy-900-rgb) / <alpha-value>)',
          800: 'rgb(var(--color-navy-800-rgb) / <alpha-value>)',
          700: 'rgb(var(--color-navy-700-rgb) / <alpha-value>)',
          600: 'rgb(var(--color-navy-600-rgb) / <alpha-value>)',
        },
        accent: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
        softBorder: 'rgb(var(--color-border-rgb) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Outfit', 'Tajawal', 'sans-serif'],
        outfit: ['Outfit', 'Tajawal', 'system-ui', 'sans-serif'],
        tajawal: ['Tajawal', 'Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #3b82f6 0%, #ec4899 100%)',
        'gradient-text':    'linear-gradient(90deg, #3b82f6 0%, #a855f7 50%, #ec4899 100%)',
      },
      animation: {
        'float':       'float 4s ease-in-out infinite',
        'float-slow':  'float 6s ease-in-out infinite',
        'spin-slow':   'spin 8s linear infinite',
        'pulse-glow':  'pulseGlow 2s ease-in-out infinite',
        'fade-up':     'fadeUp 0.6s ease forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.4' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'glow-blue': '0 0 30px rgba(59, 130, 246, 0.3)',
        'glow-rose': '0 0 30px rgba(236, 72, 153, 0.3)',
        'glow-card': '0 4px 32px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.15)',
        'glow-card-hover': '0 8px 48px rgba(59, 130, 246, 0.28), 0 0 0 1px rgba(99, 102, 241, 0.4)',
      },
    },
  },
  plugins: [],
}
