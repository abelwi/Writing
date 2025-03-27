export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: 'netlify' 
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['@fortawesome/fontawesome-free/css/all.css'],
  app: {
    head: {
      title: 'Writing Task 2',
      link: [{ rel: 'icon', type: 'image/png', href: '/images/home_logo.png' }]
    }
  }
})
