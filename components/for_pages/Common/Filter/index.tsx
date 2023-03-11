import styles from './index.module.scss'
import classNames from 'classnames'
import { useEffect, useState, useRef } from 'react'
import DropdownMenu from 'components/ui/DropdownMenu'
import MenuRepository from 'data/repositories/MenuRepository'
import { ICategory } from 'data/interfaces/ICategory'
import { DropdownDelivery } from 'components/ui/DropdownDelivery'
import { usePopper } from 'react-popper'
import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import usePressAndHover from 'hooks/usePressAndHover'
import FilterSvg from 'components/svg/FilterSvg'

interface Props {
  className?: string
}

export default function Filter(props: Props) {

  const [items, setItems] = useState<ICategory[] | null>(null)

  const fetchData = async () => {
    await MenuRepository.fetchCategories().then(i => setItems(i))
  }

  const deliveryOptions = [
    { name: 'Сейчас' },
    { name: 'Завтра' },
  ]

  useEffect(() => {
    fetchData()
  }, [])

  const [active, setActive] = useState<string>('all')

  const dropdownRef = useRef(null)
  const [refAction, press, hover] = usePressAndHover()

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

  const renderItems = (index: number) => {
    return (
      <>
        {items?.slice(0, index).map((i) =>
          <div
            key={i.id}
            className={classNames(styles.item, { [styles.active]: active === i.name })}
            onClick={() => setActive(i.name)}
          >
            {i.name}
          </div>
        )}
        {items?.length > index ?
          <DropdownMenu optionClick={(option) => setActive(option.name)} style='more' options={items.slice(index)} /> : null}
      </>
    )
  }

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.left}>
        <div
          onClick={() => setActive('all')}
          className={classNames(styles.item, { [styles.active]: active === 'all' })}>
          Все
        </div>
        <div className={styles.full}>
          {renderItems(5)}
        </div>
        <div className={styles.medium}>
          {renderItems(3)}
        </div>
        <div className={styles.smDesk}>
          {renderItems(1)}
        </div>
        <div className={styles.tablet}>
          {items?.map((i) =>
            <div
              key={i.id}
              className={classNames(styles.item, { [styles.active]: active === i.name })}
              onClick={() => setActive(i.name)}
            >
              {i.name}
            </div>
          )}
        </div>
      </div>
      <div className={styles.right}>
        <DropdownDelivery options={deliveryOptions} isActive={showDropDown} ref={setReferenceElement}
          attributes={attributes.popper}
          style={popperStyles.popper}
          onClick={() => setShowDropDown(!showDropDown)}
          onOptionClick={() => setShowDropDown(false)}
        />
        <div className={styles.item}>
          <FilterSvg className={styles.filterSvg} color='#828282' />
          <span>Фильтр</span>
        </div>
      </div>
    </div>
  )
}
