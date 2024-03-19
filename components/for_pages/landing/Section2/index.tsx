import { SectionType } from '..'
import styles from './index.module.scss'
import Image from 'next/image'


interface Props {
  type: SectionType
}

export default function Section2(props: Props) {

  const data = {
    imageSrc: props.type === 'rest'?
    '/images/landings/s2Cards.png':
    '/images/landings/s2CardsDelivery.png',
    header: props.type === 'rest'?
    'Почему рестораны дают':
    'Откуда',
    description: props.type === 'rest'?
    'В любом заведении есть часы,  когда столы пустуют. Мы помогаем ресторану превратить это время в деньги, а вам – сэкономить и хорошо провести время!':
    'Сегодня у популярных агрегаторов комиссия для ресторанов доходит до 35% от чека. В нашем сервисе рестораны платят всего 5% комиссии, а разницу дают вам в виде выгодных акций и скидок до 50%. '
  }


  return (  <section className={styles.section}>
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <Image src={data.imageSrc} alt={'cards'} width={736} height={770} className={styles.image}/>
      </div>

      <div className={styles.content}>
        <p className={styles.title}>🤔 {data.header} <span>скидки?</span></p>
        <p className={styles.description}>{data.description}</p>
      </div>

    </div>
  </section>)
}