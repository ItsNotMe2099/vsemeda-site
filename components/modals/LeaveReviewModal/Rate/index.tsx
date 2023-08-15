import classNames from 'classnames'
import { useResize } from 'components/hooks/useResize'
import CheckSvg from 'components/svg/CheckSvg'
import CommentSvg from 'components/svg/CommentSvg'
import StartFilledSvg from 'components/svg/StartFilledSvg'
import { useAppContext } from 'context/state'
import { IReviewCreateRequest } from 'data/interfaces/IReviewCreateRequest'
import { useCallback, useEffect, useState } from 'react'
import { FeedbackPageNavigation } from '..'
import styles from './index.module.scss'


interface Props {
  chooseRate: (n: number) => void
  rate: number
  changePage: (n: FeedbackPageNavigation) => void
  onSubmit: (d: IReviewCreateRequest, np: FeedbackPageNavigation) => void
}

export default function RateOrder(props: Props) {
  const goldColor = '#F2994A'
  const greyColor = '#979797'

  const [colors, setColors] = useState<string[]>([])

  const appContext = useAppContext()

  const {isPhoneWidth} = useResize()

  /** возвращает массив цветов для StarSVG */
  const starsHandler = (rate: number, choosen?: number): string[] => {
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
    return items   
  }

  const mouseEnterHandler = useCallback((index: number) => {   
    if(isPhoneWidth) {return}
    let items = starsHandler(index, props.rate) 
    setColors(items)
  }, [props.rate])

  useEffect(()=> {
    let items = starsHandler(0)
    setColors(items)
  }, [])

  useEffect(()=> {
    let items = starsHandler(props.rate, props.rate) 
    setColors(items)
  }, [props.rate])

  const rateHandler = () => {
    let data: IReviewCreateRequest = {mark: props.rate, userName: appContext.user.name}
    props.onSubmit(data, FeedbackPageNavigation.Form)
  }

  return ( 
    <div className={styles.rate}>
      {!isPhoneWidth && <>
        <CheckSvg className={styles.checkSvg} color={'#fff'}/>
        <p className={styles.title}>Спасибо за заказ</p>
      </>
      }
      {isPhoneWidth && <p className={styles.rateTitle}>Оцените ваш заказ:</p>}
      <div className={styles.rateWrapper}>
        {!isPhoneWidth && <p className={styles.rateTitle}>Оцените ваш заказ</p>}
        <div className={styles.starWrapper} onMouseLeave={()=>{mouseEnterHandler(0)}}>
          {colors.map((color, index) => 
            <div className={styles.svgStarWrapper}  
            onClick={()=> props.chooseRate(index)} 
            onMouseEnter={()=>{mouseEnterHandler(index)}}
            >
              <StartFilledSvg color={color} className={styles.starSvg}/>
            </div>)
          }
        </div>
        {isPhoneWidth&& 
          <button className={classNames(styles.reviewButton, props.rate>=0&&styles.reviewButton_active)} 
          type="button" 
          onClick={rateHandler} >Оценить</button>
        }
        {props.rate >= 0 && !isPhoneWidth &&
          <div className={styles.rateReview}>
            <p className={styles.rateReviewTitle}>
              Желаете оставить отзыв?
            </p>
            <button className={styles.reviewButton} 
            type='button' 
            onClick={rateHandler}> 
              <CommentSvg/>
              Оставить отзыв
            </button>
          </div>
        }
      </div>
    </div>
  )
}
