import SubscribeForm from './Form'
import styles from './index.module.scss'


interface Props {
}

export default function Subscribe(props: Props) {

  const handleSubmit = () => {

  }

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        Наша рассылка
      </div>
      <SubscribeForm onSubmit={handleSubmit} />
    </div>
  )
}
