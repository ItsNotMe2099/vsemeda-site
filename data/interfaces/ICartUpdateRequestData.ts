import {PaymentMethod} from 'data/enum/PaymentMethod'
import {DeliveryMethod} from 'data/enum/DeliveryMethod'


export interface ICartUpdateRequestData{
  promoId?: number;
  paymentMethod?: PaymentMethod;
  deliveryMethod?: DeliveryMethod;
  isPreOrder?: boolean;
  preOrderAt?: string;
  moneyChange?: number;
  isContactLessDelivery?: boolean;
}
