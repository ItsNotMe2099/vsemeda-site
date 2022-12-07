import {UrlObject} from 'url'
import {MouseEventHandler} from 'react'


export interface IButton {
  type?: 'submit' | 'reset' | 'button' | undefined
  form?: string
  spinner?: boolean
  disabled?: boolean
  onClick?: MouseEventHandler
  href?: string | UrlObject
  isExternalHref?: boolean // add target blank and no referrer
}

export interface IRegion {
  id: number
  name: string
  default_address: string
  slug: string
  is_default: boolean
  latitude: number
  longtitude: number
}