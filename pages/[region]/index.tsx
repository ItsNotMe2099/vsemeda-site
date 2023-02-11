import BestOffers from 'components/for_pages/index/BestOffers'
import Layout from 'components/layout/Layout'
import { useEffect, useState } from 'react'
import {IUnitIndex} from 'data/interfaces/IUnitIndex'
import styles from './index.module.scss'
import UnitList from 'components/for_pages/Common/UnitList'
import UnitRepository from 'data/repositories/UnitRepository'
import Filter from 'components/for_pages/Common/Filter'
export default function Region() {

  const [loading, setIsLoading] = useState(true)
  const [unitIndex, setUnitIndex] = useState<IUnitIndex | null>()
 useEffect(() => {
   UnitRepository.fetchUnitIndex({location: {lat: 55.85644835024383, lng: 37.00685434662651 }}).then(i => setUnitIndex(i))
  }, [])

  return (
    <Layout>
      {unitIndex && <>
        <BestOffers />
        <Filter/>
        <div className={styles.body}>
          <UnitList units={[...unitIndex.units,...unitIndex.units,...unitIndex.units,...unitIndex.units,...unitIndex.units,...unitIndex.units,...unitIndex.units,...unitIndex.units,...unitIndex.units,...unitIndex.units,...unitIndex.units,...unitIndex.units,]}/>
        </div>
      </>}

    </Layout>
  )
}
