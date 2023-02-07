import styles from './index.module.scss'
import { Sticky } from 'react-sticky'
import Link from 'next/link'
import { forwardRef, useState } from 'react'
import HiddenXs from 'components/visibility/HiddenXs'
import VisibleXs from 'components/visibility/VisibleXs'
import { useRouter } from 'next/router'
import { useAppContext } from 'context/state'
import { LINKS } from 'types/constants'
import LogoEdaSvg from 'components/svg/LogoEdaSvg'
import HeaderAddress from 'components/layout/Header/HeaderAddress'
import HeaderDelivery from 'components/layout/Header/HeaderDelivery'
import LoginButton from 'components/layout/Header/LoginButton'
import DividerDotsSvg from 'components/svg/DividerDotsSvg'
import ShoppingCartSvg from 'components/svg/ShoppingCartSvg'
import {colors} from 'styles/variables'
import LoupeSvg from 'components/svg/LoupeSvg'
import classNames from 'classnames'

interface Props {
  isSticky?: boolean
  restProps?: any
}

const HeaderInner = forwardRef<HTMLDivElement, Props & { style?: any }>((props, ref) => {

  const [isShow, setIsShow] = useState<boolean>(false)

  const appContext = useAppContext()

  const handleOpenMobileMenu = () => {

  }

  const router = useRouter()

  const items = [
    { label: 'Все', link: `/${appContext.region.slug}` },
    { label: 'Акции', link: LINKS.header.actions },
    { label: 'Суши', link: LINKS.header.sushi },
    { label: 'Пицца', link: LINKS.header.pizza },
    { label: 'Бургеры', link: LINKS.header.burgers },
    { label: 'Фастфуд', link: LINKS.header.fastfood },
    { label: 'Шашлыки', link: LINKS.header.shashlik },
    { label: 'Десерты', link: LINKS.header.deserts },
    { label: 'Здоровая еда', link: LINKS.header.healthyfood },
  ]

  return (
    <div className={styles.root} ref={ref} style={props.style} {...(props.restProps ?? {})}>
      <div className={styles.container}>
        <div className={styles.left}>
          <HiddenXs>
            <>
            <Link href='/'>
              <div className={styles.logo}>
                <LogoEdaSvg />
              </div>
            </Link>
            <DividerDotsSvg className={styles.divider}/>
            <HeaderAddress/>
            <DividerDotsSvg className={styles.divider}/>
            <HeaderDelivery/>
            </>
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
        <div className={styles.right}>
          <LoupeSvg color={colors.white}/>
          <DividerDotsSvg className={styles.divider}/>
          <ShoppingCartSvg color={colors.white}/>
          <DividerDotsSvg className={styles.divider}/>
          <LoginButton/>
        </div>
        <div className={classNames(styles.shadow, styles.shadow1)}/>
        <div className={classNames(styles.shadow, styles.shadow2)}/>
        <div className={classNames(styles.shadow, styles.shadow3)}/>
        <div className={classNames(styles.shadow, styles.shadow4)}/>
        <div className={classNames(styles.shadow, styles.shadow5)}/>
        <div className={classNames(styles.shadow, styles.shadow6)}/>
      </div>

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
