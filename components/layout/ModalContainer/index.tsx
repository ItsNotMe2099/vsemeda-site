import styles from './index.module.scss'
import { useAppContext } from 'context/state'
import Modal from 'react-modal'
import { ModalType } from 'types/enums'
import classNames from 'classnames'
import { RemoveScroll } from 'react-remove-scroll'
import AddressFormModal from 'components/modals/AdressModal'
import {useEffect} from 'react'

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
  },[])

  return (
    <RemoveScroll enabled={!!appContext.modal}>
      <div aria-hidden="true">
        <Modal isOpen={appContext.modal === ModalType.AddressForm} {...commonSettings}>
          {appContext.modal === ModalType.AddressForm && <AddressFormModal />}
        </Modal>
      </div>
    </RemoveScroll>
  )
}

