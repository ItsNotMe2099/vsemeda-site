import styles from './index.module.scss'
import { Sticky, StickyChildArgs } from 'react-sticky'
import Link from 'next/link'
import { forwardRef } from 'react'
import { useRouter } from 'next/router'
import { useAppContext } from 'context/state'
import { LINKS } from 'types/constants'
import LogoEdaSvg from 'components/svg/LogoEdaSvg'
import HeaderAddress from 'components/layout/Header/HeaderAddress'
import HeaderDelivery from 'components/layout/Header/HeaderDelivery'
import LoginButton from 'components/layout/Header/LoginButton'
import DividerDotsSvg from 'components/svg/DividerDotsSvg'
import { colors } from 'styles/variables'
import LoupeSvg from 'components/svg/LoupeSvg'
import classNames from 'classnames'
import UserMenu from './UserMenu'
import IconButton from 'components/ui/IconButton'
import MenuSvg from 'components/svg/MenuSvg'
import BackBtn from 'components/ui/BackBtn'
import BurgerSvg from 'components/svg/BurgerSvg'
import Basket from './Basket'
import ArrowHeaderSvg from 'components/svg/ArrowHeaderSvg'

interface Props {
  isSticky?: boolean
  restProps?: any
  childArgs?: StickyChildArgs
}

const HeaderInner = forwardRef<HTMLDivElement, Props & { style?: any, distanceFromTop?: number }>((props, ref) => {

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
    <div className={classNames(styles.root, { [styles.none]: appContext.modal })} ref={ref} style={props.style} {...(props.restProps ?? {})}>
      <div className={styles.desktop}>
        <div className={styles.container}>
          <div className={styles.left}>

            <Link href='/'>
              <div className={styles.logo}>
                {router.asPath !== '/' ? <ArrowHeaderSvg color={colors.white} /> : <LogoEdaSvg />}
              </div>
            </Link>
            <DividerDotsSvg className={styles.divider} />
            <HeaderAddress />
            <DividerDotsSvg className={styles.divider} />
            <HeaderDelivery />
            <div
              className={styles.menuOpen}
              onClick={handleOpenMobileMenu}
            >
              <img src="/images/header/menu.svg" alt="" />
            </div>
          </div>
          <div className={styles.right}>
            {router.asPath === '/' ? <LoupeSvg color={colors.white} /> : null}
            <DividerDotsSvg className={styles.divider} />
            <Basket />
            <DividerDotsSvg className={styles.divider} />
            {router.asPath === '/' ? (!appContext.token ? <LoginButton /> :
              <UserMenu />) : null}
          </div>
          <div className={classNames(styles.shadow, styles.shadow1)} />
          <div className={classNames(styles.shadow, styles.shadow2)} />
          <div className={classNames(styles.shadow, styles.shadow3)} />
          <div className={classNames(styles.shadow, styles.shadow4)} />
          <div className={classNames(styles.shadow, styles.shadow5)} />
          <div className={classNames(styles.shadow, styles.shadow6)} />
        </div>
      </div>
      {!appContext.modal ? <div className={styles.phone}>
        <div className={classNames(styles.container, { [styles.sticky]: props.distanceFromTop < 0 })}>
          {router.asPath === `/${appContext.region.slug}` ?
            <IconButton bgColor='white' size='large'>
              <MenuSvg color='#812292' />
            </IconButton>
            :
            <BackBtn size='large' bgColor='white' onClick={() => router.push('/')} />}
          {router.asPath === `/${appContext.region.slug}` ?
            <HeaderAddress
              isSticky={props.distanceFromTop < 0 ? true : false}
              isMobile /> : null}
          <IconButton bgColor='white' size='large'>
            {router.asPath === `/${appContext.region.slug}` ? <LoupeSvg color='#812292' /> : <BurgerSvg color='#812292' />}
          </IconButton>
        </div>
      </div> : null}
    </div>
  )
})

HeaderInner.displayName = 'HeaderInner'
export default function Header(props: Props) {

  if (props.isSticky) {
    return <Sticky>{({ style, isSticky, distanceFromTop, ...rest }) => <HeaderInner distanceFromTop={distanceFromTop} {...props} restProps={rest} style={style} />}</Sticky>
  } else {
    return <HeaderInner {...props} />
  }
}
