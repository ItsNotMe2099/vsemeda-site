import request from 'utils/request'
import { DeepPartial} from 'types/types'
import {IUser} from 'data/interfaces/IUser'
import {ILoginResponse} from 'data/interfaces/ILoginResponse'

export default class UserRepository {
  static async phoneConfirmation(phone: string, code: string): Promise<string> {
    const res = await request<{ accessToken: string }>({
      method: 'post',
      url: '/api/auth/phoneConfirmation',
      data: {
        phone,
        code,
      },
    })
    return res.accessToken
  }
  static async login(phone: string): Promise<ILoginResponse> {
    const res = await request<ILoginResponse>({
      method: 'post',
      url: '/api/auth/register',
      data: {
        phone,
      },
    })
    return res
  }

  static async fetchCurrent(token?: string): Promise<IUser> {
    return request({url: '/api/auth/currentUser', token})
  }

  static async updateUserById(id: number, data: DeepPartial<IUser>): Promise<IUser> {
    return request({
      url: `/api/user/${id}`,
      method: 'patch',
      data: data,
    })
  }

  static async updateUser( data: DeepPartial<IUser>): Promise<IUser|null> {
    const res = await request({
      method: 'put',
      url: '/api/user',
      data
    })
    if(res.err) {
      return null
    }
    return res
  }

  static async deleteUser(): Promise<any|null> {
    const res = await request({
      method: 'delete',
      url: '/api/user',
    })
    if(res.err) {
      return null
    }
    return res
  }

}
