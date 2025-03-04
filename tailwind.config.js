/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      textShadow: {
        black: '0 2px 4px rgba(0, 0, 0, 0.8)',
      },

      fontFamily: {
        ng: 'NEXON Lv1 Gothic OTF',
        oneTitle: 'ONE-Mobile-Title',
        aggro: 'SBAggroB',
      },

      colors: {
        main: '#ff63ac',
        main_light: '#f788bc',
        color_pos: '#fa0015',
        color_neg: '#000cfa',
        market_code: '#8c8b88',
        list_hover: '#e1e3e1',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'introduce-representative': "url('/images/root_introduce.webp')",
      },

      boxShadow: {
        mainShadow: '0px 3px 10px #ff63ac',
      },

      screens: {
        'select-1120': '1120px',
      },

      keyframes: {
        marqueeY: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '10%': { opacity: 1, transform: 'translateY(0)' },
          '90%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(-20px)' },
        },
        marqueeX: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },

      animation: {
        marqueeY: 'marqueeY 5s linear infinite',
        marqueeX: 'marqueeX 20s linear infinite',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': value => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') },
      );
    }),
  ],
};
