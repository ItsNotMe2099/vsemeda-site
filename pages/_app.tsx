import 'normalize.css'
import 'styles/globals.scss'
import type { AppProps as NextAppProps } from 'next/app'
import App, { AppContext } from 'next/app'
import { useEffect, useState } from 'react'
import { AppWrapper } from 'context/state'
import { getSelectorsByUserAgent } from 'react-device-detect'
import 'swiper/css/bundle'
import ModalContainer from 'components/layout/ModalContainer'
import BottomSheetContainer from 'components/layout/BottomSheetContainer'
import Snackbar from 'components/layout/Snackbar'
import Head from 'next/head'
import { AddressWrapper } from 'context/address_state'
import AppOverlay from 'components/for_pages/Common/AppOverlay'
import { AuthWrapper } from 'context/auth_state'
import { CookiesType } from 'types/enums'

export interface AppProps extends NextAppProps {
  pageProps: {
    isMobile: boolean
    token: string
  }
}

function MyApp({ Component, pageProps }: AppProps) {
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
    <AppWrapper isMobile={pageProps.isMobile} token={pageProps.token}>
      <AddressWrapper>
        <AuthWrapper>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover"
            />
          </Head>
          <Component {...pageProps} />
          {clientVisible && <ModalContainer />}
          {clientVisible && <BottomSheetContainer />}
          {clientVisible && <Snackbar />}
          <AppOverlay />
        </AuthWrapper>
      </AddressWrapper>
    </AppWrapper >
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const props = await App.getInitialProps(appContext)
  const ua = appContext.ctx.req ? appContext.ctx.req?.headers['user-agent'] : navigator.userAgent
  if (ua) {
    const { isMobile, isTablet } = getSelectorsByUserAgent(ua)
    const data = getSelectorsByUserAgent(ua)
    if (isTablet && typeof window !== 'undefined' && window.screen.width >= 992) {

      props.pageProps.isMobile = false
    } else {
      props.pageProps.isMobile = isMobile
    }

  } else {
    props.pageProps.isMobile = false
  }

  if (appContext.ctx.req) {
    if ((appContext.ctx?.req as any).cookies) {
      props.pageProps.token = (appContext.ctx as any).req.cookies[CookiesType.accessToken]
    }
  }

  return props
}

export default MyApp
