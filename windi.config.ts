import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['ressources/views/**/*.{html,vue,jsx,tsx,svelte,edge}'],
  },
  theme: {
    extend: {
      fontFamily: {
        josefin: ['sans-serif', 'Josefin Sans'],
      },
    },
  },
})
