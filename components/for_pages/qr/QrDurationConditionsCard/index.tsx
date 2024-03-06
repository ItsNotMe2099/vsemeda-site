import styles from './index.module.scss'
import {IPromoQrCode} from 'data/interfaces/IPromoQrCode'
import {useEffect, useState} from 'react'
import classNames from 'classnames'
import Formatter from 'utils/formatter'
import {isSameDay} from 'date-fns'

const checkIsExpired = (promoQrCode: IPromoQrCode) => {
  if((new Date(promoQrCode.endAt)).getTime() < (new Date()).getTime()){
    return true
  }
  return false
}
interface Props {
  promoQrCode: IPromoQrCode
}

export default function QrDurationConditionsCard(props: Props) {
  const [isExpired, setIsExpired] = useState(checkIsExpired(props.promoQrCode))

  useEffect(() => {

  }, [])
  return (
    <div className={styles.root}>
      <div className={classNames(styles.duration, {[styles.expired]: isExpired})}>
        Действует с {Formatter.formatDateRelative(props.promoQrCode.startAt).toLowerCase()} до {Formatter.formatDateRelative(props.promoQrCode.endAt).toLowerCase()}
      </div>
      {isExpired && <div className={styles.pass}>Срок действия истек {isSameDay(new Date(), new Date(props.promoQrCode.endAt))  ? Formatter.formatDistance(new Date(), props.promoQrCode.endAt) : Formatter.formatDateRelative(props.promoQrCode.endAt).toLowerCase()}</div> }
    </div>
  )
}
