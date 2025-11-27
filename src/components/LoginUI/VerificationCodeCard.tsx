import { FormEvent, ReactNode } from "react";
import { Button } from "@components/UI/Button";
import { Input } from "@components/UI/Input";
import { cn } from "@/lib/utils";
import LoadingSpinner from "@components/UI/LoadingSpinner";

type VerificationCodeCardProps = {
  email: string;
  code: string;
  isActive: boolean;
  onCodeChange: (value: string) => void;
  onResend?: () => Promise<void> | void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onEditEmail: () => void;
  isSubmitting?: boolean;
  isResending?: boolean;
  stepLabel?: string;
  title?: string;
  description?: ReactNode;
  submitLabel?: string;
  submittingLabel?: string;
};

const VerificationCodeCard = ({
  email,
  code,
  isActive,
  onCodeChange,
  onResend,
  onSubmit,
  onEditEmail,
  isSubmitting,
  isResending,
  stepLabel,
  title,
  description,
  submitLabel,
  submittingLabel,
}: VerificationCodeCardProps) => {
  const cardStyles = cn(
    "relative flex flex-col gap-5 rounded-xl bg-white p-5 shadow-md transition-all",
    isActive ? "ring-2 ring-primary/30" : "opacity-60"
  );

  const stepHeading = stepLabel ?? "Step 2 · Verify";
  const sectionTitle = title ?? "Enter the 6-digit code";
  const buttonLabel = submitLabel ?? "Continue";
  const buttonSubmittingLabel = submittingLabel ?? "Verifying";
  const descriptionContent =
    description ??
    (
      <>
        We just sent a one-time passcode to{" "}
        <span className="font-medium text-foreground">
          {email || "your email"}
        </span>
        . Type the code below to finish signing in. Each code stays active for
        10 minutes.
      </>
    );

  return (
    <div
      aria-live="polite"
      aria-busy={!isActive}
      className={cardStyles}
      aria-label="Verification step"
    >
      <div className="space-y-2">
        <p className="text-sm font-semibold text-muted-foreground">
          {stepHeading}
        </p>
        <h2 className="text-2xl font-semibold text-foreground">{sectionTitle}</h2>
        <p className="text-sm text-muted-foreground">{descriptionContent}</p>
      </div>

      <div className="flex items-center gap-2 rounded-full bg-primary/5 px-4 py-2 text-sm text-primary">
        <span>Not {email || "you"}?</span>
        <Button
          type="button"
          onClick={onEditEmail}
          variant="ghost"
          size="sm"
          disabled={isSubmitting}
          className="rounded-full px-2 font-semibold underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
        >
          Update email
        </Button>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-4"
      >
        <Input
          id="verification-code"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          name="verification-code"
          placeholder="Enter 6-digit code"
          value={code}
          onChange={(event) => onCodeChange(event.target.value.replace(/\D/g, ""))}
          disabled={!isActive}
          aria-label="Verification code"
          autoComplete="one-time-code"
        />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            onClick={onResend}
            disabled={!isActive || isResending}
            variant="ghost"
            size="sm"
            className="justify-start px-0 text-sm font-semibold text-primary underline-offset-2 hover:underline disabled:opacity-60"
          >
            {isResending && <LoadingSpinner className="mr-2" />}
            {isResending ? "Sending..." : "Resend code"}
          </Button>
          <Button
            type="submit"
            disabled={!isActive || code.length !== 6 || Boolean(isSubmitting)}
            className="w-full rounded-full px-6 py-3 text-base sm:w-auto md:px-8"
          >
            {isSubmitting && <LoadingSpinner className="mr-2" />}
            {isSubmitting ? buttonSubmittingLabel : buttonLabel}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VerificationCodeCard;