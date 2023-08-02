import styles from './index.module.scss'
import { Sticky, StickyChildArgs } from 'react-sticky'
import Link from 'next/link'
import {forwardRef, useRef} from 'react'
import { useRouter } from 'next/router'
import { useAppContext } from 'context/state'
import LogoEdaSvg from 'components/svg/LogoEdaSvg'
import HeaderAddress from 'components/layout/Header/HeaderAddress'
import LoginButton from 'components/layout/Header/LoginButton'
import DividerDotsSvg from 'components/svg/DividerDotsSvg'
import { breakpoints, colors } from 'styles/variables'
import LoupeSvg from 'components/svg/LoupeSvg'
import classNames from 'classnames'
import UserMenu from './UserMenu'
import IconButton from 'components/ui/IconButton'
import MenuSvg from 'components/svg/MenuSvg'
import BackBtn from 'components/ui/BackBtn'
// import BurgerSvg from 'components/svg/BurgerSvg'
import BasketButton from 'components/layout/Header/BasketButton'
import ArrowHeaderSvg from 'components/svg/ArrowHeaderSvg'
// import HeaderDelivery from './HeaderDelivery'
import VisibleOnSize from 'components/visibility/VisibleOnSize'
import { ModalType } from 'types/enums'

interface Props {
  isSticky?: boolean
  hasBack?: boolean
  restProps?: any
  childArgs?: StickyChildArgs,
}

const HeaderInner = forwardRef<HTMLDivElement, Props & { style?: any, distanceFromTop?: number }>((props, ref) => {

  const appContext = useAppContext()
  const basketButtonRef = useRef()
  const handleOpenMobileMenu = () => {
    appContext.showModal(ModalType.ProfileMenu)
  }

  const router = useRouter()

  //TODO: возможно отрефакторить эти проверки
  const isOnRestaurantPage = router.asPath.search('/rest/') >= 0 
  const isOnMainPage = router.asPath === `/${appContext.regionSlug}`

  return (
    <div className={classNames(styles.root, { [styles.none]: appContext.modal })} ref={ref} style={props.style} {...(props.restProps ?? {})}>
      <VisibleOnSize width={breakpoints.PhoneWidth} minSize>
      <div className={styles.desktop}>
        <div className={styles.container}>
          <div className={styles.left}>

            <Link href='/'>
              {props.hasBack ? <div className={styles.back}>
                <ArrowHeaderSvg color={colors.white}/>
              </div> : <div className={styles.logo}>
                <LogoEdaSvg />
              </div>}


            </Link>
            <DividerDotsSvg className={styles.divider} />
            <HeaderAddress />
           
            <div className={styles.menuOpen} onClick={handleOpenMobileMenu}>
              <img src="/images/header/menu.svg" alt="" />
            </div>
            
          </div>
          <div className={styles.right}>
            <LoupeSvg color={colors.white} />
            <DividerDotsSvg className={styles.divider} />
            <BasketButton ref={basketButtonRef}/>
            <DividerDotsSvg className={styles.divider} />
            {!appContext.isLogged ? <LoginButton /> : <UserMenu />}
          </div>
          <div className={classNames(styles.shadow, styles.shadow1)} />
          <div className={classNames(styles.shadow, styles.shadow2)} />
          <div className={classNames(styles.shadow, styles.shadow3)} />
          <div className={classNames(styles.shadow, styles.shadow4)} />
          <div className={classNames(styles.shadow, styles.shadow5)} />
          <div className={classNames(styles.shadow, styles.shadow6)} />
        </div>
      </div>
      </VisibleOnSize>

      <VisibleOnSize width={breakpoints.PhoneWidth}>
        <div className={styles.phone}>
          <div className={classNames(styles.container, { [styles.sticky]: props.distanceFromTop < 0 &&  !isOnRestaurantPage} )}>
            {isOnMainPage ?
              <IconButton bgColor='white' size='large' onClick={handleOpenMobileMenu}>
                <MenuSvg color='#812292' />
              </IconButton>
              :
              <BackBtn size='large' bgColor='white' onClick={() => router.push('/')} />}

            {isOnMainPage ?
              <HeaderAddress
                isSticky={props.distanceFromTop < 0 ? true : false}
                isMobile /> : null}

            <IconButton bgColor='white' size='large'>
              <LoupeSvg color='#812292' /> 
            </IconButton>
          </div>
        </div> 
      </VisibleOnSize>
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
