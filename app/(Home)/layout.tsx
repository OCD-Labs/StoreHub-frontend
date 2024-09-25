import '@styles/globals.css'

import Nav from '@components/global/Nav'
import Footer from '@components/global/Footer'

import { AuthProvider } from '@app/AuthProvider'

export const metadata = {
  title: 'storehub',
  description: 'One click deployable e-commerce store',
}

export default async function RootLayout({
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

        <main className="">
          
            <div>
              <div className="">
                <AuthProvider><Nav /></AuthProvider> 
              </div>

              <div className=""><AuthProvider>{children}</AuthProvider></div>
            </div>
          
          <Footer />
        </main>
      </body>
    </html>
  )
}
