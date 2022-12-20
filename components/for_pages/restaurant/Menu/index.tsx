import Link from 'next/link'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import ButtonOverflow from 'components/ui/Button/ButtonOverflow'

interface IItem {
  name: string
  link: string
}

interface Props {
  className?: string
  items: IItem[]
}

export default function Menu({className, items}: Props) {

  const router = useRouter()

  const length = items.length

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
          {items.map((i, index) =>
            <Item item={i} key={index} />
          )}
        </div>
        <div className={styles.listMedium}>
          {items.slice(0, length - 1).map((i, index) => (
            <Item item={i} key={index} />
          ))
          }
          <ButtonOverflow className={styles.item}
            content={() =>
              <div className={styles.content}>
                <span>Еще</span> <div className={styles.img}><img src='/images/header/dropdown.svg' alt='' /></div>
              </div>}
          >
            {items.slice(length - 1, length).map((i, index) => (
              <Item item={i} key={index} />
            ))}
          </ButtonOverflow>
        </div>
        <div className={styles.listSmall}>
          {items.slice(0, length - 2).map((i, index) => (
            <Item item={i} key={index} />
          ))
          }
          <ButtonOverflow className={styles.item}
            content={() =>
              <div className={styles.content}>
                <span>Еще</span> <div className={styles.img}><img src='/images/header/dropdown.svg' alt='' /></div>
              </div>}
          >
            {items.slice(length - 2, length).map((i, index) => (
              <Item item={i} key={index} />
            ))}
          </ButtonOverflow>
        </div>
        <div className={styles.listExSmall}>
          {items.slice(0, length - 3).map((i, index) => (
            <Item item={i} key={index} />
          ))
          }
          <ButtonOverflow className={styles.item}
            content={() =>
              <div className={styles.content}>
                <span>Еще</span> <div className={styles.img}><img src='/images/header/dropdown.svg' alt='' /></div>
              </div>}
          >
            {items.slice(length - 3, length).map((i, index) => (
              <Item item={i} key={index} />
            ))}
          </ButtonOverflow>
        </div>
        <div className={styles.listTablet}>
          {items.slice(0, length - 4).map((i, index) => (
            <Item item={i} key={index} />
          ))
          }
          <ButtonOverflow className={styles.item}
            content={() =>
              <div className={styles.content}>
                <span>Еще</span> <div className={styles.img}><img src='/images/header/dropdown.svg' alt='' /></div>
              </div>}
          >
            {items.slice(length - 4, length).map((i, index) => (
              <Item item={i} key={index} />
            ))}
          </ButtonOverflow>
        </div>
      </div>
    </div>
  )
}
