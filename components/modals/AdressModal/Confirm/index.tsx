import styles from './index.module.scss'
import Button from 'components/ui/Button'
import PlaceCheckSvg from 'components/svg/PlaceCheckSvg'
import {colors} from 'styles/variables'

interface Props {
  address: string
  onConfirm: () => void
}

export default function AddressFormConfirm(props: Props) {
  return (<div className={styles.root}>
    <div className={styles.wrapper}>
      <div className={styles.address}>
        <PlaceCheckSvg color={colors.grey2}/>
        <div>{props.address}</div>
      </div>
      <div className={styles.buttons}><Button styleType={'filledGreen'} onClick={props.onConfirm}>Принять</Button></div>
    </div>

  </div>)
}
