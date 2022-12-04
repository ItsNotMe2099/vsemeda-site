import styles from './index.module.scss'
import classNames from 'classnames'
import { useRef, useState } from 'react'
import Button from 'components/ui/Button'

interface Props {
  className?: string
  onClick?: () => void
}

export default function Search(props: Props) {

  const [isShow, setIsShow] = useState<boolean>(false)

  const ref = useRef(null)

  const handleClick = () => {
    setIsShow(true)
    props.onClick ? props.onClick() : null
  }

  const handleClose = () => {
    setIsShow(false)
    props.onClick ? props.onClick() : null
  }

  return (
    <div className={classNames(styles.root, props.className)}>
      <form className={styles.search}>
        <div className={styles.wrapper}>
          <div className={classNames(styles.inputWrapper, {[styles.active]: isShow})}>
            <Button search className={styles.btn} disabled={!isShow} type='submit'>
              <img src='/images/header/search.svg'/>
            </Button>
            <p onClick={handleClick}>Поиск</p>
            <input ref={ref} className={styles.input} type='search' placeholder='Поиск'/>
            <div className={styles.clear} onClick={() => ref.current.value = ''}>Очистить</div>
            <div className={styles.close} onClick={handleClose}> 
              <img src='/images/close.svg' alt=''/>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
