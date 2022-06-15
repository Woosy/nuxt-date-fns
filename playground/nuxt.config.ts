import { defineNuxtConfig } from 'nuxt'
import dateFnsModule from '..'

export default defineNuxtConfig({
  modules: [
    dateFnsModule
  ],
  dateFns: {
    defaultLocale: 'es'
  }
})
