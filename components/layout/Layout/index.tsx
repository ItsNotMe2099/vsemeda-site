import Header from '../Header'
import styles from './index.module.scss'
import { StickyContainer } from 'react-sticky'
import Footer from '../Footer'
import classNames from 'classnames'
import { useAppContext } from 'context/state'
import TabBar from '../Tabbar'
import VisibleXs from 'components/visibility/VisibleXs'

interface Props {
  children?: React.ReactNode
  className?: string
  classRoot?: string
}

export default function Layout({ children, className, classRoot }: Props) {

  const appContext = useAppContext()

  console.log('appContext.isOverlayShown', appContext.isOverlayShown)

  return (
    <div className={classNames(styles.root, classRoot)}>
      <StickyContainer>
        <Header isSticky={!appContext.modal || !appContext.isOverlayShown} />
        <div className={styles.content}>
          <div className={classNames(styles.container, className)}>
            {children}
          </div>
        </div>
        <Footer />
        <VisibleXs>
          <TabBar isSticky />
        </VisibleXs>
      </StickyContainer>
    </div>
  )
}
