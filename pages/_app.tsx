import 'normalize.css'
import 'styles/globals.scss'
import type {AppProps as NextAppProps} from 'next/app'
import App, {AppContext} from 'next/app'
import {useEffect, useState} from 'react'
import {AppWrapper} from 'context/state'
import {getSelectorsByUserAgent} from 'react-device-detect'
import 'swiper/css/bundle'
import ModalContainer from 'components/layout/ModalContainer'
import BottomSheetContainer from 'components/layout/BottomSheetContainer'
import Snackbar from 'components/layout/Snackbar'
import Head from 'next/head'
import {AddressWrapper} from 'context/address_state'
import AppOverlay from 'components/for_pages/Common/AppOverlay'
import {AuthWrapper} from 'context/auth_state'
import {CookiesType} from 'types/enums'
import {CartWrapper} from 'context/cart_state'
import 'swiper/css'
import {CookiesProvider} from 'react-cookie'
import { ActiveOrderWrapper } from 'context/order_state'
import { IndexPageWrapper } from 'context/index_page_state'

export interface AppProps extends NextAppProps {
  pageProps: {
    isMobile: boolean
    token: string
    region: string
  }
}

function MyApp({Component, pageProps}: AppProps) {
  const [clientVisible, setClientVisible] = useState(false)

  useEffect(() => {
      setClientVisible(true)
      if (pageProps.isMobile) {
        document.body.classList.add('mobile-ua')
        document.documentElement.className = 'mobile-ua'
      }
    },
    [])

  return (
    <CookiesProvider cookies={(Component as any).universalCookies}>
      <AppWrapper isMobile={pageProps.isMobile} token={pageProps.token} regionSlug={pageProps.region}>
        <AddressWrapper>
          <ActiveOrderWrapper>
            <CartWrapper>
              <AuthWrapper>
          <IndexPageWrapper>
                <Head>
                  <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover"
                  />
                </Head>
                <Component {...pageProps} />
                {clientVisible && <ModalContainer/>}
                {clientVisible && <BottomSheetContainer/>}
                {clientVisible && <Snackbar/>}
                <AppOverlay/>
          </IndexPageWrapper>
              </AuthWrapper>
            </CartWrapper>
          </ActiveOrderWrapper>
        </AddressWrapper>
      </AppWrapper>
    </CookiesProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const props = await App.getInitialProps(appContext)
  const ua = appContext.ctx.req ? appContext.ctx.req?.headers['user-agent'] : navigator.userAgent
  if (ua) {
    const {isMobile, isTablet} = getSelectorsByUserAgent(ua)
    const data = getSelectorsByUserAgent(ua)
    if (isTablet && typeof window !== 'undefined' && window.screen.width >= 992) {

      props.pageProps.isMobile = false
    } else {
      props.pageProps.isMobile = isMobile
    }

  } else {
    props.pageProps.isMobile = false
  }

  props.pageProps.region = appContext.ctx.query.region

  if (appContext.ctx.req) {
    if ((appContext.ctx?.req as any).cookies) {
      props.pageProps.token = (appContext.ctx as any).req.cookies[CookiesType.accessToken]
    }
  }

  return props
}

export default MyApp
