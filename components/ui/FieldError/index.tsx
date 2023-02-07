import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  children?: string
  className?: string
  showError: boolean
}

export default function FieldError(props: Props) {
  // const value = typeof props.children === 'string' ? props.children : isArray(props.children) ? props.children.filter(i => !!i)[0]['name'] : null : props.children

  if (props.showError && props.children) {
    return (
      <div className={classNames(styles.root, props.className)}>
        <div className={styles.text}>{props.children}</div>
      </div>
    )
  }
  return null
}

