import BackBtn from 'components/ui/BackBtn'
import { IOrder } from 'data/interfaces/IOrder'
import { ComplaintsTypes } from '..'
import styles from './index.module.scss'

interface Props {
  onBack: ()=> void
  item: IOrder
  complaints: ComplaintsTypes
  type: keyof ComplaintsTypes
}

export default function Complaint(props: Props) {

  const header = ( 
    <div className={styles.headerRoot}>
      <BackBtn onClick={props.onBack} bgColor={'white'}/>
      <p className={styles.headerTitle}>Жалоба к заказу №{props.item.id}</p>
    </div>
  )

  const body = (<div className={styles.root}>
    <p className={styles.title}>
      {props.complaints[props.type]}
    </p>
    <div className={styles.order} >
      <div className={styles.orderTop}>
        <p className={styles.unitName}>{props.item.brand.name}</p>
        <div className={styles.status}>{props.item.stateDetails.name}</div>
      </div>
      <div className={styles.orderBottom}>
        <p className={styles.time}>{props.item.createdAt}</p>
        <p className={styles.payments}>
          {props.item.paymentMethod}: {props.item.total}
        </p>
      </div>
    </div>
    <div className={styles.photos}>
      <p className={styles.photosTitle}>Фото</p>
    </div>
    <div className={styles.message}>
      <p className={styles.messageTitle}>Сообщение</p>
      <textarea name="text" id="" cols={30} rows={10}></textarea>
    </div>

  </div>)
  

  return (<>
  {header}
  {body}
  </>)
}