import Link from 'next/link'
import { LINKS } from 'types/constants'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useRouter } from 'next/router'

interface Props {
  className?: string
}

export default function Filter(props: Props) {

  return (
    <div className={styles.root}>
      <img src='/images/filter.svg' alt=''/>
    </div>
  )
}
