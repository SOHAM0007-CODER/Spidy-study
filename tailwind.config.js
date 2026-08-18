/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#101014',
        paper: '#F5F0E6',
        card: '#FFFFFF',
        red: '#FF3B30',
        blue: '#2D5BFF',
        yellow: '#FFD426',
        pink: '#FF5CA8',
        sky: '#4CC9F0',
        lime: '#8AE234',
        muted: '#6B6B7B',
      },
      fontFamily: {
        display: ['"Archivo Black"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        nb: '5px 5px 0 0 #101014',
        nbsm: '3px 3px 0 0 #101014',
        nblg: '8px 8px 0 0 #101014',
        nbpress: '1px 1px 0 0 #101014',
      },
      borderWidth: { 3: '3px' },
      keyframes: {
        pop: { '0%': { transform: 'translateY(6px)', opacity: '0' }, '100%': { transform: 'none', opacity: '1' } },
        ticker: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      animation: {
        pop: 'pop .35s cubic-bezier(.2,.9,.3,1.4) both',
        ticker: 'ticker 22s linear infinite',
      },
    },
  },
  plugins: [],
}
