import styles from './index.module.scss'
import SearchHeader from 'components/for_pages/search/SearchHeader'
import { GetServerSideProps } from 'next'
import { Sticky, StickyContainer } from 'react-sticky'
import SearchPage from 'components/for_pages/search/SearchPage'
import { useRef, useState } from 'react'
import SearchRepository from 'data/repositories/SearchRepository'
import { ISearchBrandsRequest } from 'data/interfaces/ISearchBrandsRequest'
import { ISearchUnit } from 'data/interfaces/ISearchBrand'
import { CookiesType } from 'types/enums'
import { IUserAddress } from 'data/interfaces/IUserAddress'
import CookiesUtils from 'utils/CookiesUtils'

interface Props {
  query?: any
	address?: IUserAddress
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
		const dataWithLocation = {...data, location: props.address.location}
    await SearchRepository.searchUnits(dataWithLocation, {signal: abortControllerRef.current.signal})
    .then(results  => {           
      setResults(results)
      setLoading(false)
    })
  }

  return (
		<div className={styles.root}>
    	<StickyContainer>
    	  <Sticky >
    	    {({style, isSticky, distanceFromTop}) => <div style={style} className={styles.sticky}><SearchHeader onChange={searchUnits} isSticky={isSticky} distanceFromTop={distanceFromTop}/></div>} 
    	  </Sticky>
    	  <SearchPage isLoading={isLoading} results={searchResults}/>
    	</StickyContainer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async(context: {query: any, req: { cookies: { [x: string]: any } } }) => {
  //сюда получение данных о найденных ресторанах из query параметров  
	const address = context.req.cookies[CookiesType.address]

  return {
    props: {
      query: context.query,
			address: CookiesUtils.decodeJson(address)
    }
  }
}