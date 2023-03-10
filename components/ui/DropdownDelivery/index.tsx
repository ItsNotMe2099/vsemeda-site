import { useRef, useState } from 'react'
import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import styles from './index.module.scss'
import classNames from 'classnames'
import { forwardRef, HTMLAttributes } from 'react'

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

  console.log(props.isActive)

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
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.70202 0.712509C1.09214 0.319627 1.72762 0.31811 2.11912 0.70961L5.29241 3.88289C5.68293 4.27342 6.31609 4.27342 6.70662 3.88289L9.8799 0.70961C10.2714 0.318109 10.9069 0.319628 11.297 0.712509C11.6852 1.10343 11.6844 1.73506 11.2949 2.12461L6.70662 6.71289C6.31609 7.10342 5.68293 7.10342 5.29241 6.71289L0.704124 2.12461C0.314575 1.73506 0.313851 1.10343 0.70202 0.712509Z" fill="black" />
          </svg>
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
