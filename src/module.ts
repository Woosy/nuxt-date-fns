import { defineNuxtModule, addTemplate, addPlugin, createResolver } from '@nuxt/kit'

export interface ModuleOptions {
  format: string
  defaultLocale: string,
  fallbackLocale: string,
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-date-fns',
    configKey: 'dateFns',
    compatibility: {
      nuxt: '^3.0.0 || ^2.16.0',
      bridge: true
    }
  },
  defaults: {
    format: 'yyyy-MM-dd',
    defaultLocale: 'enUS',
    fallbackLocale: 'enUS'
  },
  async setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = await resolve('./runtime')
    nuxt.options.build.transpile.push(runtimeDir)

    // Inject options via virtual template
    nuxt.options.alias['#date-fns-options'] = addTemplate({
      filename: 'date-fns-options.mjs',
      getContents: () => Object.entries(options).map(([key, value]) =>
      `export const ${key} = ${JSON.stringify(value, null, 2)}
      `).join('\n')
    }).dst

    // Inject date-fns plugin
    addPlugin(resolve(runtimeDir, 'plugin'))
  }
})
