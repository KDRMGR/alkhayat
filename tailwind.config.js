/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#0a6836',
          700: '#0a6836',
          800: '#166534',
          900: '#14532d',
        },
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        heading: ['Arial', 'Helvetica', 'sans-serif'],
      },
      fontSize: {
        'display': ['2.625rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '0' }],
        'h1': ['2.25rem', { lineHeight: '1.3', fontWeight: '600', letterSpacing: '0' }],
        'h2': ['1.875rem', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '0' }],
        'h3': ['1.5rem', { lineHeight: '1.5', fontWeight: '600', letterSpacing: '0' }],
        'h4': ['1.25rem', { lineHeight: '1.6', fontWeight: '600', letterSpacing: '0' }],
        'h5': ['1.125rem', { lineHeight: '1.6', fontWeight: '500', letterSpacing: '0' }],
        'body-lg': ['1rem', { lineHeight: '1.7', fontWeight: '400', letterSpacing: '0' }],
        'body': ['0.875rem', { lineHeight: '1.7', fontWeight: '400', letterSpacing: '0' }],
        'body-sm': ['0.8125rem', { lineHeight: '1.6', fontWeight: '400', letterSpacing: '0' }],
        'body-xs': ['0.75rem', { lineHeight: '1.5', fontWeight: '400', letterSpacing: '0' }],
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0',
        wide: '0.01em',
        wider: '0.02em',
        widest: '0.05em',
      },
    },
  },
  plugins: [],
};
