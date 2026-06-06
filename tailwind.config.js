/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Instrument Serif"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ivory: '#F7F3E8',
        paper: '#FFFCF6',
        ink: '#1F211B',
        moss: '#6F7762',
      },
      boxShadow: {
        soft: '0 24px 80px rgba(54, 43, 32, 0.10)',
        card: '0 14px 38px rgba(54, 43, 32, 0.08)',
      },
    },
  },
  plugins: [],
};
