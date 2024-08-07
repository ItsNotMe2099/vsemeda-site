import Layout from 'components/layout/Layout'
import UnitRepository from 'data/repositories/UnitRepository'
import {GetServerSideProps} from 'next'
import {IUnit} from 'data/interfaces/IUnit'
import {UnitWrapper} from 'context/unit_state'
import {useRouter} from 'next/router'
import RestaurantPage from 'components/for_pages/restaurant/RestaurantPage'
import styles from 'pages/[region]/rest/index.module.scss'
import { IUserAddress } from 'data/interfaces/IUserAddress'
import { IUnitDetails } from 'data/interfaces/IUnitDetails'

interface Props {
  initialUnit: IUnit
  unitDetails?: IUnitDetails,
  location?: IUserAddress
}

export default function Restaurant(props: Props) {
  const router = useRouter()


  return (
    <Layout classRoot={styles.restaurant} className={styles.restaurant}>
      <UnitWrapper brandSlug={router.query.slug as string} initialUnit={props.initialUnit}>
        <RestaurantPage/>
      </UnitWrapper>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context: { query: {place?: string, slug?: string}, req: {cookies: { [x: string]: any }} }) => {
  const res = await Promise.all([
    context.query.place ? UnitRepository.fetchBySlug(context.query.place as string, {}) :
      UnitRepository.fetchByBrandSlug(context.query.slug as string, {})
  ])

  return {
    props: {
      initialUnit: res[0],
    } as Props
  }
}
