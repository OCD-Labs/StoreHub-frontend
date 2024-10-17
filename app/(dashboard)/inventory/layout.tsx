
import DashboardNav from '@components/stores/Inventory/DashboardNav';
import './styles/inventory.css'
import { AuthProvider } from '@app/AuthProvider'
const Inventory = ({ children }: { children: React.ReactNode }) => {
 

  return (
    <html lang="en">
      <body className="font-vietnam">
        <AuthProvider>
          <DashboardNav>{children}</DashboardNav>
        </AuthProvider>
      </body>
    </html>
  )
}

export default Inventory
