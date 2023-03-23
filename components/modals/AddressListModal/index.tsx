import styles from './index.module.scss'
import { useAppContext } from 'context/state'
import { colors } from 'styles/variables'
import BottomSheetLayout from 'components/layout/BottomSheet/BottomSheetLayout'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import { IUserAddress } from 'data/interfaces/IUserAddress'
import BottomSheetHeader from 'components/layout/BottomSheet/BottomSheetHeader'
import BottomSheetBody from 'components/layout/BottomSheet/BottomSheetBody'
import BottomSheetFooter from 'components/layout/BottomSheet/BottomSheetFooter'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import { useAddressContext } from 'context/address_state'
import AddressCard from 'components/for_pages/Common/AddressCard'
import Button from 'components/ui/Button'
import { ModalType } from 'types/enums'

const YandexMap = dynamic(() => import('components/ui/YandexMap'), {
  ssr: false
})
export interface AddressFormModalArguments {
  address: IUserAddress
}

interface Props {
  isBottomSheet?: boolean
}

const AddressListModalInner = (props: Props) => {
  const appContext = useAppContext()
  const addressContext = useAddressContext()
  const header = (<div />)
  const handleClick = (address: IUserAddress) => {
    appContext.setCurrentAddress(address)
  }

  const body = (
    <>
      {props.isBottomSheet ? <div className={styles.title}>Адрес доставки</div> : null}
      <div className={styles.bodyWrapper}>
        <div className={styles.list}>{addressContext.addresses.map(i => <AddressCard item={i} isSelected={appContext.currentAddress?.id === i.id} onClick={() => handleClick(i)} />)}</div>
      </div>
    </>
  )

  const footer = (<div className={styles.actions}>
    <Button className={classNames({ [styles.btn]: props.isBottomSheet })} styleType={'filledGreen'} fluid type={'submit'} onClick={() => appContext.showModal(ModalType.AddressForm)}>Добавить адрес</Button>

  </div>
  )
  if (props.isBottomSheet) {
    return (
      <BottomSheetLayout closeIconColor={colors.grey2}>
        <BottomSheetHeader>{header}</BottomSheetHeader>
        <BottomSheetBody className={styles.bottomSheetBody}>{body}</BottomSheetBody>
        <BottomSheetFooter className={styles.footer}> {footer}</BottomSheetFooter>
      </BottomSheetLayout>
    )
  }
  else {
    return (
      <ModalLayout fixed className={styles.modalLayout}  >
        <div className={classNames(styles.modalBody, { [styles.formShown]: true })}>{body}</div>
        {footer}
      </ModalLayout>
    )
  }
}

export default function AddressListModal(props: Props) {
  return (<>
    <AddressListModalInner {...props} />
  </>)
}
