import request from 'utils/request'
import { DeepPartial} from 'types/types'
import {IUserAddress} from 'data/interfaces/IUserAddress'

export default class UserAddressRepository {
  static async create(data: DeepPartial<IUserAddress>): Promise<IUserAddress> {
    const res = await request<IUserAddress>({
      method: 'post',
      url: '/api/user-address',
      data,
    })
    return res
  }

  static async update(id: string, data: DeepPartial<IUserAddress>): Promise<IUserAddress> {
    const res = await request<IUserAddress>({
      method: 'patch',
      url: `/api/user-address/${id}`,
      data,
    })
    return res
  }

  static async delete(id: string): Promise<any> {
    return request({url: `/api/user-address/${id}`})
  }

  static async sync(currentAddressId: string, addresses: IUserAddress[]): Promise<{newCurrentAddressId: string}> {
    const res = await request<{newCurrentAddressId: string}>({
      method: 'post',
      url: '/api/user-address',
      data: {
        currentAddressId,
        addresses: addresses.map(i => ({...i, localId: i.id}))
      },
    })
    return res
  }

}
