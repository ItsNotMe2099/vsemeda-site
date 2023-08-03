import styles from './index.module.scss'
import FilterSvg from 'components/svg/FilterSvg'

interface Props {
  onFilterButtonClick: () => void
}

export default function FilterBtn(props: Props) {

  return (
    <div className={styles.root} onClick={props.onFilterButtonClick}>
      <FilterSvg color='#812292'/>
    </div>
  )
}
