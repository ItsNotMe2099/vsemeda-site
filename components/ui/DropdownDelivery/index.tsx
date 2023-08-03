import { useRef, useState } from 'react'
import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import styles from './index.module.scss'
import classNames from 'classnames'
import { forwardRef, HTMLAttributes } from 'react'
import ArrowDownSvg from 'components/svg/ArrowDown'

interface IOption{
  name: string
}

interface Props {
  options?: IOption[]
  onTriggerClick?: () => void
  activeTab?: string
  allOption?: boolean
  dots?: boolean
  className?: string
  optionClick?: () => void
  style?: React.CSSProperties,
  attributes?: HTMLAttributes<HTMLDivElement>
  isActive: boolean
  onClick: () => void
  onOptionClick: () => void
}

export const DropdownDelivery = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const dropdownRef = useRef(null)
  const { options, optionClick, onTriggerClick } = props
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const [currentLabel, setCurrentLabel] = useState<string>(options[0].name)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent> ) => {
    if (options.length === 0) {
      onTriggerClick()
    }
    e.preventDefault()
    props.onClick()
  }
  const handleOptionClick = (item: IOption) => {
    setCurrentLabel(item.name)
    props.onOptionClick()
    optionClick ? optionClick() : null
  }

  const filtered = options.filter(i => i.name !== currentLabel)

  return (
    <div className={classNames(styles.root, props.className)}>
      <a href="#" onClick={handleClick} className={classNames(styles.dropDownTrigger)}>
        <div className={styles.label}>
          <span className={styles.delivery}>Доставка:</span><span>{currentLabel}</span>
        </div>
        <div className={styles.arrow}>
          <ArrowDownSvg/>
        </div>
      </a>
      <nav ref={ref} style={props.style}  {...props.attributes} className={classNames(styles.dropDown, { [styles.dropDownActive]: props.isActive })}>
        {filtered.map((item, index) => <div key={index} className={styles.option}
          onClick={() => handleOptionClick(item)}>
          <a>{item.name}</a></div>)}
      </nav>
    </div>
  )
})

DropdownDelivery.displayName = 'MenuDropdown'
