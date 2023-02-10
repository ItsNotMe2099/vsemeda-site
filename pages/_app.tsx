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

export interface AppProps extends NextAppProps {
  pageProps: {
    isMobile: boolean
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
    <AppWrapper isMobile={pageProps.isMobile}>
      <AddressWrapper>
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
      </AddressWrapper>
    </AppWrapper>
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


  return props
}

export default MyApp
