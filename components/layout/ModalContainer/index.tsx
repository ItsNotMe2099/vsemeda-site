import styles from './index.module.scss'
import { useAppContext } from 'context/state'
import Modal from 'react-modal'
import { ModalType } from 'types/enums'
import classNames from 'classnames'
import { RemoveScroll } from 'react-remove-scroll'
import AddressFormModal from 'components/modals/AddressModal'
import LoginFormModal from 'components/modals/LoginModal'
import ProfileModal from 'components/modals/ProfileModal'
import MobileProfileMenuModal from 'components/modals/MobileProfileMenuModal'
import AddressListModal from 'components/modals/AddressListModal'
import BasketModal from 'components/modals/BasketModal'
import ProductModal from 'components/modals/ProductModal'
import PreOrderModal from 'components/modals/PreOrderModal'
import IndexFilterModal from 'components/modals/IndexFilterModal'
import {ConfirmModal} from 'components/modals/ConfirmModal'
import FeedbacksModal from 'components/modals/FeedbacksModal'
import ActiveOrderModal from 'components/modals/ActiveOrderModal'
import CancelReasonForm from 'components/modals/CancelReasonModal'
import OrderDetails from 'components/modals/OrderDetailsModal'
import LeaveFeedbackModal from 'components/modals/LeaveReviewModal'
import ComplaintModal from 'components/modals/ComplaintModal'
import IFrameModal from 'components/modals/IFrameModal'
import ComplaintEndModal from 'components/modals/ComplaintEndModal'


interface Props { }

export default function ModalContainer(props: Props) {
  const appContext = useAppContext()
  const commonSettings = {
    onRequestClose: appContext.hideModal,
    className: styles.modal,
    overlayClassName: classNames([styles.overlay, appContext.modal && styles[appContext.modal]]),
  }

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
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.ProfileMenu} {...commonSettings}>
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
        <Modal isOpen={appContext.modal === ModalType.Basket} {...commonSettings}>
          {appContext.modal === ModalType.Basket && <BasketModal onRequestClose={appContext.hideModal} />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.ProductModal} {...commonSettings}>
          {appContext.modal === ModalType.ProductModal && <ProductModal onRequestClose={appContext.hideModal} />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.PreOrderForm} {...commonSettings}>
          {appContext.modal === ModalType.PreOrderForm && <PreOrderModal onRequestClose={appContext.hideModal} />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.IndexFilter} {...commonSettings}>
          {appContext.modal === ModalType.IndexFilter && <IndexFilterModal onRequestClose={appContext.hideModal} />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.Confirm} {...commonSettings}>
          {appContext.modal === ModalType.Confirm && <ConfirmModal onRequestClose={appContext.hideModal} />}
        </Modal>
        <Modal isOpen={appContext.modal === ModalType.Feedbacks} {...commonSettings}>
          {appContext.modal === ModalType.Feedbacks && <FeedbacksModal onRequestClose={appContext.hideModal} />}
        </Modal>  
        <Modal isOpen={appContext.modal === ModalType.ActiveOrder} {...commonSettings}>
          {appContext.modal === ModalType.ActiveOrder && <ActiveOrderModal onRequestClose={appContext.hideModal} />}
        </Modal> 
        <Modal isOpen={appContext.modal === ModalType.CancelOrder} {...commonSettings}>
          {appContext.modal === ModalType.CancelOrder && <CancelReasonForm isModal={true} onBackClick={appContext.hideModal} />}
        </Modal> 
        <Modal isOpen={appContext.modal === ModalType.OrderDetails} {...commonSettings}>
          {appContext.modal === ModalType.OrderDetails && <OrderDetails isModal={true} onBackClick={()=>{appContext.showModal(ModalType.Profile, 'orders')}} />}
        </Modal> 
        <Modal isOpen={appContext.modal === ModalType.LeaveReview} {...commonSettings}>
          {appContext.modal === ModalType.LeaveReview && <LeaveFeedbackModal onBackClick={()=>{appContext.showModal(ModalType.Profile, 'orders')}} />}
        </Modal> 
        <Modal isOpen={appContext.modal === ModalType.Complaint} {...commonSettings}>
          {appContext.modal === ModalType.Complaint && <ComplaintModal onBackClick={()=>{appContext.showModal(ModalType.Profile, 'orders')}} />}
        </Modal> 
        <Modal isOpen={appContext.modal === ModalType.IFrame} {...commonSettings}>
          {appContext.modal === ModalType.IFrame && <IFrameModal onBackClick={appContext.hideModal} />}
        </Modal> 
        <Modal isOpen={appContext.modal === ModalType.ComplaintEndModal} {...commonSettings}>
          {appContext.modal === ModalType.ComplaintEndModal && <ComplaintEndModal onBackClick={appContext.hideModal} />}
        </Modal> 
      </div>
    </RemoveScroll>
  )
}

