import SignupUI from "@/components/SignupUI";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup | Rancelab",
  description: "Signup to Rancelab",
}

const SignupPage = () => {
  return (
    <section className="flex items-center justify-center">
      <SignupUI />
    </section>
  )
}

export default SignupPage;