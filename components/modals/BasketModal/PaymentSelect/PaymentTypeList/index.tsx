import styles from './index.module.scss'
import { PaymentMethod } from 'data/enum/PaymentMethod'
import PaymentMethodItem from 'components/modals/BasketModal/PaymentMethodItem'
import { IPaymentOption} from 'types/types'

interface Props {
  onSelect: (type: PaymentMethod) => void
  paymentOptions: IPaymentOption[]
  selected: PaymentMethod
}

const PaymentMethodList = (props: Props) => {
  return (
    <div className={styles.root}>
      {props.paymentOptions.map(i => <PaymentMethodItem onClick={() => props.onSelect(i.value)} item={i} key={i.value} isSelected={props.selected === i.value} />)}
    </div>
  )
}
export default PaymentMethodList

