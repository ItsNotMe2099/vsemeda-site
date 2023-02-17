import styles from './index.module.scss'
import { colors } from 'styles/variables'
import BottomSheetLayout from 'components/layout/BottomSheet/BottomSheetLayout'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import BottomSheetBody from 'components/layout/BottomSheet/BottomSheetBody'
import BackBtn from 'components/ui/BackBtn'
import Option from 'components/layout/Header/UserMenu/Option'
import { useAppContext } from 'context/state'
import { ModalType } from 'types/enums'
import CirclesBgSvg from 'components/svg/CirclesBgSvg'
import ProfileForm from './ProfileForm'


interface Props {
  isBottomSheet?: boolean
  onRequestClose: () => void
}

const ProfileModalInner = (props: Props) => {

  const handleCloseClick = () => {
    props.onRequestClose()
  }

  const appContext = useAppContext()

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


  const body = (
    <div className={styles.bodyWrapper}>
      <div className={styles.menu}>
        <BackBtn bgColor='white' onClick={handleCloseClick} />
        <div className={styles.options}>
          {items.map((i, index) =>
            <Option item={i} key={i.value} onClick={() => handleOptionClick(i.value)} />
          )}
        </div>
      </div>
      <div className={styles.content}>
        <CirclesBgSvg className={styles.circle} />
        {appContext.modalArguments === 'profile' ? <ProfileForm/> : null}
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
    <ModalLayout fixed className={styles.modalLayout}>
      {body}
    </ModalLayout>
  )
}

export default function ProfileModal(props: Props) {

  return (<>
    <ProfileModalInner {...props} />
  </>)
}
