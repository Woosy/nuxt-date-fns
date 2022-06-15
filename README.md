 <h1>DateFns for Nuxt</h1>
 
<p>
  <a href="https://www.npmjs.com/package/nuxt-date-fns"><img src="https://badgen.net/npm/v/nuxt-date-fns" alt="Version"></a>
  <a href="https://www.npmjs.com/package/nuxt-date-fns"><img src="https://badgen.net/npm/license/nuxt-date-fns" alt="License"></a>
  <a href="https://www.npmjs.com/package/nuxt-date-fns"><img src="https://badgen.net/npm/types/nuxt-date-fns" alt="Types"></a>
</p>
   
## 💡 About

[date-fns](https://date-fns.org/) plugin for [Nuxt](https://nuxtjs.org).

## 📦 Install

1. Install `nuxt-date-fns` as development dependency:

```bash
npm i nuxt-date-fns -D
```

2. Add it to the `modules` section of your `nuxt.config`:

```ts
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  modules: ['nuxt-date-fns']
})
```

## 🚀 Example

Use any [date-fns](https://date-fns.org/) methods in your Nuxt application.

```html
<template>
  <div>
    {{ $dateFns.format(new Date(), 'dd-MM-yyyy') }}
  </div>
</template>

<script setup lang="ts">
// alternatively, you can also use it here
const { $dateFns } = useNuxtApp()
</script>
```

## 🔨 Config

| Name             | Default       | Description                                                                      |
| ---------------- | ------------- | -------------------------------------------------------------------------------- |
| `format`         | `'yyy-MM-dd'` | Date format (defaults to ISO 8601)                                               |
| `defaultLocale`  | `enUS`        | Default locale, used by every function when no locale is specified               |
| `fallbackLocale` | `enUS`        | Fallback locale, used when specified locale is not supported                     |

## 💻 Example - Config

```ts
import { defineNuxtConfig } from 'nuxt';

export default defineNuxtConfig({
  modules: ['nuxt-date-fns'],
  dateFns: {
    format: 'dd-MM-yyyy',
    defaultLocale: 'fr',
    fallbackLocale: 'enUS'
  }
});
```

## 📄 License

[MIT License](https://github.com/woosy/nuxt-date-fns/blob/master/LICENSE) © 2022 - [Arthur Dufour](https://github.com/woosy)