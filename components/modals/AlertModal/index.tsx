import ModalLayout from 'components/layout/Modal/ModalLayout'
import styles from './index.module.scss'
import ModalBody from 'components/layout/Modal/ModalBody'
import { useAppContext } from 'context/state'
import Button from 'components/ui/Button'

export interface AlertModalProps {
  text: string,
  buttonText: string
  onClick?: () => void
}

interface Props {
  onBackClick: ()=> void
}

export default function AlertModal(props: Props) {
  const appContext = useAppContext()
  const args = appContext.modalArguments as AlertModalProps

  const clickHandler = () => {
    props.onBackClick()
    args.onClick&&args.onClick()
  }

  const body = (
    <>
    <p className={styles.title}>{args.text}</p>
    <Button className={styles.acceptButton} onClick={clickHandler} styleType={'filledGreen'}>{args.buttonText}</Button>
    </>
  )


  return (<ModalLayout className={styles.modalLayout}>
    <ModalBody className={styles.modalBody}>
      {body}
    </ModalBody>
  </ModalLayout>)
}