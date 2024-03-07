import styles from './index.module.scss'
import {IPromoQrCode} from 'data/interfaces/IPromoQrCode'
import {useState} from 'react'
import classNames from 'classnames'
import Formatter from 'utils/formatter'
import {format, isSameDay} from 'date-fns'
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

export default function QrDurationConditionsCard(props: Props) {
  const [isExpired, setIsExpired] = useState(checkIsExpired(props.promoQrCode))
  const [now, setNow] = useState<Date>(new Date())
  useInterval(() => {
    if(checkIsExpired(props.promoQrCode)){
      setIsExpired(true)
    }
    setNow(new Date())
  }, 5000)
  return (
    <div className={styles.root}>
      <div className={classNames(styles.duration, {[styles.expired]: isExpired})}>
        {isExpired ? 'Действовал' : 'Действует'}
        {isSameDay(new Date(props.promoQrCode.startAt), new Date(props.promoQrCode.endAt)) ? ` ${Formatter.formatDateOnlyRelative(props.promoQrCode.startAt).toLowerCase()} c ${format(new Date(props.promoQrCode.startAt), 'HH:mm')} до ${format(new Date(props.promoQrCode.endAt), 'HH:mm')}` : ` с ${Formatter.formatDateRelative(props.promoQrCode.startAt).toLowerCase()} до ${Formatter.formatDateRelative(props.promoQrCode.endAt).toLowerCase()}`}
      </div>
      {isExpired && <div className={styles.pass}>Срок действия
        истек {isSameDay(now, new Date(props.promoQrCode.endAt)) ? Formatter.formatDistance(now, props.promoQrCode.endAt) : Formatter.formatDateRelative(props.promoQrCode.endAt).toLowerCase()}</div>}
    </div>
  )
}
