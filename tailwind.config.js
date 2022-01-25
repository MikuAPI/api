const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./resources/views/**/*.{edge,html}'],
  theme: {
    fontFamily: {
      sans: ['ui-sans-serif', 'system-ui'],
      serif: ['ui-serif', 'Georgia'],
      mono: ['ui-monospace', 'SFMono-Regular'],
      josefin: ['Josefin Sans', 'sans-serif'],
    },
    colors: {
      'deep-blue': '#0B112E',
      'basic-blue': '#1F2545',
      'miku-pink': '#E570B6',
      'miku-white-blue': '#73CBD5',
      'miku-deep-blue': '#0F2F5B',
      'transparent': 'transparent',
      'current': 'currentColor',
      'black': colors.black,
      'white': colors.white,
      'gray': colors.gray,
      'emerald': colors.emerald,
      'indigo': colors.indigo,
      'yellow': colors.yellow,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
