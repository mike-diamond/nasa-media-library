import React from 'react'
import cx from 'classnames'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { Source_Sans_Pro } from 'next/font/google'

import '../scss/globals.scss'

import favicon from './favicon.ico'


const font = Source_Sans_Pro({
  preload: true,
  variable: '--font',
  weight: [ '400', '700' ],
  subsets: [ 'latin' ],
})

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>NASA Media Library</title>
      <meta content="React app test assignment" name="description" />
      <link href={favicon.src} rel="shortcut icon" />
    </Head>
    <div className={cx('bg-arrival', font.className)}>
      <div className="py-24 width-container">
        <Component {...pageProps} />
      </div>
    </div>
  </>
)


export default App
