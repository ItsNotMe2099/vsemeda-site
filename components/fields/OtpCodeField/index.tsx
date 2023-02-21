import styles from './index.module.scss'
import { useField } from 'formik'
import { IField } from 'types/types'
//import FieldError from 'components/ui/FieldError'
import PinInput from 'react-pin-input'
import classNames from 'classnames'
import OtpSnackbar from './OtpSnackbar'
import { useAuthContext } from 'context/auth_state'

interface Props extends IField<string> {
  label?: string,
  length: number,
  onComplete: (code: string) => void
  snackbar: boolean
  errorMessage?: string
}

export default function OtpCodeField(props: Props) {
  const { label, length, onComplete } = props
  const [field, meta, helpers] = useField(props as any)
  const { value } = field
  const showError = meta.touched && !!meta.error
  const authContext = useAuthContext()
  const handleComplete = (value: string) => {
    console.log('handleComplete', value)
    helpers.setValue(value)
    setTimeout(() => {
      props.onComplete(value)
    }, 100)

  }

  console.log('ERRRRRR', props.snackbar)
  return (
    <div className={classNames(styles.root, { [styles.error]: props.snackbar })}>
      <PinInput
        focus
        disabled={props.disabled}
        length={4}
        initialValue=""
        onChange={(value, index) => helpers.setValue(value)}
        type="numeric"
        inputMode="number"
        onComplete={handleComplete}
        style={{}}
        inputStyle={{}}
        inputFocusStyle={{}}
        autoSelect={true}
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
      />
      {/*<FieldError showError={showError}>{meta.error}</FieldError>*/}
      {authContext.otpError?.show ? <OtpSnackbar /> : null}
    </div>
  )
}
