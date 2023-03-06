import styles from './index.module.scss'
import { useAppContext } from 'context/state'
import Modal from 'react-modal'
import { ModalType } from 'types/enums'
import classNames from 'classnames'
import { RemoveScroll } from 'react-remove-scroll'
import AddressFormModal from 'components/modals/AdressModal'
import { useEffect } from 'react'
import LoginFormModal from 'components/modals/LoginModal'
import ProfileModal from 'components/modals/ProfileModal'
import MobileProfileMenuModal from 'components/modals/MobileProfileMenuModal'

interface Props { }

export default function ModalContainer(props: Props) {
  const appContext = useAppContext()
  const commonSettings = {
    onRequestClose: appContext.hideModal,
    className: styles.modal,
    overlayClassName: classNames([styles.overlay, appContext.modal && styles[appContext.modal]]),
  }
  useEffect(() => {
    console.log('ModalContainer')
  }, [])

  const getModalType = (modal: ModalType) => {
    switch (modal) {
      case ModalType.AddressForm:
        return ModalType.AddressForm
      case ModalType.Login:
        return ModalType.Login
      case ModalType.Profile:
        return ModalType.Profile
      case ModalType.ProfileMenu:
        return ModalType.ProfileMenu
    }
  }

  return (
    <RemoveScroll enabled={!!appContext.modal}>
      <div aria-hidden="true">
        <Modal isOpen={appContext.modal === getModalType(appContext.modal)} {...commonSettings}>
          {appContext.modal === ModalType.AddressForm && <AddressFormModal />}
          {appContext.modal === ModalType.Login && <LoginFormModal onRequestClose={commonSettings.onRequestClose} />}
          {appContext.modal === ModalType.Profile && <ProfileModal onRequestClose={commonSettings.onRequestClose} />}
          {appContext.modal === ModalType.ProfileMenu &&
            <MobileProfileMenuModal
              onRequestClose={commonSettings.onRequestClose}
              isOpen={appContext.modal === ModalType.ProfileMenu} />}
        </Modal>
      </div>
    </RemoveScroll>
  )
}

