import styles from './index.module.scss'
import classNames from 'classnames'
import { useUnitContext } from 'context/unit_state'
import { IMenuCategory } from 'data/interfaces/IMenu'
import {useLayoutEffect, useRef, useState } from 'react'

interface Props {
  className?: string
  isActive?: boolean
}

export default function MobileMenu(props: Props) {
  const unitContext = useUnitContext()


  const refItems = useRef(new Map())

  const [activeItem, changeActiveItem] = useState<string>(unitContext.activeCategoryId) 

  const clickHandler = (item: IMenuCategory) => {
    unitContext.scrollToCategory(item)
    unitContext.setActiveCategory(item.parentId||item.id)  
    changeActiveItem(item.id)      
  }

  //TODO: оптимизировать, потому что behavior smooth не работает из-за перерисовок
  //TODO: из-за intersectionObserver не совсем корректно отрабатывает нажатие на элемент, подумать как решить. был вариант с debounce или throttle функцией
  useLayoutEffect(()=> {
    let activeElement: HTMLDivElement = refItems.current.get(activeItem)
    activeElement?.scrollIntoView({inline: 'start'})

  }, [activeItem])


  return (
    <div className={classNames(styles.root, props.className)}>
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
