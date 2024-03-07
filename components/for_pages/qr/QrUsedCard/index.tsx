import styles from './index.module.scss'
import {IPromoQrCode} from 'data/interfaces/IPromoQrCode'
import classNames from 'classnames'
import Formatter from 'utils/formatter'
import {useState} from 'react'
import useInterval from 'use-interval'

interface Props {
  promoQrCode: IPromoQrCode
}

export default function QrUsedCard(props: Props) {
  const [now, setNow] = useState<Date>(new Date())
  useInterval(() => {
    setNow(new Date())
  }, 5000)
  return (
    <div className={styles.root}>
      <div className={classNames(styles.duration, {[styles.expired]: true})}>
       Акция уже была применена
      </div>
      <div className={styles.pass}>{Formatter.formatDateRelative(props.promoQrCode.usedAt).toLowerCase()}</div>
    </div>
  )
}
