import styles from './index.module.scss'
import ResultItem from './ResultItem'


interface Props {
    found: number
}

export default function SearchPage(props: Props) {

    const body = (<>
    {props.found &&
        <p className={styles.found}>{props.found}</p>
    }
        
    <div className={styles.root}>
      <ResultItem/>
      <ResultItem/>
      <ResultItem/>
      <ResultItem/>
      <ResultItem/>
      <ResultItem/>
    </div>
    </>
    )



    return (<>
        {body}
    </>)
}