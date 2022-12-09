import styles from './index.module.scss'
import classNames from 'classnames'
import { forwardRef } from 'react'
import usePressAndHover from 'hooks/usePressAndHover'

interface Props {
  direction: 'next' | 'prev'
  onClick?: () => void
  className?: string
  disabled?: boolean
}


const SliderControl = forwardRef((props: Props, ref) => {
  const [refHover, press, hover] = usePressAndHover()
  return (
    <div ref={refHover} className={classNames(styles.root,
      {
        [styles.prev]: props.direction === 'prev',
        [styles.disabled]: props.disabled
      }, props.className)} onClick={props.onClick}>
      <img
        src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTEiIHZpZXdCb3g9IjAgMCAxMiAxMSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYuMTI3MjQgMUwxMC43NzI1IDUuNjY2NzJMNi4xMjcyNCAxMC4zMzM0IiBzdHJva2U9IiMyNzI3MjciLz4KPHBhdGggZD0iTTEwLjc3MjUgNS41NzgxMkwwLjEwNTY2OSA1LjU3ODEyIiBzdHJva2U9IiMyNzI3MjciLz4KPC9zdmc+Cgo='
        alt='' />
    </div>
  )
})
SliderControl.displayName = 'SliderControl'

export default SliderControl
