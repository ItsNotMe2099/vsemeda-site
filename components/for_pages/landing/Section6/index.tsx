import { SectionType } from '..'
import styles from './index.module.scss'
import Image from 'next/image'

interface Props {
  type: SectionType
}

export default function Section6(props: Props) {

  const data = {
    text1: props.type === 'rest'? 'Выбирайте дату, заведение, время слота':'Выбирайте 1 из 5 акций.',
    text2: props.type === 'rest'? 'Получите QR-код на скидку за 100р':'Находите ресторан по кухне, блюдам или скорости доставки.',
    text3: props.type === 'rest'?'Приходите в ресторан и наслаждайтесь выгодой':'Наслаждайтесь выгодой до 50%. '
  }

  return (  <section className={styles.section}>
    <Image src={'/images/landings/s6texture.png'} className={styles.background} alt={'background'} width={1920} height={828}/>
    <div className={styles.wrapper}>
      <p className={styles.title}>До скидки всего 3 шага!</p>
      <div className={styles.content}>
        <div className={styles.step}>
          <div className={styles.stepImageWrapper}>
            <Image src={'/images/landings/s6calendar.svg'} alt={'calendar'} width={96} height={96} />
          </div>
          <p className={styles.stepDescription}>{data.text1}</p>
        </div>

        <Image src={'/images/landings/s6arrow.svg'} className={styles.arrow} alt={'arrow'} width="291" height="40"/>

        <div className={styles.step}>
          <div className={styles.stepImageWrapper}>
            <Image src={'/images/landings/s6qrcode.svg'} alt={'qrcode'} width={96} height={96} />
          </div>
          <p className={styles.stepDescription}>{data.text2}</p>
        </div>

        <Image src={'/images/landings/s6arrow.svg'} className={styles.arrow} alt={'arrow'} width="291" height="40" style={{transform: 'rotateX(180deg)'}}/>

        <div className={styles.step}>
          <div className={styles.stepImageWrapper}>
            <Image src={'/images/landings/s6fastfood.svg'} alt={'fastfood'} width={96} height={96} />
          </div>
          <p className={styles.stepDescription}>{data.text3}</p>
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