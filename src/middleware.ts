import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const token = request.cookies.get("session_token")?.value

    const isDashboard = request.nextUrl.pathname.startsWith("/dashboard")
    const isRestaurant = request.nextUrl.pathname.startsWith("/restaurants")
    const isLogin = request.nextUrl.pathname.startsWith("/login")

    if ((isDashboard || isRestaurant) && !token) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    if (isLogin && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*", "/restaurants/:path*", "/login"],
}