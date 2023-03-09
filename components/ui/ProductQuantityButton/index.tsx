import styles from './index.module.scss'
import PlusSvg from 'components/svg/PlusSvg'
import {colors} from 'styles/variables'
import classNames from 'classnames'
import MinusSvg from 'components/svg/MinusSvg'

interface Props {
  disabled?: boolean
  quantity: number | string
  onAddClick: () => void,
  onMinusClick: () => void,
  className?: string
}

export default function ProductQuantityButton(props: Props) {
  return (<div className={classNames(styles.root, {[styles.empty]: !props.quantity}, props.className)}
               >
      {props.quantity > 0 && <div onClick={props.disabled ? null : props.onMinusClick}
                                  className={styles.btn}>
        <MinusSvg color={colors.black}/>
      </div>}
      {props.quantity > 0 && <div className={styles.quantity}>{props.quantity}</div>}
      {(props.quantity === 0 || !props.quantity) && <div className={styles.emptyText} onClick={props.disabled ? null : props.onAddClick}>Добавить</div>}

      {props.quantity > 0 && <div onClick={props.disabled ? null : props.onAddClick}
                                  className={styles.btn}>
        <PlusSvg color={colors.black}/>
      </div>}
    </div>
  )
}

