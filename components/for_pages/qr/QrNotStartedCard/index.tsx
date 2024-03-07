import styles from './index.module.scss'
import {IPromoQrCode} from 'data/interfaces/IPromoQrCode'
import {useState} from 'react'
import classNames from 'classnames'
import Formatter from 'utils/formatter'
import useInterval from 'use-interval'

const checkIsExpired = (promoQrCode: IPromoQrCode) => {
  if ((new Date(promoQrCode.endAt)).getTime() < (new Date()).getTime()) {
    return true
  }
  return false
}

interface Props {
  promoQrCode: IPromoQrCode
}

export default function QrNotStartedCard(props: Props) {
  const [now, setNow] = useState<Date>(new Date())
  useInterval(() => {
    setNow(new Date())
  }, 5000)
  return (
    <div className={styles.root}>
      <div className={classNames(styles.message)}>
        Qr код пока не  действует</div>
  <div className={styles.pass}>Будет доступен через {Formatter.formatDistance(now, props.promoQrCode.startAt)}</div>
    </div>
  )
}
