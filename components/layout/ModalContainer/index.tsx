import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import Modal from 'react-modal'
import {ModalType} from 'types/enums'
import classNames from 'classnames'
import {RemoveScroll} from 'react-remove-scroll'
import AddressFormModal from 'components/modals/AdressModal'
import { useEffect } from 'react'
import LoginFormModal from 'components/modals/LoginModal'
import ProfileModal from 'components/modals/ProfileModal'
import MobileProfileMenuModal from 'components/modals/MobileProfileMenuModal'
import AddressListModal from 'components/modals/AddressListModal'


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


  console.log('ModalType', appContext.modal)

  return (
    <RemoveScroll enabled={!!appContext.modal}>
      <div aria-hidden="true">
        <Modal isOpen={appContext.modal === ModalType.AddressForm} {...commonSettings}>
          {appContext.modal === ModalType.AddressForm && <AddressFormModal />}
         </Modal>
        <Modal isOpen={appContext.modal === ModalType.Login} {...commonSettings}>
          {appContext.modal === ModalType.Login && <LoginFormModal onRequestClose={commonSettings.onRequestClose} />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.Profile} {...commonSettings}>
          {appContext.modal === ModalType.Profile && <ProfileModal onRequestClose={commonSettings.onRequestClose} />}
          {appContext.modal === ModalType.ProfileMenu &&
            <MobileProfileMenuModal
              onRequestClose={commonSettings.onRequestClose}
              isOpen={appContext.modal === ModalType.ProfileMenu} />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.AddressList} {...commonSettings}>
          {appContext.modal === ModalType.AddressList && <AddressListModal />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.Login} {...commonSettings}>
          {appContext.modal === ModalType.Login && <LoginFormModal onRequestClose={appContext.hideModal} />}
        </Modal>
     </div>
    </RemoveScroll>
  )
}

