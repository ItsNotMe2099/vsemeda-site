import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  className?: string
  onClick: () => void
}

export default function Auth(props: Props) {

  return (
    <div onClick={props.onClick} className={classNames(styles.authWrapper, props.className)}>
      <div className={styles.auth}>
        <div className={styles.icon}>
          <img src='/images/header/login.svg'/>
        </div>
        <div className={styles.text}>Войти</div>
      </div>
    </div>
  )
}
