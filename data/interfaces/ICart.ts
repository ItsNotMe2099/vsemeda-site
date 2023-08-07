import {IUnit} from 'data/interfaces/IUnit'
import {IPromo} from 'data/interfaces/IPromo'
import {PaymentMethod} from 'data/enum/PaymentMethod'
import {DeliveryMethod} from 'data/enum/DeliveryMethod'
import {ICartLine} from 'data/interfaces/ICartLine'
import {ICartProgressLayout} from 'data/interfaces/ICartProgressLayout'

export interface ICart {
  id: string;
  unit?: IUnit;
  unitId: number;
  promo?: IPromo;
  promoId: number;
  paymentMethod: PaymentMethod;
  deliveryMethod: DeliveryMethod;
  isPreOrder: boolean;
  preOrderAt: Date;
  moneyChange: number;
  isContactLessDelivery: boolean;
  subTotal: number
  totalBase: number;
  totalDiscount: number;
  total: number;
  lines: ICartLine[];
  pLayout: ICartProgressLayout
  serviceFee?: number
  availableTimes?: string[][],
  email?: string,
  personsCount?: number


}
