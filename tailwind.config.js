/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        celadon: {
          200: '#d4ece0',
          300: '#b2dcc8',
          400: '#7fc4a8',
          500: '#5a9e82',
          600: '#3d7a62',
          700: '#2b5c4a',
        },
        gold: {
          200: '#efe0c0',
          300: '#e8d5a3',
          400: '#d4bc7a',
          500: '#c9a86a',
          600: '#b89450',
        },
        ink: {
          50: '#faf8f5',
          100: '#f0ede6',
          200: '#e0dacf',
          600: '#6b6050',
          700: '#4a3f30',
          800: '#2e3a39',
          900: '#1a140e',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Source Han Serif SC"', '"Songti SC"', 'serif'],
        calligraphy: ['"Ma Shan Zheng"', 'STKaiti', 'KaiTi', 'SimSun', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'breathe': 'breathe 4s ease-in-out infinite',
        'mist-drift': 'mistDrift 20s ease-in-out infinite',
        'poem-drift': 'poemDrift 14s linear infinite',
        'ink-spread': 'inkSpread 12s ease-in-out infinite',
        'gold-float': 'goldFloat 8s ease-in-out infinite',
        'cloud-slow': 'cloudSlow 30s linear infinite',
        'soft-glow': 'softGlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' },
        },
        mistDrift: {
          '0%, 100%': { transform: 'translateX(0%)' },
          '50%': { transform: 'translateX(3%)' },
        },
        poemDrift: {
          '0%': { transform: 'translateY(100vh) translateX(0)', opacity: '0' },
          '10%': { opacity: '0.55' },
          '85%': { opacity: '0.3' },
          '100%': { transform: 'translateY(-8vh) translateX(20px)', opacity: '0' },
        },
        inkSpread: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.3' },
          '50%': { transform: 'scale(1.12)', opacity: '0.5' },
        },
        goldFloat: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '20%': { opacity: '0.7' },
          '80%': { opacity: '0.5' },
          '100%': { transform: 'translateY(-60px) translateX(30px)', opacity: '0' },
        },
        cloudSlow: {
          '0%': { transform: 'translateX(-5%)' },
          '100%': { transform: 'translateX(5%)' },
        },
        softGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201,168,106,0.08)' },
          '50%': { boxShadow: '0 0 40px rgba(201,168,106,0.18)' },
        },
      },
    },
  },
  plugins: [],
}
