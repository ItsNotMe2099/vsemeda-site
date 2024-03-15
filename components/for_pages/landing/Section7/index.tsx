import styles from './index.module.scss'
import Image from 'next/image'


interface Props {
}

export default function Section7(props: Props) {

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
      <Image src={'/images/landings/s7card.png'} alt={'card'} width={530} height={767}/>
    </div>
  </section>)
}