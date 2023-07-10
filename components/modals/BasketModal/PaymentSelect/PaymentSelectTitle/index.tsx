import styles from './index.module.scss'
import {ReactElement} from 'react'
import ChevronSvg from 'components/svg/ChevronSvg'

interface Props {
  onClick?: () => void
  title: string
  children?: ReactElement | ReactElement[]
  back?: boolean
  arrow?: boolean
  expanded?: boolean
}

const PaymentSelectTitle = (props: Props) => {
  return (
    <div className={styles.root} onClick={props.onClick}>
      {props.back && <ChevronSvg className={styles.back} color={'#F2F2F2'}/>}
      <div className={styles.center}>
        <div className={styles.title}>{props.title}</div>
        {props.children}
      </div>
      {props.arrow && <ChevronSvg className={styles.arrow} color={'#F2F2F2'}/>}
    </div>
  )
}
export default PaymentSelectTitle

