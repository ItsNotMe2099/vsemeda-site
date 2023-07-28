import styles from './index.module.scss'
import {ViewTemplateItemType} from 'data/enum/ViewTemplateItemType'
import Layout from 'components/layout/Layout'
import {IndexPageWrapper, useIndexPageContext} from 'context/index_page_state'
import IndexHeader from 'components/for_pages/index/IndexHeader'
import BestOffers from 'components/for_pages/index/BestOffers'
import FilterBtn from 'components/for_pages/index/FilterBtn'
import Filter from 'components/for_pages/index/Filter'
import LayoutItem from 'components/for_pages/index/LayoutItem'
import UnitList from 'components/for_pages/Common/UnitList'
import UnitSlider from 'components/for_pages/Common/UnitSlider'
import VisibleXs from 'components/visibility/VisibleXs'
import { useAppContext } from 'context/state'

interface Props{
}
const IndexPageInner = (props: Props) => {
  const appContext = useAppContext()
  const indexPageContext = useIndexPageContext()
  const layoutItemBestOffers = indexPageContext.unitIndex?.layout?.items?.find(i => i.type === ViewTemplateItemType.SliderBrands)
  const layoutItems = layoutItemBestOffers?  indexPageContext.unitIndex?.layout?.items.filter(i => i.type !== layoutItemBestOffers.type && i.name !== layoutItemBestOffers.name) : indexPageContext.unitIndex?.layout?.items

  return (
    <Layout>
        {indexPageContext.unitIndex && <><IndexHeader>
          {layoutItemBestOffers && <BestOffers item={layoutItemBestOffers} />}
        </IndexHeader>

          <div className={styles.body}>
            <FilterBtn />
            <Filter />

            <VisibleXs>
              {/* TODO: добавить сверху на мобилке "Лучшие предложения" и выяснить, лучше ли использовать мобильный свайпер */}
              <UnitSlider units={layoutItemBestOffers.units} />
            </VisibleXs>


            {indexPageContext.isLoading && <div className={styles.loading}>Загружается</div>}
            {(layoutItems ?? []).map(item => <LayoutItem item={item}/>)}
            
            {!indexPageContext.isLoading && <UnitList
              units={[...indexPageContext.unitIndex.units,]} />}
          </div>
        </>}
    </Layout>
  )
}
export default function IndexPage(props: Props) {
  return (

      <IndexPageWrapper>
        <IndexPageInner/>
      </IndexPageWrapper>

  )
}
