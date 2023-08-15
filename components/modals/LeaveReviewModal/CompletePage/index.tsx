import { useResize } from 'components/hooks/useResize'
import CommentSuccessSvg from 'components/svg/CommentSuccessSvg'
import styles from './index.module.scss'

interface Props {
  onClick: ()=>void
}

export default function CompletePage(props: Props) {
  const {isPhoneWidth} = useResize()

  return ( 
    <div className={styles.root}>
      <CommentSuccessSvg/>
      <p className={styles.title}>{isPhoneWidth? 'Отзыв отправлен':'Спасибо за отзыв'}</p>
      <button className={styles.button} onClick={props.onClick}>{isPhoneWidth? 'Ок': 'На главную'}</button>
    </div>
  )
}