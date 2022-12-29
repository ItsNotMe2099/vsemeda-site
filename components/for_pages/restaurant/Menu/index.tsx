import Link from 'next/link'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { forwardRef } from 'react'
import { Sticky } from 'react-sticky'

interface IItem {
  name: string
  link: string
}

interface Props {
  items: IItem[]
  isSticky?: boolean
  restProps?: any
}

const MenuInner = forwardRef<HTMLDivElement, Props & { style?: any }>((props, ref) => {

  const router = useRouter()

  const Item = ({ item }) => {
    return (
      <Link className={classNames(styles.item, { [styles.active]: router.asPath === item.link })} href={item.link}>
        <span>{item.name}</span>
      </Link>
    )
  }

  return (
    <div className={styles.wrap} ref={ref} style={props.style} {...(props.restProps ?? {})}>
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.list}>
            {
              props.items.map((item, index) =>
                <Item item={item} key={index} />
              )}
          </div>
        </div>
      </div>
    </div>
  )
})

MenuInner.displayName = 'MenuInner'
export default function Menu(props: Props) {

  if (props.isSticky) {
    return <Sticky disableCompensation>{({ style, isSticky, items, ...rest }) => <MenuInner {...props} restProps={rest} style={style} />}</Sticky>
  } else {
    return <MenuInner {...props} />
  }
}
