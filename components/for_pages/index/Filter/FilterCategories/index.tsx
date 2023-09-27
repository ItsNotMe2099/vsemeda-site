import styles from './index.module.scss'
import classNames from 'classnames'
import { useEffect, useState, useRef } from 'react'
import DropdownMenu from 'components/ui/DropdownMenu'
import { ICategory } from 'data/interfaces/ICategory'
import { usePopper } from 'react-popper'
import {useIndexPageContext} from 'context/index_page_state'
import VisibleOnSize from 'components/visibility/VisibleOnSize'
import { breakpoints } from 'styles/variables'

interface Props {
  className?: string
  categories: ICategory[]
}

export default function FilterCategories(props: Props) {
  const indexPageContext = useIndexPageContext()
  const itemsRef = useRef<ICategory[]>(props.categories)
  const linksRef = useRef<HTMLDivElement[]>([])
  const listRef = useRef<HTMLDivElement | null>()
  const lastLinkRef = useRef<HTMLDivElement | null>()
  const linksCacheRef = useRef<HTMLDivElement[]>([])
  const widthsCacheRef = useRef<number[]>([])
  const [slice, setSlice] = useState<number>(0)
  const [sliceInited, setSliceInited] = useState<boolean>(false)



  useEffect(()=> {
    itemsRef.current = props.categories ?? []
  }, [props.categories])


  const [active, setActive] = useState<string>('all')

  const dropdownRef = useRef(null)
  const [referenceElement, setReferenceElement] = useState(null)
  const [popperElement, setPopperElement] = useState(null)

  const { styles: popperStyles, attributes, forceUpdate, update } = usePopper(referenceElement, popperElement, {
    strategy: 'absolute',

    placement: 'bottom',
    modifiers: [
      {
        name: 'flip',
        enabled: true,
      },
    ]
  })

  useEffect(() => {
    checkingToShowLinks()
    window.addEventListener('resize', checkingToShowLinks)
    return () =>   window.removeEventListener('resize', checkingToShowLinks)

  }, [])
 const checkingToShowLinks = () => {
    if(!listRef.current || !lastLinkRef.current){
      return
    }
   const listWidth = listRef.current.clientWidth
   const lastLinkWidth = lastLinkRef.current.clientWidth
    if(itemsRef.current.length ===0 || itemsRef.current.length !== linksRef.current.length - 1 || lastLinkWidth === 0 || listWidth === 0){
      setTimeout(() => checkingToShowLinks(), 50)
      return
    }
    const marginLinks = 16 // отступ вправо от элементов списка
    const links = linksRef.current
    let sliceMenu = links.length - 1

    if( linksCacheRef.current.length === 0 ){
      linksCacheRef.current = [...links]
      widthsCacheRef.current = [...links.map((link) => {
        return link.clientWidth
      })]
    }
   const widthLinks = [...widthsCacheRef.current]

    const sumWidthLinks = () => {
      return widthLinks.reduce((acc, width) => {
        acc += width + marginLinks
        return acc
      }, lastLinkWidth)
    }
     if (listWidth < sumWidthLinks()) {
      while (widthLinks.length > 1 && sliceMenu > 1) {
        if (listWidth < sumWidthLinks()) {
          widthLinks.pop()
          sliceMenu--
        } else {
          break
        }
      }
      setSlice(sliceMenu)
    }
  }
  const handleClickCategory = (category: ICategory) => {
    if(indexPageContext.filter.categories?.includes(category.id)){
      indexPageContext.setFilterCategories(indexPageContext.filter?.categories?.filter(i => i !== category.id) ?? [])
    }else{
      indexPageContext.setFilterCategories([...indexPageContext.filter?.categories ?? [], category.id])
    }
  }

  const handleOptionClick = (category: ICategory) => {
    setActive(category.name)
    handleClickCategory(category)
  }

  return (
      <div className={styles.root} ref={listRef}>
        <div
          ref={el => linksRef.current[0] = el}
          onClick={() => indexPageContext.setFilter({})}
          className={classNames(styles.item, { [styles.active]:
              (indexPageContext.filter?.categories ? indexPageContext.filter?.categories?.length === 0  : true)
            && (indexPageContext.filter?.paymentMethods ? indexPageContext.filter?.paymentMethods?.length === 0  : true)
            && (indexPageContext.filter?.priceRatings ? indexPageContext.filter?.priceRatings?.length === 0  : true)
            && !indexPageContext.filter.maxDeliveryTime})}>
          Все
        </div>
          {props.categories?.slice(0, slice > 0 ?slice :  props.categories.length  ).map((i, index) =>
            <div
              key={i.id}
              ref={el => {
                if(!linksRef.current[index + 1]) {
                  linksRef.current[index + 1] = el
                }

              }}
              className={classNames(styles.item, { [styles.active]: indexPageContext.filter.categories?.includes(i.id) })}
              onClick={() => handleClickCategory(i)}
            >
              {i.name}
            </div>
          )}

            <div ref={lastLinkRef}>
              <VisibleOnSize width={breakpoints.PhoneWidth} minSize> 
                  {(!sliceInited || slice > 0) && 
                    <DropdownMenu navClassName={styles.dropDownNav}  optionClick={(category) => handleOptionClick(category)} style='more' options={props.categories ?? []} />
                   }
              </VisibleOnSize>
            </div>

      </div>
  )
}
