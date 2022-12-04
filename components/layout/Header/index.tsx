import styles from './index.module.scss'
import { Sticky } from 'react-sticky'
import Link from 'next/link'
import LogoSvg from 'components/svg/LogoSvg'
import Search from './Search'
import Auth from './Auth'
import Basket from './Basket'
import { forwardRef, useState } from 'react'
import Menu from './Menu'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'

interface Props {
  isSticky?: boolean
  restProps?: any
}

const HeaderInner = forwardRef<HTMLDivElement, Props & { style?: any }>((props, ref) => {

  const [isShow, setIsShow] = useState<boolean>(false)

  const handleOpenMobileMenu = () =>  {

  }

  return (
    <div className={styles.root} ref={ref} style={props.style} {...(props.restProps ?? {})}>
      <div className={styles.container}>
        <div className={styles.left}>
          <HiddenXs>
            <Link href='/'>
              <div className={styles.logo}>
                <LogoSvg />
              </div>
            </Link>
          </HiddenXs>
          <VisibleXs>
            <div
              className={styles.menuOpen}
              onClick={handleOpenMobileMenu}
            >
              <img src="/images/header/menu.svg" alt="" />
            </div>
          </VisibleXs>
        </div>
        <div className={styles.center}>
          <div className={styles.address}>
            <div className={styles.icon}>
              <img src='/images/header/address.svg' alt='' />
            </div>
            <div className={styles.text}>Введите адрес доставки</div>
          </div>
        </div>
        <div className={styles.right}>
          <Search onClick={() => setIsShow(isShow ? false : true)} className={styles.search} />
          {!isShow ? <Auth onClick={null} /> : null}
          <Basket onClick={null} />
        </div>
      </div>
      <Menu />
    </div>
  )
})

HeaderInner.displayName = 'HeaderInner'
export default function Header(props: Props) {

  if (props.isSticky) {
    return <Sticky>{({ style, isSticky, ...rest }) => <HeaderInner {...props} restProps={rest} style={style} />}</Sticky>
  } else {
    return <HeaderInner {...props} />
  }
}
