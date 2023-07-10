import {formatRelative} from 'date-fns'
import {ru} from 'date-fns/locale'

const PNF = require('google-libphonenumber').PhoneNumberFormat
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance()

const pluralizeNative = require('numeralize-ru').pluralize

export default class Formatter {
  static pluralize(number: number, word1: string, word2: string, word3: string) {
    return pluralizeNative(number, word1, word2, word3)
  }

  static cleanPhone(phone: string) {
    if (phone) {
      let phoneCleaned = `${phone}`.replace(/[^\+0-9]/g, '')
      if (!phoneCleaned.startsWith('+')) {
        phoneCleaned = '+' + phoneCleaned
      }
      return phoneCleaned
    }
    return phone
  }

  static formatDateRelative(date: string | Date) {
    const formatRelativeLocale: { [key: string]: string } = {
      'yesterday': 'Вчера в HH:mm',
      'today': ' в HH:mm',
      'tomorrow': 'Завтра в HH:mm',
      'other': 'dd.MM.yyyy HH:mm', // Difference: Add time to the date
    }

    const locale = {
      ...ru,
      formatRelative: (token: string) =>
        formatRelativeLocale[token] || formatRelativeLocale['other'],
    }
    if (!date) {
      return ''
    }
    return formatRelative(typeof date === 'string' ? new Date(date) : date, new Date(), {locale})
  }

  static formatPhone(phone: string) {
    try {
      const number = phoneUtil.parseAndKeepRawInput(this.cleanPhone(`${phone}`), 'RU')
      return phoneUtil.format(number, PNF.INTERNATIONAL)
    } catch (e) {
      return phone
    }
  }

  static pad(pad: string, str: string, padLeft = true) {
    if (typeof str === 'undefined')
      return pad
    if (padLeft) {
      return (pad + str).slice(-pad.length)
    } else {
      return (str + pad).substring(0, pad.length)
    }
  }

  static formatNumber(num: number, separator?: string) {
    return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
  }

  static formatProductPrice(price: { value?: number, min?: number, max?: number }) {
    const pr = price?.value || price.min
    return this.formatPrice(pr)
  }

  static formatPrice(price: number) {
    if (!price) {
      return
    }
    return `${this.formatNumber(Math.ceil(price))} ₽`
  }

  static formatDeliveryPeriod(minPeriod: number, maxPeriod: number) {
    return (maxPeriod || minPeriod) && (maxPeriod === minPeriod ? `${minPeriod} ${this.pluralize(minPeriod, 'день', 'дня', 'дней')}` : `${minPeriod} - ${maxPeriod} ${this.pluralize(maxPeriod, 'день', 'дня', 'дней')}`) || ''
  }

  static formatBonuses(bonuses: number, withStr = false) {
    const number = bonuses ? Math.ceil(bonuses / 100) : 0
    return `${this.formatNumber(number)}${withStr ? ` ${this.pluralize(number, 'балл', 'балла', 'баллов')}` : ''}`
  }

  static formatAddressSuggestionSubTitle(subTitle: string): string {
    return subTitle?.split(',').map((e) => e.trim()).reverse().join(', ')
  }

  static formatDeliveryTime({minDeliveryTime, maxDeliveryTime}: {minDeliveryTime?: number, maxDeliveryTime?: number}) {
    return `${minDeliveryTime ?? ''}${minDeliveryTime != null && maxDeliveryTime != null ? '-' : ''}${maxDeliveryTime ?? ''}${minDeliveryTime != null || maxDeliveryTime != null ? ' мин' : ''}`
  }
  static formatPreOrderTime(date: Date) {
    return Formatter.formatDateRelative(date)
  }


}

export const pad = Formatter.pad
