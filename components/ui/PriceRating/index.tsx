import styles from './index.module.scss'
import {PriceRating } from 'data/enum/PriceRating'
import {useMemo} from 'react'

interface Props {
  className?: string
  colorActive?: string,
  colorDisabled?: string,
rating: PriceRating
}

export default function PriceRatingUi(props: Props) {

  const lengthActive = useMemo(() => {
    switch (props.rating){
      case PriceRating.Cheap:
        return 1
      case PriceRating.Average:
        return 2
      case PriceRating.Expensive:
        return 3
    }
  }, [props.rating])
  return <div className={styles.root}>{Array.from({length: 3}, (_, i) => '₽').map((val, key) => <span key={key} style={{color: (key) < lengthActive ? props.colorActive : props.colorDisabled}}>₽</span>)}</div>

}

