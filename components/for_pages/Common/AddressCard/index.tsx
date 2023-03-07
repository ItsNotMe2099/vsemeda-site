import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import {IUserAddress} from 'data/interfaces/IUserAddress'
import classNames from 'classnames'
import CheckSvg from 'components/svg/CheckSvg'
import PlaceMarkSvg from 'components/svg/PlaceMarkSvg'
import {colors} from 'styles/variables'
import PencilSvg from 'components/svg/PencilSvg'
import {ModalType} from 'types/enums'
import {AddressFormModalArguments} from 'components/modals/AdressModal'

interface IItem {
  slug: string
  background: string
  name: string
  desc: string
}

interface Props {
  item: IUserAddress
  isSelected?: boolean
  onClick: () => void
}

export default function AddressCard({ item, isSelected, onClick }: Props) {
  const appContext = useAppContext()

  const handleEdit = () => {
    appContext.showModal(ModalType.AddressForm, {address: item} as AddressFormModalArguments)
  }
  return (
   <div className={classNames(styles.root, {[styles.selected]: isSelected})} onClick={onClick}>
     <div className={styles.icon}>{isSelected ? <CheckSvg color={colors.black}/> : <PlaceMarkSvg color={colors.grey2}/>}</div>
     <div className={styles.info}>
     <div className={styles.subTitle}>{item.address}</div>
     </div>
     <div className={styles.edit} onClick={handleEdit}><PencilSvg color={'#BDBDBD'}/></div>
   </div>
  )
}
