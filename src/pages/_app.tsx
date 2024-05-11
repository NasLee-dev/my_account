import type { AppProps } from 'next/app'
import { Global } from '@emotion/react'
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query'
import { SessionProvider } from 'next-auth/react'
import { useReportWebVitals } from 'next/web-vitals'

import globalSteyls from '@styles/globalStyles'
import Layout from '@shared/Layout'
import AuthGuard from '@/components/auth/AuthGuard'
import Navbar from '@/components/shared/Navbar'
import { AlertContextProvider } from '@/contexts/AlertContext'
import ErrorBoundary from '@/components/shared/ErrorBoundary'

const client = new QueryClient({})

export default function App({
  Component,
  pageProps: { dehydratedState, session, ...pageProps },
}: AppProps) {
  useReportWebVitals((metric) => {
    console.log(metric)
  })
  return (
    <Layout>
      <Global styles={globalSteyls} />
      <SessionProvider session={session}>
        <QueryClientProvider client={client}>
          <Hydrate state={dehydratedState}>
            <ErrorBoundary>
              <AlertContextProvider>
                <Navbar />
                <Component {...pageProps} />
              </AlertContextProvider>
            </ErrorBoundary>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </Layout>
  )
}
