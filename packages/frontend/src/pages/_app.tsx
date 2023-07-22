import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps, router }: AppProps) {
  const isLandingPage = router.pathname === '/';
  if (isLandingPage) {
    return <Component {...pageProps} />
  }
  return <Component {...pageProps} />
}
