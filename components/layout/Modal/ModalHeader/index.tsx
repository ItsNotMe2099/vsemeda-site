import styles from './index.module.scss'

import classNames from 'classnames'
import { ReactElement } from 'react'
import CloseModalBtn from 'components/ui/CloseModalBtn'
import { useAppContext } from 'context/state'

interface Props {
  onClose?: () => void
  onBackClick?: () => void
  title?: string
  children?: ReactElement | ReactElement[]
  showId?: boolean
  showBack?: boolean
}

export default function ModalHeader(props: Props) {
  const appContext = useAppContext()
  return (
    <div className={classNames(styles.root)}>
      <div className={styles.left}>
        {(props.showBack)  &&
        <div className={styles.back}
             onClick={props.onBackClick}>
          <img src='/img/icons/back.svg' alt=''/>
        </div>}
        {props.title && <div className={styles.title}>
          {props.title}
        </div>}
        {props.children}
      </div>
      {!appContext.modalNonSkippable && <CloseModalBtn onClick={() => { appContext.hideModal() }} />}

    </div>
  )
}


