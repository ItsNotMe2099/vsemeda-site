import styles from 'components/for_pages/index/FilterBtn/index.module.scss'
import FilterSvg from 'components/svg/FilterSvg'

interface Props {

}

export default function FilterBtn(props: Props) {

  return (
    <div className={styles.root}>
      <FilterSvg color='#812292'/>
    </div>
  )
}
