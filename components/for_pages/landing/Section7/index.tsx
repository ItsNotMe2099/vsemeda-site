import { SectionType } from '..'
import styles from './index.module.scss'
import Image from 'next/image'


interface Props {
  type: SectionType
}

export default function Section7(props: Props) {

  const data = {
    imageSrc: props.type === 'rest'?'/images/landings/s7card.png':'/images/landings/s7cardDelivery.png',
    imageSrcMid: props.type === 'rest'?'/images/landings/s7cardMid.png':'/images/landings/s7cardDeliveryMid.png'
  }

  return (  <section className={styles.section}>
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.title}>
          🙏 А можно еще <span>дешевле?</span>
          <Image src={'/images/landings/s7arrow.svg'} alt={'arrow'} className={styles.arrow}  width="134" height="95"/>
        </div>
        <p className={styles.subTitle}>Да! С подпиской <span>“Всем Еда”</span></p>
        <div className={styles.checkList}>
          <p className={styles.checkItem}>
            <Image src={'/images/landings/s7check.svg'} alt={'check'} width={48} height={48}/>
            Уведомления, когда любимый ресторан дает скидку
          </p>
          <p className={styles.checkItem}>
            <Image src={'/images/landings/s7check.svg'} alt={'check'} width={48} height={48}/>
              Бесплатную доставку
          </p>
          <p className={styles.checkItem}>
            <Image src={'/images/landings/s7check.svg'} alt={'check'} width={48} height={48}/>
            Бонусы и подарки от заведений
          </p>
          <p className={styles.checkItem}>
            <Image src={'/images/landings/s7check.svg'} alt={'check'} width={48} height={48}/>
            Возможность подписаться на любимый ресторан
          </p>
        </div>
        <p className={styles.price}><span>всего</span> 300 руб. / месяц</p>
        <button className={styles.button}>Оформить подписку</button>

      </div>
      <picture>
        <source srcSet={data.imageSrcMid} width={434} height={767} media='(max-width: 1350px)'/>
        <Image className={styles.card} src={data.imageSrc} alt={'card'} width={530} height={767}/>
      </picture>
    </div>
  </section>)
}