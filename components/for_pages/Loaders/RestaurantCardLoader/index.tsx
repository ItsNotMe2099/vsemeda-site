import ContentLoader from 'react-content-loader'
import styles from './index.module.scss'
import classNames from 'classnames'


interface Props {
  className?: string
}

export default function RestaurantCardLoader({ className }: Props) {

  return (
    <div className={classNames(styles.root, className)}>
      
      <div className={styles.body}>
      <ContentLoader
        speed={1}
        style={{ width: '175px', height: '25px' }}
        backgroundColor="#E0E0E0"
        foregroundColor="#e8e8e3"
        className={styles.content}
      >
        <rect x="0" y="0" rx="0" ry="0" width="175" height="25" />
      </ContentLoader>
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
  )
}
