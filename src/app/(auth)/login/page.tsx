import LoginUI from "@components/LoginUI";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Rancelab",
  description: "Login to Rancelab",
}

const LoginPage = () => {
  return (
    <section className="flex items-center justify-center">
      <LoginUI />
    </section>
  )
}

export default LoginPage;