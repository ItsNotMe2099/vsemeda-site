import {IPromo} from 'data/interfaces/IPromo'
import {PaymentMethod} from 'data/enum/PaymentMethod'
import {DeliveryMethod} from 'data/enum/DeliveryMethod'
import {IBrand} from 'data/interfaces/IBrand'
import {IUserAddress} from 'data/interfaces/IUserAddress'
import {ILocation} from 'data/interfaces/ILocation'
import {IOrderLine} from 'data/interfaces/IOrderLine'
import { IOrderStateDetails } from './IOrderStateDetails'
import { OrderState } from 'data/enum/OrderState'
export interface IOrderPaymentData{
  payUrl: string
}

interface Surcharges {
  description: string
  price: number
}


export interface IOrder {
  id: string;
  number: string;
  partnerNumber: string;
  address: IUserAddress
  location: ILocation
  paymentMethod: PaymentMethod;
  deliveryMethod: DeliveryMethod;
  email: string
  phone: string
  personsCount: number
  createdAt: string
  deliveredAt: string
  subTotal: number
  totalDiscount: number;
  total: number;
  isPreOrder: boolean;
  preOrderAt: Date;
  brand?: IBrand;
  promo?: IPromo;
  moneyChange: number;
  isContactLessDelivery: boolean;
  lines: IOrderLine[];
  paymentData?: IOrderPaymentData,
  stateDetails?: IOrderStateDetails,
  state?: OrderState
  totalDelivery?: number
  surcharges?: Surcharges[]
}
