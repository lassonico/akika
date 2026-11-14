/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        crema: '#FCF0DA',
        cremaDark: '#F5E2BE',
        salvia: '#AEAC78',
        salviaDark: '#94925E',
        miel: '#F2C46A',
        mielDark: '#E5B24D',
        cacao: '#4C4541',
        cacaoLight: '#6E655F'
      },
      fontFamily: {
        brand: ['Fraunces', 'serif'],
        serif: ['Fraunces', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      }
    }
  },
  plugins: [],
}