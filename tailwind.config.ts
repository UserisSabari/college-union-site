import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#1A2744',
        crimson: '#C8003A',
        gold: '#C9952A',
        white: '#FFFFFF',
        surface: '#F5F5F7',
        card: '#FAFAFA',
        textPrimary: '#1A1A1A',
        textSecondary: '#6E6E73',
        border: '#E5E5EA',
        darkBg: '#0F1219',
        darkSurface: '#1A2032',
        darkCard: '#1E2640',
        darkText: '#F0F0F5',
        darkBorder: '#2A3050',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      borderRadius: {
        card: '8px',
        button: '4px',
        tag: '2px',
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config
