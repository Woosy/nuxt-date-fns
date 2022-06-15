<template>
  <div>
    <p>
      Nuxt module playground!
    </p>

    <ul>
      <li>Today with default format: {{ $dateFns.format(new Date()) }}</li>
      <li>Today with default locale: {{ $dateFns.format(new Date(), 'eeee' ) }}</li>
      <li>Today with french locale: {{ $dateFns.format(new Date(), 'eeee', { locale: 'fr' }) }}</li>
      <li>Today with fallbackLocale: {{ $dateFns.format(new Date(), 'eeee', { locale: 'unknwon' }) }}</li>
      <li>Date with custom format: {{ $dateFns.format(new Date(), 'dd/MM/yyyy') }}</li>
      <li>Date from script: {{ date }}</li>
    </ul>
  </div>
</template>

<script setup>
const { $dateFns } = useNuxtApp()
const date = $dateFns.formatDistance($dateFns.subDays(new Date(), 3), new Date(), { locale: 'fr', addSuffix: true })
</script>
