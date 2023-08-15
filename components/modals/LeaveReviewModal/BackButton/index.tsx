import styles from './index.module.scss'
import { useResize } from 'components/hooks/useResize'
import ArrowLeftSvg from 'components/svg/ArrowLeftSvg'
import CrossSvg from 'components/svg/CrossSvg'
import { colors } from 'styles/variables'

interface Props {
  onClick: () => void
}

export default function BackButton(props: Props) {
  const {isPhoneWidth} = useResize()

  return ( 
    <button className={styles.root} onClick={props.onClick}>
      {isPhoneWidth
      ? <CrossSvg color={colors.dark1}/>
      : <ArrowLeftSvg color={colors.dark1}/>
      }
    </button>
  )
}