"use client"

import { useState } from "react"
import { Menu } from "lucide-react"

import { Button } from "@components/UI/Button"
import { Sidebar } from "@components/Layout/Sidebar"
import Link from "next/link"

interface SidebarLayoutProps {
    children: React.ReactNode
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <div className="flex min-h-screen bg-muted/10">
            <Sidebar
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />

            <div className="flex flex-1 flex-col">
                {/* Mobile Header */}
                <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b bg-background px-4 md:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="-ml-2"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu className="size-5" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                    {/* Logo */}
                    <Link
                        href='/dashboard'
                        aria-label='Home'
                        className='text-2xl font-semibold text-primary'
                    >
                        Rancelab
                    </Link>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
