import {IPromo} from 'data/interfaces/IPromo'
import {IRestaurant} from 'data/interfaces/IRestaurant'
import {ISubscription} from 'data/interfaces/ISubscription'

export interface IPromoQrCode {
  id: string;
  code: string;
  subscription?: ISubscription;
  startAt: Date;
  endAt: Date;
  restaurant: IRestaurant;
  restaurantId: number;
  promo: IPromo;
  promoId: number;
  total: number;
  usedAt: Date;
  token: string;
  createdAt: Date;
}
