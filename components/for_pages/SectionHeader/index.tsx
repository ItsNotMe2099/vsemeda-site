import styles from './index.module.scss'

interface Props {
  head: string
  desc?: string
}

export default function SectionHeader({head, desc}: Props) {

  return (
    <div className={styles.root}>
      <h2 className={styles.head}>{head}</h2>
      {desc ? <h3 className={styles.desc}>{desc}</h3> : null}
    </div>
  )
}
