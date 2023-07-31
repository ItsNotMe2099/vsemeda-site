import classNames from 'classnames'
import ArrowLeftSvg from 'components/svg/ArrowLeftSvg'
import CirclesBgSvg from 'components/svg/CirclesBgSvg'
import LogoEdaSvg from 'components/svg/LogoEdaSvg'
import { useAuthContext } from 'context/auth_state'
import { useAppContext } from 'context/state'
import { useState } from 'react'
import { colors } from 'styles/variables'
import { ModalType } from 'types/enums'
import styles from './index.module.scss'
import Option from './Option'


interface Props {
  isOpen: boolean
  onRequestClose: () => void
}

export default function MobileProfileMenuModal(props: Props) {

  const appContext = useAppContext()
  const authContext = useAuthContext()

  const [isOpen, toggleModal] = useState<boolean>(props.isOpen)

  const handleCloseClick = () => {
    toggleModal(false)
    setTimeout(()=> {
      props.onRequestClose()    
    }, 400)
  }

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



  const handleOptionClick = (value: string) => {
    if (value !== 'exit') {
      appContext.showModal(ModalType.Profile, value)
    }
    else {
      appContext.hideModal()
      authContext.logOut()
    }
  }

  return (
    <div className={classNames(styles.dropdownMobile,  { [styles.active]: isOpen })}>
      <CirclesBgSvg className={styles.circle} />
      <div className={styles.content}>
        <div className={styles.head} >
          <LogoEdaSvg />
          <ArrowLeftSvg onClick={handleCloseClick} className={styles.close} color={colors.white} />
        </div>
        <div className={styles.options}>
          {items.map((i, index) =>
            <Option item={i} key={i.value} onClick={() => handleOptionClick(i.value)} />
          )}
        </div>
      </div>
    </div>
  )
}

