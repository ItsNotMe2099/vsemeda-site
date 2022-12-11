import BestOffers from 'components/for_pages/BestOffers'
import Nearby from 'components/for_pages/Nearby'
import OffersWeek from 'components/for_pages/OffersWeek'
import Layout from 'components/layout/Layout'
import styles from './index.module.scss'

export default function Region() {

  return (
    <Layout>
      <BestOffers/>
      <OffersWeek/>
      <Nearby/>
    </Layout>
  )
}
