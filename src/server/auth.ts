"use server";

import { prisma } from "./db";
import { sendOtpEmail } from "./brevo";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function checkUserAndSendOtp(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return { success: false, message: "User not found" };
        }

        // Generate 6 digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        await prisma.verificationCode.create({
            data: {
                userId: user.id,
                code,
                expiresAt,
            },
        });

        await sendOtpEmail(email, code);

        return { success: true, message: "OTP sent successfully" };
    } catch (error) {
        console.error("Error sending OTP:", error);
        return { success: false, message: "Failed to send OTP" };
    }
}

export async function signupAndSendOtp(email: string, fullName: string, country: string) {
    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { success: false, message: "User already exists. Please login." };
        }

        const user = await prisma.user.create({
            data: {
                email,
                fullName,
                country,
            },
        });

        // Generate 6 digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        await prisma.verificationCode.create({
            data: {
                userId: user.id,
                code,
                expiresAt,
            },
        });

        await sendOtpEmail(email, code);

        return { success: true, message: "Account created and OTP sent" };
    } catch (error) {
        console.error("Error creating account:", error);
        return { success: false, message: "Failed to create account" };
    }
}

export async function verifyOtp(email: string, code: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return { success: false, message: "User not found" };
        }

        const verificationCode = await prisma.verificationCode.findFirst({
            where: {
                userId: user.id,
                code,
                used: false,
                expiresAt: {
                    gt: new Date(),
                },
            },
        });

        if (!verificationCode) {
            return { success: false, message: "Invalid or expired OTP" };
        }

        // Mark code as used
        await prisma.verificationCode.update({
            where: { id: verificationCode.id },
            data: { used: true },
        });

        // Create session
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
        const session = await prisma.session.create({
            data: {
                userId: user.id,
                expiresAt,
            },
        });

        // Set cookie
        (await cookies()).set("session_token", session.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: expiresAt,
            sameSite: "lax",
            path: "/",
        });

        return { success: true, message: "Login successful" };
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return { success: false, message: "Failed to verify OTP" };
    }
}

export async function logout() {
    (await cookies()).delete("session_token");
    redirect("/login");
}

export async function getSession() {
    const token = (await cookies()).get("session_token")?.value;

    if (!token) return null;

    const session = await prisma.session.findUnique({
        where: { token },
        include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
        return null;
    }

    return session;
}

export async function getUserFromSession() {
    const session = await getSession();
    return session?.user ?? null;
}