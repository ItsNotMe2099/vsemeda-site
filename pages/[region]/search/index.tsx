import styles from './index.module.scss'
import SearchHeader from 'components/for_pages/search/SearchHeader'
import { GetServerSideProps } from 'next'
import { Sticky, StickyContainer } from 'react-sticky'
import SearchPage from 'components/for_pages/search/SearchPage'

interface Props {
    query: any
    found: number
}

  

export default function Search(props: Props) {

    return (<div className={styles.root}>
        <StickyContainer>
            <Sticky >
                {({style, isSticky, distanceFromTop}) => <div style={style} className={styles.sticky}><SearchHeader isSticky={isSticky} distanceFromTop={distanceFromTop}/></div>} 
            </Sticky>
            <SearchPage found={props.found}/>
        </StickyContainer>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async(context) => {
    //сюда получение данных о найденных ресторанах из query параметров
    let found = 120

    return {
        props: {
            query: context.query,
            found: found
        }
    }

}