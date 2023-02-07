import {PaymentMethod} from 'data/enum/PaymentMethod'
import {DeliveryMethod} from 'data/enum/DeliveryMethod'
import {IUserAddress} from 'data/interfaces/IUserAddress'
import {ILocation} from 'data/interfaces/ILocation'
import {Platform} from 'data/enum/Plaform'

export interface IOrderCreateRequest {
  address: IUserAddress
  location: ILocation
  paymentMethod: PaymentMethod;
  deliveryMethod: DeliveryMethod;
  platform: Platform
  email?: string
  personsCount: number
  clientName?: string
  isPreOrder: boolean;
  preOrderAt?: Date;
  moneyChange?: number;
  isContactLessDelivery?: boolean;
}
