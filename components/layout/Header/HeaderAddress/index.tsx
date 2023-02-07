import styles from './index.module.scss'
import PlaceCheckSvg from 'components/svg/PlaceCheckSvg'
import {colors} from 'styles/variables'
import ChevronSvg from 'components/svg/ChevronSvg'
import classNames from 'classnames'
import {useAppContext} from 'context/state'
import {ModalType} from 'types/enums'

interface Props {
}

export default function HeaderAddress(props: Props) {

  const appContext = useAppContext()

  const handleClick = () => {
    appContext.showModal(ModalType.AddressForm)
  }

  const handleClose = () => {

  }

  return (
    <div className={classNames(styles.root, {[styles.open]: false})} onClick={handleClick}>
      <PlaceCheckSvg className={styles.chevron} color={colors.white}/>
      <div className={styles.value}>Салтыкова-Щедрина, 15/2</div>
      <ChevronSvg className={styles.chevron} color={colors.white}/>
    </div>
  )
}
