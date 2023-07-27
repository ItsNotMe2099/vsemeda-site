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
  theme?: 'white' | 'grey'
  min?: number,
  price?: string
}

export default function ProductQuantityButton(props: Props) {
  return (<div className={classNames(styles.root, {[styles.empty]: !props.quantity, [styles[props.theme]]: true}, props.className)}
               onClick={props.disabled || props.quantity > 0 ? null : props.onAddClick}>
      {props.quantity > 0 && <div onClick={props.disabled ? null : props.onMinusClick}
                                  className={styles.btn}>
        <MinusSvg color={props.theme ==='white'?  colors.white : colors.black}/>
      </div>}
      {props.quantity > 0 && <div className={styles.quantity}>{props.quantity}</div>}
      {(props.quantity === 0 || !props.quantity) && <div className={styles.emptyText}>{props.price?props.price:'Добавить'}</div>}

      {props.quantity > 0 && <div onClick={props.disabled ? null : props.onAddClick}
                                  className={styles.btn}>
        <PlusSvg color={props.theme ==='white'?  colors.white : colors.black}/>
      </div>}
    </div>
  )
}

