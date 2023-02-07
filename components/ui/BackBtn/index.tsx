import styles from './index.module.scss'
import IconButton from 'components/ui/IconButton'
import { MouseEventHandler } from 'react'
import classNames from 'classnames'
import { colors } from 'styles/variables'
import ArrowLeftSvg from 'components/svg/ArrowLeftSvg'

interface Props {
  onClick: MouseEventHandler
  defaultPosition?: boolean
  color?: string
  className?: string
  bgColor: 'transparent' | 'white'
}

export default function BackBtn(props: Props) {
  return (
    <IconButton onClick={props.onClick} className={classNames({
      [styles.root]: true,
      [styles.defaultPosition]: props.defaultPosition,
    }, props.className)} bgColor={props.bgColor} size={'large'}>
      <ArrowLeftSvg color={props.color ?? colors.purple} />
    </IconButton>
  )
}

