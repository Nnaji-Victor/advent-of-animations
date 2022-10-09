import '~/css/global.scss'

import { AppProps } from 'next/app'
import React, { createContext, useContext, useEffect, useState } from 'react'

import { gaTrackingId } from '~/lib/constants'
import { useAppGA } from '~/lib/ga'

const Context = createContext<{ fontsLoaded: boolean }>({ fontsLoaded: false })
export const useAppContext = () => useContext(Context)

const App = ({ Component, pageProps }: AppProps) => {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  gaTrackingId && useAppGA()

  useEffect(() => {
    // @ts-ignore
    document.fonts.ready
      .then(() => {
        setFontsLoaded(true)
      })
      .catch((error: unknown) => {
        console.error(error)
        setFontsLoaded(true)
      })
  }, [])

  if (fontsLoaded) {
    document.documentElement.classList.add('fonts-loaded')
  }

  return (
    <>
      <Context.Provider value={{ fontsLoaded }}>
        <Component {...pageProps} />
      </Context.Provider>
    </>
  )
}

export default App
