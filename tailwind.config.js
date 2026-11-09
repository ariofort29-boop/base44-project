/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EAF5EF',
          100: '#D6EBDD',
          200: '#B3DAC5',
          300: '#8FD3B4',
          400: '#4FB287',
          500: '#2AA173',
          600: '#13865A',
          700: '#10764F',
          800: '#0A6B45',
          900: '#075C3B',
          950: '#04301F',
        },
        ink: '#18352C',
        muted: '#5C7168',
        line: '#E4EBE6',
        mist: '#F5F7F5',
        sand: '#F8F5EC',
      },
      fontFamily: {
        sans: ['Manrope Variable', 'Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces Variable', 'Fraunces', 'ui-serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(24,53,44,.04), 0 12px 32px -20px rgba(24,53,44,.35)',
        lift: '0 18px 48px -24px rgba(7,92,59,.45)',
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.75rem',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        rise: 'rise .7s cubic-bezier(.22,.68,0,1) both',
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [],
}
