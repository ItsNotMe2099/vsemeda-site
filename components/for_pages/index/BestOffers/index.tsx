import styles from 'components/for_pages/index/BestOffers/index.module.scss'
import CirclesBgSvg from 'components/svg/CirclesBgSvg'

export default function BestOffers() {


  return (
    <div className={styles.root}>
      <div className={styles.bg}/>
      <CirclesBgSvg className={styles.circle} />
    </div>
  )
}
