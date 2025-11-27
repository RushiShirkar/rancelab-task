"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Store, LogOut, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@components/UI/Button"
import { useAuth } from "@/context/AuthContext"

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

const NAV_ITEMS = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Restaurants",
        href: "/restaurants",
        icon: Store,
    },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname()
    const { logout } = useAuth()

    const handleLogout = async () => {
        await logout()
    }

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 flex w-56 flex-col border-r bg-background transition-transform duration-300 md:static md:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
                aria-label="Sidebar Navigation"
            >
                {/* Logo Area */}
                <div className="flex h-16 items-center justify-between md:justify-center border-b px-6">
                    {/* Logo */}
                    <Link
                        href="/dashboard"
                        aria-label="Home"
                        className="text-2xl font-semibold text-primary"
                    >
                        Rancelab
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={onClose}
                        aria-label="Close sidebar"
                    >
                        <X className="size-5" />
                    </Button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                                onClick={() => onClose()} // Close on mobile when clicked
                                aria-current={isActive ? "page" : undefined}
                            >
                                <Icon className="size-4" />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                {/* Footer / Logout */}
                <div className="border-t p-4">
                    <Button
                        variant="ghost"
                        className="w-full justify-center gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleLogout()}
                    >
                        <LogOut className="size-4" />
                        Logout
                    </Button>
                </div>
            </aside>
        </>
    )
}

Sidebar.displayName = "Sidebar";