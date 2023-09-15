import '@styles/globals.css'
import Nav from '@components/global/Nav'
import Footer from '@components/global/Footer'
import { ErrorBoundary } from 'react-error-boundary'
import Error from './error'

export const metadata = {
  title: 'storehub',
  description: 'One click deployable e-commerce store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>

        <main className="h-screen flex flex-col justify-between">
          <div>
            <div className="max-w-7xl text-sm m-auto sm:px-16 px-6">
              <Nav />
              
              <ErrorBoundary
                fallback={
                  <Error error="something went wrong" />
                }
              >
                {children}
              </ErrorBoundary>
            </div>
          </div>
          <Footer />
        </main>
      </body>
    </html>
  )
}
