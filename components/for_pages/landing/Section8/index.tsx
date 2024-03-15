import styles from './index.module.scss'
import Image from 'next/image'


interface Props {
}

export default function Section8(props: Props) {

  return (  <section className={styles.section}>
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <p className={styles.title}>А когда нет времени или просто лень выходить из дома, заказывайте доставку <br /><span>Тоже со скидкой</span></p>
        <p className={styles.subTitle}>Доставим пиццу, роллы и сотни других блюд со скидками до 50%! Покупай всегда по лучшей цене!</p>
        <button className={styles.button}>Узнать больше</button>
      </div>
      <Image src={'/images/landings/s8girl.png'} alt={'girl'} className={styles.girlImage} width={555} height={650}/>
    </div>
  </section>)
}