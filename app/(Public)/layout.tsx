import "@styles/globals.css";
import Nav from "@components/global/Nav";
import Footer from "@components/global/Footer";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./error";
import { AuthProvider } from "@contexts/AuthProvider";
import ImageProvider from "@contexts/ImageProvider";
import { CartProvider } from "@contexts/CartContext";

export const metadata = {
  title: "storehub",
  description: "One click deployable e-commerce store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>

        <main className="h-screen flex flex-col justify-between">
          <AuthProvider>
            <CartProvider>
              <ImageProvider>
                <div>
                  <div className="">
                    <Nav />
                    <ErrorBoundary
                      fallback={<Error error="something went wrong" />}
                    >
                      {children}
                    </ErrorBoundary>
                  </div>
                </div>
              </ImageProvider>
            </CartProvider>
          </AuthProvider>
          {/* <Footer /> */}
        </main>
      </body>
    </html>
  );
}
