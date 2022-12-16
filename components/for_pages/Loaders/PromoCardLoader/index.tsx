import styles from './index.module.scss'
import classNames from 'classnames'
import ContentLoader from 'react-content-loader'

interface Props {
  className?: string
}

export default function PromoCardLoader({ className }: Props) {

  return (
    <div className={classNames(styles.root, className)}>
      <div className={styles.front}>
        <div className={styles.header}>
          <ContentLoader
            speed={1}
            style={{ width: '120px', height: '25px' }}
            backgroundColor="#E0E0E0"
            foregroundColor="#e8e8e3"
            className={styles.content}
          >
            <rect x="0" y="0" rx="0" ry="0" width="120" height="25" />
          </ContentLoader>
        </div>
        <div className={styles.desc}>
          <ContentLoader
            speed={1}
            style={{ width: '200px', height: '25px' }}
            backgroundColor="#E0E0E0"
            foregroundColor="#e8e8e3"
            className={styles.content}
          >
            <rect x="0" y="0" rx="0" ry="0" width="200" height="25" />
          </ContentLoader>
        </div>
      </div>
    </div>
  )
}
