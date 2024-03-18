import { SectionType } from '..'
import styles from './index.module.scss'
import Image from 'next/image'


interface Props {
  type: SectionType
}

export default function Section3(props: Props) {

  const data = {
    imageSrc: props.type === 'rest'?
    '/images/landings/s3cards2.png':
    '/images/landings/s3cardsDelivery.png',
    header: props.type === 'rest'?
    'Почему рестораны дают':
    'Откуда',
    description: props.type === 'rest'?
    'В любом заведении есть часы,  когда столы пустуют. Мы помогаем ресторану превратить это время в деньги, а вам – сэкономить и хорошо провести время!':
    'Сегодня у популярных агрегаторов комиссия для ресторанов доходит до 35% от чека. В нашем сервисе рестораны платят всего 5% комиссии, а разницу дают вам в виде выгодных акций и скидок до 50%. '
  }

  return (  
  <section className={styles.section}>
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <p className={styles.title}>🙌 Где мы, там <span>скидки!</span></p>
        <p className={styles.description}>К нам подключатся все: от ресторанов с авторской кухней и модных баров, куда почти невозможно попасть, до кофеен, шаурмечных и кальянных, когда им нужны дополнительные гости.</p>
        <p className={styles.description}>Выбирай для офисного обеда, свидания, грандиозной вечеринки или детского праздника.  И во всех случаях – получайте скидку! </p>
      </div>

      <div className={styles.imageWrapper}>
        <Image src={data.imageSrc} alt={''} width={750} height={690}/>
      </div>
    </div>
  </section>
)
}