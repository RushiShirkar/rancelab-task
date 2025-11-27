import Link from "next/link";
import { footerLinks } from "@/content";

const Footer = () => {
  return (
    <footer
      role="contentinfo"
      className="bottom-0 w-full px-4 md:px-12 py-4 bg-[#F8F9FAFF]"
    >
      <section className="flex flex-col gap-4 md:flex-row md:gap-0 justify-between items-center">
        <p className="text-sm font-normal text-[#565D6DFF] whitespace-nowrap">
          © 2025 Rancelab. All rights reserved.
        </p>
        <div className="flex gap-6 items-center justify-center">
          {footerLinks?.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              title={item.title}
              className={`${item.className} rounded focus:outline-none focus:ring-2 focus:ring-blue-400`}
              aria-label={item.title}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </section>
    </footer>
  )
}

export default Footer;