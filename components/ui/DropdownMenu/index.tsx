import { useRef, useState } from 'react'
import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import styles from './index.module.scss'
import classNames from 'classnames'
import { ICategory } from 'data/interfaces/ICategory'
import ArrowDownSvg from 'components/svg/ArrowDown'
import Scrollbars from 'react-custom-scrollbars-2'

interface Props {
  options?: ICategory[]
  onTriggerClick?: () => void
  activeTab?: string
  allOption?: boolean
  dots?: boolean
  className?: string
  activeTriggerClassName?: string
  navClassName?: string
  optionClassName?: string
  optionClick?: (option: ICategory) => void
  style?: 'more'
}

export default function DropdownMenu(props: Props) {
  const dropdownRef = useRef(null)
  const { options, optionClick, onTriggerClick } = props
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const [currentLabel, setCurrentLabel] = useState<string>(props.style === 'more' ? '' : options[0]?.name)


  //TODO: клик неправильно отрабатывает, поэтому надо еще посмотреть
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent> ) => {    
  
    if (options.length === 0) {
      onTriggerClick()
    }
    e.preventDefault()
    setIsActive((state) => state = state === true?false: true)
  }

  const handleOptionClick = (item: ICategory) => {
    setCurrentLabel(item.name)
    setIsActive((state) => state = false)
    optionClick ? optionClick(item) : null
  }

  const filtered = options.filter(i => i.name !== currentLabel)

  return (
    <div className={classNames(styles.root, props.className, {[styles.more]: props.style === 'more'})}>
      <div onClick={handleClick} className={classNames(styles.dropDownTrigger, isActive&&props.activeTriggerClassName)}>
        <div className={styles.label}>
          <span>{props.style === 'more' ? <>Еще</> : currentLabel}</span>
        </div>
        <div className={styles.arrow}>
          <ArrowDownSvg/>
        </div>
      </div>
      <nav ref={dropdownRef} className={classNames(styles.dropDown, { [styles.dropDownActive]: isActive }, props.navClassName)}>

        <Scrollbars autoHide height={'100%'}  width={'100%'} >
          {(props.style === 'more' ? options : filtered).map((item, index) => 
            <div key={index}
            className={classNames(styles.option, props.optionClassName, {[styles.optionCurrent]: props.style === 'more' && item.name === currentLabel})}
            onClick={() => handleOptionClick(item)}>
              <p>{item.name}</p>
            </div>
          )}
          </Scrollbars>
      </nav>
    </div>
  )
}
