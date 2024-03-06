import {ILocation} from 'data/interfaces/ILocation'
import {IUnitCardLayout} from 'data/interfaces/IUnitCardLayout'
import IFile from 'data/interfaces/IFile'

export interface IRestaurant {
  id: number
  image: IFile
  logo: IFile
  timezone: number
  name: string
  slug: string
  pausedUntil: Date
  rating: number
  address: string
  location: ILocation
  isAvailable?: boolean
  cardLayout?: IUnitCardLayout
}
