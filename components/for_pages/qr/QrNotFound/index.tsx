import styles from './index.module.scss'

interface Props {

}

export default function QrNotFound(props: Props) {
  return (
    <div className={styles.root}>
       <div className={styles.title}>QR код не найден</div>
    </div>
  )
}
