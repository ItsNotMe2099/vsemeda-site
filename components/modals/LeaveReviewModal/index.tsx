import styles from './index.module.scss'
import { useResize } from 'components/hooks/useResize'
import ModalBody from 'components/layout/Modal/ModalBody'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import CirclesBgSvg from 'components/svg/CirclesBgSvg'
import { useOrderContext } from 'context/order_state'
import { useAppContext } from 'context/state'
import { IReviewCreateRequest } from 'data/interfaces/IReviewCreateRequest'
import Image from 'next/image'
import { useCallback,  useEffect, useRef, useState } from 'react'
import { ModalType, SnackbarType} from 'types/enums'
import BackButton from './BackButton'
import CompletePage from './CompletePage'
import ErrorPage from './ErrorPage'
import RateOrder from './Rate'
import ReviewForm from './ReviewForm'
import OrderRepository from 'data/repositories/OrderRepository'

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
  const formDataRef = useRef<IReviewCreateRequest>()
  const reviewLeaved = useRef<boolean>()
 
  const onSubmit = (data: IReviewCreateRequest) => {
    if(!data?.userName) {
      data.userName = appContext.user.name
    }

    
    reviewLeaved.current = true
    
    OrderRepository.createFeedBack(orderContext.activeDetails.id, data)
    .then(r=> {
    })
    .catch(e => {
      appContext.showSnackbar(e.toString(), SnackbarType.error)
      setPageState(FeedbackPageNavigation.Error)
    })     
  }

  const navHandler = useCallback(() => {
    
    switch (pageState) {
      case FeedbackPageNavigation.Stars:
        if(formData) {        
          appContext.hideModal()
        }
        else {
          appContext.showModal(ModalType.Profile, 'orders')
        }
        break
      case FeedbackPageNavigation.Form:
        setPageState(FeedbackPageNavigation.Stars)
        break
      case FeedbackPageNavigation.Error:
        appContext.hideModal()
        break
      case FeedbackPageNavigation.Complete:
        appContext.hideModal()
        break
    }
  }, [formData, pageState])

  //чтобы отправлялись отзывы когда компонент закрывается при клике вне модалки
  useEffect(()=>{
    formDataRef.current = formData
  }, [formData])
  useEffect(()=>{
    return () => {
      if(formDataRef.current && !reviewLeaved.current) {
        onSubmit(formDataRef.current)
        orderContext.setActiveDetails(null)
      }
    }
  }, [])

  const body = () => {
    switch (pageState) {
      case FeedbackPageNavigation.Stars:
        return <RateOrder rate={choosenStar} onSubmit={(d)=> {setFormData(d)}} chooseRate={chooseStar} changePage={setPageState}/>

      case FeedbackPageNavigation.Form:
        return <ReviewForm onSubmit={onSubmit} rate={choosenStar} data={formData} changePage={setPageState} item={orderContext.activeDetails}/>

      case FeedbackPageNavigation.Complete:
        return <CompletePage onClick={()=>{
          appContext.hideModal()
          orderContext.setActiveDetails(null)
        }}/>
      
      case FeedbackPageNavigation.Error: 
        return <ErrorPage onClick={()=>onSubmit(formData)}/>
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