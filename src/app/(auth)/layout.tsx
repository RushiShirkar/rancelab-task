import Header from "@components/Layout/Header";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 md:px-12 pt-24">
        {children}
      </main>
    </div>
  )
}

export default AuthLayout;