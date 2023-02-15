import styles from './index.module.scss'
import { Form, FormikProvider, useFormik } from 'formik'
import { useState, useEffect } from 'react'
import PhoneField from 'components/fields/PhoneField'
import Button from 'components/ui/Button'
import UserRepository from 'data/repositories/UserRepository'
import Validator from 'utils/Validator'
import { useAppContext } from 'context/state'
import { SnackbarType } from 'types/enums'
import OtpCodeField from 'components/fields/OtpCodeField'
import classNames from 'classnames'
import Timer from 'components/for_pages/Common/Timer'


interface Props {
  onStepNext: () => void
  step: number
}

export default function LoginForm(props: Props) {

  const [step, setStep] = useState<number>(props.step)

  const appContext = useAppContext()

  const [loading, setLoading] = useState<boolean>(false)

  const [seconds, setSeconds] = useState<number>(0)

  const [otpSnackbar, setShowOtpSnackbar] = useState<boolean>(false)

  const [error, setError] = useState<string | null>(null)


  const submit = async (data: { phone: string, code: string }) => {
    setLoading(true)
    try {
      await UserRepository.phoneConfirmation(data.phone, data.code)
    }
    catch (error: any) {
      let errorMessage = error.toString()
      // extract the error message from the error object
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message
      }
      //appContext.showSnackbar(errorMessage, SnackbarType.error)
      setShowOtpSnackbar(true)
      setError(errorMessage)
    }
    setLoading(false)
  }

  console.log('ERRRRRRRRRRR', otpSnackbar)

  const formik = useFormik({
    initialValues: {
      phone: '',
      code: ''
    },
    onSubmit: submit
  })

  useEffect(() => {
    if (otpSnackbar && formik.values.code === '') {
      setShowOtpSnackbar(false)
    }
  }, [formik.values.code])

  useEffect(() => {
    setStep(props.step)
  }, [props.step, seconds])

  const handleSendCode = async (phone: string, step: number) => {
    step === 1 ? setLoading(true) : null
    try {
      await UserRepository.login(phone).then(i => setSeconds(i.codeCanRetryIn))
      step === 1 ? props.onStepNext() : null
    }
    catch (error: any) {
      let errorMessage = error.toString()
      // extract the error message from the error object
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message
      }
      appContext.showSnackbar(errorMessage, SnackbarType.error)
    }
    setLoading(false)
  }

  console.log('VALUES!!!!', formik.values)

  useEffect(() => {
    if (seconds > 0) {
      const timeoutId = setTimeout(() => setSeconds(seconds - 1), 1000)
      return () => clearTimeout(timeoutId)
    }
  }, [seconds])

  return (
    <>
      {/*!loading ?*/} <FormikProvider value={formik}>
        <Form className={styles.root}>
          <div className={classNames(styles.title, { [styles.sms]: step === 2 })}>
            {step === 1 ? <>Вход</> : <>Введите код из смс</>}
          </div>
          {step === 1 ?
            <>
              <PhoneField
                name='phone'
                placeholder='Введите номер телефона'
                icon
                validate={Validator.combine([Validator.required, Validator.phone])}
              />
              <Button type='button' className={styles.btn} onClick={() => handleSendCode(formik.values.phone, step)} styleType='filledGreen' font='semibold16'>
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
                snackbar={otpSnackbar}
                disabled={loading}
                errorMessage={error}
              />
              <div className={styles.timer}>
                <Timer key={seconds} seconds={seconds} />
                <div className={styles.again} onClick={() => handleSendCode(formik.values.phone, step)}>
                  Отправить еще раз
                </div>
              </div>
            </>}
        </Form>
      </FormikProvider>
      {/*: <Image className={styles.loader} src={'/images/icons/loading.svg'} alt='' fill />*/}
      {/*loading ?
        <div className={styles.loaderMobile}>
          <CirclesBgSvg className={styles.circle} />
          <Image className={styles.logo} src={'/images/icons/loading.svg'} alt='' fill />
        </div>
          : null*/}
    </>
  )
}
