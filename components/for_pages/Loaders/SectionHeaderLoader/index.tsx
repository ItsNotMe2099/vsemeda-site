import ContentLoader from 'react-content-loader'
import styles from './index.module.scss'

interface Props {
  desc?: boolean
}

export default function SectionHeaderLoader({ desc }: Props) {

  return (
    <div className={styles.root}>
      <ContentLoader
        speed={1}
        style={{ width: '250px', height: '40px' }}
        backgroundColor="#E0E0E0"
        foregroundColor="#e8e8e3"
        className={styles.head}
      >
        <rect x="0" y="0" rx="0" ry="0" width="250" height="40" />
      </ContentLoader>
      {desc ?
      <ContentLoader
        speed={1}
        style={{ width: '250px', height: '20px' }}
        backgroundColor="#E0E0E0"
        foregroundColor="#e8e8e3"
        className={styles.desc}
      >
        <rect x="0" y="0" rx="0" ry="0" width="250" height="20" />
      </ContentLoader> : null}
    </div>
  )
}
