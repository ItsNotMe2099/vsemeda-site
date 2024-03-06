import styles from './index.module.scss'
import InputField from 'components/fields/InputField'
import Validator from 'utils/Validator'

interface Props {
  isSending: boolean
}

export default function QrFormCard(props: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.field}>
        <div className={styles.label} >Номер заказа</div>
        <InputField styleType={'bottomBorder'} disabled={props.isSending} color='grey'
                    name={'number'}  placeholder={'Введите номер заказа'} validate={Validator.required}/>

      </div>
      <div className={styles.field}>
        <div className={styles.label} >Стоимость заказа</div>
      <InputField styleType={'bottomBorder'} disabled={props.isSending} isNumbersOnly  color='grey'
                  name={'total'}  placeholder={'Введите стоимость заказа'} validate={Validator.required}/>
      </div>
    </div>
  )
}
