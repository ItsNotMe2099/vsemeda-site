import { SectionType } from '..'
import styles from './index.module.scss'
import Image from 'next/image'


interface Props {
  type: SectionType
}

export default function Section8(props: Props) {

  const data = {
    title: props.type === 'rest'?
    'А когда нет времени или просто лень выходить из дома, заказывайте доставку ':
    'А когда хочется сходить в ресторан или отметить важный день, бронируйте столик в заведениях',
    description: props.type === 'rest'?
    'Доставим пиццу, роллы и сотни других блюд со скидками до 50%! Покупай всегда по лучшей цене!':
    'Покупай всегда по лучшей цене!',
    imageSrc: props.type === 'rest'?
    '/images/landings/s8girl.png':
    '/images/landings/s8GirlDelivery2.png'

  }

  return (  <section className={styles.section}>
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <p className={styles.title}>{data.title} <br /><span>Тоже со скидкой</span></p>
        <p className={styles.subTitle}>{data.description}</p>
        <button className={styles.button}>Узнать больше</button>
      </div>
      <Image src={data.imageSrc} alt={'girl'} className={styles.girlImage} width={555} height={650}/>
    </div>
  </section>)
}