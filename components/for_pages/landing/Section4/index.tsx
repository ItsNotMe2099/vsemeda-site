import styles from './index.module.scss'
import Image from 'next/image'
import classnames from 'classnames'



interface Props {
}

export default function Section4(props: Props) {

  return (  
  <section className={styles.section}>
    <div className={styles.wrapper}>
      <picture>
        <source srcSet='/images/landings/pixelMapMid.png' media={'(max-width: 1200px)'} width={457} height={277}/>
        <Image src={'/images/landings/pixelMap.png'} alt={'pixelMap'} width={633} height={270}/>
      </picture>

      <div className={styles.content}>
        <p className={styles.title}>🧭 Где есть Всем Еда?</p>
        <p className={styles.description}>Петербург, Москва, Ростов-на-Дону, Калининград уже с нами, совсем скоро мы охватим всю Россию. </p>
        <div className={styles.tags}>
          <div className={styles.tag}>Москва</div>
          <div className={styles.tag}>Ростов-на-Дону</div>
          <div className={styles.tag}>Калининград <p className={styles.badge}>NEW</p></div>
          <div className={classnames(styles.tag, styles.tag_grey)}>Краснодар <p className={styles.badge}>СКОРО</p></div>
          <div className={classnames(styles.tag, styles.tag_grey)}>Новосибирск <p className={styles.badge}>СКОРО</p></div>
          <div className={classnames(styles.tag, styles.tag_grey)}>Челябинск <p className={styles.badge}>СКОРО</p></div>
        </div>
      </div>

    </div>
  </section>)
}