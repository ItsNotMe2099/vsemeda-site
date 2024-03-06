import styles from './index.module.scss'

interface Props {

}

export default function QrSuccess(props: Props) {
  return (
    <div className={styles.root}>
      <img src={'/images/qr/qr_success.png'} className={styles.image}/>
    <div className={styles.title}>Спасибо!</div>
    </div>
  )
}
