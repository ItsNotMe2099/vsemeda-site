import styles from './index.module.scss'
import {Sticky} from 'react-sticky'
import Link from 'next/link'
import LogoSvg from 'components/svg/LogoSvg'
import Search from './Search'
import Auth from './Auth'
import Basket from './Basket'

interface Props {
  
}

const HeaderInner = () => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href='/'>
            <div className={styles.logo}>
              <LogoSvg/>
            </div>
          </Link>
        </div>
        <div className={styles.center}>
          <div className={styles.address}>
            <div className={styles.icon}>
              <img src='/images/header/address.svg' alt=''/>
            </div>
            <div className={styles.text}>Введите адрес доставки</div>
          </div>
        </div>
        <div className={styles.right}>
          <Search className={styles.search}/>
          <Auth onClick={null}/>
          <Basket onClick={null}/>
        </div>
      </div>
    </div>
  )
}

export default function Header(props: Props) {

  return (
    <Sticky>{() => <HeaderInner/>}</Sticky>
  )
}
