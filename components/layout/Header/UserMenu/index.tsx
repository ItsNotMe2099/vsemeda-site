import { MouseEventHandler, useRef, useState } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import { usePopper } from 'react-popper'
import * as React from 'react'
import usePressAndHover from 'hooks/usePressAndHover'
import { useAppContext } from 'context/state'
import { useDetectOutsideClick } from 'components/hooks/useDetectOutsideClick'
import ChevronSvg from 'components/svg/ChevronSvg'
import { colors } from 'styles/variables'
import { MenuDropdown } from './MenuDropdown'


interface Props {

}

export default function UserMenu(props: Props) {

  const items = [
    { icon: '/images/UserMenu/profile.svg', text: 'Профиль', value: 'profile' },
    //{ icon: '/images/UserMenu/address.svg', text: 'Мои адреса', value: 'address' },
    { icon: '/images/UserMenu/orders.svg', text: 'Заказы', value: 'orders' },
    //{ icon: '/images/UserMenu/about.svg', text: 'О нас', value: 'about' },
    //{ icon: '/images/UserMenu/policy.svg', text: 'Политика', value: 'policy' },
    //{ icon: '/images/UserMenu/help.svg', text: 'Помощь/поддержка', value: 'help' },
    //{ icon: '/images/UserMenu/settings.svg', text: 'Настройки', value: 'settings' },
    { icon: '/images/UserMenu/exit.svg', text: 'Выход', value: 'exit' },
  ]


  const appContext = useAppContext()
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
  const handleClick: MouseEventHandler = (e) => {
    if (items.length > 0) {
      e.preventDefault()
      e.stopPropagation()
      setShowDropDown(!showDropDown)
      if (showDropDown) {
        appContext.hideOverlay()
      } else {
        appContext.showOverlay()
      }

    }

  }


  return (
    <div 
    className={classNames(styles.root, { [styles.opened]: showDropDown, [styles.hover]: hover && !showDropDown })}
    onClick={handleClick}
    ref={(ref) => {
      (refAction as any).current = ref
      dropdownRef.current = ref
      setReferenceElement(ref)
    }}>
      <div className={styles.name}>{appContext.user ? appContext.user.name.split(' ')[0] : ''}</div>  
      {/* <div className={styles.name}>{appContext.user ? appContext.user.name: ''}</div>   */}
      <ChevronSvg className={styles.chevron} color={colors.white} />
      <div className={styles.icon}>
        <img src='/images/UserMenu/profile.svg' alt='' />
      </div>
      <div className={classNames(styles.activeWrapper, { [styles.active]: showDropDown })}>
        <MenuDropdown items={items}
          isActive={showDropDown}
          ref={setReferenceElement}
          attributes={attributes.popper}
          style={popperStyles.popper} />
      </div>
    </div>
  )
}
