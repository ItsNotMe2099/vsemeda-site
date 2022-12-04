import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import { ReactElement, useRef } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'


import { useRouter } from 'next/router'

interface Props {
  children?: React.ReactNode
  className?: string
  content: () => ReactElement
}

export const ButtonOverflow = (props: Props) => {
  const dropdownRef = useRef(null)
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const onClick = (e) => {
    e.preventDefault()
    setIsActive(!isActive)
  }

  const router = useRouter()

  return (
    <div className={styles.root}>
      <div onClick={onClick} className={classNames(styles.dropDownTrigger, props.className)}>
        <div className={styles.content}>
          {props.content ? props.content() : null}
        </div>
      </div>

      <nav ref={dropdownRef} className={classNames(styles.dropDown, { [styles.dropDownActive]: isActive })}>
        {props.children && props.children}
      </nav>
    </div>
  )
}
ButtonOverflow.defaultProps = {
  options: [],
}
export default ButtonOverflow
