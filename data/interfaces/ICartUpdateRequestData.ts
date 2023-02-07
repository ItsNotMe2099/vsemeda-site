import {PaymentMethod} from 'data/enum/PaymentMethod'
import {DeliveryMethod} from 'data/enum/DeliveryMethod'


export interface ICartUpdateRequestData{
  promoId: number;
  paymentMethod: PaymentMethod;
  deliveryMethod: DeliveryMethod;
  isPreOrder: boolean;
  preOrderAt: Date;
  moneyChange: number;
  isContactLessDelivery: boolean;
}
