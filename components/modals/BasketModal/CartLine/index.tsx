import styles from './index.module.scss'
import * as React from 'react'
import classNames from 'classnames'
import { ICartLine } from 'data/interfaces/ICartLine'
import Image from 'next/image'
import MinusSvg from 'components/svg/MinusSvg'
import PlusSvg from 'components/svg/PlusSvg'
import { useCartContext } from 'context/cart_state'

interface Props {
  item: ICartLine
  onClick?: () => void
  className?: string
  quantity: number
}

export default function CartLine({ item, onClick, className, quantity }: Props) {

  const cartContext = useCartContext()

  const handleUpdateQuantity = (isAdd: boolean) => {
    
    
      cartContext.updateProductQuantityFromCart(item, isAdd)
  }

  return (
    <div className={classNames(styles.root, className)} onClick={onClick}>
      <Image className={styles.image} src={item.product.image?.link} alt='' fill />
      <div className={styles.info}>
        <div className={styles.name}>
          {item.product.name}
        </div>
        <div className={styles.bottom}>
          <div className={styles.price}>
            {item.product.price}₽
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.quantity}>
          <MinusSvg className={styles.symbol} color='#000' onClick={() => handleUpdateQuantity(false)}/>
          <div className={styles.number}>{quantity}</div>
          <PlusSvg className={styles.symbol} color='#000' onClick={() => handleUpdateQuantity(true)}/>
        </div>
      </div>
      {item.modificationLines.length > 0 &&
        <div className={styles.modifications}>
          {item.modificationLines.map(m=> {
            return <p>{m.modification.name}</p>
          })}
        </div>
      }
    </div>
  )
}
