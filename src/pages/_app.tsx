import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, NextUIProvider } from '@nextui-org/react'
import { Web3ReactProvider } from '@web3-react/core'
import { getLibrary } from '@/utils/web3-react'
import { MoralisProvider } from 'react-moralis'

const moralisAppId = 'EwfIYq8iKGiCE4EiI3RlJowmAVymt1bgjZid2jbJ'
const moralisServerURL = 'https://qvczavdou2rm.usemoralis.com:2053/server'

function MyApp({ Component, pageProps }: AppProps) {
  const darkTheme = createTheme({
    type: 'dark'
  })

  return (
    <MoralisProvider appId={moralisAppId} serverUrl={moralisServerURL}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <NextUIProvider theme={darkTheme}>
          <Component {...pageProps} />
        </NextUIProvider>
      </Web3ReactProvider>
    </MoralisProvider>
  )
}

export default MyApp
