import styles from './index.module.scss'
import {IPromoQrCode} from 'data/interfaces/IPromoQrCode'
import classNames from 'classnames'
import Formatter from 'utils/formatter'

interface Props {
  promoQrCode: IPromoQrCode
}

export default function QrUsedCard(props: Props) {
  return (
    <div className={styles.root}>
      <div className={classNames(styles.duration, {[styles.expired]: true})}>
       Акция уже была применена
      </div>
      <div className={styles.pass}>{Formatter.formatDateRelative(props.promoQrCode.usedAt).toLowerCase()}</div>
    </div>
  )
}
