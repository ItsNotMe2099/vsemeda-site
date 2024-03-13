import styles from './index.module.scss'
import Image from 'next/image'


interface Props {
}

export default function Section3(props: Props) {

  return (  
  <section className={styles.section}>
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <p className={styles.title}>🙌 Где мы, там <span>скидки!</span></p>
        <p className={styles.description}>К нам подключатся все: от ресторанов с авторской кухней и модных баров, куда почти невозможно попасть, до кофеен, шаурмечных и кальянных, когда им нужны дополнительные гости.</p>
        <p className={styles.description}>Выбирай для офисного обеда, свидания, грандиозной вечеринки или детского праздника.  И во всех случаях – получайте скидку! </p>
      </div>

      <div className={styles.imageWrapper}>
        <Image src={'/images/landings/s3cards2.png'} alt={''} width={750} height={690}/>
      </div>
    </div>
  </section>
)
}