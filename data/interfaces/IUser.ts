import {IUserAddress} from 'data/interfaces/IUserAddress'
import {PaymentMethod} from 'data/enum/PaymentMethod'
import {Gender} from 'data/enum/Gender'

export interface IUser {
  id: string
  phone: string
  name: string
  email: string
  birthday: string
  gender: Gender
  addresses: IUserAddress[]
  currentAddress?: IUserAddress
  currentAddressId: string
  paymentMethod: PaymentMethod
}
