import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  title: string
  className?: string
}

export default function TitleForSection(props: Props) {
  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={classNames({
        [styles.text]: true,
      })}>
        {props.title}
      </div>

    </div>
  )
}

