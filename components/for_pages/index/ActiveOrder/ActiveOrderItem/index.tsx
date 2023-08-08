import styles from './index.module.scss'
import { OrderStateColor, OrderStateIcon } from 'data/enum/OrderState'
import { IOrder } from 'data/interfaces/IOrder'
import CSS from 'csstype'
import { colors } from 'styles/variables'
import Rive from '@rive-app/react-canvas'
import { ModalType, RiveArtboard } from 'types/enums'
import Image from 'next/image'
import { useResize } from 'components/hooks/useResize'
import { useAppContext } from 'context/state'

interface Props {
    item: IOrder
}

interface IOrderIconType {
    type: 'src'|'rive'|undefined, 
    image: string
}



export default function ActiveOrderItem(props: Props) {

    const {isPhoneWidth} = useResize()
    const appContext = useAppContext()

    const orderType = getOrderIcon(props.item.stateDetails.icon)
    const style = getOrderColor(props.item.stateDetails.color)

    const image = (width: number, height: number) => {return getOrderImage(orderType, width, height)}

    const clickHandler = () => {
        appContext.hideModal()
        isPhoneWidth 
        ? appContext.showBottomSheet(ModalType.ActiveOrder, {item: props.item, style: style, image: image})
        : appContext.showModal(ModalType.ActiveOrder, {item: props.item, style: style, image: image})
    } 

    return (<div className={styles.root} style={style} onClick={clickHandler}>
        {isPhoneWidth?image(50, 50):image(24, 24)}
        <div className={styles.descWrapper}>
            <p className={styles.primaryText}>{props.item.stateDetails.name}</p>
            <p className={styles.secondaryText}>{props.item.stateDetails.desc}</p>
        </div>
    </div>)

}


export function getOrderColor(color: OrderStateColor):CSS.Properties {
    let currentColor: string
    switch (color) {
        case OrderStateColor.Red :
            currentColor = colors.red
            break
        case OrderStateColor.Green :
            currentColor = colors.green
            break
        case OrderStateColor.Light : 
            currentColor = colors.purple3
            break
        case OrderStateColor.Orange : 
            currentColor = colors.orange
            break
    }
    const style: CSS.Properties  = {
        backgroundColor: currentColor
    }

    return style
}

export function getOrderIcon(icon: OrderStateIcon): IOrderIconType {
    let orderType:IOrderIconType = {
        image: '',
        type: undefined
    }
    switch(icon) {
        case OrderStateIcon.Delivered: 
        orderType.image = RiveArtboard.delivered
        orderType.type = 'rive'
            break
        case OrderStateIcon.Delivering: 
        orderType.image = RiveArtboard.delivering
        orderType.type = 'rive'
            break
        case OrderStateIcon.Preparing: 
        orderType.image = RiveArtboard.preparing
        orderType.type = 'rive'
            break
        case OrderStateIcon.Phone: 
        orderType.image = RiveArtboard.phone
        orderType.type = 'rive'
            break
        case OrderStateIcon.PaymentError:
        orderType.image =  '/images/orderStatusIcon/3.0x/payment_error.png'
        orderType.type = 'src'
            break
        case OrderStateIcon.PaymentProcessing : 
        orderType.image = '/images/orderStatusIcon/3.0x/payment_processing.png' 
        orderType.type = 'src'
            break
        default: 
        orderType.image = RiveArtboard.phone
        orderType.type = 'rive'
    }

    return orderType
}

export function getOrderImage(orderIconType: IOrderIconType, width: number, height: number) {
    return (<>
        {orderIconType.type === 'rive'?
            <Rive style={{width: width, height: height}} src="/images/rive/vsem_eda.riv" artboard={orderIconType.image}/>:
            <Image src={orderIconType.image} alt={''}  width={width} height={height}/>
        }
    </>)
}