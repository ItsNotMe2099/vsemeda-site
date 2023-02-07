import styles from './index.module.scss'
import {colors} from 'styles/variables'
import ChevronSvg from 'components/svg/ChevronSvg'
import classNames from 'classnames'
import ScooterSvg from 'components/svg/ScooterSvg'
import {useAppContext} from 'context/state'
import {ModalType} from 'types/enums'

interface Props {
}

export default function HeaderDelivery(props: Props) {
  const appContext = useAppContext()

  const handleClick = () => {
      appContext.showModal(ModalType.AddressForm)
  }

  const handleClose = () => {

  }

  return (
    <div className={classNames(styles.root, {[styles.open]: false})} onClick={handleClick}>
      <ScooterSvg className={styles.chevron} color={colors.white}/>
      <div className={styles.value}>45-60 мин</div>
      <ChevronSvg className={styles.chevron} color={colors.white}/>
    </div>
  )
}
