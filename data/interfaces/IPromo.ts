import {DiscountType} from 'data/enum/DiscountType'
import {PromoTemplate} from 'data/enum/PromoTemplate'
import {PromoIcon} from 'data/enum/PromoIcon'
import IFile from 'data/interfaces/IFile'
import {PromoType} from 'data/enum/PromoType'
import {PromoKind} from 'data/enum/PromoKind'
import {PromoColor} from 'data/enum/PromoColor'

export interface IPromo {
  id: number
  type: PromoType
  kind: PromoKind
  name: string
  badge: string
  description: string
  discountType: DiscountType
  discountValue: number
  icon: PromoIcon
  template: PromoTemplate
  image?: IFile
  imageVert?: IFile
  imageLarge?: IFile
  color: PromoColor
  textColor: string
  badgeColor: string
  badgeTextColor: string
  categoriesIds: number[]


}
