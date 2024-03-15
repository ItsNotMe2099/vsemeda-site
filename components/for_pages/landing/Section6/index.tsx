import styles from './index.module.scss'
import Image from 'next/image'

interface Props {
}

export default function Section6(props: Props) {

  return (  <section className={styles.section}>
    <Image src={'/images/landings/s6texture.png'} className={styles.background} alt={'background'} width={1920} height={828}/>
    <div className={styles.wrapper}>
      <p className={styles.title}>До скидки всего 3 шага!</p>
      <div className={styles.content}>
        <div className={styles.step}>
          <div className={styles.stepImageWrapper}>
            <Image src={'/images/landings/s6calendar.svg'} alt={'calendar'} width={96} height={96} />
          </div>
          <p className={styles.stepDescription}>Выбирайте дату, заведение, время слота</p>
        </div>

        <Image src={'/images/landings/s6arrow.svg'} className={styles.arrow} alt={'arrow'} width="291" height="40"/>

        <div className={styles.step}>
          <div className={styles.stepImageWrapper}>
            <Image src={'/images/landings/s6qrcode.svg'} alt={'qrcode'} width={96} height={96} />
          </div>
          <p className={styles.stepDescription}>Получите QR-код на скидку за 100р</p>
        </div>

        <Image src={'/images/landings/s6arrow.svg'} className={styles.arrow} alt={'arrow'} width="291" height="40" style={{transform: 'rotateX(180deg)'}}/>

        <div className={styles.step}>
          <div className={styles.stepImageWrapper}>
            <Image src={'/images/landings/s6fastfood.svg'} alt={'fastfood'} width={96} height={96} />
          </div>
          <p className={styles.stepDescription}>Приходите в ресторан и наслаждайтесь выгодой</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p className={styles.bottomDescription}>
          Зачем платить по полной цене, если можно со скидкой?
        </p>
        <button className={styles.button}>Получить скидки</button>
      </div>
    </div>
  </section>)
}