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
    <div className={classNames(styles.root, { [styles.open]: false, [styles.mobile]: props.isMobile })} onClick={handleClick}>
      {!props.isMobile ? <><PlaceCheckSvg className={styles.chevron} color={colors.white} />
        <div className={styles.value}>{appContext.currentAddress?.address ?? 'Выберите адрес'}</div></>
        :
        <div className={styles.top}>
          <div className={styles.value} style={{ color: '#828282' }}>Ваш адрес доставки</div>
          <ChevronSvg className={styles.chevron} color={props.isMobile ? '#4F423C' : colors.white} />
        </div>
      }
      {!props.isMobile ? <ChevronSvg className={styles.chevron} color={props.isMobile ? '#4F423C' : colors.white} /> : null}
      {props.isMobile ? <div className={styles.value}>{appContext.currentAddress?.address ?? null}</div> : null}
    </div>
  )
}
