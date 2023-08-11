import styles from './index.module.scss'
import IconButton from 'components/ui/IconButton'
import { colors } from 'styles/variables'
import ArrowLeftSvg from 'components/svg/ArrowLeftSvg'
import ActiveOrderItem from 'components/for_pages/index/ActiveOrder/ActiveOrderItem'
import ProductLine from './Line'
import { useOrderContext } from 'context/order_state'
import PersonsSvg from 'components/svg/Persnons'
import classnames from 'classnames'
import { OrderStateButton } from 'data/enum/OrderState'
import { CancelButton, PayButton, RepeatButton } from 'components/ui/OrderButtons'
import { useEffect, useState } from 'react'
import { useAppContext } from 'context/state'
import { ModalType } from 'types/enums'
import OrderRepository from 'data/repositories/OrderRepository'

interface Props { 
  onBackClick: () => void
  isMobile?: boolean
}

export default function OrderDetails ({onBackClick, isMobile}: Props) {
  const {activeDetails} = useOrderContext()
  const [cancelOrderModal, setCancelOrder] = useState<boolean>(false)
  const appContext = useAppContext()

  useEffect(()=> {   
    if(cancelOrderModal) {
      appContext.hideModal()
      appContext.showBottomSheet(ModalType.CancelOrder)
    }
  }, [cancelOrderModal]) 


  const payHandler = () => {
    OrderRepository.payById(activeDetails.id)
    .then(res => {
        appContext.hideBottomSheet()
        window.open(res.payUrl, '_blank')
    })
  }

  const getButton = (button: OrderStateButton):JSX.Element|null =>{
    let returnButton: JSX.Element|null

    switch (button) {
      case OrderStateButton.Cancel:
        returnButton = <CancelButton className={styles.cancelButton} onClick={()=>setCancelOrder(true)}/>
        break
      case OrderStateButton.Pay:
        returnButton = <PayButton className={styles.payButton} onClick={payHandler} />
        break
      case OrderStateButton.Repeat:
        returnButton = <RepeatButton/>
        break
      case OrderStateButton.Complaint:
        returnButton = <button>Пожаловаться</button>
        break
      default:
        returnButton = <button>null</button>
    }
    return returnButton
  }

  
  const header = (
    <div className={styles.header}>
      <div className={styles.buttonWrapper} onClick={onBackClick}> 
        <IconButton bgColor='white' size='medium'>
          <ArrowLeftSvg color={colors.purple}/>
        </IconButton>
      </div>
      <h6 className={styles.title}>Заказ №{activeDetails.id}</h6>
    </div>
  )

  const body = (
    <div className={styles.body}>
      <ActiveOrderItem item={activeDetails} imageSizes={{w: 50, h: 50}} rootClassName={styles.orderStatus}/>

      <div className={styles.propductsWrapper}>
        {activeDetails.lines.map(product=> <ProductLine key={product.id} line={product} isActive={true}/>)}
      </div>

      <div className={styles.persons}>
        <div className={styles.personsImage}>
          <PersonsSvg/>
        </div>
        <p>Количество персон</p>
        <p className={styles.personsCounter}>X {activeDetails.personsCount?activeDetails.personsCount: 1}</p>
      </div>

      <div className={styles.check}>
        <p className={styles.checkTitle}>Ваш чек:</p>
        <div className={styles.checkBody}>
          <p className={styles.checkDesc}>
            <span>Еда:</span>
            <span>{activeDetails.subTotal} ₽</span>
          </p>
          <p className={styles.checkDesc}>
            <span>Доставка:</span>
            <span>{activeDetails.totalDelivery} ₽</span>
          </p>
          {activeDetails.surcharges.map((surcharge, index)=> 
            <p className={styles.checkDesc} key={index}>
              <span>{surcharge.description}</span>
              <span>{surcharge.price} ₽</span>
            </p>
          )}
        </div>
        <p className={classnames(styles.total, styles.checkDesc)}>
          <span>К оплате:</span>
          <span>{activeDetails.total} ₽</span>
        </p>
      </div>

      <div className={styles.buttonsWrapper}>
        {activeDetails.stateDetails.buttons.map(button => 
          <div className={styles.button}>
            {getButton(button)}
          </div>
        )}
      </div>
    </div>)


  return <div className={styles.root}>
    {header}
    {body}
  </div>
}
