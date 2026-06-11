import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#5ce7c8',
          DEFAULT: '#26D0A8', // Primary Mint Green
          dark: '#1ba988',
        },
        primary: {
          light: '#334155',
          DEFAULT: '#1B2A3D', // Dark Slate
          dark: '#0F172A',
        },
        surface: {
          light: '#FFFFFF',
          DEFAULT: '#F8F9FA',
          dark: '#E2E8F0',
        },
        body: '#475569', // Slate 600
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-poppins)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
