import Header from '../Header'
import styles from './index.module.scss'
import { StickyContainer } from 'react-sticky'
import Footer from '../Footer'
import classNames from 'classnames'

interface Props {
  children?: React.ReactNode
  className?: string
}

export default function Layout({ children, className }: Props) {
  return (
    <div className={styles.root}>
      <StickyContainer>
        <Header isSticky />
        <div className={styles.content}>
          <div className={classNames(styles.container, className)}>
            {children}
          </div>
        </div>
        <Footer />
      </StickyContainer>
    </div>
  )
}
