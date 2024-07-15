const baseUrl = process.env.VITE_API_URL || '//noc.test/api'
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt-alt/auth', '@pinia/nuxt'],
  auth: {
    strategies: {
      local: {
          token: {
              property: 'data',
              global: true,
              // required: true,
              type: 'Bearer'
          },
          user: {
              property: '',
              // autoFetch: true
          },
          endpoints: {
              login: { url: baseUrl + '/auth/login', method: 'post' },
              // logout: { url: '/api/auth/logout', method: 'post' },
              user: { url: baseUrl + '/user', method: 'get' }
          }
        }
    },
    redirect: {
        login: '/auth/login',
        home: '/'
    }
  }
})
