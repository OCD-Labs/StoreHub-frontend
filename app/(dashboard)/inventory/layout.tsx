import DashboardNav from "@components/stores/Inventory/DashboardNav";
import "./styles/inventory.css";
import { AuthProvider } from "@contexts/AuthProvider";
import PageFooter from "@components/global/PageFooter";

const Inventory = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <html lang="en">
        <body className="font-vietnam">
          <AuthProvider>
            abc
            <DashboardNav>{children}</DashboardNav>
          </AuthProvider>
        </body>
      </html>
    </>
  );
};

export default Inventory;
