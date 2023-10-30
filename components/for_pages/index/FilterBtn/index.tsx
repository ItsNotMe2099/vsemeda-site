import { useIndexPageContext } from 'context/index_page_state'
import styles from './index.module.scss'
import FilterSvg from 'components/svg/FilterSvg'

interface Props {
  onFilterButtonClick: () => void
}

export default function FilterBtn(props: Props) {
  const indexPageContext = useIndexPageContext()
  const isFilterActive = indexPageContext.isFilterActive()

  

  return (
    <div className={styles.root} onClick={props.onFilterButtonClick}>
      <FilterSvg color='#812292'/>
      {isFilterActive && 
        <div className={styles.filtersActive}></div>
      }
    </div>
  )
}
