import Footer from "@components/Layout/Footer";
import Header from "@components/Layout/Header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  )
}

export default MainLayout;