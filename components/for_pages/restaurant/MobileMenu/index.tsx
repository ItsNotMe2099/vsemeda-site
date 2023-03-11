import styles from './index.module.scss'
import classNames from 'classnames'
import { useState } from 'react'
import { useUnitContext } from 'context/unit_state'

interface Props {
  className?: string
}

export default function MobileMenu(props: Props) {

  const [active, setActive] = useState<string>('all')

  const unitContext = useUnitContext()
  const unit = unitContext.unit

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.left}>
        <div className={styles.tablet}>
          {unitContext.menu.filter(i => !i.parentId)?.map((i) =>
            <div
              key={i.id}
              className={classNames(styles.item, { [styles.active]: active === i.name })}
              onClick={() => setActive(i.name)}
            >
              {i.name}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
