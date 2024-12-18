/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{vue,js}',
    './components/**/*.{vue,js}',
    './layouts/**/*.{vue,js}',
    './composables/**/*.{vue,js}',
    './nuxt.config.ts', // Don't forget to include nuxt.config.ts for full build-time purging
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],

  daisyui: {
    themes: ['cupcake'],
  },
}

