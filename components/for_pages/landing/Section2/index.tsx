import styles from './index.module.scss'
import Image from 'next/image'


interface Props {
}

export default function Section2(props: Props) {

  return (  <section className={styles.section}>
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <Image src={'/images/landings/s2card2_1.png'} className={styles.i2} width={263} height={406} alt={'card2'}/>
        <Image src={'/images/landings/s2card1_1.png'} className={styles.i1} width={263} height={406} alt={'card1'} />
        <Image src={'/images/landings/match.png'} className={styles.match} width={200} height={200}  alt={'match'}/>
      </div>

      <div className={styles.content}>
        <p className={styles.title}>🤔 Почему рестораны дают <span>скидки?</span></p>
        <p className={styles.description}>В любом заведении есть часы, когда столы пустуют. Мы помогаем ресторану превратить это время в деньги, а вам – сэкономить и хорошо провести время!</p>
      </div>

    </div>
  </section>)
}