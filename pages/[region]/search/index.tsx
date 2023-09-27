import styles from './index.module.scss'
import SearchHeader from 'components/for_pages/search/SearchHeader'
import { GetServerSideProps } from 'next'
import { Sticky, StickyContainer } from 'react-sticky'
import SearchPage from 'components/for_pages/search/SearchPage'
import { useRef, useState } from 'react'
import SearchRepository from 'data/repositories/SearchRepository'
import { ISearchBrandsRequest } from 'data/interfaces/ISearchBrandsRequest'
import { ISearchUnit } from 'data/interfaces/ISearchBrand'

interface Props {
    query?: any
}

  

export default function Search(props: Props) {

    const [isLoading, setLoading] = useState<boolean>(false)
    const [searchResults, setResults] = useState<ISearchUnit[]>([])

    const abortControllerRef = useRef<AbortController | null>(null)

    const searchUnits = async (data: ISearchBrandsRequest) => {
        setLoading(true)

        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
        }
        abortControllerRef.current = new AbortController()

        await SearchRepository.searchUnits(data, {signal: abortControllerRef.current.signal})
        .then(results  => {           
            setResults(results)
            setLoading(false)
        })
    }

    

    return (<div className={styles.root}>
        <StickyContainer>
            <Sticky >
                {({style, isSticky, distanceFromTop}) => <div style={style} className={styles.sticky}><SearchHeader onChange={searchUnits} isSticky={isSticky} distanceFromTop={distanceFromTop}/></div>} 
            </Sticky>
            <SearchPage isLoading={isLoading} results={searchResults}/>
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