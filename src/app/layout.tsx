import { Poppins } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "@components/ErrorBoundary";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@components/UI/Sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary>
      <html lang="en" className={poppins.variable}>
        <body className="min-h-screen flex flex-col">
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </body>
      </html>
    </ErrorBoundary>
  )
}

export default RootLayout;