import {IButton} from 'types/types'
import styles from './index.module.scss'
import {Scrollbars} from 'react-custom-scrollbars-2'

interface Props extends IButton {
  children: React.ReactNode
}

export default function CustomScrollbar(props: Props) {
  return (<Scrollbars
    className={styles.root}
    autoHeight
    autoHide
    autoHeightMax={'100%'}
    autoHeightMin={'100%'}
    style={{height: '100%'}}
  >
    {props.children}
  </Scrollbars>)
}

