import styles from './index.module.scss'
import classNames from 'classnames'
import {ReactElement} from 'react'
import {useAppContext} from 'context/state'
import { Scrollbars } from 'react-custom-scrollbars-2'

interface Props {
  fixed?: boolean
  children?: ReactElement | ReactElement[]
  id?: string
  className?: string
}

export default function ModalBody(props: Props) {
  const context = useAppContext()
  return (
    <div className={styles.wrapper}>
    <Scrollbars 
    className={styles.scroll} 
    autoHeight
    autoHide
    autoHeightMax={'100%'}
    autoHeightMin={'100%'}
    style={{height: '100%'}}
    >
      <div className={classNames(styles.root, {[styles.fixed]: props.fixed || context.isMobile}, props.className)} id={props.id}>
        {props.children}
      </div>
    </Scrollbars>
    </div>
    )
}
