import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import {colors} from 'styles/variables'
import BottomSheetLayout from 'components/layout/BottomSheet/BottomSheetLayout'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import {IUserAddress} from 'data/interfaces/IUserAddress'
import BottomSheetHeader from 'components/layout/BottomSheet/BottomSheetHeader'
import BottomSheetBody from 'components/layout/BottomSheet/BottomSheetBody'
import BottomSheetFooter from 'components/layout/BottomSheet/BottomSheetFooter'
import MarkerSvg from 'components/svg/MarkerSvg'
import dynamic from 'next/dynamic'
import AddressField from 'components/fields/AddressField'
import {Formik} from 'formik'
import {useEffect, useState} from 'react'
import {GeoObject, YandexResponseGeocoder} from 'data/interfaces/IYandexGeocoder'
import AddressForm from 'components/modals/AdressModal/Form'
import classNames from 'classnames'
import Converter from 'utils/converter'
import AddressFormConfirm from 'components/modals/AdressModal/Confirm'
import {YMapCenterLocation, YMapLocationRequest} from '@yandex/ymaps3-types'
import BackBtn from 'components/ui/BackBtn'
import { ModalType } from 'types/enums'
import { useResize } from 'components/hooks/useResize'
const YandexMap = dynamic(() => import('components/ui/YandexMap'), {
  ssr: false
})
export interface AddressFormModalArguments {
  address: IUserAddress
}

interface Props {
  isBottomSheet?: boolean
}

const AddressFormModalInner = (props: Props) => {
  const {isTabletWidth} = useResize()
  const appContext = useAppContext()
  const [addressSearchShown, setAddressSearchShown] = useState(true)
  const [addressFormShown, setAddressFormShown] = useState(false)
  const [confirmShown, setConfirmShown] = useState(false)
  const [addressStr, setAddressStr] = useState<string>(null)
  const header = (<div/>)
  const [geoObject, setGeoObject] = useState<GeoObject>()
  const args = appContext.modalArguments as AddressFormModalArguments
  const [location, setLocation] = useState<YMapLocationRequest | null>({center: [(appContext?.currentAddress?.location?.lng||args?.address?.location?.lng||undefined) , (appContext?.currentAddress?.location?.lat||args?.address?.location?.lat||undefined) ], zoom: 10})


  useEffect(() => {   
    if(args?.address){
      setAddressFormShown(true)
      // setAddressSearchShown(false)
      setAddressStr(args.address.address)
      setLocation({center: [args.address.location.lng, args.address.location.lat], zoom: 10})
    }
  }, [args])
  
  const handleEditAddressClick = () => {
    setAddressFormShown(false)
  }

  const handleSetNewAddress = (geocoded: YandexResponseGeocoder) => {
    const geoObject = geocoded.response.GeoObjectCollection.featureMember[0].GeoObject
    const point = geoObject.Point
    const bounds = [
      geoObject.boundedBy.Envelope.lowerCorner.split(' ').map(i => parseFloat(i)),
      geoObject.boundedBy.Envelope.upperCorner.split(' ').map(i => parseFloat(i)),
    ]
    const center = point.pos.split(' ').map(i => parseFloat(i)) as [lon: number, lat: number, alt?: number]
    setLocation({bounds: bounds as any, center})
    setGeoObject(geocoded.response.GeoObjectCollection.featureMember[0].GeoObject)
    // setConfirmShown(true)
    setAddressStr(Converter.convertGeoObjectToString(geocoded.response.GeoObjectCollection.featureMember[0].GeoObject))
  }

  useEffect(()=>{
    if(location && addressStr){
      setConfirmShown(true)
    }
  }, [location, addressStr])

  const handleConfirm = () => {
    setConfirmShown(false)
    setAddressFormShown(true)
  }

  const handleBack = () => {
      appContext.hideModal()
      isTabletWidth? appContext.showBottomSheet(ModalType.AddressList):  appContext.showModal(ModalType.AddressList)
  }

  const onSubmitHandler = ({}) => {
    
  }


  const body = (
    <div className={styles.bodyWrapper}>
      <BackBtn className={styles.btn} onClick={handleBack} bgColor={'white'} />
      {addressFormShown && 
        <AddressForm 
        isMobile={isTabletWidth} 
        editedAddressString={addressStr} 
        initialAddress={args?.address ? args.address  : geoObject&&Converter.convertGeoObjectToUserAddress(geoObject)} 
        />
      }
      <div className={styles.mapWrapper}>
        <YandexMap className={styles.map} setGeoObject={(o) => {setGeoObject(o)}} setLocation={(r: YMapLocationRequest) => setLocation(r)} setAddressStr={(s: string)=>setAddressStr(s)} center={location as YMapCenterLocation}/>
        {addressStr && <div className={styles.address}>{addressStr}</div>}
        {addressSearchShown && <div  className={styles.addressField}>
          <Formik initialValues={{}} onSubmit={(values)=>onSubmitHandler(values)}>
            <AddressField  hasAddress={!!geoObject} name={'address'} value={addressStr} onNewAddress={handleSetNewAddress} onEditClick={handleEditAddressClick}/>
          </Formik>
        </div>}
        <div className={styles.placemark}><MarkerSvg/></div>
        {confirmShown && <AddressFormConfirm address={addressStr} onConfirm={handleConfirm}/>}
      </div>
    </div>
  )

  const footer = (
    <div className={styles.actions}>
    </div>
  )

  if (props.isBottomSheet) {
    return (
      <BottomSheetLayout closeIconColor={colors.grey2}>
        <BottomSheetHeader>{header}</BottomSheetHeader>
        <BottomSheetBody>{body}</BottomSheetBody>
        <BottomSheetFooter className={styles.footer}> {footer}</BottomSheetFooter>
      </BottomSheetLayout>
    )
  }

  return (
    <ModalLayout fixed className={styles.modalLayout}  >
      <div className={classNames(styles.modalBody,{[styles.formShown]: addressFormShown})}>{body}</div>
    </ModalLayout>
  )
}

export default function AddressFormModal(props: Props) { 

  return (<>
      <AddressFormModalInner {...props}/>
  </>)
}
