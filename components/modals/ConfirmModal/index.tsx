import styles from './index.module.scss'
import Button from 'components/ui/Button'
import BottomSheetLayout from 'components/layout/BottomSheet/BottomSheetLayout'
import {colors} from 'styles/variables'
import {useAppContext} from 'context/state'
import classNames from 'classnames'
import Spacer from 'components/ui/Spacer'
import {ConfirmModalArguments} from 'types/modal_arguments'
import {useState} from 'react'

interface Props{
  isBottomSheet?: boolean
  onRequestClose: () => void
}
export function ConfirmModal(props: Props) {
  const appContext = useAppContext()
  const args = appContext.modalArguments as ConfirmModalArguments
  const [loading, setLoading] = useState<boolean>(false)

  const handleCancel = () => {
    if(!args.onCancel){
      appContext.hideModal()
    }else{
      args.onCancel()
    }
  }

  const handleConfirm = async () => {
   setLoading(false)
    try {
      await args.onConfirm()
    }catch (e) {

    }
   setLoading(false)
  }

  const result = (
    <div className={classNames(styles.wrapper, {[styles.bottomSheet]: props.isBottomSheet})}>
      <div className={styles.text}>{args.text ?? ''}</div>
      <Spacer basis={24}/>
      <div className={styles.buttons}>
        <Button styleType={'filledGreen'} fluid type={'submit'} spinner={loading} onClick={handleCancel}>{args.cancel || 'Нет'}</Button>
        <Button styleType={'filledGreen'} fluid type={'submit'} spinner={loading} onClick={handleConfirm}>{args.confirm || 'Да'}</Button>
      </div>
    </div>
  )

  if (props.isBottomSheet) {
    return (
      <BottomSheetLayout  closeIconColor={colors.grey2}>
        {result}
      </BottomSheetLayout>
    )
  }

  return (
    <div className={styles.root}>
      {result}
    </div>
  )

}
