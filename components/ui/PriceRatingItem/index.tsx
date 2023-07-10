import styles from './index.module.scss'
import classNames from 'classnames'
import { useMemo} from 'react'
import {PriceRating} from 'data/enum/PriceRating'

interface Props {
  rating: PriceRating
}

export default function PriceRatingItem(props: Props) {

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
  return <div className={styles.root}>{Array.from({length: 3}, (_, i) => '₽').map((val, key) => <span className={classNames({[styles.active]: (key + 1) < lengthActive})}>₽</span>)}</div>
}

