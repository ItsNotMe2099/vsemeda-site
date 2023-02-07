import Layout from 'components/layout/Layout'
import { useEffect, useState } from 'react'
import {IUnitIndex} from 'data/interfaces/IUnitIndex'
import UnitRepository from 'data/repositories/UnitRepository'
import {GetServerSideProps} from 'next'
import {IUnit} from 'data/interfaces/IUnit'
import {UnitWrapper} from 'context/unit_state'
import {useRouter} from 'next/router'
import RestaurantPage from 'components/for_pages/restaurant/RestaurantPage'
interface Props{
  initialUnit: IUnit
}
export default function Restaurant(props: Props) {
  const router = useRouter()
  const [loading, setIsLoading] = useState(true)
  const [unitIndex, setUnitIndex] = useState<IUnitIndex | null>()
 useEffect(() => {
   UnitRepository.fetchUnitIndex({location: {lat: 55.85644835024383, lng: 37.00685434662651 }}).then(i => setUnitIndex(i))
  }, [])

  return (
    <Layout>
      <UnitWrapper id={router.query.slug as string} initialUnit={props.initialUnit}>
        <RestaurantPage/>
      </UnitWrapper>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context ) => {
  const res = await Promise.all([
    UnitRepository.fetchById(context.query.slug as string, {lat: 55.85644835024383, lng: 37.00685434662651 })
  ])

  return {
    props: {
      initialUnit: res[0]
    } as Props
  }
}
