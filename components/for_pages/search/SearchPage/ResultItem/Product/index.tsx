import styles from './index.module.scss'

interface Props {
    image?: string
    name?: string
    price?: string

}

export default function Product (props: Props) {

    return (
        <div className={styles.root}>
            <div className={styles.imageWrapper}>
                {/* //рендер изображения блюда */}                
            </div>
            <div className={styles.description}>
                <p className={styles.name}>{'Пицца "Ололошка" 35 см'}</p>
                <p className={styles.price}>{'650₽'}</p>
            </div>
        </div>
    )

}