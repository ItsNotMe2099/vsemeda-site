import styles from './index.module.scss'
import { colors } from 'styles/variables'
import BottomSheetLayout from 'components/layout/BottomSheet/BottomSheetLayout'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import BottomSheetBody from 'components/layout/BottomSheet/BottomSheetBody'
import CirclesBgSvg from 'components/svg/CirclesBgSvg'
import Image from 'next/image'
import { useState } from 'react'
import LoginForm from './Form'
import BackBtn from 'components/ui/BackBtn'
import classNames from 'classnames'


interface Props {
  isBottomSheet?: boolean
  onRequestClose: () => void
}

const LoginFormModalInner = (props: Props) => {

  const [step, setStep] = useState<number>(1)

  console.log(step)

  const handleCloseClick = () => {
    step === 1 ? props.onRequestClose() : setStep(1)
  }


  const body = (
    <div className={styles.bodyWrapper}>
      <LoginForm step={step} onStepNext={() => setStep(2)} />
    </div>
  )

  if (props.isBottomSheet) {
    return (
      <BottomSheetLayout closeIconColor={colors.grey2}>
        <BottomSheetBody>{body}</BottomSheetBody>
      </BottomSheetLayout>
    )
  }

  return (
    <ModalLayout fixed className={classNames(styles.modalLayout, {[styles.nextStep]: step === 2})}  >
      <div className={styles.close}>
        <BackBtn bgColor='white' onClick={handleCloseClick}/>
      </div>
      {body}
      <CirclesBgSvg className={styles.circle} />
      <div className={styles.sales_top}>
        <Image src={'/images/LoginModal/sales_top.png'} alt='' fill />
      </div>
      <div className={styles.sales_top_left}>
        <Image src={'/images/LoginModal/sales_top_left.png'} alt='' fill />
      </div>
      <div className={styles.sales_top_right}>
        <Image src={'/images/LoginModal/sales_top_right.png'} alt='' fill />
      </div>
      <div className={styles.sales_bottom}>
        <Image src={'/images/LoginModal/sales_bottom.png'} alt='' fill />
      </div>
      <div className={styles.sales_bottom_right}>
        <Image src={'/images/LoginModal/sales_bottom_right.png'} alt='' fill />
      </div>
      <div className={styles.sales_bottom_left}>
        <Image src={'/images/LoginModal/sales_bottom_left.png'} alt='' fill />
      </div>
    </ModalLayout>
  )
}

export default function LoginFormModal(props: Props) {

  return (<>
    <LoginFormModalInner {...props} />
  </>)
}
