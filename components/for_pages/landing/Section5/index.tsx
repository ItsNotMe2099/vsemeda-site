import styles from './index.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { SectionType } from '..'



interface Props {
  type: SectionType
}

export default function Section5(props: Props) {

  const texts = {
    1: 'Наши партнеры – ваши любимые рестораны. Выбирайте по кухне и блюдам, открывайте новые места на карте или находите лучшие по скидкам!',
    2: 'Доставим пиццу, роллы и сотни других блюд со скидками до 50%!'
  }

  const data = {
    texts: props.type === 'rest'?[texts[1]]:[texts[1],texts[2]]
  }

  return (  
  <section className={styles.section}>
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <p className={styles.title}>📱Как все работает? </p>
        {data.texts.map((text, index) => <p key={index} className={styles.description}>{text}</p>)}
        <div className={styles.links}>
          <Link href={'/'} >
            <Image src={'/images/landings/appStore.png'} alt={'appSore link'} width={180} height={53}/>
          </Link>
          <Link href={'/'} >
            <Image src={'/images/landings/gPlay.png'} alt={'gPlay link'}  width={180} height={53} />
          </Link>
        </div>
      </div>
      <Image src={'/images/landings/s5iphone2.png'} alt={'app'} className={styles.image} width={424} height={699}/>
    </div>
  </section>)
}