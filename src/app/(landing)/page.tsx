import { type Metadata } from "next";
import Landing from "@/components/Landing";

export const metadata: Metadata = {
  title: "Rancelab",
  description: "Digital Menu Management System for restaurants",
};

const LandingPage = () => <Landing />

export default LandingPage;