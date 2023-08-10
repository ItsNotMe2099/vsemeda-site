import styles from './index.module.scss'
import { IOrder } from 'data/interfaces/IOrder'
import IconButton from 'components/ui/IconButton'
import { colors } from 'styles/variables'
import ArrowLeftSvg from 'components/svg/ArrowLeftSvg'
import ActiveOrderItem from 'components/for_pages/index/ActiveOrder/ActiveOrderItem'
import ProductLine from './Line'

interface Props {
  item: IOrder
  onBackClick: () => void
  isMobile?: boolean
}

export default function OrderDetails ({item, onBackClick, isMobile}: Props) {

  
  const header = (
    <div className={styles.header}>
      <div className={styles.buttonWrapper} onClick={onBackClick}> 
        <IconButton bgColor='white' size='medium'>
          <ArrowLeftSvg color={colors.purple}/>
        </IconButton>
      </div>
      <h6 className={styles.title}>Заказ №{item.id}</h6>
    </div>
  )


  const body = (
    <div className={styles.body}>
      <ActiveOrderItem item={item} imageSizes={{w: 50, h: 50}} rootClassName={styles.orderStatus}/>
      <div className={styles.propductsWrapper}>
        {!isMobile && item.lines.map(product=> <ProductLine key={product.id} line={product}/>)}
      </div>
    </div>)


  return <div className={styles.root}>
    {header}
    {!isMobile
      ? body
      : item.lines.map(product=> <ProductLine key={product.id} line={product}/>)
    }
  </div>
}
