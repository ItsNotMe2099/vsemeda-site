import styles from './index.module.scss'
import Button from 'components/ui/Button'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import ModalBody from 'components/layout/Modal/ModalBody'

interface Props {
  onBackClick: () => void
}

export default function ComplaintEndModal(props: Props) {

  const body = (
    <div className={styles.root}> 
      <p className={styles.title}>
      Спасибо за Ваше обращение!
      </p>
      <Button className={styles.button} type='button' onClick={props.onBackClick} styleType={'filledGreen'}>Дальше</Button>
    </div>
  )

  return (
    <ModalLayout className={styles.modalLayout}>
      <ModalBody>
        {body}
      </ModalBody>
    </ModalLayout>
  )
}