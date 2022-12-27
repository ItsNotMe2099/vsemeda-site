import Image from 'next/image'
import { forwardRef } from 'react'
import styles from './index.module.scss'
import { Sticky } from 'react-sticky'
import classNames from 'classnames'

interface Props {
  isSticky?: boolean
  restProps?: any
}

const BasketInner = forwardRef<HTMLDivElement, Props & { style?: any }>((props, ref) => {

  return (
    <div className={styles.wrap} ref={ref} style={props.style} {...(props.restProps ?? {})}>
      <div id='basket' className={styles.root}>
        <div className={styles.empty}>
          <div className={styles.img}>
            <Image src='/images/restaurant/basket.svg' alt='Пустая корзина' fill />
          </div>
          <p className={styles.text}>В вашей корзине пусто</p>
        </div>
      </div>
    </div>
  )
})

BasketInner.displayName = 'BasketInner'
export default function Basket(props: Props) {

  if (props.isSticky) {
    return <Sticky>{({ style, isSticky, ...rest }) => <BasketInner {...props} restProps={rest} style={style} />}</Sticky>
  } else {
    return <BasketInner {...props} />
  }
}
