module.exports = {
  content: ['./resources/views/**/*.{edge,html}'],
  theme: {
    fontFamily: {
      sans: ['ui-sans-serif', 'system-ui'],
      serif: ['ui-serif', 'Georgia'],
      mono: ['ui-monospace', 'SFMono-Regular'],
      josefin: ['Josefin Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        blue: {
          light: '#B9DDE5',
          DEFAULT: '#1F2545',
          dark: '#0B102E',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
