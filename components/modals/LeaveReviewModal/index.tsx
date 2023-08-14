import ModalBody from 'components/layout/Modal/ModalBody'
import ModalLayout from 'components/layout/Modal/ModalLayout'
import CheckSvg from 'components/svg/CheckSvg'
import CirclesBgSvg from 'components/svg/CirclesBgSvg'
import CommentSvg from 'components/svg/CommentSvg'
import StartFilledSvg from 'components/svg/StartFilledSvg'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import styles from './index.module.scss'

interface Props {
  onBackClick?: ()=>void

}

export default function LeaveFeedbackModal(props: Props) {

  const goldColor = '#F2994A'
  const greyColor = '#979797'

  const [colors, setColors] = useState<string[]>([])

  const [choosenStar, chooseStar] = useState<number>(-1)

  const starsHandler = (rate: number, choosen?: number) => {
    let items: string[] = []
    for(let i = 0; i < 5; i++) {
      if(choosen>=0 && i <= choosen) {
        items.push(goldColor)
      } 
      else if(rate > choosen && i <= rate) {
        items.push(goldColor + '30')
      }
      else {
        items.push(greyColor)
      }
    }
    colors.length <= 5&&setColors(items)
  }

  const mouseEnterHandler = useCallback((index: number) => {       
      starsHandler(index, choosenStar)   
  }, [choosenStar])

  useEffect(()=> {
    starsHandler(0)
  }, [])

  useEffect(()=> {
    starsHandler(choosenStar, choosenStar) 
  }, [choosenStar])

  const body = (
    <>основа</>
  )

  const rateOrder = (
    <div className={styles.rate}>
      <CheckSvg className={styles.checkSvg} color={'#fff'}/>
      <p className={styles.title}>Спасибо за заказ</p>
      <div className={styles.rateWrapper}>
        <p className={styles.rateTitle}>Оцените ваш заказ</p>
        <div className={styles.starWrapper} onMouseLeave={()=>{mouseEnterHandler(0)}}>
          {colors.map((color, index) => <div className={styles.svgStarWrapper}  onClick={()=> chooseStar(index)} onMouseEnter={()=>{mouseEnterHandler(index)}}><StartFilledSvg color={color} className={styles.starSvg}/></div>)}
        </div>
        {choosenStar >= 0 &&
          <div className={styles.rateReview}>
            <p className={styles.rateReviewTitle}>
              Желаете оставить отзыв?
            </p>
            <button className={styles.reviewButton}>
              <CommentSvg/>
              Оставить отзыв
            </button>
          </div>
        }
      </div>
     
    </div>
  )

  return (
    <ModalLayout className={styles.modalLayout}>
      <ModalBody>
        {rateOrder}
      </ModalBody>
      <CirclesBgSvg className={styles.circle} />
      <Image className={styles.modalBackground} src={'/images/bg/leave-review.png'} alt='' fill/>
    </ModalLayout>
  )

}