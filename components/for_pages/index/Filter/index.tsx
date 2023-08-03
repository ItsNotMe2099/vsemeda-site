import styles from 'components/for_pages/index/Filter/index.module.scss'
import classNames from 'classnames'
import {useEffect, useRef, useState} from 'react'
import MenuRepository from 'data/repositories/MenuRepository'
import {ICategory} from 'data/interfaces/ICategory'
import {usePopper} from 'react-popper'
import {useDetectOutsideClick} from 'components/hooks/useDetectOutsideClick'
import FilterSvg from 'components/svg/FilterSvg'
import FilterCategories from 'components/for_pages/index/Filter/FilterCategories'
import {useAppContext} from 'context/state'
import {useIndexPageContext} from 'context/index_page_state'

interface Props {
  className?: string
  onFilterButtonClick: () => void
}

export default function Filter(props: Props) {
  const appContext = useAppContext()
  const unitIndexContext = useIndexPageContext()
  const [categories, setCategories] = useState<ICategory[]>([])
  const itemsRef = useRef<ICategory[]>([])
  const fetchData = async () => {
    await MenuRepository.fetchCategories().then(i => setCategories(i))
  }

  useEffect(()=> {
    itemsRef.current = categories ?? []
  }, [categories])
  const deliveryOptions = [
    { name: 'Сейчас' },
    { name: 'Завтра' },
  ]

  useEffect(() => {
    fetchData()
  }, [])

  const dropdownRef = useRef(null)

  const [showDropDown, setShowDropDown] = useDetectOutsideClick(dropdownRef, false)
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

  


  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.left}>
        {categories.length > 0 && <FilterCategories categories={categories}/>}
      </div>
      <div className={styles.right}>
        {/*<DropdownDelivery options={deliveryOptions} isActive={showDropDown} ref={setReferenceElement}
          attributes={attributes.popper}
          style={popperStyles.popper}
          onClick={() => setShowDropDown(!showDropDown)}
          onOptionClick={() => setShowDropDown(false)}
        />*/}
        <div className={styles.item} onClick={props.onFilterButtonClick}>
          <FilterSvg className={styles.filterSvg} color='#828282' />
          <span>Фильтр</span>
        </div>
      </div>
    </div>
  )
}
