import { AuthProvider } from "@app/AuthProvider";

import "@styles/globals.css";

const Inventory = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div>
          <div>
            <AuthProvider> {children}</AuthProvider>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Inventory;
