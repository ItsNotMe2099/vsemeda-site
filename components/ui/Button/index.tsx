import styles from './index.module.scss'
import Link from 'next/link'
import classNames from 'classnames'
import {IButton} from 'types/types'

interface Props extends IButton{
  children?: React.ReactNode
  disabled?: boolean
  href?: string
  className?: string
  fluid?: boolean
  target?: string
}

export default function Button(props: Props) {

  const getClassName = () => {
    return classNames(
      {
        [styles.fluid]: props.fluid,
      }, props.className
    )

  }

  return (

      props.href ?
        <Link href={props.href}>
        <a
          onClick={props.onClick}
          href={props.href}
          target={props.target}
          className={`${styles.link} ${getClassName()}`}
        >
          {props.children}
        </a>
        </Link>
        :
          <button onClick={props.onClick} type={props.type} disabled={props.disabled} className={`${styles.btn} ${getClassName()}`}>
            {props.children}
          </button>
  )
}

Button.defaultProps = {
  type: 'button',
}
