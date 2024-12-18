
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],

  app: {
    head: {
      title: 'Writing Task 2',
      link: [
        {rel: 'icon', type: 'image/png', href:'/images/home_logo.png'}
      ]
    }
  }
})