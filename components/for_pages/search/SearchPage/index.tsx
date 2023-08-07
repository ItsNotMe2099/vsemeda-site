import { ISearchUnit } from 'data/interfaces/ISearchBrand'
import styles from './index.module.scss'
import ResultItem from './ResultItem'


interface Props {
    results: ISearchUnit[]
   
}

export default function SearchPage(props: Props) {

  

    const body = (
    <div className={styles.root}>
        {props.results?
            props.results.map(item => {
                return <ResultItem key={item.id} unit={item}/>
            }): null
        }
    </div>)

    return (<>
        {body}
    </>)
}