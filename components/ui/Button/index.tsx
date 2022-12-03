import styles from './index.module.scss'
import Link from 'next/link'
import classNames from 'classnames'
import { IButton } from 'types/types'
import { ReactElement } from 'react'

interface Props extends IButton {
  children?: React.ReactNode
  disabled?: boolean
  href?: string
  className?: string
  fluid?: boolean
  target?: string
  icon?: ReactElement
  iconBtnSize?: 'small' | 'medium' | 'large'
  btnSize?: 'small' | 'medium' | 'large'
  styleType?: 'primary' | 'outline' | 'dashed' | 'icon'
  backColor?: 'green' | 'red' 
  borderColor?: 'border-green' | 'border-red' 
  search?: boolean
}

export default function Button(props: Props) {

  const getBackgroundColor = (color: string) => {
    return classNames(
      {
        [styles[color]]: color
      }
    )
  }

  const getBorderColor = (color: string) => {
    return classNames(
      {
        [styles[color]]: color
      }
    )
  }

  const getClassName = () => {
    return classNames(
      {
        [styles.fluid]: props.fluid,
        [styles[props.styleType]]: true,
        [styles.withIcon]: !!props.icon,
        [styles.btnSmall]: props.btnSize === 'small',
        [styles.btnMedium]: props.btnSize === 'medium',
        [styles.btnLarge]: props.btnSize === 'large',
        [styles.iconBtnSmall]: props.iconBtnSize === 'small',
        [styles.iconBtnMedium]: props.iconBtnSize === 'medium',
        [styles.iconBtnLarge]: props.iconBtnSize === 'large',
        [styles.disabled]: props.disabled && !props.search,
      }, 
      getBackgroundColor(props.backColor),
      getBorderColor(props.borderColor),
      props.className
    )

  }

  const body = (
    <span className={styles.children}>{props.icon}{props.children}</span>
  )

  return (

    props.href ?
      <Link href={props.href}>
        <a
          onClick={props.onClick}
          href={props.href}
          target={props.target}
          className={`${styles.link} ${getClassName()}`}
        >
          {body}
        </a>
      </Link>
      :
      <button onClick={props.onClick} 
      type={props.type} 
      disabled={props.disabled} 
      className={`${styles.btn} ${getClassName()}`}>
        {body}
      </button>
  )
}

Button.defaultProps = {
  type: 'button',
}
