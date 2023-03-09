import styles from './index.module.scss'
import classNames from 'classnames'
import { IButton } from 'types/types'
import { RefObject } from 'react'

interface Props extends IButton{
  children: React.ReactNode
  className?: string
  buttonRef?: RefObject<any>
  bgColor: 'transparent' | 'white'
  size?: 'normal' | 'medium' | 'large'
}

export default function IconButton(props: Props) {
  if (props.onClick && props.href) {
    console.warn('IconButton: must have either onClick or href') // eslint-disable-line
  }

  if (props.href) {
    return (
      <a // eslint-disable-line
        ref={props.buttonRef}
        href={typeof props.href == 'object' ? props.href.href! : props.href}
        target={props.isExternalHref ? '_blank' : ''}
        rel={props.isExternalHref ? 'noreferrer' : ''}
        className={classNames([styles.root, props.className],  styles[props.bgColor])}
        onClick={props.onClick}
      >
        {props.children}
      </a>
    )
  }

  return (
    <button
      ref={props.buttonRef}
      className={classNames([styles.root, props.className], styles[props.bgColor], styles[props.size ?? 'normal'])}
      type={props.type ?? 'button'}
      form={props.form}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

