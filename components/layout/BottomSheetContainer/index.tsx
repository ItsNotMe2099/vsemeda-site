import styles from './index.module.scss'
import Sheet from 'react-modal-sheet'
import { useAppContext } from 'context/state'
import { ModalType } from 'types/enums'
import { RemoveScroll } from 'react-remove-scroll'
import AddressFormModal from 'components/modals/AddressModal'
import AddressListModal from 'components/modals/AddressListModal'
import ProductModal from 'components/modals/ProductModal'
import PreOrderModal from 'components/modals/PreOrderModal'
import IndexFilterModal from 'components/modals/IndexFilterModal'
import ActiveOrderModal from 'components/modals/ActiveOrderModal'
import CancelReasonForm from 'components/modals/CancelReasonModal'

interface Props { }

export default function BottomSheetContainer(props: Props) {
  const appContext = useAppContext()
  return (
    <RemoveScroll enabled={!!appContext.bottomSheet}>
      <div className={styles.root} aria-hidden="true">
        <Sheet
          isOpen={appContext.bottomSheet == ModalType.AddressForm}
          onClose={appContext.hideBottomSheet}
          snapPoints={[400]}
          disableDrag={appContext.modalNonSkippable}
        >
          <AddressFormModal isBottomSheet={true} />
        </Sheet>

        <Sheet
          isOpen={appContext.bottomSheet == ModalType.AddressList}
          onClose={appContext.hideBottomSheet}
          snapPoints={[400]}
          disableDrag={appContext.modalNonSkippable}
          className={styles[appContext.bottomSheet]}
        >
          <AddressListModal isBottomSheet={true} />
        </Sheet>

        <Sheet
          isOpen={appContext.bottomSheet == ModalType.ProductModal}
          onClose={appContext.hideBottomSheet}         
          disableDrag={appContext.modalNonSkippable}
          className={styles[appContext.bottomSheet]}
        >
          <ProductModal isBottomSheet={true} />
        </Sheet>

        <Sheet
          isOpen={appContext.bottomSheet == ModalType.PreOrderForm}
          snapPoints={[400]}
          onClose={appContext.hideBottomSheet}         
          disableDrag={appContext.modalNonSkippable}
          className={styles[appContext.bottomSheet]}
        >
          <PreOrderModal isBottomSheet={true} />
        </Sheet>

        <Sheet
          isOpen={appContext.bottomSheet == ModalType.IndexFilter}
          onClose={appContext.hideBottomSheet}         
          disableDrag={appContext.modalNonSkippable}
          className={styles[appContext.bottomSheet]}
        >
          <IndexFilterModal isBottomSheet={true} />
        </Sheet>

        <Sheet
          isOpen={appContext.bottomSheet == ModalType.ActiveOrder}
          onClose={appContext.hideBottomSheet}    
          snapPoints={[350]}     
          disableDrag={appContext.modalNonSkippable}
          className={styles[appContext.bottomSheet]}
        >
          <ActiveOrderModal isBottomSheet={true} />
        </Sheet>

        <Sheet
          isOpen={appContext.bottomSheet == ModalType.CancelOrder}
          onClose={appContext.hideBottomSheet}    
          snapPoints={[350]}     
          disableDrag={appContext.modalNonSkippable}
          className={styles[appContext.bottomSheet]}
        >
         <CancelReasonForm 
          isBottomSheet={true} 
          onBackClick={appContext.hideBottomSheet}
        />
        </Sheet>



      </div>
    </RemoveScroll>
  )
}

