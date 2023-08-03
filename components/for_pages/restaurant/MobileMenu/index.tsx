import styles from './index.module.scss'
import classNames from 'classnames'
import { useUnitContext } from 'context/unit_state'
import { IMenuCategory } from 'data/interfaces/IMenu'
import { useLayoutEffect, useRef, useState } from 'react'

interface Props {
  className?: string
  isActive?: boolean
}

export default function MobileMenu(props: Props) {
  const unitContext = useUnitContext()


  const refItems = useRef(new Map())


  const [activeItem, changeActiveItem] = useState<string>('') 

  const clickHandler = (item: IMenuCategory) => {
    unitContext.setActiveCategory(item.parentId||item.id)  
    unitContext.scrollToCategory(item)
  }

  useLayoutEffect(()=> {
    
      if (!unitContext.scrollToCategoryFired && activeItem !== unitContext.activeCategoryId) {
        const activeElement: HTMLDivElement = refItems.current.get(unitContext.activeCategoryId)
        // const offsetLeft = rootRef.current.getBoundingClientRect()?.left
        //почему-то когда включаю behavior smooth не работает прокрутка(((
        activeElement?.scrollIntoView({inline: 'start'})  
      }
      changeActiveItem(unitContext.activeCategoryId)
    
  }, [unitContext.activeCategoryId, unitContext.scrollToCategoryFired])


  return (
    <div className={classNames(styles.root, props.className)} >
      <div className={styles.left}>
        <div className={styles.tablet}>
          {unitContext.menu.filter(i => !i.parentId)?.map((i) =>
            <div
              key={i.id}
              ref={el => refItems.current.set(i.id, el)}
              className={classNames(styles.item, { [styles.active]: unitContext.activeCategoryId === i.id})}
              // onClick={() => setActive(i.name)}
              onClick={() => clickHandler(i)}
            >
              {i.name}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
