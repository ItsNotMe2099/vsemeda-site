import Image from 'next/image'
import styles from './index.module.scss'

interface Props {
  
}

export default function Basket(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.empty}>
        <div className={styles.img}>
          <Image src='/images/restaurant/basket.svg' alt='Пустая корзина' fill/>
        </div>
        <p className={styles.text}>В вашей корзине пусто</p>
      </div>
    </div>
  )
}
