import styles from './index.module.scss'
import Image from 'next/image'


interface Props {
}

export default function Footer(props: Props) {

  return (  <footer className={styles.section}>
    <div className={styles.wrapper}>
      <p className={styles.text}>© 2021–2024 ООО «Яндекс Пэй» Москва, Садовническая, 82, стр. 2. Оформление заказа и приобретение товаров осуществляется в соответствии с Договором поручения. Не является публичной офертой, есть ограничения на использование сервиса.</p>
      <p className={styles.text}>Улучшенный сплит: Кредит от АО «Яндекс Банк». ПСК: 10.03% — 34.90%, процентная ставка: от 10% до 49,9% годовых. Лимит кредитования — от 1000 рублей до 295 000 рублей. Карта Сплита — электронное средство платежа выпускаемое к потребительскому кредиту с лимитом кредитования «Улучшенный Сплит».</p>
      <p className={styles.text}>*«Сплитовать» значит разделять и оплачивать частями стоимость товаров с использованием функционала сервиса Яндекс Сплит.</p>
    </div>
    <div className={styles.qrcode}>
      <div className={styles.qrcodeWrapper}>
        <Image src={'/images/landings/QRfooter.svg'} alt={'qrcode'} width="107" height="107"/>
        <p className={styles.qrcodeText}>Скачать <br /> приложение <br /> VsemEda</p>
      </div>
    </div>
  </footer>)
}