import styles from './index.module.scss'
import { format } from 'date-fns'
import Link from 'next/link'
import { CONTACTS, LINKS } from 'types/constants'
import { useAppContext } from 'context/state'
import LogoEdaSvg from 'components/svg/LogoEdaSvg'
import { colors } from 'styles/variables'
import { useEffect, useState } from 'react'
import { ICategory } from 'data/interfaces/ICategory'
import MenuRepository from 'data/repositories/MenuRepository'
import OdnoklassnikiSvg from 'components/svg/OdnoklassnikiSvg'
import VKSvg from 'components/svg/VKSvg'
import TelegramSvg from 'components/svg/TelegramSvg'
import WhatsAppSvg from 'components/svg/WhatsAppSvg'
import Subscribe from './Subscribe'
import AddressSvg from 'components/svg/AddressSvg'

interface Props {

}

export default function Footer(props: Props) {

  const menu = [
    { label: 'Пользовательское соглашение', link: LINKS.footer.forRestaurants },
    { label: 'Контакты', link: LINKS.footer.forCouriers },
    { label: 'Доставка', link: LINKS.footer.forCompanies },
    { label: 'Вопросы и ответы', link: LINKS.footer.actions },
    { label: 'Стать партнером', link: LINKS.footer.aboutUs },
    { label: 'Стать курьером', link: LINKS.footer.aboutUs },
  ]

  const appContext = useAppContext()

  const [items, setItems] = useState<ICategory[] | null>(null)

  const fetchData = async () => {
    await MenuRepository.fetchCategories().then(i => setItems(i))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.logo}>
              <LogoEdaSvg textColor={colors.black} />
              <div className={styles.social}>
                <Link className={styles.item} href={CONTACTS.instagram}>
                  <img src='/images/footer/insta.svg' alt='' />
                </Link>
                <Link className={styles.item} href={CONTACTS.vk}>
                  <img src='/images/footer/vk.svg' alt='' />
                </Link>
                <Link className={styles.item} href={CONTACTS.facebook}>
                  <img src='/images/footer/facebook.svg' alt='' />
                </Link>
              </div>
            </div>
            <div className={styles.about}>
              Cервис заказа быстрой доставки еды из ресторанов через мобильное приложение или веб-сайт. Доставку осуществляют курьерские службы — партнеры сервиса Всем Еда и собственные курьеры ресторанов.
            </div>
            <div className={styles.address}>
              <AddressSvg color='#828282' />
              <div className={styles.text}>Нежинская ул., 9.1, Москва,<br /> Россия, 119517</div>
            </div>
          </div>
          <div className={styles.center}>
            <div className={styles.menu}>
              <div className={styles.title}>
                Рестораны
              </div>
              {items?.slice(0, 8).map((i, index) =>
                <Link className={styles.item} href={i.slug} key={index}>
                  {i.name}
                </Link>
              )}
            </div>
            <div className={styles.menu}>
              <div className={styles.title}>
                Меню
              </div>
              {menu?.map((i, index) =>
                <Link className={styles.item} href={i.link} key={index}>
                  {i.label}
                </Link>
              )}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.top}>
              <div className={styles.title}>
                Мы в соцсетях
              </div>
              <div className={styles.social}>
                <Link className={styles.item} href={CONTACTS.odnoklassniki}>
                  <OdnoklassnikiSvg />
                </Link>
                <Link className={styles.item} href={CONTACTS.vk}>
                  <VKSvg />
                </Link>
                <Link className={styles.item} href={CONTACTS.telegram}>
                  <TelegramSvg />
                </Link>
                <Link className={styles.item} href={CONTACTS.whatsapp}>
                  <WhatsAppSvg />
                </Link>
              </div>
              <div className={styles.contacts}>
                Наши контакты
              </div>
            </div>
            <div className={styles.bottom}>
              <Subscribe />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        © Vsemeda {format(new Date(), 'Y')} Все права защищены
      </div>
    </>
  )
}

