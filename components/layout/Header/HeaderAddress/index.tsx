import styles from './index.module.scss'
import PlaceCheckSvg from 'components/svg/PlaceCheckSvg'
import {colors} from 'styles/variables'
import ChevronSvg from 'components/svg/ChevronSvg'
import classNames from 'classnames'
import {useAppContext} from 'context/state'
import {ModalType} from 'types/enums'
import {useAddressContext} from 'context/address_state'

interface Props {
}

export default function HeaderAddress(props: Props) {

  const appContext = useAppContext()
  const addressContext = useAddressContext()

  const handleClick = () => {
    appContext.showModal(ModalType.AddressList)
  }

  const handleClose = () => {

  }

  return (
    <div className={classNames(styles.root, {[styles.open]: false})} onClick={handleClick}>
      <PlaceCheckSvg className={styles.chevron} color={colors.white}/>
      <div className={styles.value}>{appContext.currentAddress?.address ?? 'Выберите адрес'}</div>
      <ChevronSvg className={styles.chevron} color={colors.white}/>
    </div>
  )
}
