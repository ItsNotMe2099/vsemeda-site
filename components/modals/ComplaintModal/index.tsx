import styles from './index.module.scss'
import ModalBody from 'components/layout/Modal/ModalBody'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import { useOrderContext } from 'context/order_state'
import { useAppContext } from 'context/state'
import { ModalType } from 'types/enums'
import ComplaintTypes from './ComplaintTypes'
import { useEffect, useState } from 'react'
import Complaint from './Complaint'
import ComplaintRepository from 'data/repositories/ComplaintRepository'
import { IComplaintType } from 'data/interfaces/IComplaint'

interface Props {
  onBackClick?: ()=> void
}

export enum ComplaintNavigation {
  Types = 'types',
  Complaint = 'complaint'
}

export default function ComplaintModal(props: Props) {

  const [complaintTypes, setComplaintTypes] = useState<IComplaintType[]>([])

  const getComplaintTypes = () => {
    ComplaintRepository.getComplaintTypes().then(complaint =>{
      setComplaintTypes(complaint)
    })
  }

  useEffect(()=>{
    getComplaintTypes()  
  }, [])

  const orderContext = useOrderContext()
  const appContext = useAppContext()
  const [navigate, setNavigate] = useState<ComplaintNavigation>(ComplaintNavigation.Types)
  const [type, setType] = useState<IComplaintType>()
  
  const backButtonHandler = () => {
    appContext.hideModal()
    appContext.showModal(ModalType.ProfileMenu, 'orders')
  }

  useEffect(()=>{
    if(type) {
      setNavigate(ComplaintNavigation.Complaint)
    }
    else {
      setNavigate(ComplaintNavigation.Types)
    }
  }, [type])

  return ( 
    <ModalLayout className={styles.modalLayout}>
      <ModalBody>
        {navigate === ComplaintNavigation.Types
          ? <ComplaintTypes onClick={setType} complaints={complaintTypes} onBack={backButtonHandler}/>
          : <Complaint type={type} item={orderContext.activeDetails} onBack={()=> setNavigate(ComplaintNavigation.Types)}/>
        }
      </ModalBody>
    </ModalLayout>
  )
}