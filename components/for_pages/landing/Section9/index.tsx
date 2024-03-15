import styles from './index.module.scss'
import Image from 'next/image'


interface Props {
}

export default function Section9(props: Props) {

  return (<section className={styles.section}>
    <Image src={'/images/landings/s9texture.png'} alt={'texture'} width={1920} height={940} className={styles.texture} />
    <Image src={'/images/landings/s9bgImages.png'} alt={'backImage'} className={styles.backImage} width={1920} height={519}/>
    <div className={styles.wrapper}>
      <p className={styles.title}>🙌 Подключайте свой ресторан!</p>
      <p className={styles.subTitle}>Становитесь партнером, давайте скидки и зарабатывайте на часах простоя.</p>
      <button className={styles.button}>Узнать больше</button>
    </div>
  </section>
)
}