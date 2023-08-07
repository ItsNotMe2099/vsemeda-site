import { IProduct } from 'data/interfaces/IProduct'
import Image from 'next/image'
import styles from './index.module.scss'

interface Props {
    product: IProduct
}

export default function Product (props: Props) {

    return (
        <div className={styles.root}>
            <div className={styles.imageWrapper}>
                {/* //рендер изображения блюда */}            
                <Image src={props.product.image.link} alt={props.product.name} width={100} height={100} />    
            </div>
            <div className={styles.description}>
                <p className={styles.name}>{props.product.name}</p>
                <p className={styles.price}>{props.product.price}</p>
            </div>
        </div>
    )

}