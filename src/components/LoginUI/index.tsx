"use client";

import VerificationCodeCard from "./VerificationCodeCard";
import EmailEntryCard from "./EmailEntryCard";
import { useLoginForm } from "@/hooks/useLoginForm";

const LoginUI = () => {
  const {
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
  } = useLoginForm();

  return (
    <section
      aria-label="Two step email verification"
      className="relative mx-auto flex w-full max-w-lg flex-col gap-6 rounded-xl bg-gradient-to-b from-primary/5 via-white to-white p-4 shadow-xl md:p-6"
    >
      <header className="space-y-3 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Secure Login
        </p>
        <h1 className="text-2xl font-semibold text-foreground md:text-3xl">
          Login to your account
        </h1>
        <p className="text-base text-muted-foreground">
          We use a short verification flow to keep accounts secure. Start by
          sharing your email, then confirm the one-time passcode we send you.
        </p>
      </header>

      <div className="grid gap-5">
        {step === "email" && (
          <EmailEntryCard
            email={email}
            onEmailChange={setEmail}
            onSubmit={handleEmailSubmit}
            error={emailError}
            isLoading={isSendingCode}
          />
        )}

        {step === "verification" && (
          <>
            <VerificationCodeCard
              email={email}
              code={code}
              isActive
              onCodeChange={setCode}
              onSubmit={handleVerificationSubmit}
              onEditEmail={resetEmailStep}
              onResend={handleResendCode}
              isSubmitting={isVerifyingCode}
              isResending={isResendingCode}
            />
            {verificationError && (
              <p className="text-center text-sm text-red-500">{verificationError}</p>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default LoginUI;