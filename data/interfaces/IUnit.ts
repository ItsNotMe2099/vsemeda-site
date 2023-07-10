import {IBrand} from 'data/interfaces/IBrand'
import {ILocation} from 'data/interfaces/ILocation'
import {PaymentMethod} from 'data/enum/PaymentMethod'
import {IUnitCardLayout} from 'data/interfaces/IUnitCardLayout'
import {IPromoUnit} from 'data/interfaces/IPromoUnit'

export interface UnitCookingSettings {
  cookingTime: number
  isCookingTimeIncrease: boolean
  startAmount: number
  stepAmount: number
  stepTime: number
}

export interface UnitOrderSettings {
  orderMinTime: number
  orderMaxTime: number
  hasContactLessDelivery: boolean
}
export interface IUnit {
  id: number
  brand?: IBrand
  timezone: number
  name: string
  slug: string
  pausedUntil: Date
  rating: number
  address: string
  location: ILocation
  paymentMethods: PaymentMethod[]
  hasDeliverySelfPickUp: boolean
  minOrderAmountSelfPickup: number
  hasPaidDelivery: boolean
  settingsId: number
  orderSettings: UnitOrderSettings
  cookingSettings: UnitCookingSettings
  cookingTime: number
  isAvailable?: boolean
  cardLayout?: IUnitCardLayout
  deliveryPrice?: number
  deliveryTime?: number
  promoUnits: IPromoUnit[]
}
