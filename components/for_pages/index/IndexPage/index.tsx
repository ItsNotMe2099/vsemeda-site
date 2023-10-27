import styles from './index.module.scss'
import {ViewTemplateItemType} from 'data/enum/ViewTemplateItemType'
import Layout from 'components/layout/Layout'
import {useIndexPageContext} from 'context/index_page_state'
import IndexHeader from 'components/for_pages/index/IndexHeader'
import BestOffers from 'components/for_pages/index/BestOffers'
import FilterBtn from 'components/for_pages/index/FilterBtn'
import Filter from 'components/for_pages/index/Filter'
import LayoutItem from 'components/for_pages/index/LayoutItem'
import UnitList from 'components/for_pages/Common/UnitList'
import UnitSlider from 'components/for_pages/Common/UnitSlider'
// import VisibleXs from 'components/visibility/VisibleXs'
import { useAppContext } from 'context/state'
import { breakpoints } from 'styles/variables'
import VisibleOnSize from 'components/visibility/VisibleOnSize'
import { ModalType } from 'types/enums'
import { useResize } from 'components/hooks/useResize'
import ActiveOrder from '../ActiveOrder'

interface Props{
}
const IndexPageInner = (props: Props) => {
  const appContext = useAppContext()
  const indexPageContext = useIndexPageContext()
  const layoutItemBestOffers = indexPageContext.unitInitialIndex?.layout?.items?.find(i => i.type === ViewTemplateItemType.SliderBrands)
  const layoutItems = layoutItemBestOffers?  indexPageContext.unitInitialIndex?.layout?.items.filter(i => i.type !== layoutItemBestOffers.type && i.name !== layoutItemBestOffers.name) : indexPageContext.unitIndex?.layout?.items

  const {isPhoneWidth} = useResize()

  const onFilterButtonClick = () => {
    const filterOptions  = {
      categories: indexPageContext.categories,
      // onSubmit: (data: IndexFilterFormData) =>{
      //   indexPageContext.setFilter(data)
      //   appContext.hideModal()
      // },
      // onClear: () => indexPageContext.setFilter({})
    }
    isPhoneWidth?
    appContext.showBottomSheet(ModalType.IndexFilter, filterOptions):
    appContext.showModal(ModalType.IndexFilter, filterOptions)
  }



  return (
    <Layout>
        {indexPageContext.unitIndex && <><IndexHeader>
          {layoutItemBestOffers && layoutItemBestOffers.units.length > 0 &&
          <BestOffers item={layoutItemBestOffers} />}
          { isPhoneWidth && <ActiveOrder />}
        </IndexHeader>

          <div className={styles.body}>
            {layoutItemBestOffers.units.length > 0 && 
              <VisibleOnSize width={breakpoints.PhoneWidth} minSize>
                <Filter onFilterButtonClick={onFilterButtonClick} />
              </VisibleOnSize>
            }


              <VisibleOnSize width={breakpoints.PhoneWidth}>
              <FilterBtn  onFilterButtonClick={onFilterButtonClick}/>
              </VisibleOnSize>

            {indexPageContext.unitIndex?.units.length > 0 && 
              <VisibleOnSize width={breakpoints.PhoneWidth}>
                <UnitSlider units={layoutItemBestOffers.units} isMobile />
              </VisibleOnSize>
            }

            {indexPageContext.isLoading && <div className={styles.loading}>Загружается</div>}
            {indexPageContext.unitIndex?.units.length > 0 && (layoutItems ?? []).map(item => <LayoutItem item={item}/>)}
            
            {!indexPageContext.isLoading && indexPageContext.unitIndex?.units.length > 0 && <UnitList
              units={indexPageContext.unitIndex.units} />
            }
            {indexPageContext.unitIndex?.units.length === 0 && Object.keys(indexPageContext.filter).length > 0 &&
              <p className={styles.empty}>По вашему запросу ничего не найдено</p>
              ||
              indexPageContext.unitIndex?.units.length === 0 && Object.keys(indexPageContext.filter).length == 0 &&
              <p className={styles.empty}>Адрес не обслуживается</p>
            }
          </div>
            
        </>}
    </Layout>
  )
}
export default function IndexPage(props: Props) {
  return (
    <IndexPageInner/>
  )
}
