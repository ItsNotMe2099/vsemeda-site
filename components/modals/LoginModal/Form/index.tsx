import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import { useState, useEffect } from 'react'
import Button from 'components/ui/Button'
import Validator from 'utils/Validator'
import OtpCodeField from 'components/fields/OtpCodeField'
import classNames from 'classnames'
import Timer from 'components/for_pages/Common/Timer'
import { useAuthContext } from 'context/auth_state'
import { LoginFormData } from 'types/form_data/LoginFormData'
import Image from 'next/image'
import CirclesBgSvg from 'components/svg/CirclesBgSvg'
import { useCartContext } from 'context/cart_state'
import { useAppContext } from 'context/state'
import { ModalType } from 'types/enums'
import InputPhoneField from 'components/fields/InputPhoneField'


interface Props {
  onStepNext: () => void
  step: number
}

export default function LoginForm(props: Props) {
  const cartContext = useCartContext()
  const authContext = useAuthContext()
  const appContext = useAppContext()

  const [step, setStep] = useState<number>(props.step)
  const [seconds, setSeconds] = useState<number>(0)


  const submit = async (data: { phone: string, code: string }) => {
    authContext.confirmCode(data.code).then(res=>{      
      if(res) {
        !cartContext.isEmpty && appContext.showModal(ModalType.Basket)
      }
    })
  }

  const formik = useFormik({
    initialValues: {
      phone: '',
      code: ''
    },
    onSubmit: submit
  })

  const handleSendCode = async (data: LoginFormData, step: number) => {
    
    if(!data.phone||data.phone.length < 12) {
      formik.setErrors({phone: 'Введите номер телефона полностью'})
      return
    }
    await authContext.signUp(data)
    setSeconds(authContext.remainSec)
    step === 1 ? props.onStepNext() : null
  }

  const handleSendCodeAgain = async () => {
    await authContext.sendCodeAgain()
    setSeconds(authContext.remainSec)
  }


  useEffect(() => {
    setStep(props.step)
  }, [props.step, seconds])

  useEffect(() => {
    if (seconds > 0) {
      const timeoutId = setTimeout(() => setSeconds(seconds - 1), 1000)
      return () => clearTimeout(timeoutId)
    }
  }, [seconds])

  useEffect(() => {
    if (authContext.otpError?.show && formik.values.code === '') {
      authContext.showOtpError(false)
    }
  }, [formik.values.code])

  return (
    <>
      {(!authContext.signUpSpinner || !authContext.againSpinner || !authContext.confirmSpinner) ? <FormikProvider value={formik}>
        <Form className={styles.root}>
          <div className={classNames(styles.title, { [styles.sms]: step === 2 })}>
            {step === 1 ? <>Вход</> : <>Введите код из смс</>}
          </div>
          {step === 1 ?
            <>
              <InputPhoneField 
              name={'phone'} 
              placeholder={'Введите номер телефона'}
              validate={Validator.combine([Validator.required, Validator.phone])}
              />
              <Button type='button' className={styles.btn} onClick={() => handleSendCode(formik.values, step)} styleType='filledGreen' font='semibold16'>
                Вход
              </Button>
            </>
            :
            <>
              <OtpCodeField
                name='code'
                length={4}
                onComplete={() => formik.submitForm()}
                validate={Validator.required}
                snackbar={authContext.otpError?.show}
                disabled={authContext.confirmSpinner}
              />
              <div className={styles.timer}>
                <Timer key={authContext.remainSec} seconds={authContext.remainSec} />
                <div className={styles.again} onClick={() => handleSendCodeAgain()}>
                  Отправить еще раз
                </div>
              </div>
              <div className={styles.code}>
                {authContext.codeRes.code}
              </div>
            </>}
        </Form>
      </FormikProvider>
        : <Image className={styles.loader} src={'/images/icons/loading.svg'} alt='' fill />}
      {(authContext.signUpSpinner || authContext.againSpinner || authContext.confirmSpinner) ?
        <div className={styles.loaderMobile}>
          <CirclesBgSvg className={styles.circle} />
          <Image className={styles.logo} src={'/images/icons/loading.svg'} alt='' fill />
        </div>
        : null}
    </>
  )
}
