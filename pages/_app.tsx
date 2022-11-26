import 'normalize.css'
import 'styles/globals.scss'
import Head from 'next/head'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {

  return (
      <Component {...pageProps} />
  )
}

export default MyApp
