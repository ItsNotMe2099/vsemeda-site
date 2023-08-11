import CSS from 'csstype'
import { OrderStateColor, OrderStateIcon } from 'data/enum/OrderState'
import { Component } from 'react'
import { colors } from 'styles/variables'
import { RiveArtboard } from 'types/enums'
import Image from 'next/image'
import Rive from '@rive-app/react-canvas'
import { PaymentMethod } from 'data/enum/PaymentMethod'


interface IOrderIconType {
  type: 'src'|'rive'|undefined, 
  image: string
}

interface Props {
    icon?: OrderStateIcon,
    color?: OrderStateColor
    props?: any

}

export default class OrderHelper extends Component {

    initIcon: OrderStateIcon
    initColor: OrderStateColor
    icon: IOrderIconType
    background: [style: CSS.Properties, color: string]

    constructor(props: Props) {
        super(props.props)
        if(props.icon) {this.icon = this.orderIcon(props.icon)}
        if(props.color) {this.background = this.orderColor(props.color)}
        this.initIcon = props.icon
    }
    

    public orderColor(color: OrderStateColor):[style: CSS.Properties, color: string] {
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
      return [style, currentColor]
    }

    public orderIcon(icon: OrderStateIcon): IOrderIconType {
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

    public orderImage(icon: OrderStateIcon, width: number, height: number) {
      const orderIconType = this.orderIcon(icon)
    
      return (<>
          {orderIconType.type === 'rive'?
              <Rive style={{width: width, height: height}} src="/images/rive/vsem_eda.riv" artboard={orderIconType.image}/>:
              <Image src={orderIconType.image} alt={''}  width={width} height={height}/>
          }
      </>)
    }

    public image(w: number, h: number) {
        return this.orderImage(this.initIcon, w, h )
    }

    public  translatePaymentMethod(method: string): string {
        let translated: string
        switch (method) {
          case PaymentMethod.Cash:
            translated = 'Наличными'
            break
          case PaymentMethod.CardCourier: 
            translated = 'Картой курьеру'
            break
          case PaymentMethod.CardOnline: 
            translated = 'Картой онлайн'
            break
          case PaymentMethod.ApplePay:
            translated = 'Apple Pay'
            break
          case PaymentMethod.GooglePay:
            translated='Google Pay'
            break
        }
      
        return translated
    }
}