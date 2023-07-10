import { FieldValidator } from 'formik/dist/types'
import Formatter from './formatter'

export default class Validator {
  static emailRe = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i
  static charsRe = /^[A-ZА-ЯЁ]+$/i

  static combine(validators: FieldValidator[]): FieldValidator {
    return (value: any) => {
      for (let i = 0; i < validators.length; i++) {
        const err = validators[i](value)
        if (err) {
          return err
        }
      }
      return undefined
    }
  }

  static required(_value: string | number | boolean): string | undefined {
    const value = _value && typeof _value === 'string' ? _value.replace(/\s+/g, ' ').trim() : _value
    return (value || typeof value === 'number') ? undefined : 'Обязательное поле'
  }

  static phone(value: string): string | undefined{
    return Formatter.cleanPhone(value ?? '')?.length >= 12 ? undefined : 'Неверный формат'
  }

  static weekScheduleRequired(value: any): string | undefined {
    const keys = value ? Object.keys(value) : []
    for(const key of keys){
      if(value[key]?.intervals.length > 0){
        return undefined
      }
    }
    return 'Добавьте время хотя бы в 1 день'
  }
  static arrayRequired(value: any[]): string | undefined {
    return value?.length > 0  ? undefined : 'Обязательное поле'
  }

  static rating(value: number): string | undefined {
    return (value || value > 0) ? undefined : 'Обязательное поле'
  }

  static email(value: string): string | undefined {
    return value && !Validator.emailRe.test(value)
      ? 'Неверный формат email'
      : undefined
  }
  static onlyChars(value: string): string | undefined {
    return value && !Validator.charsRe.test(value)
      ? 'Только буквы'
      : undefined
  }

  static url = (value: string): string | undefined => {
    let url
    const errorText = 'Неверный формат ссылки'
    try {
      url = new URL(value)
    } catch (_) {
      return errorText
    }

    return url.protocol === 'https:' ? undefined : errorText
  }

  static passwordsMustMatch = (allValues: any) => (value: string): string | undefined => {
    return value !== allValues.password ? 'Пароли не совпадают' : undefined
  }
  static amount(value: string | number): string | undefined {
    return isNaN(+value) || value  <= 0 ? 'Значение меньше 0' : undefined
  }
  static minBookingPrice(value: string | number): string | undefined {
    return isNaN(+value) || value  < 100 ? 'Минимальная сумма 100₽' : undefined
  }
  static isString = (thing: string) => Object.prototype.toString.call(thing) !== '[object String]' ? 'Ожидается строка' : undefined
}
