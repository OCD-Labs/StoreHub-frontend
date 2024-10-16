import "@styles/globals.css";
import Nav from "@components/global/Nav";
import Footer from "@components/global/Footer";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./error";
import { AuthProvider } from "@contexts/AuthProvider";

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
          </AuthProvider>
          {/* <Footer /> */}
        </main>
      </body>
    </html>
  );
}
