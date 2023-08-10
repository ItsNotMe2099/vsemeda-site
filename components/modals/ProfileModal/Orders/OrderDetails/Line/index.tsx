import styles from './index.module.scss'
import { IOrderLine } from 'data/interfaces/IOrderLine'
import Image from 'next/image'
import DotSeparatorSvg from 'components/svg/DotSeparatorSvg'
import { colors } from 'styles/variables'
import classNames from 'classnames'



interface Props {
  line: IOrderLine
  isActive?: boolean
}


export default function ProductLine ({line, isActive}: Props) {
 
    return <div className={classNames(styles.product, isActive&&styles.product_active)}>
      <Image className={styles.image} src={line.product.image.link} alt={line.product.name} width={150} height={150}/>
      <div className={styles.description}>
        <p className={styles.name}>{line.product.name}</p>
        <p className={styles.price}>
          {line.product.price} ₽ 
          <DotSeparatorSvg color={colors.dark1} className={styles.separator}/> 
          <span className={styles.weight}>{line.product.weight} гр</span></p>
      </div>
      <p className={styles.counter}>X {line.quantity}</p>
    </div>
  
}