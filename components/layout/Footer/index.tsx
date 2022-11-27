import LogoSvg from 'components/svg/LogoSvg'
import styles from './index.module.scss'
import {format} from 'date-fns'
import Link from 'next/link'
import { APPS, CONTACTS, LINKS } from 'types/constants'

interface Props {
  
}

export default function Footer(props: Props) {

  const items = [
    {label: 'Ресторанам', link: LINKS.footer.forRestaurants},
    {label: 'Курьерам', link: LINKS.footer.forCouriers},
    {label: 'Компаниям', link: LINKS.footer.forCompanies},
    {label: 'Об акциях', link: LINKS.footer.actions},
    {label: 'О нас', link: LINKS.footer.aboutUs},
  ]

  const cities = [
    {city: 'Москва'},
    {city: 'Санкт-Петербург'},
    {city: 'Ростов'},
    {city: 'Рязань'},
    {city: 'Краснодар'},
    {city: 'Барнаул'},
    {city: 'Южно-сахалинск'},
    {city: 'Хабаровск'},
  ]

  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.logo}>
            <LogoSvg isGray/>
          </div>
          <div className={styles.about}>
            Cервис заказа быстрой доставки еды из ресторанов через мобильное приложение или веб-сайт. Доставку осуществляют курьерские службы — партнеры сервиса Всем Еда и собственные курьеры ресторанов.
          </div>
          <div className={styles.copyright}>
            ©{format(new Date(),'Y')} VsemEDA1.0
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.menu}>
            {items.map((i, index) => 
              <Link className={styles.item} href={i.link} key={index}>
                {i.label}
              </Link>
            )}
          </div>
          <div className={styles.cities}>
            <div className={styles.list}>
              {cities.map((i, index) => 
                <div className={styles.city} key={index}>
                  {i.city}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.social}>
            <Link className={styles.item} href={CONTACTS.instagram}>
              <img src='/images/footer/insta.svg' alt=''/>
            </Link>
            <Link className={styles.item} href={CONTACTS.vk}>
              <img src='/images/footer/vk.svg' alt=''/>
            </Link>
            <Link className={styles.item} href={CONTACTS.facebook}>
              <img src='/images/footer/facebook.svg' alt=''/>
            </Link>
          </div>
          <div className={styles.apps}>
            <Link href={APPS.googlePlay}>
              <img src='/images/footer/google-play.svg' alt=''/>
            </Link>
            <Link href={APPS.appStore}>
              <img src='/images/footer/app-store.svg' alt=''/>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

