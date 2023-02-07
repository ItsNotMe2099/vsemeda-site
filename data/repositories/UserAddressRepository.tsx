import request from 'utils/request'
import { DeepPartial} from 'types/types'
import {IUser} from 'data/interfaces/IUser'
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

  static async update(id: number, data: DeepPartial<IUserAddress>): Promise<IUserAddress> {
    const res = await request<IUserAddress>({
      method: 'patch',
      url: `/api/user-address/${id}`,
      data,
    })
    return res
  }

  static async delete(id: number): Promise<IUser> {
    return request({url: '/api/user-address'})
  }
}
