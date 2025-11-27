import { useState, useMemo, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { isEmailValid } from "@/lib/utils";
import { checkUserAndSendOtp, verifyOtp } from "@/server/auth";

export const useLoginForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState<string>();
    const [code, setCode] = useState("");
    const [step, setStep] = useState<"email" | "verification">("email");
    const [isSendingCode, setIsSendingCode] = useState(false);
    const [isVerifyingCode, setIsVerifyingCode] = useState(false);
    const [isResendingCode, setIsResendingCode] = useState(false);
    const [verificationError, setVerificationError] = useState<string>();

    const emailIsValid = useMemo(() => isEmailValid(email), [email]);

    const handleEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!emailIsValid) {
            setEmailError("Enter a valid email address.");
            return;
        }
        setEmailError(undefined);
        setIsSendingCode(true);
        try {
            const result = await checkUserAndSendOtp(email);
            if (result.success) {
                setStep("verification");
            } else {
                setEmailError(result.message || "Failed to send OTP. Please try again.");
            }
        } catch (error) {
            setEmailError("An unexpected error occurred.");
        } finally {
            setIsSendingCode(false);
        }
    };

    const handleVerificationSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (code.length !== 6) {
            return;
        }
        setIsVerifyingCode(true);
        setVerificationError(undefined);
        try {
            const result = await verifyOtp(email, code);
            if (result.success) {
                router.push("/dashboard");
            } else {
                setVerificationError(result.message || "Invalid code. Please try again.");
            }
        } catch (error) {
            setVerificationError("An unexpected error occurred.");
        } finally {
            setIsVerifyingCode(false);
        }
    };

    const handleResendCode = async () => {
        setIsResendingCode(true);
        try {
            await checkUserAndSendOtp(email);
        } finally {
            setIsResendingCode(false);
        }
    };

    const resetEmailStep = () => {
        setStep("email");
        setCode("");
        setVerificationError(undefined);
    };

    return {
        email,
        setEmail,
        emailError,
        code,
        setCode,
        step,
        isSendingCode,
        isVerifyingCode,
        isResendingCode,
        verificationError,
        handleEmailSubmit,
        handleVerificationSubmit,
        handleResendCode,
        resetEmailStep,
    };
};
