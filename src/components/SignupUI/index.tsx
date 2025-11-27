"use client";

import { ReactNode } from "react";
import VerificationCodeCard from "@components/LoginUI/VerificationCodeCard";
import SignupDetailsForm from "./SignupDetailsForm";
import { useSignupForm } from "@/hooks/useSignupForm";

const SignupUI = () => {
  const {
    step,
    formValues,
    fieldErrors,
    code,
    setCode,
    isRequestingCode,
    isVerifyingCode,
    isResendingCode,
    handleFieldChange,
    handleSelectChange,
    handleDetailsSubmit,
    handleVerificationSubmit,
    handleResendCode,
    handleEditDetails,
  } = useSignupForm();

  const verificationDescription: ReactNode = (
    <>
      We sent a verification code to{" "}
      <span className="font-medium text-foreground">
        {formValues.email || "your email"}
      </span>
      . Enter it below to confirm your email and finish creating your account.
    </>
  );

  return (
    <section
      aria-label="Signup with verification"
      className="relative mx-auto flex w-full max-w-xl flex-col gap-6 rounded-xl bg-gradient-to-b from-primary/5 via-white to-white p-4 shadow-xl md:p-6"
    >
      <header className="space-y-3 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Create account
        </p>
        <h1 className="text-2xl font-semibold text-foreground md:text-3xl">
          Join Rancelab in two quick steps
        </h1>
        <p className="text-base text-muted-foreground">
          Tell us how to reach you, then confirm the code we send to your inbox.
          It keeps new accounts secure from day one.
        </p>
      </header>

      <div className="grid gap-5">
        {step === "details" && (
          <SignupDetailsForm
            formValues={formValues}
            fieldErrors={fieldErrors}
            onFieldChange={handleFieldChange}
            onSelectChange={handleSelectChange}
            onSubmit={handleDetailsSubmit}
            isLoading={isRequestingCode}
          />
        )}

        {step === "verification" && (
          <VerificationCodeCard
            email={formValues.email}
            code={code}
            isActive
            onCodeChange={setCode}
            onSubmit={handleVerificationSubmit}
            onEditEmail={handleEditDetails}
            onResend={handleResendCode}
            isSubmitting={isVerifyingCode}
            isResending={isResendingCode}
            stepLabel="Step 2 · Confirm"
            title="Verify your email"
            description={verificationDescription}
            submitLabel="Create account"
            submittingLabel="Creating account"
          />
        )}
      </div>
    </section>
  );
};

export default SignupUI;