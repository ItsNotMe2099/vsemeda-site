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
  hideFooter?: boolean
  hideHeader?: boolean
  hideTabbar?: boolean
}

export default function Layout({ children, className, classRoot, ...props }: Props) {

  const appContext = useAppContext()

  return (
    <div className={classNames(styles.root, classRoot)}>
      <StickyContainer>
        {!props.hideHeader &&
          <Header isSticky={!appContext.modal || !appContext.isOverlayShown} />
        }
        <div className={styles.content}>
          <div className={classNames(styles.container, className)}>
            {children}
          </div>
        </div>
        {!props.hideFooter &&
          <Footer />
        }
        {!props.hideTabbar &&
        <VisibleXs>
          <TabBar isSticky />
        </VisibleXs>
        }
      </StickyContainer>
    </div>
  )
}
