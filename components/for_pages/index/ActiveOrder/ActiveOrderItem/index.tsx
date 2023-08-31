import styles from './index.module.scss'
import { IOrder } from 'data/interfaces/IOrder'
import { ModalType } from 'types/enums'
import { useResize } from 'components/hooks/useResize'
import { useAppContext } from 'context/state'
import OrderHelper from 'utils/orderHelper'

interface Props {
    item: IOrder
    imageSizes?: {w: number, h: number}
    rootClassName?: string
}

export default function ActiveOrderItem({item, imageSizes, rootClassName}: Props) {

    const {isPhoneWidth} = useResize()
    const appContext = useAppContext()

    const orderHelper = new OrderHelper({
        icon: item.stateDetails.icon, 
        color: item.stateDetails.color
    })

    const [background] = orderHelper.background

    const clickHandler = () => {
        appContext.hideModal()
        isPhoneWidth 
        ? appContext.showBottomSheet(ModalType.ActiveOrder, item)
        : appContext.showModal(ModalType.ActiveOrder, item)
    } 

    return (<div className={rootClassName?rootClassName:styles.root} style={background} onClick={clickHandler}>
        {imageSizes
        ? orderHelper.image(imageSizes.w, imageSizes.h)
        : (isPhoneWidth?orderHelper.image( 50, 50):orderHelper.image(24, 24))
        }
        <div className={styles.descWrapper}>
            <p className={styles.primaryText}>{item.stateDetails.name}</p>
            {/* <p className={styles.secondaryText}>{item.stateDetails.desc}</p> */}
        </div>
    </div>)
}