import { SectionType } from '..'
import styles from './index.module.scss'
import Image from 'next/image'


interface Props {
  type: SectionType
}

export default function Section3(props: Props) {
  const texts = {
    '1': 'К нам подключатся все: от ресторанов с авторской кухней и модных баров, куда почти невозможно попасть, до кофеен, шаурмечных и кальянных, когда им нужны дополнительные гости.',
    '2': 'Выбирай для офисного обеда, свидания, грандиозной вечеринки или детского праздника. И во всех случаях – получайте скидку!',
    '3': 'К нам подключатся все: от ресторанов с авторской кухней до кофеен и стритфуда.',
    '4': 'Выбирай блюда для офисного обеда, свидания, грандиозной вечеринки или детского праздника. И во всех случаях – получайте скидку!'
  }

  const data = {
    imageSrc: props.type === 'rest'?
    '/images/landings/s3cards2.png':
    '/images/landings/s3cardsDelivery.png',
    description: props.type === 'rest'? [texts['1'], texts['2']]:[texts['3'], texts['4']]
  }

  return (  
  <section className={styles.section}>
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <p className={styles.title}>🙌 Где мы, там <span>скидки!</span></p>
        {data.description.map(el=> {
          return <p className={styles.description}>{el}</p>
        })}
      </div>

      <div className={styles.imageWrapper}>
        <Image src={data.imageSrc} alt={''} className={styles.image} width={750} height={690}/>
      </div>
    </div>
  </section>
)
}