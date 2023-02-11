import styles from 'components/for_pages/index/BestOffers/index.module.scss'
import CirclesBgSvg from 'components/svg/CirclesBgSvg'
import DropdownMenu from 'components/ui/DropdownMenu'
import { ICategory } from 'data/interfaces/ICategory'
import MenuRepository from 'data/repositories/MenuRepository'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function BestOffers() {

  const [items, setItems] = useState<ICategory[] | null>(null)

  const fetchData = async () => {
    await MenuRepository.fetchCategories().then(i => setItems(i))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className={styles.root}>
      <div className={styles.bg} />
      <div className={styles.sales_left}>
        <Image src={'/images/bg/sales_left.png'} alt='' fill />
      </div>
      <div className={styles.sales_right}>
        <Image src={'/images/bg/sales_right.png'} alt='' fill />
      </div>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.title}>
            Лучшие<br /> рестораны
          </div>
          <div className={styles.choose}>
            Выберите тип заведения
          </div>
          <div className={styles.drop}>
            {items ? <DropdownMenu options={items} /> : null}
          </div>
        </div>
      </div>
      <CirclesBgSvg className={styles.circle} />
    </div>
  )
}
