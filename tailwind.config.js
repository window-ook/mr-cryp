/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        ng: 'NEXON Lv1 Gothic OTF',
        oneTitle: 'ONE-Mobile-Title',
        aggro: 'SBAggroB',
      },

      colors: {
        main: '#ff63ac',
        color_pos: '#fa0015',
        color_neg: '#000cfa',
        market_code: '#8c8b88',
        list_hover: '#e1e3e1',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      boxShadow: {
        mainShadow: '0px 3px 10px #ff63ac',
      },

      screens: {
        'select-1120': '1120px',
      },

      keyframes: {
        marquee: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '10%': { opacity: 1, transform: 'translateY(0)' },
          '90%': { opacity: 1, transform: 'translateY(0)' },
          '100%': { opacity: 0, transform: 'translateY(-20px)' },
        },
      },

      animation: {
        marquee: 'marquee 5s linear infinite',
      },
    },
  },
  plugins: [],
};
