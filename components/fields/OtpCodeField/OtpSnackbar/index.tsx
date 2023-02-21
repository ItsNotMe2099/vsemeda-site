import styles from './index.module.scss'
import Image from 'next/image'
import { useAuthContext } from 'context/auth_state'

interface Props { }

export default function OtpSnackbar(props: Props) {
  const authContext = useAuthContext()

  return (
    <div className={styles.wrapper}>
      <div className={styles.snackbar}>
        <Image src={'/images/icons/warning.svg'} alt='' fill />
        <span>{authContext.otpError?.text}</span>
      </div>
    </div>
  )
}

