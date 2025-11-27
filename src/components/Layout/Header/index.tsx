"use client";

import { Button } from "@components/UI/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header
      className="w-full z-100 top-0 start-0 bg-white backdrop-blur-md fixed shadow-md"
    >
      <div className="px-4 md:px-12 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Home"
          className="text-2xl font-semibold text-primary"
        >
          Rancelab
        </Link>

        {/* Buttons */}
        <div className="flex gap-3">
          {pathname === "/" ? (
            <>
              <Button variant="roundedOutline" onClick={() => router.push("/login")}>
                Login
              </Button>
              <Button variant="rounded" onClick={() => router.push("/sign-up")}>
                Sign Up
              </Button>
            </>
          ) : (
            <>
              {pathname === "/login" ? (
                <Button variant="rounded" onClick={() => router.push("/sign-up")}>
                  Sign Up
                </Button>
              ) : (
                <Button variant="roundedOutline" onClick={() => router.push("/login")}>
                  Login
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header;