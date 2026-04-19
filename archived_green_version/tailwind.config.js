/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        teal: {
          deep: '#0C3B3B',
          DEFAULT: '#14665A',
          bright: '#1A8F7D',
          light: '#B8E0D2',
        },
        copper: {
          DEFAULT: '#C07A50',
          light: '#D4956E',
          dark: '#A0603A',
        },
        cream: {
          DEFAULT: '#FAF6F0',
          dark: '#F0EBE3',
        },
        charcoal: '#2C2C2C',
        accent: {
          DEFAULT: '#C9A961',
          foreground: '#030213',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#030213',
        },
        border: 'rgba(0, 0, 0, 0.1)',
        background: '#FAF6F0',
        foreground: '#2C2C2C',
      },
      fontFamily: {
        heading: ['"Source Serif 4"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
