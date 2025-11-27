import { FooterLink } from "@/types";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

export const footerLinks: FooterLink[] = [
  {
    title: "Linkedin",
    href: "https://linkedin.com",
    className: "text-blue-500",
    icon: <Linkedin aria-hidden="true" />,
  },
  {
    title: "Youtube",
    href: "https://youtube.com",
    className: "text-red-500",
    icon: <Youtube aria-hidden="true" />,
  },
  {
    title: "Instagram",
    href: "https://instagram.com",
    className: "text-pink-500",
    icon: <Instagram aria-hidden="true" />,
  },
  {
    title: "Facebook",
    href: "https://facebook.com",
    className: "text-blue-500",
    icon: <Facebook aria-hidden="true" />,
  },
];

export const COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Singapore",
  "Australia",
] as const;

export const SPICE_LEVELS = ["None", "Mild", "Medium", "Hot", "Extra Hot"];