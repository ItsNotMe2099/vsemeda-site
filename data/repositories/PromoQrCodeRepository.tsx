import request from 'utils/request'
import {IPromoQrCode} from 'data/interfaces/IPromoQrCode'


export default class PromoQrCodeRepository {
  static async findByCode(code: string): Promise<IPromoQrCode | null> {
    const res = await request<IPromoQrCode | null>({
      method: 'get',
      url: `/api/subscription-qr-code/byCode/${code}`,
    })
    return res
  }
}
