import styles from './index.module.scss'
import SearchHeader from 'components/for_pages/search/SearchHeader'
import { GetServerSideProps } from 'next'
import { Sticky, StickyContainer } from 'react-sticky'
import SearchPage from 'components/for_pages/search/SearchPage'
import { useState } from 'react'
import SearchRepository from 'data/repositories/SearchRepository'
import { ISearchBrandsRequest } from 'data/interfaces/ISearchBrandsRequest'
import { ISearchUnit } from 'data/interfaces/ISearchBrand'

interface Props {
    query?: any
}

  

export default function Search(props: Props) {

    const [isLoading, setLoading] = useState<boolean>(false)
    const [searchResults, setResults] = useState<ISearchUnit[]>([])

    const searchUnits = async (data: ISearchBrandsRequest) => {
        setLoading(true)
        await SearchRepository.searchUnits(data)
        .then(results  => {           
            setResults(results)
        })
        setLoading(false)
    }

    

    return (<div className={styles.root}>
        <StickyContainer>
            <Sticky >
                {({style, isSticky, distanceFromTop}) => <div style={style} className={styles.sticky}><SearchHeader onChange={searchUnits} isSticky={isSticky} distanceFromTop={distanceFromTop}/></div>} 
            </Sticky>
            <SearchPage results={searchResults}/>
        </StickyContainer>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async(context) => {
    //сюда получение данных о найденных ресторанах из query параметров  

    return {
        props: {
            query: context.query,
        }
    }

}