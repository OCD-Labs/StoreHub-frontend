import '@styles/globals.css'
import Nav from '@components/global/Nav'
import Footer from '@components/global/Footer'
import { Providers } from './provider'

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
              <Providers>
                <Nav />
                {children}
              </Providers>
            </div>
          </div>
          <Footer />
        </main>
      </body>
    </html>
  )
}
