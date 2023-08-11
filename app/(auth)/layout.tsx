'use client'
import '@styles/globals.css'

const Inventory = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  )
}

export default Inventory
