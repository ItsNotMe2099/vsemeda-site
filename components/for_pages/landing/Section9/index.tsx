import classNames from 'classnames'
import { SectionType } from '..'
import styles from './index.module.scss'
import Image from 'next/image'


interface Props {
  type: SectionType
}

export default function Section9(props: Props) {

 const data = {
  description: props.type === 'rest'?'Становитесь партнером, давайте скидки и зарабатывайте на часах простоя.':'Становитесь партнером, давайте скидки и экономьте на комиссии.'
 }

  return (<section className={styles.section}>
    <Image src={'/images/landings/s9texture.png'} alt={'texture'} width={1920} height={940} className={styles.texture} />
    <Image src={'/images/landings/s9bgImages.png'} alt={'backImage'} className={styles.backImage} width={1920} height={519}/>
    <div className={styles.wrapper}>
      <p className={styles.title}>🙌 Подключайте свой ресторан!</p>
      <p className={styles.subTitle}>{data.description}</p>
      <button className={classNames(styles.button, props.type === 'delivery' && styles.button_pink)}>Узнать больше</button>
    </div>
  </section>
)
}