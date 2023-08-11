import styles from './index.module.scss'
import { IOrderLine } from 'data/interfaces/IOrderLine'
import Image from 'next/image'
import DotSeparatorSvg from 'components/svg/DotSeparatorSvg'
import { colors } from 'styles/variables'
import classNames from 'classnames'
// import { useResize } from 'components/hooks/useResize'



interface Props {
  line: IOrderLine
  isActive?: boolean
}


export default function ProductLine ({line, isActive}: Props) {
 
    return <div className={classNames(styles.product, isActive&&styles.product_active)}>
      <div className={styles.imageWrapper}>
        <Image className={styles.image} src={line.product.image.link} alt={line.product.name} width={42} height={42}/>
      </div>
      <p className={styles.name}>{line.product.name}</p>
      <p className={styles.price}>
        {line.product.price} ₽ 
        <DotSeparatorSvg color={colors.grey3} className={styles.separator}/> 
        <span className={styles.weight}>{line.product.weight} гр</span>
      </p>
      <p className={styles.counter}>X&nbsp;{line.quantity}</p>
    </div>
}