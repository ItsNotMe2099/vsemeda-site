import styles from './index.module.scss'
import Link from 'next/link'
import Image from 'next/image'



interface Props {
}

export default function Section5(props: Props) {

  return (  
  <section className={styles.section}>
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <p className={styles.title}>📱Как все работает? </p>
        <p className={styles.description}>Наши партнеры – ваши любимые рестораны. Выбирайте по кухне и блюдам, открывайте новые места на карте или находите лучшие по скидкам!</p>
        <div className={styles.links}>
          <Link href={'/'}>
            <Image src={'/images/landings/appStore.png'} alt={'appSore link'} width={180} height={53}/>
          </Link>
          <Link href={'/'}>
            <Image src={'/images/landings/gPlay.png'} alt={'gPlay link'}  width={180} height={53} />
          </Link>
        </div>
      </div>
      <Image src={'/images/landings/s5iphone.png'} alt={'app'} width={626} height={804}/>
    </div>
  </section>)
}