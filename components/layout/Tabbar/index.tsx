import styles from './index.module.scss'
import { Sticky } from 'react-sticky'
import { forwardRef } from 'react'
import classNames from 'classnames'
import HomeSvg from 'components/svg/TabBar/HomeSvg'
import HistorySvg from 'components/svg/TabBar/HistorySvg'
import CartSvg from 'components/svg/TabBar/CartSvg'
import AboutSvg from 'components/svg/TabBar/AboutSvg'
import ProfileSvg from 'components/svg/TabBar/ProfileSvg'
import { useRouter } from 'next/router'
import { useAppContext } from 'context/state'
import { ModalType } from 'types/enums'
import { useCartContext } from 'context/cart_state'
import BasketButton from '../Header/BasketButton'

interface Props {
  isSticky?: boolean
  restProps?: any
}

const TabBarInner = forwardRef<HTMLDivElement, Props & { style?: any }>((props, ref) => {
  const router = useRouter()
  const appContext = useAppContext()
  const cartContext = useCartContext()

  const isOnMainPage = router.asPath === `/${appContext.regionSlug}`
  const mainPagePath = '/moskva'

  const body = (<>
      <div onClick={()=> {router.push(mainPagePath)}} className={classNames(styles.item, { [styles.active]: !isOnMainPage && !appContext.modal })}>
        <HomeSvg />
        <div className={styles.title}>
          Главная
        </div>
      </div>
      <div onClick={() => appContext.showModal(ModalType.Profile, 'orders') } className={classNames(styles.item, { [styles.active]: isOnMainPage })}>
        <HistorySvg />
        <div className={styles.title}>
          История
        </div>
      </div>
      <div onClick={() => appContext.showModal(ModalType.Basket)} className={classNames(styles.item, { [styles.active]: isOnMainPage })}>
        <CartSvg />
        <div className={styles.title}>
          Корзина
        </div>
      </div>
      <div className={classNames(styles.item, { [styles.active]: isOnMainPage })}>
        <AboutSvg />
        <div className={styles.title}>
          О нас
        </div>
      </div>
      <div onClick={() => appContext.showModal( !appContext.token ? ModalType.Login : ModalType.Profile, 'profile')} className={styles.item}>
        <ProfileSvg />
        <div className={styles.title}>
          Профиль
        </div>
      </div>
  </>)

  return (
    <div className={classNames(styles.root, {[styles.none]: appContext.modal})} ref={ref} style={props.style} {...(props.restProps ?? {})}>
      {!cartContext.isEmpty && !isOnMainPage &&
        <BasketButton/>
        ||
        body
      }
    </div>
  )
})

TabBarInner.displayName = 'TabBarInner'
export default function TabBar(props: Props) {

  if (props.isSticky) {
    return <Sticky>{({ style, isSticky, ...rest }) => <TabBarInner {...props} restProps={rest} style={style} />}</Sticky>
  } else {
    return <TabBarInner {...props} />
  }
}
