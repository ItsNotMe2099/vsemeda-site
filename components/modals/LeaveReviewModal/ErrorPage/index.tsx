import CommentErrorSvg from 'components/svg/CommentErrorSvg'
import styles from './index.module.scss'

interface Props {
  onClick: ()=>void
}

export default function ErrorPage(props: Props) {

  return (

    <div className={styles.root}>
      <CommentErrorSvg/>
      <p className={styles.title}>:( Отзыв не отправился</p>
      <button className={styles.button} onClick={props.onClick}>Отправить еще раз</button>
    </div>
    
  )
}