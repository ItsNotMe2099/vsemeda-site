import styles from './index.module.scss'
import { useAppContext } from 'context/state'
import classNames from 'classnames'
import { SnackbarType } from 'types/enums'

interface Props {}

export default function Snackbar(props: Props) {
  const appContext = useAppContext()

  return (
    <div className={classNames({
      [styles.root]: true,
      [styles.active]: appContext.snackbar,
      [styles.error]: appContext.snackbar?.type == SnackbarType.error,
      [styles.success]: appContext.snackbar?.type == SnackbarType.success,
    })}>
      {appContext.snackbar?.text}
    </div>
  )
}

