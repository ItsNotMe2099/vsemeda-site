import styles from './index.module.scss'
import {colors} from 'styles/variables'
import classNames from 'classnames'
import UserSvg from 'components/svg/UserSvg'

interface Props {
}

export default function LoginButton(props: Props) {


  const handleClick = () => {

  }

  const handleClose = () => {

  }

  return (
    <div className={classNames(styles.root, {[styles.open]: false})} onClick={handleClick}>
      <UserSvg className={styles.chevron} color={colors.white}/>
      <div className={styles.name}>Вход</div>
    </div>
  )
}
