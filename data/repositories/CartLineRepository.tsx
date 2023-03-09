import request from 'utils/request'
import {ILocation} from 'data/interfaces/ILocation'
import {ICart} from 'data/interfaces/ICart'
import queryString from 'query-string'
import {
  ICartLineCreateRequestData,
  ICartLineUpdateRequestData
} from 'data/interfaces/ICartLineRequestData'
import CartUtils from 'utils/CartUtils'
export default class CartLineRepository {
  static async create(data: ICartLineCreateRequestData, location: ILocation): Promise<ICart> {
    const res = await request<ICart>({
      method: 'post',
      url: `/api/cart/cart-line?${queryString.stringify(location)}`,
      data,
    })
    return CartUtils.formatCart(res)
  }

  static async update(id: string, data: ICartLineUpdateRequestData,  location: ILocation): Promise<ICart> {
    const res = await request<ICart>({
      method: 'patch',
      url: `/api/cart/cart-line/${id}?${queryString.stringify(location)}`,
      data,
    })
    return CartUtils.formatCart(res)
  }

  static async delete(id: string, location: ILocation): Promise<ICart> {
    const res = await request<ICart>({
      method: 'delete',
      url: `/api/cart/cart-line/${id}?${queryString.stringify(location)}`,

    })
    return CartUtils.formatCart(res)
  }
}
