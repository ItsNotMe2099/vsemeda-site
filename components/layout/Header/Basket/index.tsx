import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  className?: string
  onClick: () => void
}

export default function Basket(props: Props) {

  return (
    <div onClick={props.onClick} className={classNames(styles.root, props.className)}>
      <img src='/images/basket/basket.svg' alt=''/>
    </div>
  )
}
