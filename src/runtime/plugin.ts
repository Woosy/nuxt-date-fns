import * as dateFns from 'date-fns'
import * as locales from 'date-fns/locale'
import { defineNuxtPlugin } from '#app'
import type { NuxtDateFnsInstance } from './types'
// @ts-ignore
import * as moduleOptions from '#date-fns-options'

declare module '#app' {
  interface NuxtApp {
    $dateFns: NuxtDateFnsInstance
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const dateObj: NuxtDateFnsInstance = { ...dateFns }

  if (dateFns.format) {
    dateObj.format = (date, format, options) => {
      return dateFns.format(parsedDate(date), format || moduleOptions.format, mergeOptions(options))
    }
  }

  if (dateFns.parse) {
    dateObj.parse = (dateString, formatString, backupDate, options) => {
      return dateFns.parse(dateString, formatString, backupDate, mergeOptions(options))
    }
  }

  const threeParams = [
    'differenceInCalendarWeeks',
    'formatDistance',
    'formatDistanceStrict',
    'formatRelative',
    'isMatch',
    'isSameWeek',
    'setDay',
    'setWeek',
    'setWeekYear'
  ].filter(value => Object.keys(dateFns).includes(value))

  for (const fn of threeParams) {
    dateObj[fn] = (param1, param2, options) => {
      return dateFns[fn](param1, param2, mergeOptions(options))
    }
  }

  const twoParams = [
    'eachWeekOfInterval',
    'endOfWeek',
    'formatDistanceToNow',
    'formatDistanceToNowStrict',
    'formatDuration',
    'getWeek',
    'getWeekOfMonth',
    'getWeeksInMonth',
    'getWeekYear',
    'isThisWeek',
    'lastDayOfWeek',
    'startOfWeek',
    'startOfWeekYear'
  ].filter(value => Object.keys(dateFns).includes(value))

  for (const fn of twoParams) {
    dateObj[fn] = (param, options) => {
      return dateFns[fn](param, mergeOptions(options))
    }
  }

  nuxtApp.provide('dateFns', dateObj as NuxtDateFnsInstance)
})

/**
 * Utility function which merges moduleOptions with the method's options
 */
function mergeOptions (options): any {
  if (moduleOptions.defaultLocale) {
    options = { locale: moduleOptions.defaultLocale, ...options }
  }

  if (moduleOptions.fallbackLocale) {
    options = { fallbackLocale: moduleOptions.fallbackLocale, ...options }
  }

  if (options && typeof options.locale === 'string') {
    if (locales[options.locale]) {
      options.locale = locales[options.locale]
    } else if (options.fallbackLocale && locales[options.fallbackLocale]) {
      console.warn(`[date-fns] locale '${options.locale}' not found, using fallback locale '${options.fallbackLocale}.'`)
      options.locale = locales[options.fallbackLocale]
    } else {
      console.error(`[date-fns] locale '${options.locale}' not found.`)
    }
  }

  return options
}

function parsedDate (date) {
  if (dateFns.parseISO) {
    return typeof date !== 'string' ? date : dateFns.parseISO(date)
  }
  return date
}
