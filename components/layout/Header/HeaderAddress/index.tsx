import styles from './index.module.scss'
import PlaceCheckSvg from 'components/svg/PlaceCheckSvg'
import { colors } from 'styles/variables'
import ChevronSvg from 'components/svg/ChevronSvg'
import classNames from 'classnames'
import { useAppContext } from 'context/state'
import { ModalType } from 'types/enums'
import { useAddressContext } from 'context/address_state'

interface Props {
  isMobile?: boolean
  isSticky?: boolean
}

export default function HeaderAddress(props: Props) {

  const appContext = useAppContext()
  const addressContext = useAddressContext()

  const handleClick = () => {
    if(!appContext.isLogged && appContext.addresses.length === 0) {
      props.isMobile ? appContext.showBottomSheet(ModalType.AddressForm, {address: appContext.currentAddress}) : appContext.showModal(ModalType.AddressForm, {address: appContext.currentAddress})
    }
    else {
      props.isMobile ? appContext.showBottomSheet(ModalType.AddressList) : appContext.showModal(ModalType.AddressList)
    }
  }

  const handleClose = () => {

  }

  return (
    <div className={classNames(styles.root, { [styles.open]: false, [styles.mobile]: props.isMobile })} onClick={handleClick}>
      {!props.isMobile ? <><PlaceCheckSvg className={styles.chevron} color={colors.white} />
        <div className={styles.value}>{appContext.currentAddress?.address ?? 'Выберите адрес'}</div></>
        :
        <div className={classNames(styles.top, {[styles.sticky]: props.isSticky})}>
          <div className={styles.value} style={{ color: '#828282' }}>Ваш адрес доставки</div>
          <ChevronSvg className={styles.chevron} color={props.isMobile && !props.isSticky ? '#4F423C' : props.isSticky ? '#C8B5FF' : colors.white} />
        </div>
      }
      {!props.isMobile ? <ChevronSvg className={styles.chevron} color={props.isMobile ? '#4F423C' : colors.white} /> : null}
      {props.isMobile ? <div className={classNames(styles.value, {[styles.stickyValue]: props.isSticky})}>{appContext.currentAddress?.address ?? null}</div> : null}
    </div>
  )
}
