import styles from './index.module.scss'
import CirclesBgSvg from 'components/svg/CirclesBgSvg'
import Image from 'next/image'
import {ReactElement} from 'react'

interface Props{
  children: ReactElement | ReactElement[]
}
export default function IndexHeader(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.bg} />
      <div className={styles.sales_left}>
        <Image src={'/images/bg/sales_left.png'} alt='' fill />
      </div>
      <div className={styles.sales_right}>
        <Image src={'/images/bg/sales_right.png'} alt='' fill />
      </div>
      <div className={styles.container}>
        {props.children}
      </div>
      <CirclesBgSvg className={styles.circle} />
    </div>
  )
}
