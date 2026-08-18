/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--c-border) / <alpha-value>)',
        paper: 'rgb(var(--c-paper) / <alpha-value>)',
        card: 'rgb(var(--c-card) / <alpha-value>)',
        red: 'rgb(var(--c-red) / <alpha-value>)',
        blue: 'rgb(var(--c-blue) / <alpha-value>)',
        yellow: 'rgb(var(--c-yellow) / <alpha-value>)',
        pink: 'rgb(var(--c-pink) / <alpha-value>)',
        sky: 'rgb(var(--c-sky) / <alpha-value>)',
        lime: 'rgb(var(--c-lime) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        onaccent: 'rgb(var(--c-onaccent) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Archivo Black"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        nb: '5px 5px 0 0 rgb(var(--c-border))',
        nbsm: '3px 3px 0 0 rgb(var(--c-border))',
        nblg: '8px 8px 0 0 rgb(var(--c-border))',
        nbpress: '1px 1px 0 0 rgb(var(--c-border))',
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
