import styles from './index.module.scss'
import { useResize } from 'components/hooks/useResize'
import ModalBody from 'components/layout/Modal/ModalBody'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import CirclesBgSvg from 'components/svg/CirclesBgSvg'
import { useOrderContext } from 'context/order_state'
import { useAppContext } from 'context/state'
import { IReviewCreateRequest } from 'data/interfaces/IReviewCreateRequest'
import OrderRepository from 'data/repositories/OrderRepository'
import Image from 'next/image'
import { useState } from 'react'
import { SnackbarType } from 'types/enums'
import BackButton from './BackButton'
import CompletePage from './CompletePage'
import ErrorPage from './ErrorPage'
import RateOrder from './Rate'
import ReviewForm from './ReviewForm'

interface Props {
  onBackClick?: ()=>void
}

export enum FeedbackPageNavigation {
  Stars = 'stars',
  Form ='form',
  Complete ='complete',
  Error = 'error'
}

export default function LeaveFeedbackModal(props: Props) {

  const orderContext = useOrderContext()
  const {isPhoneWidth} = useResize()

  const appContext = useAppContext()

  const [choosenStar, chooseStar] = useState<number>(-1)
  const [pageState, setPageState] = useState<FeedbackPageNavigation>(FeedbackPageNavigation.Stars)
  const [formData, setFormData] = useState<IReviewCreateRequest>()

  const onSubmit = (data: IReviewCreateRequest, nextPage: FeedbackPageNavigation) => {
    
    setFormData(data)   
    
    OrderRepository.createFeedBack(orderContext.activeDetails.id, data)
    .then(r=> {
      setPageState(nextPage)
    })
    .catch(e => {
      appContext.showSnackbar(e.toString(), SnackbarType.error)
      setPageState(FeedbackPageNavigation.Error)
    })     
  }

  const navHandler = () => {
    
    switch (pageState) {
      case FeedbackPageNavigation.Stars:
        appContext.hideModal()
        break
      case FeedbackPageNavigation.Form:
        setPageState(FeedbackPageNavigation.Stars)
        break
      case FeedbackPageNavigation.Error:
        setPageState(FeedbackPageNavigation.Form)
        break
      case FeedbackPageNavigation.Complete:
        setPageState(FeedbackPageNavigation.Form)
        break
    }
  }

  const body = () => {
    switch (pageState) {
      case FeedbackPageNavigation.Stars:
        return <RateOrder rate={choosenStar} onSubmit={onSubmit} chooseRate={chooseStar} changePage={setPageState}/>

      case FeedbackPageNavigation.Form:
        return <ReviewForm onSubmit={onSubmit} rate={choosenStar} setData={setFormData} data={formData} changePage={setPageState} item={orderContext.activeDetails}/>

      case FeedbackPageNavigation.Complete:
        return <CompletePage onClick={()=>{
          appContext.hideModal()
          orderContext.setActiveDetails(null)
        }}/>
      
      case FeedbackPageNavigation.Error: 
        return <ErrorPage onClick={()=>onSubmit(formData, FeedbackPageNavigation.Complete)}/>
    }
  }
 

  return (
    <ModalLayout className={styles.modalLayout}>
      <BackButton onClick={navHandler}/>
      <ModalBody>
        {body()}
      </ModalBody>
      {!isPhoneWidth && 
      <>
        <CirclesBgSvg className={styles.circle} />
        <Image className={styles.modalBackground} src={'/images/bg/leave-review.png'} alt='' fill/>
      </>
      }
    </ModalLayout>
  )

}