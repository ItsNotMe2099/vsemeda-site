import Header from '../Header'
import styles from './index.module.scss'
import { StickyContainer } from 'react-sticky'
import Footer from '../Footer'
import classNames from 'classnames'
import { useAppContext } from 'context/state'

interface Props {
  children?: React.ReactNode
  className?: string
}

export default function Layout({ children, className }: Props) {

  const appContext = useAppContext()

  console.log('appContext.isOverlayShown', appContext.isOverlayShown)

  return (
    <div className={styles.root}>
      <StickyContainer>
        <Header isSticky={!appContext.modal || !appContext.isOverlayShown} />
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
