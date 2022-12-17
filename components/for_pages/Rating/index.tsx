import StarRatingSvg from 'components/svg/StarRatingSvg'
import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  rating: number
  className?: string
}

export default function Rating({ rating, className }: Props) {

  return (
    <div className=
      {classNames(styles.rating, {
        [styles.high]: rating === 5, [styles.middle]: rating >= 3 && rating !== 5,
        [styles.low]: rating < 3
      })}>
      <StarRatingSvg />
      <div className={styles.text}>{rating}</div>
    </div>
  )
}
