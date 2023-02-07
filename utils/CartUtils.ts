import {ICart} from 'data/interfaces/ICart'

export default class CartUtils {
  static getLineGroupingId(line: {productId: string, modificationLines?: {modificationId: string}[]}){
    return `${line.productId ?? 0}:[${(line.modificationLines?.sort((a, b) => a.modificationId > b.modificationId ? 1 : -1)).map((m) => m.modificationId).join(',')}]`

  }
  static formatCart(cart: ICart): ICart{
    if(!cart){
      return null
    }
    return {
      ...cart,
      lines: cart?.lines.map((line) => ({...line, groupingId: CartUtils.getLineGroupingId(line) }))
    }
  }

}
