import '@styles/globals.css'
import DefaultNav from '@components/global/DefaultNav'
import Footer from '@components/global/Footer'
import { ErrorBoundary } from 'react-error-boundary'

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
            <DefaultNav />

            <div className="text-sm m-auto">{children}</div>
          </div>
          <Footer />
        </main>
      </body>
    </html>
  )
}
