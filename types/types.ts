import {UrlObject} from 'url'
import {HTMLInputTypeAttribute, MouseEventHandler, ReactElement} from 'react'
import {FieldConfig} from 'formik'
import {SnackbarType} from 'types/enums'
import {PaymentMethod} from 'data/enum/PaymentMethod'


export class RequestError extends Error{
  message: string
  code: number
  isNotFoundError: boolean

  constructor(message: string, code: number) {
    super(message)
    this.message = message
    this.code = code
    this.isNotFoundError = code === 404
  }
}
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

export interface IPagination<T>{
  data: T[]
  total: number
}
export interface IPaginationRequest{
  page: number
  limit: number
}
export type FieldIconName = 'field_phone' | 'field_name' | 'field_comment' | 'field_date' | 'field_time' | 'field_persons' | 'field_email'

export type InputStyleType = 'default' | 'bottomBorder' | 'defaultSmall' | 'defaultExSmall' | 'profile' | 'cashForm' | 'promo' | 'subscribe' | 'feedback'
export interface IField<T> extends FieldConfig<T> {
  label?: string
  placeholder?: string
  iconName?: FieldIconName
  type?: HTMLInputTypeAttribute
  error?: string
  description?: string
  disabled?: boolean
}
export interface IOption<T> {
  label: string
  value?: T
  disabled?: boolean
  description?: string
}

export interface IPaymentOption extends IOption<PaymentMethod> {
  icon?: ReactElement
}

export interface SnackbarData {
  text: string
  type: SnackbarType
}
export interface IButton {
  type?: 'submit' | 'reset' | 'button' | undefined
  form?: string
  spinner?: boolean
  disabled?: boolean
  onClick?: MouseEventHandler
  href?: string | UrlObject
  isExternalHref?: boolean // add target blank and no referrer
}

