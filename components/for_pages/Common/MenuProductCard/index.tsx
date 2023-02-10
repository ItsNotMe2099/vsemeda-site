import styles from './index.module.scss'
import CardImgLayoutPos from './CardImgLayoutPos'
import {IProduct} from 'data/interfaces/IProduct'
import {ProductCardLayoutPosType} from 'data/interfaces/IProductCardLayout'
import classNames from 'classnames'
import CardBodyLayoutPos from './CardBodyLayoutPos'
import ProductQuantityButton from 'components/ui/ProductQuantityButton'

interface Props {
  product: IProduct
  quantity: number
  onAddClick: () => void
  onMinusClick: () => void
}

export default function MenuProductCard(props: Props) {
  const {product} = props


  return (
    <div className={classNames(styles.root, {[styles.stop]: product.isAvailable})}>
      <div className={styles.imgContainer}>
        {product.image && <img src={`${product.image?.link}?w=600`} className={styles.image} alt={product.name}/>}
        {product.layout && product.layout[ProductCardLayoutPosType.ImgT] &&
          <CardImgLayoutPos items={product.layout[ProductCardLayoutPosType.ImgT]}/>}
      </div>
      <div className={styles.body}>
        {product.layout && product.layout[ProductCardLayoutPosType.CardT] &&
          <CardBodyLayoutPos items={product.layout[ProductCardLayoutPosType.CardT]}/>}
        <div className={styles.name}>{product.name}</div>
        <div className={styles.price}>{product.price}</div>
        <ProductQuantityButton className={styles.btn} quantity={props.quantity} onAddClick={props.onAddClick}
                               onMinusClick={props.onMinusClick}/>
      </div>
    </div>
  )
}
