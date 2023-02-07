import styles from './index.module.scss'
import PlusSvg from 'components/svg/PlusSvg'
import {colors} from 'styles/variables'
import classNames from 'classnames'

interface Props {
  disabled?: boolean
  quantity: number | string
  onAddClick: () => void,
  onMinusClick: () => void,
  className?: string
}

export default function ProductQuantityButton(props: Props) {
  return (<div className={classNames(styles.root, {[styles.empty]: !props.quantity }, props.className)} onClick={props.disabled ? null : props.onAddClick}>
      {props.quantity > 0 && <div onClick={props.disabled ? null : props.onAddClick}
                                  className={styles.btn}>
        <PlusSvg color={colors.black}/>
      </div>}
    {props.quantity > 0 && <div className={styles.quantity}>{props.quantity}</div>}
      <div className={styles.emptyText}>Добавить</div>
      {props.quantity > 0 && <div onClick={props.disabled ? null : props.onMinusClick}
                                  className={styles.btn}>
        <PlusSvg color={colors.black}/>
      </div>}
    </div>
  )
}

