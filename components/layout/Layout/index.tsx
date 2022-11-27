//import Footer from '../Footer'
import Header from '../Header'
import styles from './index.module.scss'
import {StickyContainer} from 'react-sticky'
import Footer from '../Footer'

interface Props {
  children?: React.ReactNode
}

export default function Layout({children}: Props) {
  return (
    <div className={styles.root}>
      <StickyContainer>
      <Header isSticky/>
        {children}
      <Footer/>
      </StickyContainer>
    </div>
  )
}
