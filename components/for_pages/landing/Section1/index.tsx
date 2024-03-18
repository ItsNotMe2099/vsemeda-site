import styles from './index.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { SectionType } from '..'



interface Props {
  type: SectionType
}

export default function Section1(props: Props) {

  const data = {
    imageSrc: props.type === 'rest'?'/images/landings/s1Middle.png':'/images/landings/s1MiddleDelivery.png',
    header: props.type === 'rest'?'Ходи в ресторан только со скидкой!':'Заказывай еду только со скидкой!',
    description: props.type === 'rest'?'Всем Еда – сервис, где все рестораны, кафе и бары дают грандиозные скидки!':'Всем Еда – новый сервис доставки еды, где ты можешь заказать блюда со скидками до 50%! '
  }

  return (
  <section className={styles.section}>
    <Image className={styles.bg} src={'/images/landings/bgelements.png'} alt='background' width={1920} height={538}/>
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.title}>{data.header}</h1>
        <p className={styles.description}>{data.description}</p>
        <Link href={'/'} className={styles.link} >Скачать приложение</Link>
        <Image src={'/images/landings/s1Arrow.svg'}  width="83" height="245" alt={'arrow'} className={styles.svg}/>
      </div>
      <Image src={data.imageSrc} width={634} height={634} alt={'discounts'}/>
    </div>

  </section>)
}