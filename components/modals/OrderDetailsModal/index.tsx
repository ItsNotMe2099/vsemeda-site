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
import OrderHelper from 'utils/orderHelper'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import ModalBody from 'components/layout/Modal/ModalBody'
import Image from 'next/image'

interface Props { 
  onBackClick: () => void
  isMobile?: boolean,
  isModal?: boolean
}

export default function OrderDetails ({onBackClick, isMobile}: Props) {
  const {activeDetails, setActiveDetails} = useOrderContext()

  const getNamedButton = (button: OrderStateButton ) => {
    let buttonName: string

    switch (button) {
      case OrderStateButton.Cancel:
        buttonName = 'Отменить заказ'
        break
      case OrderStateButton.Complaint:
        buttonName = 'Пожаловаться'
        break
      case OrderStateButton.Feedback: 
        buttonName = 'Сказать спасибо'
        break
      case OrderStateButton.Pay:
        buttonName = 'Оплатить заказ'
        break
    }
    return OrderHelper.getButton(button, buttonName, styles[button + 'Button'])
  }

  const onBackClickHandler = () => {
    setActiveDetails(null)
    onBackClick()
  }
  
  const header = (
    <div className={styles.header}>
      <div className={styles.buttonWrapper} onClick={onBackClickHandler}> 
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
        {activeDetails.stateDetails.buttons.map(button => getNamedButton(button))}
      </div>

    </div>
    )
    
    
    return (
      <ModalLayout className={styles.modalLayout}>
    <ModalBody>
      <div className={styles.root}>
        {header}
        {body}
      </div>
    </ModalBody>
    {/* <ModalFooter > */}
      <Image className={styles.footer}  src={'/images/ProfileModal/bg2.png'} alt='' width={428} height={252} />
    {/* </ModalFooter> */}
  </ModalLayout>
  )
}
