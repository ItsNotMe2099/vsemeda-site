import styles from './index.module.scss'
import { breakpoints, colors } from 'styles/variables'
import BottomSheetLayout from 'components/layout/BottomSheet/BottomSheetLayout'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import BottomSheetBody from 'components/layout/BottomSheet/BottomSheetBody'
import BackBtn from 'components/ui/BackBtn'
import Option from 'components/layout/Header/UserMenu/Option'
import { useAppContext } from 'context/state'
import { ModalType } from 'types/enums'
import CirclesBgSvg from 'components/svg/CirclesBgSvg'
import ProfileForm from './ProfileForm'
import Orders from './Orders'
import VisibleXs from 'components/visibility/VisibleXs'
import Image from 'next/image'
import classNames from 'classnames'
// import { useRef } from 'react'
import { useOrderContext } from 'context/order_state'
import VisibleOnSize from 'components/visibility/VisibleOnSize'



interface Props {
  isBottomSheet?: boolean
  onRequestClose: () => void
}

const ProfileModalInner = (props: Props) => { 

  const handleCloseClick = () => {
    props.onRequestClose()
  }

  const appContext = useAppContext()
  const orderContext = useOrderContext()

  const items = [
    { icon: '/images/UserMenu/profile.svg', text: 'Профиль', value: 'profile' },
    //{ icon: '/images/UserMenu/address.svg', text: 'Мои адреса', value: 'address' },
    { icon: '/images/UserMenu/orders.svg', text: 'Заказы', value: 'orders' },
    //{ icon: '/images/UserMenu/about.svg', text: 'О нас', value: 'about' },
    //{ icon: '/images/UserMenu/policy.svg', text: 'Политика', value: 'policy' },
    //{ icon: '/images/UserMenu/help.svg', text: 'Помощь/поддержка', value: 'help' },
    //{ icon: '/images/UserMenu/settings.svg', text: 'Настройки', value: 'settings' },
  ]

  const handleOptionClick = (value: string) => {
    appContext.showModal(ModalType.Profile, value)
  }

  const item = items.find(i => i.value === appContext.modalArguments)

  const body = (
    <div className={styles.bodyWrapper}>
      <div className={styles.menu}>
        <BackBtn bgColor='white' onClick={handleCloseClick} />
        <div className={styles.options}>
          {items.map(i =>{
            return <Option item={i} key={i.value} onClick={() => handleOptionClick(i.value)} />}
          )}
        </div>
      </div>
      <div className={styles.content}>
        <CirclesBgSvg className={styles.circle} />       
        <VisibleOnSize  width={breakpoints.PhoneWidth} >
          <div className={styles.head}>
            <BackBtn className={styles.back} bgColor='white' onClick={handleCloseClick} />
            <div className={styles.title}>
              <Option item={item} key={item.value} className={styles.option} />
            </div>
          </div>
        </VisibleOnSize>     
        {appContext.modalArguments === 'profile' && 
          <ProfileForm /> 
        }
        {appContext.modalArguments === 'orders' && 
          <Orders />
        }
        <VisibleXs>
          <div className={styles.footer}>
            {appContext.modalArguments === 'profile' ?
              <Image src={'/images/ProfileModal/bg1.png'} alt='' fill />
              :
              <Image src={'/images/ProfileModal/bg2.png'} alt='' fill />
            }
          </div>
        </VisibleXs>
      </div>
    </div>
  )

  if (props.isBottomSheet) {
    return (
      <BottomSheetLayout closeIconColor={colors.grey2}>
        <BottomSheetBody>{body}</BottomSheetBody>
      </BottomSheetLayout>
    )
  }

  return (
    // <ModalLayout fixed className={classNames(styles.modalLayout, styles[appContext.modalArguments])}>
    <ModalLayout fixed className={classNames(styles.modalLayout, styles[appContext.modalArguments])}>
      {body}
    </ModalLayout>
  )
}

export default function ProfileModal(props: Props) {
  return (<>
    <ProfileModalInner {...props} />
  </>)
}
