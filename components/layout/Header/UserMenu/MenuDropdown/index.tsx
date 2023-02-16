import styles from './index.module.scss'
import classNames from 'classnames'
import { forwardRef, HTMLAttributes } from 'react'
import * as React from 'react'
import { useAppContext } from 'context/state'
import Image from 'next/image'

interface MenuItem {
  icon: string
  text: string
}

interface MenuItemProps {
  item: MenuItem
}

interface Props {
  items: MenuItem[]
  isActive?: boolean
  style?: React.CSSProperties,
  attributes?: HTMLAttributes<HTMLDivElement>
}

export const MenuDropdown = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const appContext = useAppContext()

  const handleClick = () => {
    console.log('handleClick')
    appContext.hideOverlay()
  }

  const Option = ({ item }: MenuItemProps) => {
    return (
      <div className={styles.option}>
        <div className={styles.icon}>
          <Image src={item.icon} alt='' fill />
        </div>
        <div className={styles.text}>{item.text}</div>
      </div>
    )
  }


  return (
    <div className={classNames(styles.root, { [styles.opened]: props.isActive })} ref={ref}
      style={props.style}  {...props.attributes} >
      <div className={styles.options}>
        {props.items.map((i, index) =>
          <Option item={i} key={index} />
        )}
      </div>
    </div>
  )
})
MenuDropdown.displayName = 'MenuDropdown'
