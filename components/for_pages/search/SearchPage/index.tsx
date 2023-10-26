import Spinner from 'components/ui/Spinner'
import { ISearchUnit } from 'data/interfaces/ISearchBrand'
import { colors } from 'styles/variables'
import styles from './index.module.scss'
import ResultItem from './ResultItem'


interface Props {
  results: ISearchUnit[]
  isLoading?: boolean
}

export default function SearchPage(props: Props) {
  const body = (
  	<div className={styles.root}>
  	  {props.results&&props.results.map(item => {
  	    return <ResultItem key={item.id} unit={item}/>
  	  })}
  	  {props.isLoading &&
  	    <Spinner size={40} color={colors.purple}/>
  	  }
  	</div>
	)

    return (<>
        {body}
    </>)
}