import styles from './index.module.scss'
import {colors} from 'styles/variables'
import SliderArrowSvg from 'components/svg/SliderArrowSvg'
import classNames from 'classnames'
interface Props {
  className?: string
  direction: 'prev' | 'next'
  sliderRef: any
  color?: string
}

export default function SliderArrow(props: Props) {
  const handleClick = () => {
    switch (props.direction){
      case 'prev':
        props.sliderRef.current.swiper.slidePrev()
        break
      case 'next':
        props.sliderRef.current.swiper.slideNext()
        break
    }

  }
  return (
   <div className={classNames(styles.root, props.className)} onClick={handleClick}>
     {props.direction === 'prev' && <SliderArrowSvg className={styles[props.direction]} color={props.color ?? colors.purple}/>}
     {props.direction === 'next' && <SliderArrowSvg className={styles[props.direction]} color={props.color ?? colors.purple}/>}
   </div>
  )
}

