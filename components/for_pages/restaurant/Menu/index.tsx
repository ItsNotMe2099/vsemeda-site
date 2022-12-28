import Link from 'next/link'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useRouter } from 'next/router'

interface IItem {
  name: string
  link: string
}

interface Props {
  items: IItem[]
}

export default function Menu({ items }: Props) {

  const router = useRouter()

  const Item = ({ item }) => {
    return (
      <Link className={classNames(styles.item, { [styles.active]: router.asPath === item.link })} href={item.link}>
        <span>{item.name}</span>
      </Link>
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.list}>
          {
            items.map((item, index) =>
              <Item item={item} key={index} />
            )}
        </div>
      </div>
    </div>
  )
}
