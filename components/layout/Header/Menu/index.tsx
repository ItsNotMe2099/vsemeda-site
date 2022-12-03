import Link from 'next/link'
import { LINKS } from 'types/constants'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import Filter from './Filter'

interface Props {
  className?: string
}

export default function Menu(props: Props) {

  const router = useRouter()

  const items = [
    {label: 'Все', link: LINKS.header.all},
    {label: 'Акции', link: LINKS.header.actions},
    {label: 'Суши', link: LINKS.header.sushi},
    {label: 'Пицца', link: LINKS.header.pizza},
    {label: 'Бургеры', link: LINKS.header.burgers},
    {label: 'Фастфуд', link: LINKS.header.fastfood},
    {label: 'Шашлыки', link: LINKS.header.shashlik},
    {label: 'Десерты', link: LINKS.header.deserts},
    {label: 'Здоровая еда', link: LINKS.header.healthyfood},
  ]

  console.log(router)

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Filter/>
        <div className={styles.list}>
          {items.map((i, index) => 
            <Link className={classNames(styles.item, {[styles.active]: router.asPath === i.link})} href={i.link} key={index}>
              <span>{i.label}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
