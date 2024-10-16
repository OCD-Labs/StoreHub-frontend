import DashboardNav from "@components/stores/Inventory/DashboardNav";
import "./styles/inventory.css";
import { AuthProvider } from "@contexts/AuthProvider";
const Inventory = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="max-w-7xl text-sm m-auto sm:px-16 px-6 font-normal">
        <AuthProvider>
          <DashboardNav>{children}</DashboardNav>
        </AuthProvider>
      </body>
    </html>
  );
};

export default Inventory;
