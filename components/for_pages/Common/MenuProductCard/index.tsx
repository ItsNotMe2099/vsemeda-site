import styles from './index.module.scss'
import CardImgLayoutPos from './CardImgLayoutPos'
import {IProduct} from 'data/interfaces/IProduct'
import {ProductCardLayoutPosType} from 'data/interfaces/IProductCardLayout'
import classNames from 'classnames'
import CardBodyLayoutPos from './CardBodyLayoutPos'
import ProductQuantityButton from 'components/ui/ProductQuantityButton'
import {colors} from 'styles/variables'
import Formatter from 'utils/formatter'

interface Props {
  product: IProduct
  quantity: number
  onAddClick: () => void
  onMinusClick: () => void
  onClick: () => void
}

export default function MenuProductCard(props: Props) {
  const {product} = props


  return (
    <div className={classNames(styles.root, {[styles.stop]: product.isAvailable, [styles.inBasket]: props.quantity > 0})}>
      <div className={styles.imgContainer} onClick={props.onClick}>
        {product.image && <img src={`${product.image?.link}?w=600`} className={styles.image} alt={product.name}/>}
        {product.layout && product.layout[ProductCardLayoutPosType.ImgT] &&
          <CardImgLayoutPos items={product.layout[ProductCardLayoutPosType.ImgT]}/>}
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.body} onClick={props.onClick}>
          {product.layout && product.layout[ProductCardLayoutPosType.CardT] &&
            <CardBodyLayoutPos items={product.layout[ProductCardLayoutPosType.CardT]} color={props.quantity > 0 ? colors.white : colors.grey1}/>}
          <div className={styles.name}>{product.name}</div>
          <div className={styles.price}>{Formatter.formatPrice(product.price)}</div>
        </div>
        <div className={styles.spacer}/>
        <div className={styles.btnContainer}>
          <ProductQuantityButton className={styles.btn} quantity={props.quantity} onAddClick={props.onAddClick} theme={props.quantity > 0 ? 'white' : 'grey'}
                                 onMinusClick={props.onMinusClick}/>
        </div>
      </div>
    </div>
  )
}
