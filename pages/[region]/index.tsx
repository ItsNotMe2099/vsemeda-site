import BestOffers from 'components/for_pages/BestOffers'
import Nearby from 'components/for_pages/Nearby'
import OffersWeek from 'components/for_pages/OffersWeek'
import Promotions from 'components/for_pages/Promotions'
import Layout from 'components/layout/Layout'
import styles from './index.module.scss'
import { useEffect, useState } from 'react'
import MainLoader from 'components/for_pages/Loaders/MainLoader'

export default function Region() {

  const [loading, setIsLoading] = useState(true)

 useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  }, [])

  return (
    <Layout>
      {loading ?
        <MainLoader/>
        :
        <>
          <BestOffers />
          <OffersWeek />
          <Promotions />
          <Nearby />
        </>
      }
    </Layout>
  )
}
