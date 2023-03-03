import BestOffers from 'components/for_pages/index/BestOffers'
import Layout from 'components/layout/Layout'
import {useEffect, useState} from 'react'
import {IUnitIndex} from 'data/interfaces/IUnitIndex'
import styles from './index.module.scss'
import UnitList from 'components/for_pages/Common/UnitList'
import UnitRepository from 'data/repositories/UnitRepository'
import Filter from 'components/for_pages/Common/Filter'
import {useAppContext} from 'context/state'

export default function Region() {
  const appContext = useAppContext()
  const [loading, setIsLoading] = useState(true)
  const [unitIndex, setUnitIndex] = useState<IUnitIndex | null>()
  const fetch = async () => {
    setIsLoading(true)
    const res = await UnitRepository.fetchUnitIndex({location: appContext.currentLocation})
    setUnitIndex(res)
    setIsLoading(false)
  }

  useEffect(() => {
    fetch()
  }, [appContext.currentLocation])

  return (
    <Layout>
      {unitIndex && <>
        <BestOffers/>
        <Filter/>
        <div className={styles.body}>
          {loading && <div className={styles.loading}>Загружается</div>}
          {unitIndex.layout.items.map(item => <div className={styles.item}>
            <div className={styles.title}>{item.name}</div>

          </div>)}
          {!loading && <UnitList
            units={[ ...unitIndex.units,]}/>}
        </div>
      </>}

    </Layout>
  )
}
