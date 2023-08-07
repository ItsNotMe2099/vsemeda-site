import { IOrder } from 'data/interfaces/IOrder'
import styles from './index.module.scss'
import CSS from 'csstype'
import { colors } from 'styles/variables'
import { OrderStateColor } from 'data/enum/OrderState'

interface Props {
    item: IOrder
}

export default function ActiveOrder(props: Props) {

    let currentColor: string
    switch (props.item.stateDetails.color) {
        case OrderStateColor.Red :
            currentColor = colors.red
            break
        case OrderStateColor.Green :
            currentColor = colors.green
            break
        case OrderStateColor.Light : 
            currentColor = colors.white
            break
        case OrderStateColor.Orange : 
            currentColor = colors.orange
            break
    }

    const style: CSS.Properties  = {
        backgroundColor: currentColor
    }


    return (<div className={styles.root} style={style}>
        <p>{props.item.stateDetails.name}</p>
        <p>{props.item.stateDetails.desc}</p>

    </div>)
}