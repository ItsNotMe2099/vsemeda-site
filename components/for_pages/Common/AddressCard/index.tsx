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
import usePressAndHover from 'hooks/usePressAndHover'

interface Props {
  item: IUserAddress
  isSelected?: boolean
  onClick: () => void
  className?: string
}

export default function AddressCard({ item, isSelected, onClick, className }: Props) {
  const appContext = useAppContext()
  const [wrapperRef, press, hover] = usePressAndHover()
  const handleEdit = () => {
    appContext.showModal(ModalType.AddressForm, {address: item} as AddressFormModalArguments)
    // appContext.showModal(ModalType.AddressForm)
  }
  return (
   <div ref={wrapperRef} className={classNames(styles.root, {[styles.selected]: isSelected, [styles.hover]: hover, [className]: isSelected})} >
     <div onClick={onClick} className={styles.icon}>{isSelected ? <CheckSvg color={colors.black}/> : <PlaceMarkSvg color={hover ? colors.black : colors.grey2}/>}</div>
     <div className={styles.info}>
     <div className={styles.subTitle}>{item.address}</div>
     </div>
     <div className={styles.edit} onClick={handleEdit}><PencilSvg color={'#BDBDBD'}/></div>
   </div>
  )
}
