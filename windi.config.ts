import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['resources/views/**/*.{html,vue,jsx,tsx,svelte,edge}'],
  },
  theme: {
    extend: {
      fontFamily: {
        josefin: ['Josefin Sans', 'sans-serif'],
      },
    },
  },
})
