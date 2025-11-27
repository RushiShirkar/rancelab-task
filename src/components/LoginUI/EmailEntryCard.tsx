import { FormEvent } from "react";
import { Input } from "@components/UI/Input";
import { Button } from "@components/UI/Button";
import LoadingSpinner from "@components/UI/LoadingSpinner";

type EmailEntryCardProps = {
    email: string;
    onEmailChange: (value: string) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    error?: string;
    isLoading: boolean;
};

const EmailEntryCard = ({
    email,
    onEmailChange,
    onSubmit,
    error,
    isLoading,
}: EmailEntryCardProps) => {
    return (
        <article className="flex flex-col gap-5 rounded-xl bg-white p-5 shadow-md ring-2 ring-primary/30">
            <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground">
                    Step 1 · Email
                </p>
                <h2 className="text-2xl font-semibold text-foreground">
                    Where should we send the code?
                </h2>
                <p className="text-sm text-muted-foreground">
                    Enter the email associated with your account so we can deliver a
                    one-time verification code.
                </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
                <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(event) => onEmailChange(event.target.value)}
                    error={error}
                    aria-required
                    aria-label="Email address"
                />
                <Button
                    type="submit"
                    className="w-full rounded-full px-6 py-3 text-base md:px-8"
                    disabled={isLoading}
                >
                    {isLoading && <LoadingSpinner className="mr-2" />}
                    {isLoading ? "Sending code..." : "Continue"}
                </Button>
            </form>
        </article>
    );
};

export default EmailEntryCard;
